import { PartnerNav } from "../../../_ds/kits/partners/PartnerNav";
import { Card } from "../../../_ds/components/core/Card";
import { Button } from "../../../_ds/components/core/Button";
import { Icon } from "../../../_ds/components/core/Icon";
import { Footer } from "../../../_ds/components/navigation/Footer";
import { ThankYouTracker } from "./ThankYouTracker";

export type ThankYouStep = {
  bold: string;
  body: string;
};

export type ThankYouConfig = {
  backHref: string;
  backLabel?: string;
  lede: string;
  steps: ThankYouStep[];
  program?: string;
  vertical?: string;
  page?: string;
};

export function ThankYouShell({ config }: { config: ThankYouConfig }) {
  return (
    <>
      <ThankYouTracker
        program={config.program ?? config.vertical ?? "unknown"}
        vertical={config.vertical ?? config.program ?? "unknown"}
        page={config.page ?? "/partners/thank-you"}
      />
      <PartnerNav
        secondaryHref={config.backHref}
        secondaryLabel={config.backLabel ?? "Partner Program overview"}
      />
      <main style={{
        maxWidth: 640, margin: "0 auto", padding: "88px var(--sp-6) var(--sp-24)",
        textAlign: "center",
      }}>
        <span aria-hidden="true" style={{
          width: 76, height: 76, borderRadius: "50%",
          background: "var(--evergreen-soft)", color: "var(--evergreen)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: "var(--sp-8)",
        }}>
          <Icon name="check" size={34} strokeWidth={2.5} color="var(--evergreen)" />
        </span>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(30px,4vw,44px)",
          fontWeight: "var(--fw-regular)", lineHeight: "var(--lh-hero)",
          letterSpacing: "var(--ls-hero)", color: "var(--text-strong)",
          margin: "0 0 var(--sp-4)",
        }}>
          Request received. <em>Thank you.</em>
        </h1>
        <p style={{
          margin: "0 auto var(--sp-10)", maxWidth: "52ch",
          fontSize: "var(--fs-body-lg)", color: "var(--text-muted)",
          lineHeight: "var(--lh-body)",
        }}>
          {config.lede}
        </p>

        <Card variant="outline" padding="var(--sp-8)" style={{ textAlign: "left" }}>
          <h3 style={{
            margin: "0 0 var(--sp-4)", fontFamily: "var(--font-display)",
            fontSize: "var(--fs-h3)", fontWeight: "var(--fw-regular)",
            color: "var(--text-strong)",
          }}>What happens next</h3>
          <ol style={{
            margin: 0, padding: "0 0 0 var(--sp-5)",
            fontSize: "var(--fs-body-sm)", color: "var(--text-body)",
            lineHeight: 1.7,
          }}>
            {config.steps.map((s, i) => (
              <li key={i} style={{ marginBottom: "var(--sp-3)" }}>
                <strong style={{ color: "var(--evergreen)", fontWeight: "var(--fw-semibold)" }}>{s.bold}</strong>{" "}
                {s.body}
              </li>
            ))}
          </ol>
        </Card>

        <div style={{ marginTop: "var(--sp-10)" }}>
          <Button size="lg" href={config.backHref}>Back to overview</Button>
        </div>
      </main>
      <Footer
        note="Editorial decisions are made independently; commercial relationships are disclosed."
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
              { label: "Contact", href: "/contact" },
            ],
          },
        ]}
      />
    </>
  );
}
