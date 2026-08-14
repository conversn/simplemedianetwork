import type { Metadata } from "next";

import { PartnerShell, PartnerNav, PartnerFooter } from "./_shared/PartnerShell";
import { PartnerPageView } from "./_shared/PartnerPageView";
import { PropertyRow } from "./_shared/PropertyRow";
import { UniversalPartnerForm } from "./_shared/UniversalPartnerForm";

export const metadata: Metadata = {
  title: "SMN Partner Program — Buy Consumer Demand Direct from the Publisher",
  description:
    "Simple Media Network owns consumer brands across money, retirement, legal, family and business. We generate demand directly and work with companies that can serve it. Debt · retirement & annuity · life insurance · mortgage & home equity · legal.",
  robots: { index: true, follow: true },
};

type BuyCard = {
  slug: string;
  eyebrow: string;
  title: string;
  source: string;
  body: string;
  criteria: string;
  cta: { href: string; label: string };
};

const BUY_CARDS: BuyCard[] = [
  {
    slug: "debt-relief",
    eyebrow: "Debt Relief",
    title: "Consumers exploring solutions for unsecured debt.",
    source: "Source · MoneySimple",
    body: "For debt-settlement and consumer debt-resolution teams with active intake.",
    criteria: "Criteria: debt amount · geography · debt type · intent.",
    cta: { href: "/partners/debt-relief", label: "See the debt-relief program →" },
  },
  {
    slug: "retirement",
    eyebrow: "Retirement & Annuity",
    title: "Retirement-stage consumers exploring income and protection.",
    source: "Source · SeniorSimple + RetirementRescue",
    body: "For FMOs, IMOs, and agencies feeding a producing downline.",
    criteria: "Criteria: age · assets · geography · product interest.",
    cta: { href: "/partners/retirement", label: "See the retirement program →" },
  },
  {
    slug: "life-insurance",
    eyebrow: "Life Insurance",
    title: "Parents and young families evaluating protection.",
    source: "Source · ParentSimple",
    body: "For life agencies and IMOs with producing agents.",
    criteria: "Criteria: age · coverage · health · product interest.",
    cta: {
      href: "/partners/life-insurance",
      label: "See the life-insurance program →",
    },
  },
  {
    slug: "home-equity",
    eyebrow: "Mortgage & Home Equity",
    title: "Homeowners exploring mortgage, refinance, and HELOC.",
    source: "Source · RateRoots",
    body: "For lenders with an active loan-officer floor.",
    criteria: "Criteria: loan amount · equity · credit · geography.",
    cta: {
      href: "/partners/home-equity",
      label: "See the mortgage program →",
    },
  },
  {
    slug: "legal",
    eyebrow: "Legal",
    title: "Injured people after qualifying accidents (MVA + premises).",
    source: "Source · LegalSimple",
    body: "For PI firms with an active intake team. Mass tort not offered.",
    criteria: "Criteria: injury type · statute · representation · geography.",
    cta: { href: "/partners/legal", label: "See the legal program →" },
  },
];

export default function PartnersHubPage() {
  return (
    <PartnerShell>
      <PartnerPageView program="partners-hub" page="/partners" />

      <PartnerNav ctaHref="#apply" ctaLabel="Explore partner programs" />

      {/* Section 2 — Hero */}
      <section>
        <div className="wrap">
          <div className="eyebrow">For lead buyers &amp; growth partners</div>
          <h1 style={{ margin: "18px 0 22px", maxWidth: "22ch" }}>
            Work directly with <span className="accent">the source</span> of the demand.
          </h1>
          <p className="lede">
            Simple Media Network owns and operates consumer brands across money,
            retirement, legal, family and business. We generate consumer demand directly
            through our properties, qualify it to partner criteria, and work with
            companies that have the sales capacity to serve it. No layers between you and
            the source.
          </p>
          <div style={{ marginTop: "26px" }}>
            <a className="pill" href="#apply">
              See available partner programs
            </a>
          </div>
          <div className="micro">
            Tell us what you buy, where, and how much volume you can handle.
          </div>
        </div>
      </section>

      {/* Section 3 — Property row */}
      <div className="band-wrap">
        <div className="band">
          <div className="eyebrow">Where the consumers come from</div>
          <h2 style={{ margin: "12px 0 8px", maxWidth: "24ch" }}>
            Consumer demand starts here.
          </h2>
          <p className="muted" style={{ maxWidth: "62ch" }}>
            A lot can happen to a lead before it reaches your sales team. We built SMN
            differently. Our consumers originate across owned media properties designed
            around specific decisions.
          </p>
          <PropertyRow />
          <p style={{ marginTop: "26px", maxWidth: "60ch" }}>
            We own the consumer experience from acquisition through qualification.
          </p>
        </div>
      </div>

      {/* Section 4 — What are you buying? */}
      <section>
        <div className="wrap">
          <div className="eyebrow">Choose your vertical</div>
          <h2 style={{ margin: "12px 0 12px", maxWidth: "22ch" }}>
            What are you buying?
          </h2>
          <p className="muted" style={{ maxWidth: "62ch" }}>
            Each vertical routes to its own program page with real deliverable
            qualification, or start with the universal request form below.
          </p>
          <div className="buycards">
            {BUY_CARDS.map((c) => (
              <a
                key={c.slug}
                href={c.cta.href}
                className="buycard"
                style={{ textDecoration: "none" }}
              >
                <div className="eyebrow">{c.eyebrow}</div>
                <div className="source">{c.source}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <div className="crit">{c.criteria}</div>
                <span className="cta">{c.cta.label}</span>
              </a>
            ))}
            <a href="#apply" className="buycard other" style={{ textDecoration: "none" }}>
              <div className="eyebrow">Other verticals</div>
              <div className="source">Source · SMN network</div>
              <h3>Tell us what you buy.</h3>
              <p>
                Home services, business finance, or something else across the SMN
                network — the universal form routes it to the right team.
              </p>
              <span className="cta">Open the universal form →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Section 5 — Not all demand is equal (gold rule under heading) + pillars */}
      <div className="band-wrap">
        <div className="band">
          <div className="eyebrow">Why the source matters</div>
          <h2 style={{ margin: "12px 0 0", maxWidth: "24ch" }}>
            Not all demand is equal.
          </h2>
          <hr className="goldrule" />
          <p className="muted" style={{ marginTop: "20px", maxWidth: "62ch" }}>
            The question isn&rsquo;t just &ldquo;how much does the lead cost?&rdquo;
            It&rsquo;s: where did the consumer come from? what did they ask for? how were
            they qualified? how quickly did they reach my team? can I control what I
            receive?
          </p>
          <div className="pillars">
            <div className="pillar">
              <div className="n">01</div>
              <h3>Direct source</h3>
              <p>You buy from the publisher generating the demand, not a reseller.</p>
            </div>
            <div className="pillar">
              <div className="n">02</div>
              <h3>Your criteria</h3>
              <p>Qualification is set to what your team can actually work.</p>
            </div>
            <div className="pillar">
              <div className="n">03</div>
              <h3>Controlled volume</h3>
              <p>Start at a daily cap. Scale when the economics hold.</p>
            </div>
            <div className="pillar">
              <div className="n">04</div>
              <h3>Real-time delivery</h3>
              <p>Consumers reach your team while intent is fresh.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 6 — Built around your economics */}
      <section>
        <div className="wrap">
          <div className="eyebrow">Fit</div>
          <h2 style={{ margin: "12px 0 12px", maxWidth: "28ch" }}>
            Built around your economics.
          </h2>
          <p className="muted" style={{ maxWidth: "62ch" }}>
            We&rsquo;re not looking for the most buyers. We&rsquo;re looking for partners
            who know their numbers and can work the demand.
          </p>
          <ul className="qual">
            <li>Active sales / intake team</li>
            <li>Defined qualification criteria</li>
            <li>Fast follow-up</li>
            <li>Known conversion economics</li>
            <li>Capacity for consistent daily volume</li>
            <li>Wants another scalable acquisition source</li>
          </ul>
        </div>
      </section>

      {/* Section 7 — StepTimeline */}
      <div className="band-wrap">
        <div className="band">
          <div className="eyebrow">How partnerships work</div>
          <h2 style={{ margin: "12px 0 8px", maxWidth: "24ch" }}>
            If it works, we scale it.
          </h2>
          <div className="steps">
            <div className="step">
              <div className="n">01</div>
              <h3>Define</h3>
              <p>States, criteria, volume, delivery.</p>
            </div>
            <div className="step">
              <div className="n">02</div>
              <h3>Launch</h3>
              <p>Controlled allocation at a daily cap.</p>
            </div>
            <div className="step">
              <div className="n">03</div>
              <h3>Measure</h3>
              <p>Work the flow, review the numbers.</p>
            </div>
            <div className="step">
              <div className="n">04</div>
              <h3>Scale</h3>
              <p>If the economics hold, increase volume or funding.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 8 — CallReady infra band (evergreen-soft, below commercial) */}
      <section>
        <div className="band-wrap">
          <div className="band-soft">
            <div className="eyebrow">The infrastructure behind the partnership</div>
            <h2 style={{ margin: "12px 0 16px", maxWidth: "26ch" }}>
              Powered by <span className="accent">CallReady</span>.
            </h2>
            <div className="grid g4" style={{ marginTop: "8px" }}>
              <div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "20px" }}>
                  Qualification
                </h3>
                <p className="muted">Consumer intent captured and validated in-flow.</p>
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "20px" }}>Routing</h3>
                <p className="muted">
                  Right consumer to the right partner at the right moment.
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "20px" }}>
                  Activation
                </h3>
                <p className="muted">
                  Delivered to your CRM, dialer, or intake in real time.
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "20px" }}>
                  Measurement
                </h3>
                <p className="muted">Attribution back to the source that produced it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9 — Final CTA + universal form */}
      <div className="band-wrap" id="apply">
        <div className="band cta-band">
          <div className="eyebrow">Explore a partnership</div>
          <h2 style={{ margin: "12px 0 12px", maxWidth: "28ch" }}>
            Tell us what you buy.
          </h2>
          <p className="muted cta-lede">
            A short partner request — vertical, capacity, states, contact. We&rsquo;ll
            follow up within one business day to discuss availability and fit.
          </p>
          <UniversalPartnerForm defaultVertical="debt-relief" program="partners-hub" />
        </div>
      </div>

      <PartnerFooter />
    </PartnerShell>
  );
}
