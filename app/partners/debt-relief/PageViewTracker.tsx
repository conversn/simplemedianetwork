"use client";

import { useEffect } from "react";

export function PageViewTracker({ heroVariant }: { heroVariant: "A" | "B" }) {
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/partners/inquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        event_only: true,
        event_name: "partner_lander_view",
        program: "debt-relief",
        site_key: "simplemedianetwork.com",
        page: "/partners/debt-relief",
        hero_variant: heroVariant,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
    }).catch(() => {
      // silent — analytics best-effort
    });
    return () => controller.abort();
  }, [heroVariant]);

  return null;
}
