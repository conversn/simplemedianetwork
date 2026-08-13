"use client";

import { useState, type FormEvent } from "react";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

export function PartnerInquiryForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "submitting") return;
    setStatus({ state: "submitting" });

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/partners/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          program: "debt-relief",
          site_key: "simplemedianetwork.com",
          page: "/partners/debt-relief",
          ...payload,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }

      setStatus({ state: "success" });
      event.currentTarget.reset();
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row">
        <div>
          <label htmlFor="company_type">Company type</label>
          <select id="company_type" name="company_type" defaultValue="Debt settlement">
            <option>Debt settlement</option>
            <option>Debt relief</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="reps">Reps actively working leads</label>
          <select id="reps" name="reps" defaultValue="3–5">
            <option>1–2</option>
            <option>3–5</option>
            <option>6–10</option>
            <option>11–25</option>
            <option>25+</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div>
          <label htmlFor="daily_capacity">New leads/day your team can handle</label>
          <select id="daily_capacity" name="daily_capacity" defaultValue="10–25">
            <option>Under 10</option>
            <option>10–25</option>
            <option>25–50</option>
            <option>50–100</option>
            <option>100+</option>
          </select>
        </div>
        <div>
          <label htmlFor="currently_buying">Currently purchasing debt leads?</label>
          <select id="currently_buying" name="currently_buying" defaultValue="Yes">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div>
          <label htmlFor="min_debt">Minimum unsecured debt</label>
          <select id="min_debt" name="min_debt" defaultValue="$10,000+">
            <option>$7,500+</option>
            <option>$10,000+</option>
            <option>$15,000+</option>
            <option>$20,000+</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="states">States</label>
          <input
            id="states"
            name="states"
            type="text"
            placeholder="e.g. TX, FL, AZ"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" required autoComplete="organization" />
        </div>
      </div>

      <div className="row">
        <div>
          <label htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>

      <button className="pill" type="submit" disabled={status.state === "submitting"}>
        {status.state === "submitting" ? "Sending…" : "Check partner availability →"}
      </button>

      <div className="form-consent">
        By submitting, you consent to be contacted by Simple Media Network about the Partner Program.
        We&rsquo;ll review your criteria and current volume requirements before discussing a program.
      </div>

      {status.state === "success" ? (
        <div className="form-status" role="status">
          Thanks — we&rsquo;ve got your request. A partner-program contact will follow up shortly.
        </div>
      ) : null}
      {status.state === "error" ? (
        <div className="form-status error" role="alert">
          {status.message}
        </div>
      ) : null}
    </form>
  );
}
