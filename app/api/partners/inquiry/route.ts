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

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const INQUIRY_TABLE = process.env.SMN_PARTNER_INQUIRY_TABLE ?? "smn_partner_inquiries";
const ANALYTICS_TABLE = process.env.SMN_ANALYTICS_TABLE ?? "analytics_events";
const NOTIFY_WEBHOOK = process.env.SMN_PARTNER_NOTIFY_WEBHOOK;

function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { ok: false, skipped: false as const, status: res.status, body: text };
  }
  return { ok: true as const };
}

async function sendNotification(payload: InquiryPayload) {
  if (!NOTIFY_WEBHOOK) return { skipped: true as const };
  try {
    const res = await fetch(NOTIFY_WEBHOOK, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: `New SMN Partner Program inquiry (debt-relief) — ${payload.company ?? "?"} · ${payload.name ?? "?"} · ${payload.email ?? "?"}`,
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

  // Analytics event — page view or form submit.
  const eventName = payload.event_only ? payload.event_name ?? "partner_lander_view" : "partner_lander_submit";
  const analyticsRow = {
    event_name: eventName,
    page_url: payload.page ?? "/partners/debt-relief",
    properties: {
      site_key: siteKey,
      program,
      hero_variant: heroVariant,
      referrer: payload.referrer ?? undefined,
      source: "smn-partners",
    } as Record<string, unknown>,
  };
  await postToSupabase(ANALYTICS_TABLE, analyticsRow).catch(() => undefined);

  if (payload.event_only) {
    return NextResponse.json({ ok: true, tracked: eventName });
  }

  // Validate submission.
  if (!payload.name || !payload.company || !isEmail(payload.email) || !payload.phone) {
    return NextResponse.json(
      { error: "Name, company, work email, and phone are required." },
      { status: 400 },
    );
  }

  const inquiryRow = {
    program,
    site_key: siteKey,
    hero_variant: heroVariant,
    company_type: payload.company_type,
    reps: payload.reps,
    daily_capacity: payload.daily_capacity,
    currently_buying: payload.currently_buying,
    min_debt: payload.min_debt,
    states: payload.states,
    name: payload.name,
    company: payload.company,
    email: payload.email,
    phone: payload.phone,
    referrer: payload.referrer,
    raw_payload: payload,
  };

  const inquiryWrite = await postToSupabase(INQUIRY_TABLE, inquiryRow).catch((err) => ({
    ok: false as const,
    skipped: false as const,
    status: 0,
    body: err instanceof Error ? err.message : String(err),
  }));

  const notify = await sendNotification(payload);

  if (!inquiryWrite.ok && !("skipped" in inquiryWrite && inquiryWrite.skipped)) {
    console.error("[smn-partners] inquiry insert failed", inquiryWrite);
    return NextResponse.json(
      { error: "We couldn't record your request. Please email hello@simplemedianetwork.com." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    stored: inquiryWrite.ok ? "supabase" : "pending-crm",
    notified: "ok" in notify ? notify.ok : false,
  });
}
