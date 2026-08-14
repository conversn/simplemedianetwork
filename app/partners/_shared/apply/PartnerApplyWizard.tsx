"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  EMAIL_RE,
  US_STATES,
  extractDigits,
  formatPhone,
  type WizardConfig,
  type WizardStep,
} from "./WizardConfig";

type AnswerValue = string | string[];
type Answers = Record<string, AnswerValue> & {
  __name: string;
  __company: string;
  __email: string;
  __phone: string;
};

const EMPTY_CONTACT = { __name: "", __company: "", __email: "", __phone: "" };

function isStep<K extends WizardStep["kind"]>(
  step: WizardStep,
  kind: K,
): step is Extract<WizardStep, { kind: K }> {
  return step.kind === kind;
}

function isContactValid(a: Answers): boolean {
  return (
    a.__name.trim().length > 1 &&
    a.__company.trim().length > 1 &&
    EMAIL_RE.test(a.__email.trim()) &&
    extractDigits(a.__phone).length === 10
  );
}

function stepValid(step: WizardStep, answers: Answers): boolean {
  const raw = answers[step.key];
  switch (step.kind) {
    case "single-choice":
      return typeof raw === "string" && raw.length > 0;
    case "multi-choice":
      return Array.isArray(raw) && raw.length >= (step.minRequired ?? 1);
    case "states":
      return Array.isArray(raw) && raw.length > 0;
    case "contact":
      return isContactValid(answers);
    default:
      return false;
  }
}

export function PartnerApplyWizard({ config }: { config: WizardConfig }) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ ...EMPTY_CONTACT });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/partners/inquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event_only: true,
        event_name: "partner_apply_start",
        program: config.program,
        vertical: config.vertical,
        site_key: "simplemedianetwork.com",
        page: config.page,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
    }).catch(() => undefined);
  }, [config.program, config.vertical, config.page]);

  const totalSteps = config.steps.length;
  const currentStep = config.steps[stepIndex];
  const progressPercent = Math.round(((stepIndex + 1) / totalSteps) * 100);

  const valid = useMemo(
    () => stepValid(currentStep, answers),
    [currentStep, answers],
  );

  function setValue(key: string, value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleMulti(key: string, option: string) {
    setAnswers((prev) => {
      const cur = Array.isArray(prev[key]) ? (prev[key] as string[]) : [];
      return {
        ...prev,
        [key]: cur.includes(option)
          ? cur.filter((x) => x !== option)
          : [...cur, option],
      };
    });
  }

  function goNext() {
    if (!valid) return;
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
      const answerFields: Record<string, string> = {};
      for (const step of config.steps) {
        if (step.kind === "contact") continue;
        const raw = answers[step.key];
        if (raw === undefined) continue;
        answerFields[step.key] = Array.isArray(raw) ? raw.join(", ") : raw;
      }

      const res = await fetch("/api/partners/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          program: config.program,
          vertical: config.vertical,
          site_key: "simplemedianetwork.com",
          page: config.page,
          name: answers.__name.trim(),
          company: answers.__company.trim(),
          email: answers.__email.trim(),
          phone: answers.__phone,
          // Well-known fields the API already understands:
          company_type: answerFields.company_type,
          buying_format: answerFields.buying_format,
          daily_capacity: answerFields.daily_capacity,
          currently_buying: answerFields.currently_buying,
          states: answerFields.states,
          notes: buildNotes(config, answerFields),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Submission failed (${res.status})`);
      }
      router.push(config.thankYouHref);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  const finalCta = config.finalCta ?? "Check partner availability →";
  const isLastStep = stepIndex === totalSteps - 1;

  return (
    <div className="wizard">
      <div
        className="wizard-progress"
        aria-label={`Step ${stepIndex + 1} of ${totalSteps}`}
      >
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
        <div className="eyebrow">{currentStep.eyebrow}</div>
        <h2 className="wizard-heading">{currentStep.heading}</h2>
        {currentStep.helper ? (
          <p className="wizard-helper">{currentStep.helper}</p>
        ) : null}

        <div className="wizard-body">
          {isStep(currentStep, "single-choice") ? (
            <div
              className={`pill-grid${currentStep.layout === "two-column" ? " pill-grid-2" : ""}`}
            >
              {currentStep.options.map((opt) => {
                const active = answers[currentStep.key] === opt;
                return (
                  <button
                    type="button"
                    key={opt}
                    className={`pill-choice${active ? " is-active" : ""}`}
                    onClick={() => {
                      setValue(currentStep.key, opt);
                      if (currentStep.autoAdvance !== false) {
                        setTimeout(advance, 140);
                      }
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : null}

          {isStep(currentStep, "multi-choice") ? (
            <div className="pill-grid">
              {currentStep.options.map((opt) => {
                const cur = Array.isArray(answers[currentStep.key])
                  ? (answers[currentStep.key] as string[])
                  : [];
                const active = cur.includes(opt);
                return (
                  <button
                    type="button"
                    key={opt}
                    className={`pill-choice${active ? " is-active" : ""}`}
                    aria-pressed={active}
                    onClick={() => toggleMulti(currentStep.key, opt)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : null}

          {isStep(currentStep, "states") ? (
            <StatesGrid
              value={
                Array.isArray(answers[currentStep.key])
                  ? (answers[currentStep.key] as string[])
                  : []
              }
              onChange={(next) => setValue(currentStep.key, next)}
            />
          ) : null}

          {isStep(currentStep, "contact") ? (
            <ContactFields
              value={{
                name: answers.__name,
                company: answers.__company,
                email: answers.__email,
                phone: answers.__phone,
              }}
              onChange={(field, value) => {
                if (field === "phone") {
                  setValue(`__${field}`, formatPhone(value));
                } else {
                  setValue(`__${field}`, value);
                }
              }}
            />
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
            disabled={!valid || submitting}
          >
            {submitting ? "Sending…" : isLastStep ? finalCta : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function buildNotes(
  config: WizardConfig,
  fields: Record<string, string>,
): string {
  const lines: string[] = [];
  for (const step of config.steps) {
    if (step.kind === "contact" || step.kind === "states") continue;
    const val = fields[step.key];
    if (val) lines.push(`${step.heading} — ${val}`);
  }
  return lines.join("\n");
}

function StatesGrid({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const canSelectAll = value.length !== US_STATES.length;
  return (
    <>
      <div className="states-controls">
        <div className="states-count">
          {value.length === 0 ? "None selected" : `${value.length} selected`}
        </div>
        <div className="states-actions">
          {canSelectAll ? (
            <button
              type="button"
              className="text-btn"
              onClick={() => onChange(US_STATES.map((s) => s.abbr))}
            >
              Select all
            </button>
          ) : null}
          {value.length > 0 ? (
            <button
              type="button"
              className="text-btn"
              onClick={() => onChange([])}
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>
      <div className="states-grid" role="group" aria-label="US states">
        {US_STATES.map((s) => {
          const on = value.includes(s.abbr);
          return (
            <button
              type="button"
              key={s.abbr}
              className={`state-pill${on ? " is-active" : ""}`}
              onClick={() =>
                onChange(on ? value.filter((x) => x !== s.abbr) : [...value, s.abbr])
              }
              aria-pressed={on}
              title={s.name}
            >
              {s.abbr}
            </button>
          );
        })}
      </div>
    </>
  );
}

type ContactValue = { name: string; company: string; email: string; phone: string };
type ContactField = keyof ContactValue;

function ContactFields({
  value,
  onChange,
}: {
  value: ContactValue;
  onChange: (field: ContactField, value: string) => void;
}) {
  return (
    <div className="contact-grid">
      <div className="field">
        <label htmlFor="apply-name">Your name</label>
        <input
          id="apply-name"
          type="text"
          autoComplete="name"
          value={value.name}
          onChange={(e) => onChange("name", e.target.value)}
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
          value={value.company}
          onChange={(e) => onChange("company", e.target.value)}
          placeholder="Acme Partners"
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
          value={value.email}
          onChange={(e) => onChange("email", e.target.value)}
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
          value={value.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="(555) 555-0100"
          required
        />
      </div>
      <div className="contact-consent">
        By submitting, you consent to be contacted by Simple Media Network about the
        Partner Program.
      </div>
    </div>
  );
}
