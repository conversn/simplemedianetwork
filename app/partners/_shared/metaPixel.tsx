"use client";

import { useEffect } from "react";

/**
 * Meta pixel 750308567626057 — `callready`, ad account act_1864689330758615.
 * Verified never-fired (last_fired_time null) as of 2026-08-14 → greenfield.
 *
 * Browser events fire with the same event_id passed to server CAPI so Meta
 * dedups the pair. Only four events map — anything else fires only server-side.
 */

export const META_PIXEL_ID = "750308567626057";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function MetaPixelInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.fbq) return;
    // Standard Meta pixel bootstrap
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any) {
      let n: any, t: any, s: any;
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js",
    );
    /* eslint-enable */
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    fbq?.("init", META_PIXEL_ID);
  }, []);

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}

export type MetaEvent = "ViewContent" | "InitiateCheckout" | "Lead" | "Schedule";

export function trackMetaPixel(
  event: MetaEvent,
  eventId: string,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params ?? {}, { eventID: eventId });
}
