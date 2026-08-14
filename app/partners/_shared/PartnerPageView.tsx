"use client";

import { useEffect } from "react";

export function PartnerPageView({
  program,
  page,
  heroVariant,
}: {
  program: string;
  page: string;
  heroVariant?: string;
}) {
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/partners/inquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        event_only: true,
        event_name: "partner_lander_view",
        program,
        site_key: "simplemedianetwork.com",
        page,
        hero_variant: heroVariant,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
    }).catch(() => {
      // silent — analytics best-effort
    });
    return () => controller.abort();
  }, [program, page, heroVariant]);

  return null;
}
