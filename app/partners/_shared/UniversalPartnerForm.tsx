"use client";

import { useState, type CSSProperties } from "react";
import { VERTICALS, type VerticalSlug } from "./properties";

type FormState = {
  vertical: VerticalSlug | "other";
  buying_format: string;
  daily_capacity: string;
  currently_buying: string;
  states: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
};

const EMPTY: FormState = {
  vertical: "debt-relief",
  buying_format: "Leads",
  daily_capacity: "10–25",
  currently_buying: "Yes",
  states: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  notes: "",
};

const BUYING_FORMATS = ["Leads", "Calls", "Appointments", "Applications", "Cases / enrollments / sales", "Open"];
const CAPACITY_OPTIONS = ["Under 10", "10–25", "25–50", "50–100", "100+"];
const VERTICAL_OPTIONS: Array<{ value: FormState["vertical"]; label: string }> = [
  { value: "debt-relief", label: "Debt Relief" },
  { value: "retirement", label: "Retirement & Annuity" },
  { value: "life-insurance", label: "Life Insurance" },
  { value: "home-equity", label: "Mortgage & Home Equity" },
  { value: "legal", label: "Legal (MVA + Premises)" },
  { value: "other", label: "Other" },
];

const wrap: CSSProperties = {
  background: "var(--white)",
  border: "1px solid var(--border-hairline)",
  borderRadius: "var(--radius-lg)",
  boxShadow: "var(--shadow-sm)",
};
// Row layout lives in `.smn-form-row-*` (see _ds/tokens/base.css) rather than
// inline, so the two-up rows can collapse on a phone. This is the conversion
// form on /partners — a half-width field at 360px is unusable.
const label: CSSProperties = {
  display: "block", marginBottom: "var(--sp-2)",
  fontFamily: "var(--font-ui)", fontSize: "var(--fs-caption)",
  fontWeight: "var(--fw-medium)", color: "var(--text-strong)", letterSpacing: "0.01em",
};
// Font size is deliberately absent here — it lives on `.smn-field` so the
// mobile rule can raise it to 16px, below which iOS zooms the page on focus.
const fieldStyle: CSSProperties = {
  width: "100%", fontFamily: "var(--font-ui)",
  padding: "12px 14px", borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border-default)", background: "var(--white)", color: "var(--text-strong)",
  lineHeight: 1.4, outline: "none",
  transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
};
const submitBtn: CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  padding: "16px 30px", fontFamily: "var(--font-ui)", fontSize: "var(--fs-body-sm)",
  fontWeight: "var(--fw-medium)", background: "var(--evergreen)", color: "#fff",
  border: "1px solid var(--evergreen)", borderRadius: "var(--radius-pill)",
  cursor: "pointer", lineHeight: 1.2,
  transition: "background var(--dur-base) var(--ease-standard)",
};

export function UniversalPartnerForm({
  defaultVertical = "debt-relief",
  program = "partners-hub",
}: {
  defaultVertical?: FormState["vertical"];
  program?: string;
}) {
  const [state, setState] = useState<FormState>({ ...EMPTY, vertical: defaultVertical });
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!state.name || !state.company || !state.email || !state.phone) {
      setStatus("error");
      setMessage("Name, company, work email, and phone are required.");
      return;
    }
    setStatus("submitting");
    setMessage("");

    const verticalMeta = state.vertical !== "other" ? VERTICALS[state.vertical] : null;

    try {
      const res = await fetch("/api/partners/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          program,
          vertical: state.vertical,
          vertical_label: verticalMeta?.label ?? "Other",
          site_key: "simplemedianetwork.com",
          page: typeof window !== "undefined" ? window.location.pathname : "/partners",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          buying_format: state.buying_format,
          daily_capacity: state.daily_capacity,
          currently_buying: state.currently_buying,
          states: state.states,
          name: state.name,
          company: state.company,
          email: state.email,
          phone: state.phone,
          notes: state.notes,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(body?.error ?? "Something went wrong. Please email hello@simplemedianetwork.com.");
        return;
      }
      setStatus("ok");
      setMessage("Got it — we'll reply within one business day with current availability.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please email hello@simplemedianetwork.com.");
    }
  }

  if (status === "ok") {
    return (
      <div className="smn-form-card" style={wrap} role="status" aria-live="polite">
        <h3 style={{ margin: "0 0 var(--sp-3)", fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", fontWeight: "var(--fw-regular)", color: "var(--text-strong)" }}>
          Thanks — request received.
        </h3>
        <p style={{ margin: 0, fontFamily: "var(--font-ui)", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>{message}</p>
      </div>
    );
  }

  return (
    <form className="smn-form-card" style={wrap} onSubmit={onSubmit} noValidate>
      <h3 style={{ margin: "0 0 var(--sp-2)", fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", fontWeight: "var(--fw-regular)", color: "var(--text-strong)" }}>
        Tell us what you buy.
      </h3>
      <div style={{ marginBottom: "var(--sp-8)", fontFamily: "var(--font-ui)", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)" }}>
        A short qualifier — vertical, capacity, states, contact. Takes about a minute.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-5)" }}>
        <div className="smn-form-row-2">
          <div>
            <label style={label} htmlFor="vertical">What do you buy?</label>
            <select id="vertical" className="smn-field" style={fieldStyle} value={state.vertical} onChange={(e) => update("vertical", e.target.value as FormState["vertical"])}>
              {VERTICAL_OPTIONS.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
            </select>
          </div>
          <div>
            <label style={label} htmlFor="buying_format">How are you buying?</label>
            <select id="buying_format" className="smn-field" style={fieldStyle} value={state.buying_format} onChange={(e) => update("buying_format", e.target.value)}>
              {BUYING_FORMATS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <div className="smn-form-row-2">
          <div>
            <label style={label} htmlFor="daily_capacity">Volume your team can handle / day</label>
            <select id="daily_capacity" className="smn-field" style={fieldStyle} value={state.daily_capacity} onChange={(e) => update("daily_capacity", e.target.value)}>
              {CAPACITY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={label} htmlFor="currently_buying">Buying from other vendors?</label>
            <select id="currently_buying" className="smn-field" style={fieldStyle} value={state.currently_buying} onChange={(e) => update("currently_buying", e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div className="smn-form-row-1">
          <div>
            <label style={label} htmlFor="states">Markets / states</label>
            <input id="states" className="smn-field" style={fieldStyle} type="text" value={state.states}
              onChange={(e) => update("states", e.target.value)}
              placeholder="e.g. CA, TX, FL, NY" autoComplete="off" />
          </div>
        </div>

        <div className="smn-form-row-2">
          <div>
            <label style={label} htmlFor="name">Name</label>
            <input id="name" className="smn-field" style={fieldStyle} type="text" value={state.name}
              onChange={(e) => update("name", e.target.value)} required autoComplete="name" />
          </div>
          <div>
            <label style={label} htmlFor="company">Company</label>
            <input id="company" className="smn-field" style={fieldStyle} type="text" value={state.company}
              onChange={(e) => update("company", e.target.value)} required autoComplete="organization" />
          </div>
        </div>

        <div className="smn-form-row-2">
          <div>
            <label style={label} htmlFor="email">Work email</label>
            <input id="email" className="smn-field" style={fieldStyle} type="email" value={state.email}
              onChange={(e) => update("email", e.target.value)} required autoComplete="email" />
          </div>
          <div>
            <label style={label} htmlFor="phone">Phone</label>
            <input id="phone" className="smn-field" style={fieldStyle} type="tel" value={state.phone}
              onChange={(e) => update("phone", e.target.value)} required autoComplete="tel" />
          </div>
        </div>

        <div className="smn-form-row-1">
          <div>
            <label style={label} htmlFor="notes">Anything else we should know?</label>
            <textarea id="notes" className="smn-field" style={{ ...fieldStyle, minHeight: 96, resize: "vertical" }}
              value={state.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Specific criteria, current CPL, timing…" />
          </div>
        </div>

        <div style={{ marginTop: "var(--sp-2)", display: "flex", alignItems: "center", gap: "var(--sp-4)", flexWrap: "wrap" }}>
          <button type="submit" className="smn-submit" style={{ ...submitBtn, opacity: status === "submitting" ? 0.5 : 1, cursor: status === "submitting" ? "not-allowed" : "pointer" }} disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "See if we're a fit →"}
          </button>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-caption)", color: "var(--text-subtle)" }}>
            One business day for a reply.
          </span>
        </div>

        <p style={{ margin: "var(--sp-3) 0 0", fontFamily: "var(--font-ui)", fontSize: "var(--fs-caption)", color: "var(--text-subtle)", maxWidth: "70ch" }}>
          By submitting, you agree we may contact you about this inquiry. We don&rsquo;t share your details outside of this partnership discussion.
        </p>

        {status === "error" && (
          <div role="alert" style={{
            marginTop: "var(--sp-2)", padding: "var(--sp-3) var(--sp-4)",
            background: "var(--danger-soft)", color: "var(--danger)",
            border: "1px solid #E8CDC8", borderRadius: "var(--radius-sm)",
            fontFamily: "var(--font-ui)", fontSize: "var(--fs-body-sm)",
          }}>
            {message}
          </div>
        )}
      </div>
    </form>
  );
}
