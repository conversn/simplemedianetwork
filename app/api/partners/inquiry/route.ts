import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InquiryPayload = {
  event_only?: boolean;
  event_name?: string;
  program?: string;
  vertical?: string;
  vertical_label?: string;
  site_key?: string;
  page?: string;
  hero_variant?: string;
  referrer?: string;
  // Debt-lander-specific fields (kept for back-compat)
  company_type?: string;
  reps?: string;
  min_debt?: string;
  // Universal / vertical fields
  buying_format?: string;
  daily_capacity?: string;
  currently_buying?: string;
  states?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://jqjftrlnyysqcwbbigpw.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const INTAKE_TABLE = process.env.SMN_PARTNER_INTAKE_TABLE ?? "partner_intakes";
const ANALYTICS_TABLE = process.env.SMN_ANALYTICS_TABLE ?? "analytics_events";

const GHL_JWT = process.env.CALLREADY_GHL_JWT_TOKEN;
const GHL_LOCATION_ID = process.env.CALLREADY_GHL_LOCATION_ID ?? "nKDUZ3SsvwJquGSe5GdD";
const GHL_API_VERSION = "2021-07-28";

const NOTIFY_WEBHOOK = process.env.SMN_PARTNER_NOTIFY_WEBHOOK;

function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parseStates(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/[,;\s]+/)
    .map((s) => s.trim().toUpperCase())
    .filter((s) => /^[A-Z]{2}$/.test(s));
}

function splitName(full: string | undefined): { first: string; last: string } {
  if (!full) return { first: "", last: "" };
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

// Vertical/program resolution — the debt-relief lander predates the multi-vertical
// hub, so it sends `program: "debt-relief"` and no `vertical`. Treat that as
// vertical=debt-relief.
function resolveVertical(payload: InquiryPayload): string {
  const raw = payload.vertical ?? payload.program ?? "unknown";
  return raw.toLowerCase();
}

function verticalTag(vertical: string): string {
  // Namespaced tag safe for CRM filtering.
  return `vertical-${vertical}`;
}

async function postToSupabase(table: string, row: Record<string, unknown>) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return { ok: false, skipped: true as const, reason: "supabase-not-configured" };
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { ok: false as const, skipped: false as const, status: res.status, body: text };
  }
  const body = await res.json().catch(() => null);
  return { ok: true as const, body };
}

async function createGhlContact(payload: InquiryPayload, vertical: string, source: string) {
  if (!GHL_JWT || !GHL_LOCATION_ID) {
    return { ok: false, skipped: true as const, reason: "ghl-not-configured" };
  }
  const { first, last } = splitName(payload.name);
  const tags = [
    "smn-partners",
    verticalTag(vertical),
    `hero-${(payload.hero_variant ?? "B").toLowerCase()}`,
    payload.currently_buying === "Yes" ? "currently-buying" : "not-currently-buying",
  ];
  const body = {
    locationId: GHL_LOCATION_ID,
    firstName: first,
    lastName: last,
    email: payload.email,
    phone: payload.phone,
    companyName: payload.company,
    source,
    tags,
    customFields: [] as Array<Record<string, unknown>>,
  };
  const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GHL_JWT}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { ok: false as const, skipped: false as const, status: res.status, body: text };
  }
  const data = (await res.json().catch(() => ({}))) as { contact?: { id?: string } };
  return { ok: true as const, contactId: data.contact?.id };
}

async function attachGhlNote(contactId: string, payload: InquiryPayload, vertical: string) {
  if (!GHL_JWT) return;
  const lines = [
    `SMN Partner Program — ${payload.vertical_label ?? vertical} inquiry`,
    "",
    `Vertical: ${payload.vertical_label ?? vertical}`,
    `Company: ${payload.company ?? "?"}`,
  ];
  if (payload.company_type) lines.push(`Company type: ${payload.company_type}`);
  if (payload.buying_format) lines.push(`Buying format: ${payload.buying_format}`);
  if (payload.reps) lines.push(`Reps working leads: ${payload.reps}`);
  if (payload.daily_capacity) lines.push(`Daily capacity: ${payload.daily_capacity}`);
  if (payload.currently_buying)
    lines.push(`Currently buying leads: ${payload.currently_buying}`);
  if (payload.min_debt) lines.push(`Minimum unsecured debt: ${payload.min_debt}`);
  if (payload.states) lines.push(`States: ${payload.states}`);
  if (payload.notes) lines.push(`Notes: ${payload.notes}`);
  lines.push("");
  if (payload.hero_variant) lines.push(`Hero variant: ${payload.hero_variant}`);
  if (payload.referrer) lines.push(`Referrer: ${payload.referrer}`);
  if (payload.page) lines.push(`Page: ${payload.page}`);
  const note = lines.join("\n");
  await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GHL_JWT}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ body: note }),
  }).catch(() => undefined);
}

async function sendNotification(
  payload: InquiryPayload,
  vertical: string,
  contactId: string | undefined,
) {
  if (!NOTIFY_WEBHOOK) return { skipped: true as const };
  try {
    const res = await fetch(NOTIFY_WEBHOOK, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: `New SMN Partner Program inquiry (${payload.vertical_label ?? vertical}) — ${payload.company ?? "?"} · ${payload.name ?? "?"} · ${payload.email ?? "?"}${contactId ? ` · GHL ${contactId}` : ""}`,
        payload,
      }),
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export async function POST(request: Request) {
  let payload: InquiryPayload;
  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const siteKey = payload.site_key ?? "simplemedianetwork.com";
  const vertical = resolveVertical(payload);
  const program = payload.program ?? vertical;
  const heroVariant = payload.hero_variant ?? undefined;
  const source = `smn-partners-${vertical}`;
  const pageUrl = payload.page ?? `/partners/${vertical === "partners-hub" ? "" : vertical}`;

  // Analytics event (page view or form submit).
  const eventName = payload.event_only
    ? payload.event_name ?? "partner_lander_view"
    : "partner_lander_submit";
  await postToSupabase(ANALYTICS_TABLE, {
    event_name: eventName,
    page_url: pageUrl,
    properties: {
      site_key: siteKey,
      program,
      vertical,
      hero_variant: heroVariant,
      referrer: payload.referrer ?? undefined,
      source: "smn-partners",
    },
  }).catch(() => undefined);

  if (payload.event_only) {
    return NextResponse.json({ ok: true, tracked: eventName });
  }

  if (!payload.name || !payload.company || !isEmail(payload.email) || !payload.phone) {
    return NextResponse.json(
      { error: "Name, company, work email, and phone are required." },
      { status: 400 },
    );
  }

  const { first, last } = splitName(payload.name);
  const stateCodes = parseStates(payload.states);

  const intakeRow = {
    full_name: payload.name,
    first_name: first || null,
    last_name: last || null,
    email: payload.email,
    phone: payload.phone,
    company: payload.company,
    role: payload.company_type ?? null,
    licensed_states: stateCodes,
    delivery_states: stateCodes,
    lead_types: [vertical],
    lead_format: payload.buying_format ? [payload.buying_format] : ["consumer-inbound"],
    delivery_method: [],
    leads_per_month: payload.daily_capacity ?? null,
    buying_from_vendor: payload.currently_buying ?? null,
    source,
    funnel_type: vertical,
    page_url: pageUrl,
    raw_payload: payload,
  };

  const intakeWrite = await postToSupabase(INTAKE_TABLE, intakeRow).catch((err) => ({
    ok: false as const,
    skipped: false as const,
    status: 0,
    body: err instanceof Error ? err.message : String(err),
  }));

  if (!intakeWrite.ok && !("skipped" in intakeWrite && intakeWrite.skipped)) {
    console.error("[smn-partners] partner_intakes insert failed", intakeWrite);
    return NextResponse.json(
      { error: "We couldn't record your request. Please email hello@simplemedianetwork.com." },
      { status: 502 },
    );
  }

  const ghl = await createGhlContact(payload, vertical, source).catch((err) => ({
    ok: false as const,
    skipped: false as const,
    status: 0,
    body: err instanceof Error ? err.message : String(err),
  }));

  if ("ok" in ghl && ghl.ok && ghl.contactId) {
    attachGhlNote(ghl.contactId, payload, vertical).catch(() => undefined);
  } else if (!("skipped" in ghl && ghl.skipped)) {
    console.error("[smn-partners] GHL contact create failed", ghl);
  }

  const notify = await sendNotification(
    payload,
    vertical,
    "contactId" in ghl ? ghl.contactId : undefined,
  );

  return NextResponse.json({
    ok: true,
    vertical,
    stored: intakeWrite.ok ? "supabase.partner_intakes" : "supabase-not-configured",
    ghl:
      "ok" in ghl && ghl.ok
        ? { ok: true, contactId: ghl.contactId }
        : "skipped" in ghl && ghl.skipped
          ? { ok: false, reason: "ghl-not-configured" }
          : { ok: false, reason: "ghl-error" },
    notified: "ok" in notify ? notify.ok : false,
  });
}
