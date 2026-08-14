import { partnerLanderStyles } from "./styles";

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";

export function PartnerShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONTS_HREF} />
      <style dangerouslySetInnerHTML={{ __html: partnerLanderStyles }} />
      <div className="smn-partner">{children}</div>
    </>
  );
}

export function PartnerNav({
  ctaHref = "#apply",
  ctaLabel = "Explore partner programs",
}: {
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <nav>
      <div className="wrap">
        <a
          href="/partners"
          className="brand"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Simple Media Network
          <small>Partner Program</small>
        </a>
        <a className="pill" href={ctaHref}>
          {ctaLabel}
        </a>
      </div>
    </nav>
  );
}

export function PartnerFooter() {
  return (
    <footer>
      <div className="wrap">
        <div>
          <div className="brand" style={{ fontSize: "18px" }}>
            Simple Media Network
          </div>
          <div className="disc">
            Editorial decisions are made independently; commercial relationships are
            disclosed. Where outside expertise is useful, we may connect consumers with
            selected partners.
          </div>
        </div>
        <div className="powered">
          Partner delivery powered by CallReady · Qualify → Route → Activate → Measure
        </div>
      </div>
    </footer>
  );
}
