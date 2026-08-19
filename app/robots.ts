import type { MetadataRoute } from "next";

import { SITE_URL } from "./site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The noindex routes (/partners/legal, /partners/*/apply,
        // /partners/*/thank-you) are deliberately NOT disallowed here. A Disallow
        // stops crawlers fetching the page at all, so they never read its noindex
        // meta tag — and a blocked URL can still be indexed from an inbound link,
        // just without a description. The meta tag is the stronger signal, so the
        // pages stay crawlable in order for it to be honored.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
