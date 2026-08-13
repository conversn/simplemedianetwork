"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CompanyType = "Debt settlement" | "Debt relief" | "Debt consolidation" | "Other";
type CurrentlyBuying = "Yes" | "No";
type Reps = "1–2" | "3–5" | "6–10" | "11–25" | "25+";
type DailyCapacity = "Under 10" | "10–25" | "25–50" | "50–100" | "100+";
type MinDebt = "$7,500+" | "$10,000+" | "$15,000+" | "$20,000+" | "Other";

const COMPANY_TYPES: CompanyType[] = [
  "Debt settlement",
  "Debt relief",
  "Debt consolidation",
  "Other",
];
const REPS_OPTIONS: Reps[] = ["1–2", "3–5", "6–10", "11–25", "25+"];
const CAPACITY_OPTIONS: DailyCapacity[] = ["Under 10", "10–25", "25–50", "50–100", "100+"];
const MIN_DEBT_OPTIONS: MinDebt[] = ["$7,500+", "$10,000+", "$15,000+", "$20,000+", "Other"];

const US_STATES: Array<{ abbr: string; name: string }> = [
  { abbr: "AL", name: "Alabama" }, { abbr: "AK", name: "Alaska" }, { abbr: "AZ", name: "Arizona" },
  { abbr: "AR", name: "Arkansas" }, { abbr: "CA", name: "California" }, { abbr: "CO", name: "Colorado" },
  { abbr: "CT", name: "Connecticut" }, { abbr: "DE", name: "Delaware" }, { abbr: "DC", name: "D.C." },
  { abbr: "FL", name: "Florida" }, { abbr: "GA", name: "Georgia" }, { abbr: "HI", name: "Hawaii" },
  { abbr: "ID", name: "Idaho" }, { abbr: "IL", name: "Illinois" }, { abbr: "IN", name: "Indiana" },
  { abbr: "IA", name: "Iowa" }, { abbr: "KS", name: "Kansas" }, { abbr: "KY", name: "Kentucky" },
  { abbr: "LA", name: "Louisiana" }, { abbr: "ME", name: "Maine" }, { abbr: "MD", name: "Maryland" },
  { abbr: "MA", name: "Massachusetts" }, { abbr: "MI", name: "Michigan" }, { abbr: "MN", name: "Minnesota" },
  { abbr: "MS", name: "Mississippi" }, { abbr: "MO", name: "Missouri" }, { abbr: "MT", name: "Montana" },
  { abbr: "NE", name: "Nebraska" }, { abbr: "NV", name: "Nevada" }, { abbr: "NH", name: "New Hampshire" },
  { abbr: "NJ", name: "New Jersey" }, { abbr: "NM", name: "New Mexico" }, { abbr: "NY", name: "New York" },
  { abbr: "NC", name: "North Carolina" }, { abbr: "ND", name: "North Dakota" }, { abbr: "OH", name: "Ohio" },
  { abbr: "OK", name: "Oklahoma" }, { abbr: "OR", name: "Oregon" }, { abbr: "PA", name: "Pennsylvania" },
  { abbr: "RI", name: "Rhode Island" }, { abbr: "SC", name: "South Carolina" }, { abbr: "SD", name: "South Dakota" },
  { abbr: "TN", name: "Tennessee" }, { abbr: "TX", name: "Texas" }, { abbr: "UT", name: "Utah" },
  { abbr: "VT", name: "Vermont" }, { abbr: "VA", name: "Virginia" }, { abbr: "WA", name: "Washington" },
  { abbr: "WV", name: "West Virginia" }, { abbr: "WI", name: "Wisconsin" }, { abbr: "WY", name: "Wyoming" },
];

type Answers = {
  company_type?: CompanyType;
  currently_buying?: CurrentlyBuying;
  reps?: Reps;
  daily_capacity?: DailyCapacity;
  min_debt?: MinDebt;
  states: string[];
  name: string;
  company: string;
  email: string;
  phone: string;
};

const EMPTY_ANSWERS: Answers = {
  states: [],
  name: "",
  company: "",
  email: "",
  phone: "",
};

const STEP_KEYS = [
  "company_type",
  "currently_buying",
  "reps",
  "daily_capacity",
  "min_debt",
  "states",
  "contact",
] as const;
type StepKey = (typeof STEP_KEYS)[number];

const STEP_META: Record<
  StepKey,
  { eyebrow: string; heading: string; helper?: string }
> = {
  company_type: {
    eyebrow: "About your company",
    heading: "Which best describes your business?",
    helper: "Pick the one closest to how you'd describe yourselves.",
  },
  currently_buying: {
    eyebrow: "Buying today",
    heading: "Are you currently purchasing debt-relief leads?",
  },
  reps: {
    eyebrow: "Your team",
    heading: "How many reps actively work leads?",
    helper: "Sales reps who dial and enroll — not admin.",
  },
  daily_capacity: {
    eyebrow: "Capacity",
    heading: "How many new leads per day can your team actually handle?",
    helper: "Be honest — under-buying is better than drowning the floor.",
  },
  min_debt: {
    eyebrow: "Qualification",
    heading: "What's your minimum unsecured-debt qualification?",
  },
  states: {
    eyebrow: "Markets",
    heading: "Which states do you want leads from?",
    helper: "Tap to add. Tap again to remove. You can pick as many as you serve.",
  },
  contact: {
    eyebrow: "Almost done",
    heading: "How can we reach you?",
    helper: "We'll review your criteria and reply with current availability.",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function extractDigits(v: string) {
  return v.replace(/[^\d]/g, "");
}

function formatPhone(v: string) {
  const digits = extractDigits(v).slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function ApplyWizard({ heroVariant }: { heroVariant: "A" | "B" }) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fire an entry-tracking event once.
    fetch("/api/partners/inquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event_only: true,
        event_name: "partner_apply_start",
        program: "debt-relief",
        site_key: "simplemedianetwork.com",
        page: "/partners/debt-relief/apply",
        hero_variant: heroVariant,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
    }).catch(() => undefined);
  }, [heroVariant]);

  const totalSteps = STEP_KEYS.length;
  const currentKey = STEP_KEYS[stepIndex];
  const meta = STEP_META[currentKey];
  const progressPercent = Math.round(((stepIndex + 1) / totalSteps) * 100);

  const stepValid = useMemo(() => {
    switch (currentKey) {
      case "company_type": return Boolean(answers.company_type);
      case "currently_buying": return Boolean(answers.currently_buying);
      case "reps": return Boolean(answers.reps);
      case "daily_capacity": return Boolean(answers.daily_capacity);
      case "min_debt": return Boolean(answers.min_debt);
      case "states": return answers.states.length > 0;
      case "contact":
        return (
          answers.name.trim().length > 1 &&
          answers.company.trim().length > 1 &&
          EMAIL_RE.test(answers.email.trim()) &&
          extractDigits(answers.phone).length === 10
        );
      default:
        return false;
    }
  }, [currentKey, answers]);

  function updateAnswer<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleState(abbr: string) {
    setAnswers((prev) =>
      prev.states.includes(abbr)
        ? { ...prev, states: prev.states.filter((s) => s !== abbr) }
        : { ...prev, states: [...prev.states, abbr] },
    );
  }

  function goNext() {
    if (!stepValid) return;
    advance();
  }
  function advance() {
    if (stepIndex < totalSteps - 1) {
      setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
    } else {
      submit();
    }
  }
  function goBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  async function submit() {
    setErrorMessage(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/partners/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          program: "debt-relief",
          site_key: "simplemedianetwork.com",
          page: "/partners/debt-relief/apply",
          hero_variant: heroVariant,
          company_type: answers.company_type,
          reps: answers.reps,
          daily_capacity: answers.daily_capacity,
          currently_buying: answers.currently_buying,
          min_debt: answers.min_debt,
          states: answers.states.join(", "),
          name: answers.name.trim(),
          company: answers.company.trim(),
          email: answers.email.trim(),
          phone: answers.phone,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Submission failed (${res.status})`);
      }
      router.push("/partners/debt-relief/thank-you");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  const canSelectAllStates = answers.states.length !== US_STATES.length;

  return (
    <div className="wizard">
      <div className="wizard-progress" aria-label={`Step ${stepIndex + 1} of ${totalSteps}`}>
        <div className="wizard-progress-track">
          <div
            className="wizard-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="wizard-progress-label">
          Step {stepIndex + 1} of {totalSteps}
        </div>
      </div>

      <div className="wizard-card">
        <div className="eyebrow">{meta.eyebrow}</div>
        <h2 className="wizard-heading">{meta.heading}</h2>
        {meta.helper ? <p className="wizard-helper">{meta.helper}</p> : null}

        <div className="wizard-body">
          {currentKey === "company_type" ? (
            <div className="pill-grid">
              {COMPANY_TYPES.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  className={`pill-choice${answers.company_type === opt ? " is-active" : ""}`}
                  onClick={() => {
                    updateAnswer("company_type", opt);
                    setTimeout(advance, 140);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : null}

          {currentKey === "currently_buying" ? (
            <div className="pill-grid pill-grid-2">
              {(["Yes", "No"] as CurrentlyBuying[]).map((opt) => (
                <button
                  type="button"
                  key={opt}
                  className={`pill-choice${answers.currently_buying === opt ? " is-active" : ""}`}
                  onClick={() => {
                    updateAnswer("currently_buying", opt);
                    setTimeout(advance, 140);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : null}

          {currentKey === "reps" ? (
            <div className="pill-grid">
              {REPS_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  className={`pill-choice${answers.reps === opt ? " is-active" : ""}`}
                  onClick={() => {
                    updateAnswer("reps", opt);
                    setTimeout(advance, 140);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : null}

          {currentKey === "daily_capacity" ? (
            <div className="pill-grid">
              {CAPACITY_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  className={`pill-choice${answers.daily_capacity === opt ? " is-active" : ""}`}
                  onClick={() => {
                    updateAnswer("daily_capacity", opt);
                    setTimeout(advance, 140);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : null}

          {currentKey === "min_debt" ? (
            <div className="pill-grid">
              {MIN_DEBT_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  className={`pill-choice${answers.min_debt === opt ? " is-active" : ""}`}
                  onClick={() => {
                    updateAnswer("min_debt", opt);
                    setTimeout(advance, 140);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : null}

          {currentKey === "states" ? (
            <>
              <div className="states-controls">
                <div className="states-count">
                  {answers.states.length === 0
                    ? "None selected"
                    : `${answers.states.length} selected`}
                </div>
                <div className="states-actions">
                  {canSelectAllStates ? (
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() =>
                        setAnswers((p) => ({
                          ...p,
                          states: US_STATES.map((s) => s.abbr),
                        }))
                      }
                    >
                      Select all
                    </button>
                  ) : null}
                  {answers.states.length > 0 ? (
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => setAnswers((p) => ({ ...p, states: [] }))}
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="states-grid" role="group" aria-label="US states">
                {US_STATES.map((s) => {
                  const on = answers.states.includes(s.abbr);
                  return (
                    <button
                      type="button"
                      key={s.abbr}
                      className={`state-pill${on ? " is-active" : ""}`}
                      onClick={() => toggleState(s.abbr)}
                      aria-pressed={on}
                      title={s.name}
                    >
                      {s.abbr}
                    </button>
                  );
                })}
              </div>
            </>
          ) : null}

          {currentKey === "contact" ? (
            <div className="contact-grid">
              <div className="field">
                <label htmlFor="apply-name">Your name</label>
                <input
                  id="apply-name"
                  type="text"
                  autoComplete="name"
                  value={answers.name}
                  onChange={(e) => updateAnswer("name", e.target.value)}
                  placeholder="Jane Buyer"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="apply-company">Company</label>
                <input
                  id="apply-company"
                  type="text"
                  autoComplete="organization"
                  value={answers.company}
                  onChange={(e) => updateAnswer("company", e.target.value)}
                  placeholder="Acme Debt Relief"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="apply-email">Work email</label>
                <input
                  id="apply-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={answers.email}
                  onChange={(e) => updateAnswer("email", e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="apply-phone">Phone</label>
                <input
                  id="apply-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={answers.phone}
                  onChange={(e) => updateAnswer("phone", formatPhone(e.target.value))}
                  placeholder="(555) 555-0100"
                  required
                />
              </div>
              <div className="contact-consent">
                By submitting, you consent to be contacted by Simple Media Network about the
                Partner Program.
              </div>
            </div>
          ) : null}
        </div>

        {errorMessage ? (
          <div className="wizard-error" role="alert">
            {errorMessage}
          </div>
        ) : null}

        <div className="wizard-footer">
          <button
            type="button"
            className="pill-ghost"
            onClick={goBack}
            disabled={stepIndex === 0 || submitting}
          >
            ← Back
          </button>
          <button
            type="button"
            className="pill"
            onClick={goNext}
            disabled={!stepValid || submitting}
          >
            {submitting
              ? "Sending…"
              : currentKey === "contact"
                ? "Check partner availability →"
                : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
