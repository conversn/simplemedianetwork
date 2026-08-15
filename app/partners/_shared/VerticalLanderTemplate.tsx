import { PartnerNav } from "../../_ds/kits/partners/PartnerNav";
import { Band } from "../../_ds/components/core/Band";
import { SectionHeading } from "../../_ds/components/core/SectionHeading";
import { Button } from "../../_ds/components/core/Button";
import { Chip } from "../../_ds/components/core/Chip";
import { Icon } from "../../_ds/components/core/Icon";
import { MetricRow } from "../../_ds/components/marketing/MetricRow";
import { FeatureCard } from "../../_ds/components/marketing/FeatureCard";
import { StepTimeline } from "../../_ds/components/marketing/StepTimeline";
import { FunnelFlow, type FunnelStep } from "../../_ds/components/marketing/FunnelFlow";
import { PropertyTile } from "../../_ds/components/marketing/PropertyTile";
import { Footer } from "../../_ds/components/navigation/Footer";
import { PartnerPageView } from "./PartnerPageView";
import { PROPERTIES, type VerticalSlug } from "./properties";

export type VerticalLanderConfig = {
  slug: VerticalSlug;
  program: string;
  leadNoun: string;
  page: string;
  hero: {
    eyebrow: string;
    headlineLead: string;
    headlineItalic: string;
    headlineTrail?: string;
    lede: string;
    micro: string;
  };
  sourceProperty: {
    key: (typeof PROPERTIES)[number]["key"];
    label: string;
    consumerLine: string;
    flowLine: string;
    sourceHeading: string;
    sourceBody: string;
    sourceFlow: string;
  };
  program_block: {
    heading: string;
    body: string;
    qualification: string[];
  };
  moneyChain: string;
  painkiller: string;
  fit: string[];
  formHeading: string;
  formBody: string;
  compliance?: string;
  /** Optional funnel captures — real screenshots of the consumer flow. When absent, a labeled placeholder plate renders in the funnel band. */
  funnelSteps?: FunnelStep[];
  /** Optional analytics variant tag (A/B) passed to PartnerPageView. */
  heroVariant?: string;
};

// Invariant sections shared across every vertical lander.
const BLIND: [string, string, string][] = [
  ["fingerprint-pattern", "Who", "Who actually generated the consumer."],
  ["eye", "What", "What they saw before they submitted."],
  ["layers", "How many", "How many layers the lead passed through."],
  ["toggle-right", "Control", "Whether the source can change qualification when you need it."],
];

const CONTROL: [string, string, string][] = [
  ["map", "States", "Choose the markets you serve."],
  ["sliders-horizontal", "Criteria", "Define what your team can actually work."],
  ["gauge", "Daily volume", "Start at a manageable cap."],
  ["wallet", "Spend", "Pre-funded balance with controlled delivery."],
];

const MODEL: [string, string, string][] = [
  ["user-x", "No agency", "You don't hire us to manage anything."],
  ["megaphone", "No ad budget to manage", "We take the media risk."],
  ["calendar-x", "No monthly retainer", "You pay the agreed CPL for the agreed lead product."],
];

function findPropertyLogo(key: string): string | undefined {
  const p = PROPERTIES.find((x) => x.key === key);
  return p?.logo;
}

// Map property key to the vendored DS logo path (preferred over legacy _shared PROPERTIES.logo,
// which may point to /media/... assets we're phasing out).
const DS_PROPERTY_LOGOS: Record<string, string> = {
  moneysimple: "/ds/logos/properties/moneysimple.png",
  seniorsimple: "/ds/logos/properties/seniorsimple.png",
  retirementrescue: "/ds/logos/properties/retirementrescue.png",
  parentsimple: "/ds/logos/properties/parentsimple.png",
  legalsimple: "/ds/logos/properties/legalsimple-icon.png",
  rateroots: "/ds/logos/properties/rateroots.png",
  smallbizsimple: "/ds/logos/properties/smallbizsimple.png",
};

const PROPERTY_HREF: Record<string, string> = {
  moneysimple: "https://moneysimple.org",
  seniorsimple: "https://seniorsimple.org",
  retirementrescue: "https://retirementrescue.net",
  parentsimple: "https://parentsimple.org",
  legalsimple: "https://legalsimple.org",
  rateroots: "https://rateroots.com",
  smallbizsimple: "https://smallbizsimple.org",
};

const PROPERTY_FOCUS: Record<string, string> = {
  moneysimple: "Debt, credit, borrowing, and personal finance",
  seniorsimple: "Retirement, annuity, life, and Medicare decisions",
  retirementrescue: "Retirement income and retirement planning",
  parentsimple: "Parenting, family, and household decisions",
  legalsimple: "Consumer legal decisions (MVA + premises)",
  rateroots: "Mortgage, refinance, HELOC, and cash-out",
  smallbizsimple: "Small business finance and growth",
};

function FunnelPlaceholder({ leadNoun }: { leadNoun: string }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: "var(--sp-3)", padding: "var(--sp-16) var(--sp-8)",
      background: "var(--white)", borderRadius: "var(--radius-image)",
      border: "1px dashed var(--border-strong)",
      boxShadow: "var(--shadow-sm)",
    }}>
      <span className="smn-eyebrow" style={{ color: "var(--text-subtle)" }}>Captures pending</span>
      <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", color: "var(--text-strong)", textAlign: "center", maxWidth: 520 }}>
        Live captures of the {leadNoun.split(" ")[0]} funnel are being staged.
      </p>
      <p style={{ margin: 0, fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", textAlign: "center", maxWidth: 520 }}>
        Real screenshots of the consumer flow will publish here as this vertical scales.
      </p>
    </div>
  );
}

export function VerticalLanderTemplate({ config }: { config: VerticalLanderConfig }) {
  const {
    slug, program, hero, sourceProperty, program_block,
    moneyChain, painkiller, fit, formHeading, formBody,
    compliance, page, funnelSteps, heroVariant,
  } = config;

  const applyHref = `/partners/${slug}/apply`;
  const propertyLogo = DS_PROPERTY_LOGOS[sourceProperty.key] || findPropertyLogo(sourceProperty.key);
  const propertyHref = PROPERTY_HREF[sourceProperty.key];
  const propertyFocus = PROPERTY_FOCUS[sourceProperty.key] || sourceProperty.label;

  return (
    <>
      <PartnerPageView program={program} page={page} heroVariant={heroVariant ?? "B"} vertical={slug} />
      <PartnerNav ctaHref={applyHref} ctaLabel="Check availability" />

      {/* Hero */}
      <section style={{ padding: "88px 0 72px", textAlign: "center" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <span className="smn-eyebrow" style={{ display: "block", marginBottom: "var(--sp-5)" }}>{hero.eyebrow}</span>
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(40px,5.2vw,66px)",
            fontWeight: "var(--fw-regular)", lineHeight: "var(--lh-hero)", letterSpacing: "var(--ls-hero)",
            color: "var(--text-strong)", maxWidth: 900, margin: "0 auto var(--sp-6)",
          }}>
            {hero.headlineLead}{" "}<em>{hero.headlineItalic}</em>{hero.headlineTrail ? ` ${hero.headlineTrail}` : ""}
          </h1>
          <p style={{ fontSize: "var(--fs-body-lg)", color: "var(--text-muted)", maxWidth: 640, margin: "0 auto var(--sp-6)" }}>
            {hero.lede}
          </p>
          <div style={{ display: "flex", gap: "var(--sp-2)", justifyContent: "center", flexWrap: "wrap", marginBottom: "var(--sp-8)" }}>
            <Chip tone="accent">Choose your states</Chip>
            <Chip tone="accent">Set your daily volume</Chip>
            <Chip tone="accent">Fixed cost per lead</Chip>
          </div>
          <Button size="lg" href={applyHref}>Check availability</Button>
          <p style={{ margin: "var(--sp-4) 0 var(--sp-16)", fontSize: "var(--fs-caption)", color: "var(--text-subtle)" }}>
            {hero.micro}
          </p>
          <MetricRow align="center" style={{ maxWidth: 760, margin: "0 auto" }} metrics={[
            { value: "Your states", label: "Markets you serve" },
            { value: "Your criteria", label: "What reps can work" },
            { value: "Your cap", label: "Daily volume" },
          ]} />
        </div>
      </section>

      {/* Stop buying blind — invariant */}
      <section style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow="The problem you already know"
            title={<>Stop buying <em>blind</em>.</>}
            lede={`If you're already buying ${config.leadNoun}, you can see the CPL. What you often can't see is everything that matters.`} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "var(--sp-4)", marginTop: "var(--sp-16)" }}>
            {BLIND.map(([ic, t, b]) => <FeatureCard key={t} icon={ic} title={t} body={b} />)}
          </div>
        </div>
      </section>

      {/* We generate the demand ourselves + funnel */}
      <section style={{ padding: "0 var(--gutter) var(--section-y)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading rule eyebrow="Where it comes from"
            title={<>We generate the demand <em>ourselves</em>.</>}
            lede={sourceProperty.consumerLine} />
          <div style={{ display: "flex", gap: "var(--sp-2)", justifyContent: "center", flexWrap: "wrap", marginTop: "var(--sp-6)" }}>
            {["Ad", "Consumer experience", "Qualification", "Delivery"].map((s) => <Chip key={s}>{s}</Chip>)}
          </div>
        </div>
      </section>
      <div style={{ padding: "0 var(--gutter)" }}>
        <Band tone="radiant" padding="var(--sp-16) var(--sp-10) var(--sp-12)" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow="The funnel"
            title={<>The experience a consumer <em>actually walks through</em>.</>}
            style={{ marginBottom: "var(--sp-16)" }} />
          {funnelSteps && funnelSteps.length ? (
            <>
              <FunnelFlow steps={funnelSteps} />
              <p style={{ margin: "var(--sp-12) 0 0", fontSize: "var(--fs-caption)", color: "var(--text-subtle)", textAlign: "center" }}>
                Live captures from the {sourceProperty.label} funnel. Hover a screen to bring it forward.
              </p>
            </>
          ) : (
            <FunnelPlaceholder leadNoun={config.leadNoun} />
          )}
        </Band>
      </div>

      {/* Program block */}
      <div style={{ padding: "var(--section-y) var(--gutter) 0" }}>
        <Band tone="sand" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow="The program"
            title={<>{program_block.heading}</>}
            rule
            lede={program_block.body} />
          <span className="smn-eyebrow" style={{ display: "block", marginTop: "var(--sp-10)", marginBottom: "var(--sp-4)" }}>Qualification may include</span>
          <ul style={{ margin: "0 0 var(--sp-12)", padding: 0, listStyle: "none", columns: "2", columnGap: "var(--sp-10)", maxWidth: 720 }}>
            {program_block.qualification.map((q) => (
              <li key={q} style={{
                padding: "9px 0 9px 26px", position: "relative",
                fontSize: "var(--fs-body-sm)", color: "var(--text-body)",
                breakInside: "avoid",
              }}>
                <span style={{
                  position: "absolute", left: 0, top: 14, width: 9, height: 9,
                  border: "1.5px solid var(--evergreen)", borderRadius: "50%",
                }} />{q}
              </li>
            ))}
          </ul>
          <span className="smn-eyebrow" style={{ display: "block", marginBottom: "var(--sp-4)" }}>You control</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "var(--sp-4)" }}>
            {CONTROL.map(([ic, t, b]) => <FeatureCard key={t} icon={ic} title={t} body={b} tone="onSand" />)}
          </div>
        </Band>
      </div>

      {/* Commercial model + right-question + steps */}
      <section style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading eyebrow="The commercial model"
            title={<>We fund the acquisition. <em>You pay for leads.</em></>} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "var(--sp-4)", margin: "var(--sp-12) 0 var(--section-y)" }}>
            {MODEL.map(([ic, t, b]) => <FeatureCard key={t} icon={ic} title={t} body={b} size="lg" />)}
          </div>
          <SectionHeading rule eyebrow="The right question"
            title={<>A better question than <em>&ldquo;what&rsquo;s the cheapest lead?&rdquo;</em></>}
            lede="The cheapest lead is expensive if your reps can't reach or enroll it. What matters is whether the channel works against your sales economics — which is why we start controlled." />
          <StepTimeline style={{ marginTop: "var(--sp-16)" }} steps={[
            { title: "Define the buyer", body: `States, ${config.leadNoun.split(" ")[0]} criteria, delivery, capacity.` },
            { title: "Fund the account", body: "Start with a prepaid allocation." },
            { title: "Launch at a cap", body: "Enough volume to measure without flooding the floor." },
            { title: "Scale what works", body: "If your economics hold, increase the allocation." },
          ]} />
        </div>
      </section>

      {/* Money chain + painkiller */}
      <div style={{ padding: "0 var(--gutter) var(--section-y)" }}>
        <Band tone="sand" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading align="left" eyebrow="Why it works"
            title={<>The chain that <em>produces the outcome</em>.</>} />
          <p style={{ margin: "var(--sp-6) 0 0", maxWidth: "68ch", fontSize: "var(--fs-body)", color: "var(--text-body)" }}>{moneyChain}</p>
          <p style={{ margin: "var(--sp-5) 0 0", maxWidth: "68ch", fontSize: "var(--fs-body)", color: "var(--text-muted)" }}>{painkiller}</p>
        </Band>
      </div>

      {/* Fit + apply CTA */}
      <div style={{ padding: "0 var(--gutter) var(--section-y)" }}>
        <Band tone="soft" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "var(--sp-16)", alignItems: "center" }}>
            <SectionHeading align="left" eyebrow="Fit"
              title={<>Built for teams that can <em>actually work the leads</em>.</>}
              lede="Designed for operators with:" />
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
              {fit.map((t) => (
                <li key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "var(--fs-body-sm)", color: "var(--text-body)" }}>
                  <Icon name="check" size={16} color="var(--evergreen)" />{t}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: "var(--sp-10)" }}>
            <Button size="lg" href={applyHref}>See if there&rsquo;s availability</Button>
          </div>
        </Band>
      </div>

      {/* Source callout — radiant-warm band with PropertyTile */}
      <div style={{ padding: "0 var(--gutter) var(--section-y)" }}>
        <Band tone="radiant-warm" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: "var(--sp-16)", alignItems: "center" }}>
            <SectionHeading align="left" rule eyebrow="The source"
              title={<>{sourceProperty.sourceHeading}</>}
              lede={sourceProperty.sourceBody} />
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-4)" }}>
              <PropertyTile
                name={sourceProperty.label}
                focus={propertyFocus}
                logo={propertyLogo}
                href={propertyHref}
              />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-caption)", color: "var(--evergreen)", letterSpacing: "0.04em" }}>
                {sourceProperty.sourceFlow}
              </div>
            </div>
          </div>
        </Band>
      </div>

      {/* CTA band routes to /apply wizard */}
      <div id="apply" style={{ padding: "0 var(--gutter) var(--section-y)" }}>
        <Band tone="sand" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading align="left" eyebrow="Request current availability"
            title={<>{formHeading}</>}
            lede={formBody} />
          <div style={{ marginTop: "var(--sp-8)", display: "flex", alignItems: "center", gap: "var(--sp-4)", flexWrap: "wrap" }}>
            <Button size="lg" href={applyHref}>Check partner availability</Button>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-caption)", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              A few quick steps · about a minute
            </span>
          </div>
          {compliance && (
            <p style={{ margin: "var(--sp-6) 0 0", maxWidth: "68ch", fontSize: "var(--fs-caption)", color: "var(--text-subtle)" }}>
              {compliance}
            </p>
          )}
        </Band>
      </div>

      <Footer
        note="Editorial decisions are made independently; commercial relationships are disclosed. Where outside expertise is useful, we connect consumers with selected partners."
        poweredBy="Powered by CallReady"
        columns={[
          {
            title: "Partner verticals",
            links: [
              { label: "Debt relief", href: "/partners/debt-relief" },
              { label: "Retirement & annuity", href: "/partners/retirement" },
              { label: "Life insurance", href: "/partners/life-insurance" },
              { label: "Mortgage & home equity", href: "/partners/home-equity" },
              { label: "Legal", href: "/partners/legal" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Home", href: "/" },
              { label: "Partners hub", href: "/partners" },
              { label: "Editorial principles", href: "/editorial-principles" },
              { label: "Disclosure", href: "/disclosure" },
              { label: "Contact", href: "/contact" },
            ],
          },
          {
            title: "Legal",
            links: [{ label: "Privacy", href: "/privacy" }],
          },
        ]}
      />
    </>
  );
}
