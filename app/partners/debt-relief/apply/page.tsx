import type { Metadata } from "next";

import { partnerLanderStyles } from "../styles";
import { ApplyWizard } from "./ApplyWizard";
import { wizardStyles } from "./wizardStyles";

export const metadata: Metadata = {
  title: "Check Partner Program Availability — Simple Media Network",
  description:
    "Tell us where you buy, what qualifies, and how much your team can handle. We'll reply with current debt-relief lead availability.",
  robots: { index: false, follow: false },
};

type HeroVariant = "A" | "B";

type PageProps = {
  searchParams?: Promise<{ hero?: string | string[] }>;
};

function resolveHeroVariant(searchParams?: {
  hero?: string | string[];
}): HeroVariant {
  const raw = searchParams?.hero;
  const query = Array.isArray(raw) ? raw[0] : raw;
  if (query && query.toUpperCase() === "A") return "A";
  return "B";
}

export default async function ApplyPage({ searchParams }: PageProps) {
  const resolved = (await searchParams) ?? {};
  const heroVariant = resolveHeroVariant(resolved);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />
      <style dangerouslySetInnerHTML={{ __html: partnerLanderStyles }} />
      <style dangerouslySetInnerHTML={{ __html: wizardStyles }} />

      <div className="smn-partner">
        <div className="wizard-shell">
          <header className="wizard-topbar">
            <div className="brand">
              Simple Media Network
              <small>Partner Program</small>
            </div>
            <a href="/partners/debt-relief">← Back to overview</a>
          </header>
          <ApplyWizard heroVariant={heroVariant} />
        </div>
      </div>
    </>
  );
}
