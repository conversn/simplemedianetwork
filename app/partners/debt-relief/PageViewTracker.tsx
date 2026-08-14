"use client";

import { useEffect, useRef } from "react";

import {
  emit,
  ensureTracking,
  getSessionId,
  log,
  markMount,
  newEventId,
  type EmitContext,
} from "../_shared/analytics";
import { MetaPixelInit, trackMetaPixel } from "../_shared/metaPixel";

export function PageViewTracker({ heroVariant }: { heroVariant: "A" | "B" }) {
  const firedRef = useRef(false);

  // One-shot: LP view event + Meta ViewContent
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    markMount();
    ensureTracking();
    const sessionId = getSessionId();
    const eventId = newEventId();

    log("entry", "lp_view", { sessionId, heroVariant });
    void emit(
      {
        program: "debt-relief",
        vertical: "debt-relief",
        page: "/partners/debt-relief",
        heroVariant,
        leadType: "debt-relief",
        funnelType: "debt-relief-partner",
      },
      {
        event_name: "lp_view",
        event_id: eventId,
        properties: { hero_variant: heroVariant },
      },
    );
    trackMetaPixel("ViewContent", eventId, {
      content_name: "smn-partner-debt-relief",
      content_category: "partner-lp",
    });
  }, [heroVariant]);

  // Always-on: delegated CTA click tracking
  useEffect(() => {
    const ctx: EmitContext = {
      program: "debt-relief",
      vertical: "debt-relief",
      page: "/partners/debt-relief",
      heroVariant,
      leadType: "debt-relief",
      funnelType: "debt-relief-partner",
    };
    function onClick(ev: MouseEvent) {
      const target = ev.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.includes("/partners/debt-relief/apply")) return;
      log("field", "lp_cta_click", { href, text: anchor.textContent?.trim() });
      void emit(ctx, {
        event_name: "lp_cta_click",
        properties: { href, cta_text: anchor.textContent?.trim() },
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [heroVariant]);

  return <MetaPixelInit />;
}
