/**
 * Canonical origin. The apex 307s to www, so www is the host search engines
 * should be pointed at.
 */
export const SITE_URL = "https://www.simplemedianetwork.com";

/**
 * The pages that belong in the sitemap — every route that is actually
 * indexable, and nothing else.
 *
 * Deliberately excluded, because each one declares `robots: { index: false }`
 * in its own metadata and listing a noindex URL here would contradict that:
 *   - /partners/legal            noindex pending attorney-advertising / bar /
 *                                TCPA sign-off. Add it here the same day that
 *                                gate lifts — it is otherwise a normal lander.
 *   - /partners/{slug}/apply     form wizards
 *   - /partners/{slug}/thank-you post-conversion confirmations
 *
 * A route added here must be indexable in its own metadata; the two are checked
 * against each other by nothing but this comment.
 */
export const INDEXABLE_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/partners", priority: 0.9 },
  { path: "/partners/debt-relief", priority: 0.8 },
  { path: "/partners/retirement", priority: 0.8 },
  { path: "/partners/life-insurance", priority: 0.8 },
  { path: "/partners/home-equity", priority: 0.8 },
  { path: "/editorial-principles", priority: 0.4 },
  { path: "/disclosure", priority: 0.4 },
  { path: "/contact", priority: 0.4 },
  { path: "/privacy", priority: 0.3 },
];
