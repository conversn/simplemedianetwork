import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Tracking = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  s1?: string;
  s2?: string;
  s3?: string;
  s4?: string;
  s5?: string;
  s6?: string;
  s7?: string;
  s8?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
};

type InquiryPayload = {
  // Event envelope (any event_only=true call)
  event_only?: boolean;
  event_name?: string;
  event_id?: string;
  session_id?: string;
  step_index?: number;
  step_name?: string;
  funnel_type?: string;
  lead_type?: string;
  elapsed_ms?: number;
  tracking?: Tracking;
  fbp?: string;
  fbc?: string;
  user_agent?: string;

  // Contextual (both events + submits)
  program?: string;
  vertical?: string;
  vertical_label?: string;
  site_key?: string;
  page?: string;
  hero_variant?: string;
  referrer?: string;
  properties?: Record<string, unknown>;

  // Submit-only fields
  company_type?: string;
  reps?: string;
  min_debt?: string;
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

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? "https://jqjftrlnyysqcwbbigpw.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const INTAKE_TABLE = process.env.SMN_PARTNER_INTAKE_TABLE ?? "partner_intakes";
const ANALYTICS_TABLE = process.env.SMN_ANALYTICS_TABLE ?? "analytics_events";

const GHL_JWT = process.env.CALLREADY_GHL_JWT_TOKEN;
const GHL_LOCATION_ID =
  process.env.CALLREADY_GHL_LOCATION_ID ?? "nKDUZ3SsvwJquGSe5GdD";
const GHL_API_VERSION = "2021-07-28";

const NOTIFY_WEBHOOK = process.env.SMN_PARTNER_NOTIFY_WEBHOOK;

// Meta CAPI — pixel 750308567626057 (`callready`, act_1864689330758615)
const META_PIXEL_ID = process.env.META_PIXEL_ID ?? "750308567626057";
const META_CAPI_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE; // optional, dev only

// ---------- helpers ----------

function trimKey(v: string | undefined): string | undefined {
  if (!v) return v;
  // Strip control chars incl. \r\n — the exact hygiene bug that split
  // legalsimple.org and legalsimple.org\n into two funnels in analytics_events.
  const cleaned = v.replace(/[\x00-\x1f\x7f]+/g, "").trim();
  return cleaned || undefined;
}

function isEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
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

function resolveVertical(payload: InquiryPayload): string {
  const raw = payload.vertical ?? payload.program ?? "unknown";
  return raw.toLowerCase();
}

function verticalTag(vertical: string): string {
  return `vertical-${vertical}`;
}

function ghlTags(payload: InquiryPayload, vertical: string): string[] {
  // Canonical tag schema — must stay in sync with 00 - Reports/2026-08-14_GHL-Tag-Schema-SMN-Partners.md
  return [
    "smn-partners",
    verticalTag(vertical),
    `hero-${(payload.hero_variant ?? "B").toLowerCase()}`,
    payload.currently_buying === "Yes" ? "currently-buying" : "not-currently-buying",
  ];
}

function sha256Lower(v: string | undefined | null): string | undefined {
  if (!v) return undefined;
  return createHash("sha256").update(v.toLowerCase().trim()).digest("hex");
}

function clientIp(request: Request): string | undefined {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? undefined;
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

async function createGhlContact(
  payload: InquiryPayload,
  vertical: string,
  source: string,
): Promise<
  | { ok: true; contactId?: string; tags: string[] }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; skipped: false; status: number; body: string }
> {
  if (!GHL_JWT || !GHL_LOCATION_ID) {
    return { ok: false, skipped: true, reason: "ghl-not-configured" };
  }
  const { first, last } = splitName(payload.name);
  const tags = ghlTags(payload, vertical);
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
    return { ok: false, skipped: false, status: res.status, body: text };
  }
  const data = (await res.json().catch(() => ({}))) as {
    contact?: { id?: string };
  };
  return { ok: true, contactId: data.contact?.id, tags };
}

async function attachGhlNote(
  contactId: string,
  payload: InquiryPayload,
  vertical: string,
) {
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
  await fetch(
    `https://services.leadconnectorhq.com/contacts/${contactId}/notes`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GHL_JWT}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ body: note }),
    },
  ).catch(() => undefined);
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
        text: `New SMN Partner Program inquiry (${
          payload.vertical_label ?? vertical
        }) — ${payload.company ?? "?"} · ${payload.name ?? "?"} · ${
          payload.email ?? "?"
        }${contactId ? ` · GHL ${contactId}` : ""}`,
        payload,
      }),
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ---------- Meta CAPI ----------

type CapiEvent = {
  event_name: "ViewContent" | "InitiateCheckout" | "Lead" | "Schedule";
  event_id: string;
  event_source_url: string;
  action_source: "website";
  event_time: number;
  user_data: Record<string, unknown>;
  custom_data?: Record<string, unknown>;
};

async function sendCapi(evt: CapiEvent): Promise<
  | { ok: true; status: number }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; skipped: false; status: number; body: string }
> {
  if (!META_CAPI_TOKEN || !META_PIXEL_ID) {
    return { ok: false, skipped: true, reason: "meta-capi-not-configured" };
  }
  const url = `https://graph.facebook.com/v20.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(
    META_CAPI_TOKEN,
  )}`;
  const body: Record<string, unknown> = { data: [evt] };
  if (META_TEST_EVENT_CODE) body.test_event_code = META_TEST_EVENT_CODE;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, skipped: false, status: res.status, body: text };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    return {
      ok: false,
      skipped: false,
      status: 0,
      body: err instanceof Error ? err.message : String(err),
    };
  }
}

function buildUserData(
  payload: InquiryPayload,
  request: Request,
): Record<string, unknown> {
  const { first, last } = splitName(payload.name);
  const ud: Record<string, unknown> = {
    em: sha256Lower(payload.email) ? [sha256Lower(payload.email)] : undefined,
    ph: payload.phone
      ? [sha256Lower(payload.phone.replace(/\D/g, ""))]
      : undefined,
    fn: first ? [sha256Lower(first)] : undefined,
    ln: last ? [sha256Lower(last)] : undefined,
    client_user_agent: payload.user_agent ?? request.headers.get("user-agent") ?? undefined,
    client_ip_address: clientIp(request),
    fbp: payload.fbp,
    fbc: payload.fbc,
  };
  // Prune undefined
  return Object.fromEntries(Object.entries(ud).filter(([, v]) => v !== undefined));
}

function capiEventNameFor(analyticsEvent: string): CapiEvent["event_name"] | null {
  // Per WO: one conversion, one name. Do NOT fire Lead on more than one action.
  switch (analyticsEvent) {
    case "lp_view":
      return "ViewContent";
    case "wizard_start":
      return "InitiateCheckout";
    case "qualified_partner":
      return "Lead";
    case "call_booked":
      return "Schedule";
    default:
      return null;
  }
}

// ---------- POST ----------

export async function POST(request: Request) {
  let payload: InquiryPayload;
  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Site-key hygiene: strip control chars incl. trailing \n before ANY write.
  const siteKey = trimKey(payload.site_key) ?? "simplemedianetwork.com";
  const vertical = trimKey(resolveVertical(payload)) ?? "unknown";
  const program = trimKey(payload.program) ?? vertical;
  const heroVariant = trimKey(payload.hero_variant);
  const source = `smn-partners-${vertical}`;
  const pageUrl =
    trimKey(payload.page) ??
    `/partners/${vertical === "partners-hub" ? "" : vertical}`;

  // -------- analytics event path --------
  if (payload.event_only) {
    const eventName = trimKey(payload.event_name) ?? "partner_lander_view";
    const eventId = payload.event_id ?? undefined;

    const eventProps: Record<string, unknown> = {
      site_key: siteKey,
      program,
      vertical,
      hero_variant: heroVariant,
      referrer: payload.referrer ?? undefined,
      source: "smn-partners",
      session_id: payload.session_id,
      event_id: eventId,
      step_index: payload.step_index,
      step_name: payload.step_name,
      funnel_type: payload.funnel_type,
      lead_type: payload.lead_type,
      elapsed_ms: payload.elapsed_ms,
      tracking: payload.tracking,
      ...(payload.properties ?? {}),
    };

    // Best-effort write; do not block CAPI on it.
    postToSupabase(ANALYTICS_TABLE, {
      event_name: eventName,
      page_url: pageUrl,
      session_id: payload.session_id,
      properties: eventProps,
    }).catch(() => undefined);

    // CAPI mirror for the four mapped events.
    const capiName = capiEventNameFor(eventName);
    let capi:
      | { ok: true; status: number }
      | { ok: false; skipped: true; reason: string }
      | { ok: false; skipped: false; status: number; body: string }
      | undefined;
    if (capiName && eventId) {
      const evt: CapiEvent = {
        event_name: capiName,
        event_id: eventId,
        event_source_url:
          payload.referrer ?? `https://simplemedianetwork.com${pageUrl}`,
        action_source: "website",
        event_time: Math.floor(Date.now() / 1000),
        user_data: buildUserData(payload, request),
        custom_data: {
          content_name: `smn-partner-${vertical}`,
          content_category: "partner-inquiry",
          vertical,
          hero_variant: heroVariant,
        },
      };
      capi = await sendCapi(evt);
      if (!capi.ok && !("skipped" in capi && capi.skipped)) {
        console.error("[smn-partners][capi] failed", capiName, capi);
      }
    }

    return NextResponse.json({
      ok: true,
      tracked: eventName,
      event_id: eventId,
      capi: capiName
        ? capi
          ? "ok" in capi && capi.ok
            ? { ok: true, event: capiName }
            : "skipped" in capi && capi.skipped
              ? { ok: false, reason: capi.reason }
              : { ok: false, error: capi.body }
          : { ok: false, reason: "no-event-id" }
        : { skipped: true, reason: "not-mapped" },
    });
  }

  // -------- submit path (existing behavior + hygiene) --------
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
      {
        error:
          "We couldn't record your request. Please email hello@simplemedianetwork.com.",
      },
      { status: 502 },
    );
  }

  const ghl = await createGhlContact(payload, vertical, source).catch((err) => ({
    ok: false as const,
    skipped: false as const,
    status: 0,
    body: err instanceof Error ? err.message : String(err),
  }));

  const ghlOk = "ok" in ghl && ghl.ok;
  const ghlContactId = ghlOk ? ghl.contactId : undefined;
  const ghlTagList = ghlOk ? ghl.tags : ghlTags(payload, vertical);

  if (ghlOk && ghlContactId) {
    attachGhlNote(ghlContactId, payload, vertical).catch(() => undefined);
  } else if (!("skipped" in ghl && ghl.skipped)) {
    console.error("[smn-partners] GHL contact create failed", ghl);
  }

  // Emit a server-side ghl_delivery_success / _failure event so the tag set is
  // asserted into analytics_events, not just inferred from code.
  postToSupabase(ANALYTICS_TABLE, {
    event_name: ghlOk ? "ghl_delivery_success" : "ghl_delivery_failure",
    page_url: pageUrl,
    session_id: payload.session_id,
    properties: {
      site_key: siteKey,
      program,
      vertical,
      hero_variant: heroVariant,
      source: "smn-partners",
      session_id: payload.session_id,
      contact_id: ghlContactId,
      tags: ghlTagList,
      lead_type: payload.lead_type ?? vertical,
      funnel_type: payload.funnel_type ?? `${vertical}-partner`,
      error:
        !ghlOk && "body" in ghl && "status" in ghl
          ? { status: ghl.status, body: ghl.body }
          : undefined,
    },
  }).catch(() => undefined);

  const notify = await sendNotification(payload, vertical, ghlContactId);

  return NextResponse.json({
    ok: true,
    vertical,
    stored: intakeWrite.ok ? "supabase.partner_intakes" : "supabase-not-configured",
    ghl: ghlOk
      ? { ok: true, contactId: ghlContactId, tags: ghlTagList }
      : "skipped" in ghl && ghl.skipped
        ? { ok: false, reason: "ghl-not-configured" }
        : { ok: false, reason: "ghl-error" },
    notified: "ok" in notify ? notify.ok : false,
  });
}
