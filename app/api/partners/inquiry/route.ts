import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InquiryPayload = {
  event_only?: boolean;
  event_name?: string;
  program?: string;
  site_key?: string;
  page?: string;
  hero_variant?: string;
  referrer?: string;
  company_type?: string;
  reps?: string;
  daily_capacity?: string;
  currently_buying?: string;
  min_debt?: string;
  states?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
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

async function createGhlContact(payload: InquiryPayload) {
  if (!GHL_JWT || !GHL_LOCATION_ID) {
    return { ok: false, skipped: true as const, reason: "ghl-not-configured" };
  }
  const { first, last } = splitName(payload.name);
  const body = {
    locationId: GHL_LOCATION_ID,
    firstName: first,
    lastName: last,
    email: payload.email,
    phone: payload.phone,
    companyName: payload.company,
    source: "smn-partners-debt-relief",
    tags: [
      "smn-partners",
      "debt-relief",
      `hero-${(payload.hero_variant ?? "B").toLowerCase()}`,
      payload.currently_buying === "Yes" ? "currently-buying" : "not-currently-buying",
    ],
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

async function attachGhlNote(contactId: string, payload: InquiryPayload) {
  if (!GHL_JWT) return;
  const note = [
    "SMN Partner Program — Debt Relief inquiry",
    "",
    `Company: ${payload.company ?? "?"}`,
    `Company type: ${payload.company_type ?? "?"}`,
    `Reps working leads: ${payload.reps ?? "?"}`,
    `Daily capacity: ${payload.daily_capacity ?? "?"}`,
    `Currently buying debt leads: ${payload.currently_buying ?? "?"}`,
    `Minimum unsecured debt: ${payload.min_debt ?? "?"}`,
    `States: ${payload.states ?? "?"}`,
    "",
    `Hero variant: ${payload.hero_variant ?? "?"}`,
    `Referrer: ${payload.referrer ?? "-"}`,
    `Page: ${payload.page ?? "-"}`,
  ].join("\n");
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

async function sendNotification(payload: InquiryPayload, contactId: string | undefined) {
  if (!NOTIFY_WEBHOOK) return { skipped: true as const };
  try {
    const res = await fetch(NOTIFY_WEBHOOK, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: `New SMN Partner Program inquiry (debt-relief) — ${payload.company ?? "?"} · ${payload.name ?? "?"} · ${payload.email ?? "?"}${contactId ? ` · GHL ${contactId}` : ""}`,
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
  const program = payload.program ?? "debt-relief";
  const heroVariant = payload.hero_variant ?? undefined;

  // Analytics event (page view or form submit).
  const eventName = payload.event_only
    ? payload.event_name ?? "partner_lander_view"
    : "partner_lander_submit";
  await postToSupabase(ANALYTICS_TABLE, {
    event_name: eventName,
    page_url: payload.page ?? "/partners/debt-relief",
    properties: {
      site_key: siteKey,
      program,
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
    lead_types: ["debt-relief"],
    lead_format: ["consumer-inbound"],
    delivery_method: [],
    leads_per_month: payload.daily_capacity ?? null,
    buying_from_vendor: payload.currently_buying ?? null,
    source: "smn-partners-debt-relief",
    funnel_type: "debt-relief",
    page_url: payload.page ?? "/partners/debt-relief",
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

  const ghl = await createGhlContact(payload).catch((err) => ({
    ok: false as const,
    skipped: false as const,
    status: 0,
    body: err instanceof Error ? err.message : String(err),
  }));

  if ("ok" in ghl && ghl.ok && ghl.contactId) {
    attachGhlNote(ghl.contactId, payload).catch(() => undefined);
  } else if (!("skipped" in ghl && ghl.skipped)) {
    console.error("[smn-partners] GHL contact create failed", ghl);
  }

  const notify = await sendNotification(
    payload,
    "contactId" in ghl ? ghl.contactId : undefined,
  );

  return NextResponse.json({
    ok: true,
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
