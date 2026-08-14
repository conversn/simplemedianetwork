export type PropertyKey =
  | "moneysimple"
  | "seniorsimple"
  | "retirementrescue"
  | "legalsimple"
  | "rateroots"
  | "smallbizsimple"
  | "parentsimple";

export type PropertyMeta = {
  key: PropertyKey;
  name: string;
  tag: string;
  logo?: string;
};

export const PROPERTIES: PropertyMeta[] = [
  {
    key: "moneysimple",
    name: "MoneySimple",
    tag: "Debt · credit · personal finance",
  },
  {
    key: "seniorsimple",
    name: "SeniorSimple",
    tag: "Retirement · senior decisions",
    logo: "/media/assets/network/seniorsimple-logo.png",
  },
  {
    key: "retirementrescue",
    name: "RetirementRescue",
    tag: "Retirement income · planning",
  },
  {
    key: "legalsimple",
    name: "LegalSimple",
    tag: "Consumer legal",
    logo: "/media/assets/network/legalsimple-logo.png",
  },
  {
    key: "rateroots",
    name: "RateRoots",
    tag: "Mortgage · home equity",
    logo: "/media/assets/network/rateroots-logo.png",
  },
  {
    key: "smallbizsimple",
    name: "SmallBizSimple",
    tag: "Business finance · growth",
  },
  {
    key: "parentsimple",
    name: "ParentSimple",
    tag: "Family · parenting",
    logo: "/media/assets/network/parentsimple-logo.png",
  },
];

export const VERTICALS = {
  "debt-relief": {
    slug: "debt-relief",
    label: "Debt Relief",
    programName: "Debt-relief consumer leads",
    ghlTag: "debt-relief",
    sourceKey: "moneysimple" as PropertyKey,
  },
  retirement: {
    slug: "retirement",
    label: "Retirement & Annuity",
    programName: "Retirement & annuity consumer leads",
    ghlTag: "retirement",
    sourceKey: "seniorsimple" as PropertyKey,
  },
  "life-insurance": {
    slug: "life-insurance",
    label: "Life Insurance",
    programName: "Family life-insurance consumer leads",
    ghlTag: "life-insurance",
    sourceKey: "parentsimple" as PropertyKey,
  },
  "home-equity": {
    slug: "home-equity",
    label: "Mortgage & Home Equity",
    programName: "Homeowner mortgage & home-equity leads",
    ghlTag: "home-equity",
    sourceKey: "rateroots" as PropertyKey,
  },
  legal: {
    slug: "legal",
    label: "Legal (MVA + Premises)",
    programName: "Auto-accident & premises-injury leads",
    ghlTag: "legal",
    sourceKey: "legalsimple" as PropertyKey,
  },
} as const;

export type VerticalSlug = keyof typeof VERTICALS;

export const VERTICAL_ORDER: VerticalSlug[] = [
  "debt-relief",
  "retirement",
  "life-insurance",
  "home-equity",
  "legal",
];
