import type { Metadata } from "next";

import { PartnerNav } from "../../../_ds/kits/partners/PartnerNav";
import { ApplyWizard } from "./ApplyWizard";
import { wizardStyles } from "../../_shared/apply/wizardStyles";

export const metadata: Metadata = {
  title: "Check Partner Program Availability — Simple Media Network",
  description:
    "Tell us where you buy, what qualifies, and how much your team can handle. We'll reply with current debt-relief lead availability.",
  robots: { index: true, follow: true },
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
      <style dangerouslySetInnerHTML={{ __html: wizardStyles }} />
      <PartnerNav
        secondaryHref="/partners/debt-relief"
        secondaryLabel="← Back to overview"
      />
      <div className="wizard-shell">
        <ApplyWizard heroVariant={heroVariant} />
      </div>
    </>
  );
}
