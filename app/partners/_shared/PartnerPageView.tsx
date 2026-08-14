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
} from "./analytics";
import { MetaPixelInit, trackMetaPixel } from "./metaPixel";

export function PartnerPageView({
  program,
  page,
  heroVariant,
  vertical,
}: {
  program: string;
  page: string;
  heroVariant?: string;
  vertical?: string;
}) {
  const firedRef = useRef(false);
  const resolvedVertical = vertical ?? program;

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    markMount();
    ensureTracking();
    const sessionId = getSessionId();
    const eventId = newEventId();

    log("entry", "lp_view", { sessionId, program, page });
    void emit(
      {
        program,
        vertical: resolvedVertical,
        page,
        heroVariant,
        leadType: resolvedVertical,
        funnelType: `${resolvedVertical}-partner`,
      },
      {
        event_name: "lp_view",
        event_id: eventId,
        properties: { hero_variant: heroVariant },
      },
    );
    trackMetaPixel("ViewContent", eventId, {
      content_name: `smn-partner-${resolvedVertical}`,
      content_category: "partner-lp",
    });
  }, [program, page, heroVariant, resolvedVertical]);

  useEffect(() => {
    const ctx: EmitContext = {
      program,
      vertical: resolvedVertical,
      page,
      heroVariant,
      leadType: resolvedVertical,
      funnelType: `${resolvedVertical}-partner`,
    };
    function onClick(ev: MouseEvent) {
      const target = ev.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.includes("/apply")) return;
      log("field", "lp_cta_click", { href, text: anchor.textContent?.trim() });
      void emit(ctx, {
        event_name: "lp_cta_click",
        properties: { href, cta_text: anchor.textContent?.trim() },
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [program, page, heroVariant, resolvedVertical]);

  return <MetaPixelInit />;
}
