import { PartnerShell, PartnerNav, PartnerFooter } from "./PartnerShell";
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
};

export function VerticalLanderTemplate({ config }: { config: VerticalLanderConfig }) {
  const {
    slug,
    program,
    hero,
    sourceProperty,
    program_block,
    moneyChain,
    painkiller,
    fit,
    formHeading,
    formBody,
    compliance,
    page,
  } = config;

  const applyHref = `/partners/${slug}/apply`;

  return (
    <PartnerShell>
      <PartnerPageView program={program} page={page} heroVariant="B" vertical={slug} />

      <PartnerNav ctaHref={applyHref} ctaLabel="Check availability →" />

      {/* Hero */}
      <section>
        <div className="wrap">
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1 style={{ margin: "18px 0 22px", maxWidth: "22ch" }}>
            {hero.headlineLead}{" "}
            <span className="accent">{hero.headlineItalic}</span>
            {hero.headlineTrail ? ` ${hero.headlineTrail}` : ""}
          </h1>
          <p className="lede">{hero.lede}</p>
          <div style={{ marginTop: "26px" }}>
            <a className="pill" href={applyHref}>
              Check availability →
            </a>
          </div>
          <div className="micro">{hero.micro}</div>
        </div>
      </section>

      {/* Stop buying blind — invariant */}
      <div className="band-wrap">
        <div className="band">
          <div className="eyebrow">The problem you already know</div>
          <h2 style={{ margin: "12px 0 10px", maxWidth: "20ch" }}>Stop buying blind.</h2>
          <p className="muted" style={{ maxWidth: "60ch" }}>
            If you&rsquo;re already buying {config.leadNoun}, you can see the CPL. What you often
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

      {/* We generate the demand ourselves — source property */}
      <section>
        <div className="wrap">
          <div className="eyebrow">Where it comes from</div>
          <h2 style={{ margin: "12px 0 16px", maxWidth: "24ch" }}>
            We generate the demand ourselves.
          </h2>
          <p style={{ maxWidth: "68ch" }}>{sourceProperty.consumerLine}</p>
          <p className="flow" style={{ marginTop: "22px" }}>
            {sourceProperty.flowLine}
          </p>
        </div>
      </section>

      {/* The program */}
      <div className="band-wrap">
        <div className="band">
          <div className="eyebrow">The program</div>
          <h2 style={{ margin: "12px 0 0" }}>{program_block.heading}</h2>
          <hr className="goldrule" />
          <p className="muted" style={{ marginTop: "20px", maxWidth: "62ch" }}>
            {program_block.body}
          </p>
          <div className="klabel" style={{ marginTop: "36px" }}>
            Qualification may include
          </div>
          <ul className="qual">
            {program_block.qualification.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
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

      {/* We fund the acquisition — invariant */}
      <section>
        <div className="band-wrap">
          <div className="band-soft">
            <div className="eyebrow">The commercial model</div>
            <h2 style={{ margin: "12px 0 16px", maxWidth: "24ch" }}>
              We fund the consumer acquisition.{" "}
              <span className="accent">You pay for leads.</span>
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

      {/* A better question + steps — invariant */}
      <section>
        <div className="wrap">
          <div className="eyebrow">The right question</div>
          <h2 style={{ margin: "12px 0 14px", maxWidth: "26ch" }}>
            A better question than &ldquo;what&rsquo;s the cheapest lead?&rdquo;
          </h2>
          <p>
            The cheapest lead is expensive if your team can&rsquo;t reach or convert it.
            What matters is whether the channel works against your economics. That&rsquo;s
            why we start controlled.
          </p>
          <div className="steps">
            <div className="step">
              <div className="n">01</div>
              <h3>Define the buyer</h3>
              <p>States, criteria, delivery, capacity.</p>
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

      {/* Money chain / painkiller — per-vertical narrative */}
      <div className="band-wrap">
        <div className="band">
          <div className="eyebrow">Why it works</div>
          <h2 style={{ margin: "12px 0 14px", maxWidth: "28ch" }}>
            The chain that produces the outcome.
          </h2>
          <p style={{ maxWidth: "68ch" }}>{moneyChain}</p>
          <p style={{ marginTop: "18px", maxWidth: "68ch" }} className="muted">
            {painkiller}
          </p>
        </div>
      </div>

      {/* Fit */}
      <section>
        <div className="wrap">
          <div className="eyebrow">Fit</div>
          <h2 style={{ margin: "12px 0 4px", maxWidth: "26ch" }}>
            Built for teams that can actually work the leads.
          </h2>
          <p className="muted" style={{ maxWidth: "60ch" }}>
            Designed for operators with:
          </p>
          <ul className="qual">
            {fit.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div style={{ marginTop: "34px" }}>
            <a className="pill" href={applyHref}>
              See if there&rsquo;s availability →
            </a>
          </div>
        </div>
      </section>

      {/* Where the demand comes from — source property callout */}
      <section>
        <div className="wrap">
          <div className="eyebrow">The source</div>
          <h2 style={{ margin: "12px 0 16px", maxWidth: "30ch" }}>
            {sourceProperty.sourceHeading}
          </h2>
          <p style={{ maxWidth: "68ch" }}>{sourceProperty.sourceBody}</p>
          <p className="flow" style={{ marginTop: "22px" }}>
            {sourceProperty.sourceFlow}
          </p>
        </div>
      </section>

      {/* CTA — routes to per-vertical /apply wizard */}
      <div className="band-wrap" id="apply">
        <div className="band cta-band">
          <div className="eyebrow">Request current availability</div>
          <h2 style={{ margin: "12px 0 14px", maxWidth: "28ch" }}>{formHeading}</h2>
          <p className="muted cta-lede">{formBody}</p>
          <div className="cta-row">
            <a className="pill" href={applyHref}>
              Check partner availability →
            </a>
            <span className="micro">A few quick steps · about a minute</span>
          </div>
          {compliance ? (
            <p
              className="micro"
              style={{ marginTop: "22px", maxWidth: "68ch", display: "block" }}
            >
              {compliance}
            </p>
          ) : null}
        </div>
      </div>

      <PartnerFooter />
    </PartnerShell>
  );
}
