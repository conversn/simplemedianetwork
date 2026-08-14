export type WizardStep =
  | {
      key: string;
      kind: "single-choice";
      eyebrow: string;
      heading: string;
      helper?: string;
      options: string[];
      /** width preset for the option grid; default "auto" */
      layout?: "auto" | "two-column";
      /** true = auto-advance to next step ~140ms after selection */
      autoAdvance?: boolean;
    }
  | {
      key: string;
      kind: "multi-choice";
      eyebrow: string;
      heading: string;
      helper?: string;
      options: string[];
      /** minimum selections required to advance */
      minRequired?: number;
    }
  | {
      key: string;
      kind: "states";
      eyebrow: string;
      heading: string;
      helper?: string;
    }
  | {
      key: string;
      kind: "contact";
      eyebrow: string;
      heading: string;
      helper?: string;
    };

export type WizardConfig = {
  /** vertical slug, sent as `vertical` on submit */
  vertical: string;
  /** program key, sent as `program` on submit */
  program: string;
  /** page path for analytics */
  page: string;
  /** back-link on the topbar */
  backHref: string;
  backLabel?: string;
  /** where to send the user after successful submit */
  thankYouHref: string;
  steps: WizardStep[];
  /** final CTA label on the last step */
  finalCta?: string;
};

export const US_STATES: Array<{ abbr: string; name: string }> = [
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

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function extractDigits(v: string): string {
  return v.replace(/[^\d]/g, "");
}

export function formatPhone(v: string): string {
  const digits = extractDigits(v).slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
