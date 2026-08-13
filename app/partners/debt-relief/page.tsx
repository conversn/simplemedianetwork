import type { Metadata } from "next";

import { PageViewTracker } from "./PageViewTracker";
import { PartnerInquiryForm } from "./PartnerInquiryForm";
import { partnerLanderStyles } from "./styles";

export const metadata: Metadata = {
  title: "SMN Partner Program — Debt Relief Consumer Leads",
  description:
    "Buy debt leads directly from the publisher generating them. Simple Media Network partners with established debt-relief companies to deliver qualified consumer opportunities on your criteria.",
  robots: { index: true, follow: true },
};

type HeroVariant = "A" | "B";

function resolveHeroVariant(searchParams?: {
  hero?: string | string[];
}): HeroVariant {
  const raw = searchParams?.hero;
  const query = Array.isArray(raw) ? raw[0] : raw;
  if (query && query.toUpperCase() === "A") return "A";
  if (query && query.toUpperCase() === "B") return "B";
  const env = process.env.SMN_PARTNERS_DEBT_HERO;
  if (env && env.toUpperCase() === "A") return "A";
  return "B";
}

const heroContent: Record<
  HeroVariant,
  { headline: React.ReactNode; lede: string; controls: string }
> = {
  B: {
    headline: (
      <>
        Buy debt leads <span className="accent">directly from the publisher</span>{" "}
        generating them.
      </>
    ),
    lede: "MoneySimple generates the consumer demand. Simple Media Network partners with established debt-relief companies to deliver qualified opportunities on your criteria.",
    controls: "Choose your states. Set your daily volume. Pay a fixed cost per lead.",
  },
  A: {
    headline: (
      <>
        Can your team handle another{" "}
        <span className="accent">25+ debt prospects</span> per day?
      </>
    ),
    lede: "Get direct access to consumer demand generated through MoneySimple, a Simple Media Network property. Choose your states. Set your daily volume. Pay a fixed cost per lead.",
    controls: "For established debt-relief companies with active sales teams.",
  },
};

type PageProps = {
  searchParams?: Promise<{ hero?: string | string[] }>;
};

export default async function PartnerDebtReliefPage({ searchParams }: PageProps) {
  const resolved = (await searchParams) ?? {};
  const heroVariant = resolveHeroVariant(resolved);
  const hero = heroContent[heroVariant];

  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />
      <style dangerouslySetInnerHTML={{ __html: partnerLanderStyles }} />
      <div className="smn-partner">
        <PageViewTracker heroVariant={heroVariant} />

        <nav>
          <div className="wrap">
            <div className="brand">
              Simple Media Network
              <small>Partner Program</small>
            </div>
            <a className="pill" href="#apply">
              Check availability →
            </a>
          </div>
        </nav>

        <section>
          <div className="wrap hero">
            <div>
              <div className="eyebrow">Simple Media Network Partner Program</div>
              <h1>{hero.headline}</h1>
              <p className="lede">{hero.lede}</p>
              <div className="controls">{hero.controls}</div>
              <a className="pill" href="#apply">
                Check availability →
              </a>
              <div className="micro">
                For established debt-relief companies with active sales teams.
              </div>
            </div>
            <div className="shot" aria-label="MoneySimple screenshot">
              <div className="bar">
                <i />
                <i />
                <i />
              </div>
              <div className="ph">
                <span className="ph-tag">Proof asset</span>
                <strong
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "20px",
                    color: "var(--ink)",
                  }}
                >
                  MoneySimple — real screenshot
                </strong>
                <span style={{ fontSize: "13px" }}>
                  A live capture of the owned property that generates the demand goes here.
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="band-wrap">
          <div className="band">
            <div className="eyebrow">The problem you already know</div>
            <h2 style={{ margin: "12px 0 10px", maxWidth: "20ch" }}>Stop buying blind.</h2>
            <p className="muted" style={{ maxWidth: "60ch" }}>
              If you&rsquo;re already buying debt leads, you can see the CPL. What you often
              can&rsquo;t see is everything that matters:
            </p>
            <div className="grid g4" style={{ marginTop: "34px" }}>
              <div className="tile">
                <h3>Who</h3>
                <p>Who actually generated the consumer.</p>
              </div>
              <div className="tile">
                <h3>What</h3>
                <p>What they saw before they submitted.</p>
              </div>
              <div className="tile">
                <h3>How many</h3>
                <p>How many layers the lead passed through.</p>
              </div>
              <div className="tile">
                <h3>Control</h3>
                <p>Whether the source can change qualification when you need it.</p>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div className="wrap g2">
            <div>
              <div className="eyebrow">Where it comes from</div>
              <h2 style={{ margin: "12px 0 16px" }}>We generate the demand ourselves.</h2>
              <p>
                Consumers enter through MoneySimple, our owned personal-finance publication. We
                control the acquisition experience end to end, so you&rsquo;re working closer to the
                source — not buying another anonymous file from somewhere upstream.
              </p>
              <p className="flow" style={{ marginTop: "22px" }}>
                Ad → Consumer experience → Qualification → Delivery
              </p>
            </div>
            <div className="shot" aria-label="MoneySimple funnel screenshot">
              <div className="bar">
                <i />
                <i />
                <i />
              </div>
              <div className="ph">
                <span className="ph-tag">Proof asset</span>
                <strong
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "20px",
                    color: "var(--ink)",
                  }}
                >
                  MoneySimple funnel — real capture
                </strong>
                <span style={{ fontSize: "13px" }}>
                  Show the actual consumer experience, not stock imagery.
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="band-wrap">
          <div className="band">
            <div className="eyebrow">The program</div>
            <h2 style={{ margin: "12px 0 0" }}>Debt-relief consumer leads.</h2>
            <hr className="goldrule" />
            <p className="muted" style={{ marginTop: "20px", maxWidth: "62ch" }}>
              Built for debt-settlement and consumer debt-resolution teams looking for additional
              daily volume. Qualification may include consumer-reported unsecured debt amount,
              accepted debt types, state, contact information, consent, and additional
              buyer-specific criteria.
            </p>
            <div className="klabel" style={{ marginTop: "40px" }}>
              You control
            </div>
            <div className="grid g4">
              <div className="tile">
                <h3>States</h3>
                <p>Choose the markets you serve.</p>
              </div>
              <div className="tile">
                <h3>Criteria</h3>
                <p>Define what your team can actually work.</p>
              </div>
              <div className="tile">
                <h3>Daily volume</h3>
                <p>Start at a manageable cap.</p>
              </div>
              <div className="tile">
                <h3>Spend</h3>
                <p>Pre-funded balance with controlled delivery.</p>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div className="band-wrap">
            <div className="band-soft">
              <div className="eyebrow">The commercial model</div>
              <h2 style={{ margin: "12px 0 16px", maxWidth: "24ch" }}>
                We fund the consumer acquisition. <span className="accent">You pay for leads.</span>
              </h2>
              <div className="grid g3" style={{ marginTop: "12px" }}>
                <div>
                  <p>
                    <strong>No agency.</strong>{" "}
                    <span className="muted">You don&rsquo;t hire us to manage anything.</span>
                  </p>
                </div>
                <div>
                  <p>
                    <strong>No ad budget to manage.</strong>{" "}
                    <span className="muted">We take the media risk.</span>
                  </p>
                </div>
                <div>
                  <p>
                    <strong>No monthly retainer.</strong>{" "}
                    <span className="muted">
                      You pay the agreed CPL for the agreed lead product.
                    </span>
                  </p>
                </div>
              </div>
              <p style={{ marginTop: "26px", fontFamily: "var(--serif)", fontSize: "20px" }}>
                That is the offer.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="eyebrow">The right question</div>
            <h2 style={{ margin: "12px 0 14px", maxWidth: "26ch" }}>
              A better question than &ldquo;what&rsquo;s the cheapest lead?&rdquo;
            </h2>
            <p>
              The cheapest lead is expensive if your reps can&rsquo;t reach or enroll it. What
              matters is whether the channel works against your sales economics. That&rsquo;s why we
              start controlled.
            </p>
            <div className="steps">
              <div className="step">
                <div className="n">01</div>
                <h3>Define the buyer</h3>
                <p>States, debt criteria, delivery, capacity.</p>
              </div>
              <div className="step">
                <div className="n">02</div>
                <h3>Fund the account</h3>
                <p>Start with a prepaid allocation.</p>
              </div>
              <div className="step">
                <div className="n">03</div>
                <h3>Launch at a daily cap</h3>
                <p>Enough volume to measure without flooding the floor.</p>
              </div>
              <div className="step">
                <div className="n">04</div>
                <h3>Scale what works</h3>
                <p>If your economics hold, increase the allocation.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="band-wrap">
          <div className="band">
            <div className="eyebrow">Fit</div>
            <h2 style={{ margin: "12px 0 4px", maxWidth: "26ch" }}>
              Built for teams that can actually work the leads.
            </h2>
            <p className="muted" style={{ maxWidth: "60ch" }}>
              This probably isn&rsquo;t a fit if you&rsquo;re looking for five free leads to see
              what happens. It&rsquo;s designed for operators with:
            </p>
            <ul className="qual">
              <li>An active intake or sales team</li>
              <li>Fast speed-to-lead</li>
              <li>Consistent follow-up</li>
              <li>Defined enrollment economics</li>
              <li>Existing customer-acquisition activity</li>
              <li>Capacity for ongoing daily volume</li>
            </ul>
            <div style={{ marginTop: "34px" }}>
              <a className="pill" href="#apply">
                See if there&rsquo;s availability →
              </a>
            </div>
          </div>
        </div>

        <section>
          <div className="wrap g2">
            <div>
              <div className="eyebrow">The source</div>
              <h2 style={{ margin: "12px 0 16px" }}>
                Where the demand comes from — MoneySimple.
              </h2>
              <p>
                MoneySimple is a consumer personal-finance property from Simple Media Network
                covering debt, credit, borrowing and other major financial decisions. Rather than
                acquiring anonymous third-party lists, we generate demand through our own
                properties — giving partners a direct relationship with the organization
                responsible for the acquisition source.
              </p>
              <p className="flow" style={{ marginTop: "22px" }}>
                MoneySimple → Qualification → Your sales team
              </p>
            </div>
            {/*
              MetricRow intentionally hidden until real MoneySimple figures are supplied.
              Per WO Done#3: "Metrics are real or the MetricRow is hidden — no invented figures."
            */}
          </div>
        </section>

        <div className="band-wrap" id="apply">
          <div className="band">
            <div className="eyebrow">Request current availability</div>
            <h2 style={{ margin: "12px 0 16px", maxWidth: "28ch" }}>
              Your criteria. Your markets. Your volume.
            </h2>
            <p className="muted" style={{ maxWidth: "60ch", marginBottom: "34px" }}>
              Tell us where you buy, what qualifies, and how much your team can handle. We&rsquo;ll
              tell you whether we currently have a program that fits.
            </p>
            <PartnerInquiryForm />
          </div>
        </div>

        <footer>
          <div className="wrap">
            <div>
              <div className="brand" style={{ fontSize: "18px" }}>
                Simple Media Network
              </div>
              <div className="disc">
                Editorial decisions are made independently; commercial relationships are disclosed.
                Where outside expertise is useful, we may connect consumers with selected partners.
              </div>
            </div>
            <div className="powered">
              Partner delivery powered by CallReady · Qualify → Route → Activate → Measure
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
