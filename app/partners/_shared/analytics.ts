"use client";

/**
 * SMN partner-funnel analytics — mirrors the RateRoots + Retirement Rescue
 * event shape so per-step drop-off queries in analytics_events run unchanged.
 *
 * Two channels per event:
 *   1) emoji console log — DevTools-readable live session trace
 *   2) POST /api/partners/inquiry with event_only=true — writes analytics_events
 *      (Supabase, project jqjftrlnyysqcwbbigpw) and mirrors to Meta CAPI on Lead/Schedule
 *
 * Event IDs are generated client-side and echoed to the server so browser fbq
 * and server CAPI dedup as the same conversion (Meta requires identical event_id).
 */

// ---------- session + tracking capture ----------

const SESSION_STORAGE_KEY = "smn_partner_session_id";
const TRACKING_STORAGE_KEY = "smn_partner_tracking";

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

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // RFC4122 v4-ish fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let id = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!id) {
      id = uuid();
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return uuid();
  }
}

function readTrackingFromUrl(): Tracking {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const pick = (k: string) => {
    const v = params.get(k);
    return v && v.trim() ? v.trim() : undefined;
  };
  const tracking: Tracking = {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
    utm_content: pick("utm_content"),
    utm_term: pick("utm_term"),
    s1: pick("s1"),
    s2: pick("s2"),
    s3: pick("s3"),
    s4: pick("s4"),
    s5: pick("s5"),
    s6: pick("s6"),
    s7: pick("s7"),
    s8: pick("s8"),
    gclid: pick("gclid"),
    fbclid: pick("fbclid"),
  };
  const hasAny = Object.values(tracking).some(Boolean);
  if (!hasAny) return {};
  tracking.landing_page = window.location.pathname + window.location.search;
  tracking.referrer = document.referrer || undefined;
  tracking.captured_at = new Date().toISOString();
  return tracking;
}

export function ensureTracking(): Tracking {
  if (typeof window === "undefined") return {};
  try {
    const stored = window.sessionStorage.getItem(TRACKING_STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Tracking;
    const fresh = readTrackingFromUrl();
    window.sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  } catch {
    return {};
  }
}

// Meta cookies for CAPI match quality
export function getFbCookies(): { fbc?: string; fbp?: string } {
  if (typeof document === "undefined") return {};
  const match = (name: string) => {
    const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : undefined;
  };
  return { fbc: match("_fbc"), fbp: match("_fbp") };
}

// ---------- emoji step logger ----------

export const STAGE_EMOJI = {
  entry: "🟢",
  advance: "➡️",
  back: "↩️",
  field: "📝",
  block: "🚫",
  qualify: "🎯",
  apiOut: "📤",
  success: "✅",
  failure: "❌",
  booking: "📅",
} as const;

export type StageKey = keyof typeof STAGE_EMOJI;

export function log(stage: StageKey, label: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const emoji = STAGE_EMOJI[stage];
  const line = `${emoji} ${label}`;
  // Always-on for failures/API-out per WO ("keep ❌ and 📤 always on")
  if (stage === "failure" || stage === "apiOut" || stage === "success") {
    console.log(line, data ?? "");
    return;
  }
  // Everything else gated on a debug flag (default on until we have volume)
  const debug =
    typeof window !== "undefined" &&
    (window as unknown as { __SMN_ANALYTICS_DEBUG?: boolean })
      .__SMN_ANALYTICS_DEBUG !== false;
  if (debug) console.log(line, data ?? "");
}

// ---------- event emitter ----------

export type EventName =
  | "lp_view"
  | "lp_cta_click"
  | "wizard_start"
  | "wizard_step_viewed"
  | "wizard_step_advance"
  | "wizard_step_back"
  | "question_answer"
  | "contact_step_view"
  | "contact_submit_attempted"
  | "contact_submit_blocked"
  | "qualified_partner"
  | "disqualified_partner"
  | "lead_submit"
  | "ghl_delivery_success"
  | "ghl_delivery_failure"
  | "thank_you_view"
  | "calendar_iframe_loaded"
  | "call_booked";

export type EmitContext = {
  program: string;
  vertical?: string;
  page: string;
  heroVariant?: string;
  leadType?: string;
  funnelType?: string; // e.g. debt-relief-partner
};

let mountedAt = 0;
function elapsed(): number {
  if (!mountedAt) return 0;
  return Date.now() - mountedAt;
}
export function markMount() {
  if (!mountedAt) mountedAt = Date.now();
}

export type EmitPayload = {
  event_name: EventName;
  event_id?: string;
  step_index?: number;
  step_name?: string;
  properties?: Record<string, unknown>;
};

export function newEventId(): string {
  return uuid();
}

export async function emit(ctx: EmitContext, payload: EmitPayload): Promise<void> {
  if (typeof window === "undefined") return;
  const eventId = payload.event_id ?? newEventId();
  const tracking = ensureTracking();
  const sessionId = getSessionId();
  const fb = getFbCookies();

  const body = {
    event_only: true,
    event_name: payload.event_name,
    event_id: eventId,
    program: ctx.program,
    vertical: ctx.vertical,
    site_key: "simplemedianetwork.com",
    page: ctx.page,
    hero_variant: ctx.heroVariant,
    referrer: document.referrer || undefined,
    session_id: sessionId,
    step_index: payload.step_index,
    step_name: payload.step_name,
    funnel_type: ctx.funnelType ?? `${ctx.vertical ?? ctx.program}-partner`,
    lead_type: ctx.leadType ?? ctx.vertical ?? ctx.program,
    elapsed_ms: elapsed(),
    tracking,
    fbp: fb.fbp,
    fbc: fb.fbc,
    user_agent: navigator.userAgent,
    properties: payload.properties ?? {},
  };

  try {
    await fetch("/api/partners/inquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch {
    /* best-effort */
  }
}
