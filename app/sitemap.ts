import type { MetadataRoute } from "next";

import { INDEXABLE_ROUTES, SITE_URL } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified: there is no honest per-route value to report here, and
  // stamping build time would tell crawlers every page changed on every deploy.
  return INDEXABLE_ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    priority,
  }));
}
