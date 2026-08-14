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
} from "../analytics";
import { MetaPixelInit, trackMetaPixel } from "../metaPixel";

export function ThankYouTracker({
  program,
  vertical,
  page,
}: {
  program: string;
  vertical: string;
  page: string;
}) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    markMount();
    ensureTracking();
    const sessionId = getSessionId();
    const ctx: EmitContext = {
      program,
      vertical,
      page,
      leadType: vertical,
      funnelType: `${vertical}-partner`,
    };

    log("success", "thank_you_view", { sessionId, vertical });
    void emit(ctx, { event_name: "thank_you_view" });

    const seen = new WeakSet<HTMLIFrameElement>();
    function scanFrames() {
      const frames = document.querySelectorAll<HTMLIFrameElement>(
        'iframe[data-partner-calendar], iframe[src*="calendly"], iframe[src*="leadconnectorhq"]',
      );
      frames.forEach((f) => {
        if (seen.has(f)) return;
        seen.add(f);
        const bookingId = newEventId();
        const fire = () => {
          log("booking", "calendar_iframe_loaded", { src: f.src });
          void emit(ctx, {
            event_name: "calendar_iframe_loaded",
            event_id: bookingId,
            properties: { src: f.src },
          });
        };
        if (f.contentDocument?.readyState === "complete") fire();
        else f.addEventListener("load", fire, { once: true });
      });
    }
    scanFrames();
    const observer = new MutationObserver(scanFrames);
    observer.observe(document.body, { childList: true, subtree: true });

    function onMessage(e: MessageEvent) {
      const d = e.data;
      const looksLikeBooked =
        (typeof d === "string" && /booked|scheduled|confirmed/i.test(d)) ||
        (d && typeof d === "object" &&
          (String((d as { event?: string }).event ?? "").match(/booked|scheduled|confirmed/i) ||
            String((d as { type?: string }).type ?? "").match(/booked|scheduled|confirmed/i)));
      if (!looksLikeBooked) return;
      const id = newEventId();
      log("booking", "call_booked", { origin: e.origin });
      void emit(ctx, {
        event_name: "call_booked",
        event_id: id,
        properties: { origin: e.origin },
      });
      trackMetaPixel("Schedule", id, {
        content_name: `smn-partner-${vertical}`,
      });
    }
    window.addEventListener("message", onMessage);
    return () => {
      observer.disconnect();
      window.removeEventListener("message", onMessage);
    };
  }, [program, vertical, page]);

  return <MetaPixelInit />;
}
