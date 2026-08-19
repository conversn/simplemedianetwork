import { SiteNav } from "../../components/navigation/SiteNav";

/**
 * The partner-funnel header. Renders the shared SiteNav with the funnel's own
 * eyebrow and a wordmark that returns to /partners rather than the homepage, so
 * a buyer part-way through the funnel stays inside it.
 *
 * Deliberately carries no primary nav links: once someone is in a vertical
 * program the only intended paths are the CTA and the back link.
 */
export function PartnerNav({
  ctaHref,
  ctaLabel = "Check availability",
  secondaryHref,
  secondaryLabel,
}: {
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <SiteNav
      homeHref="/partners"
      eyebrow="Partner Program"
      ctaHref={ctaHref}
      ctaLabel={ctaLabel}
      secondaryHref={secondaryHref}
      secondaryLabel={secondaryLabel}
    />
  );
}
