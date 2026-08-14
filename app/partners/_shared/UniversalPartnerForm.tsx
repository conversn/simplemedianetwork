"use client";

import { useState } from "react";
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

const BUYING_FORMATS = [
  "Leads",
  "Calls",
  "Appointments",
  "Applications",
  "Cases / enrollments / sales",
  "Open",
];

const CAPACITY_OPTIONS = [
  "Under 10",
  "10–25",
  "25–50",
  "50–100",
  "100+",
];

const VERTICAL_OPTIONS: Array<{ value: FormState["vertical"]; label: string }> = [
  { value: "debt-relief", label: "Debt Relief" },
  { value: "retirement", label: "Retirement & Annuity" },
  { value: "life-insurance", label: "Life Insurance" },
  { value: "home-equity", label: "Mortgage & Home Equity" },
  { value: "legal", label: "Legal (MVA + Premises)" },
  { value: "other", label: "Other" },
];

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

    const verticalMeta =
      state.vertical !== "other" ? VERTICALS[state.vertical] : null;

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
        setMessage(
          body?.error ??
            "Something went wrong. Please email hello@simplemedianetwork.com.",
        );
        return;
      }
      setStatus("ok");
      setMessage(
        "Got it — we'll reply within one business day with current availability.",
      );
    } catch {
      setStatus("error");
      setMessage(
        "Network error. Please email hello@simplemedianetwork.com.",
      );
    }
  }

  if (status === "ok") {
    return (
      <div className="uform" role="status" aria-live="polite">
        <h3>Thanks — request received.</h3>
        <p className="fh">{message}</p>
      </div>
    );
  }

  return (
    <form className="uform" onSubmit={onSubmit} noValidate>
      <h3>Tell us what you buy.</h3>
      <div className="fh">
        A short qualifier — vertical, capacity, states, contact. Takes about a minute.
      </div>

      <div className="row2">
        <div>
          <label htmlFor="vertical">What do you buy?</label>
          <select
            id="vertical"
            value={state.vertical}
            onChange={(e) => update("vertical", e.target.value as FormState["vertical"])}
          >
            {VERTICAL_OPTIONS.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="buying_format">How are you buying?</label>
          <select
            id="buying_format"
            value={state.buying_format}
            onChange={(e) => update("buying_format", e.target.value)}
          >
            {BUYING_FORMATS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row2">
        <div>
          <label htmlFor="daily_capacity">Volume your team can handle / day</label>
          <select
            id="daily_capacity"
            value={state.daily_capacity}
            onChange={(e) => update("daily_capacity", e.target.value)}
          >
            {CAPACITY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="currently_buying">Buying from other vendors?</label>
          <select
            id="currently_buying"
            value={state.currently_buying}
            onChange={(e) => update("currently_buying", e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      <div className="row1">
        <label htmlFor="states">Markets / states</label>
        <input
          id="states"
          type="text"
          value={state.states}
          onChange={(e) => update("states", e.target.value)}
          placeholder="e.g. CA, TX, FL, NY"
          autoComplete="off"
        />
      </div>

      <div className="row2">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={state.name}
            onChange={(e) => update("name", e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            value={state.company}
            onChange={(e) => update("company", e.target.value)}
            required
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="row2">
        <div>
          <label htmlFor="email">Work email</label>
          <input
            id="email"
            type="email"
            value={state.email}
            onChange={(e) => update("email", e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            value={state.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="row1">
        <label htmlFor="notes">Anything else we should know?</label>
        <textarea
          id="notes"
          value={state.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Specific criteria, current CPL, timing…"
        />
      </div>

      <div className="submit">
        <button className="pill" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "See if we're a fit →"}
        </button>
        <span className="micro">One business day for a reply.</span>
      </div>

      <p className="form-consent">
        By submitting, you agree we may contact you about this inquiry. We don&rsquo;t
        share your details outside of this partnership discussion.
      </p>

      {status === "error" ? (
        <div className="form-status error" role="alert">
          {message}
        </div>
      ) : null}
    </form>
  );
}
