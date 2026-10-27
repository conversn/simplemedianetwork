import type { Metadata } from "next";

import { CreativeReviewGate } from "./CreativeReviewGate";

/**
 * WO-1291 — unlisted partner review page for the LegalSimple MVA slate.
 *
 * Unlisted, three ways: noindex/nofollow below, absent from app/site.ts's
 * INDEXABLE_ROUTES (so it is not in the sitemap), and linked from nowhere in the
 * nav. Access is the review code the gate collects — see CreativeReviewGate for
 * why this is a code and not a secret path (a secret path committed to a public
 * repo is not secret).
 *
 * It is deliberately NOT added to robots.txt either: a Disallow entry would
 * publish the route in a file anyone can read, and a blocked URL can still be
 * indexed from an inbound link without the crawler ever reading its noindex
 * meta. Same reasoning as the note in app/robots.ts.
 *
 * These are pre-launch drafts pending attorney sign-off. Keep the route gated
 * until the creative is approved for public use.
 */
export const metadata: Metadata = {
  title: "LegalSimple — MVA Creative Review",
  description: "Partner review copy — pre-launch drafts pending attorney sign-off.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function LegalSimpleMvaCreativeReviewPage() {
  return <CreativeReviewGate />;
}
