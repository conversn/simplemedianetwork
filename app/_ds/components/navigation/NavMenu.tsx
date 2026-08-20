"use client";
import React from "react";
import type { SiteNavLink } from "./SiteNav";

/**
 * The mobile counterpart to `.smn-nav-links`, which hides the inline nav below
 * 900px. Without this the header below that width carries only the wordmark and
 * the CTA, and nothing else on the site is reachable from the nav.
 *
 * Kept in its own client module so `SiteNav` — and the `SITE_NAV_LINKS` array
 * exported alongside it — stays a server component. A "use client" directive on
 * SiteNav itself would turn that array into a client reference the server pages
 * could not pass back in as a prop.
 */
export function NavMenu({ links }: { links: SiteNavLink[] }) {
  const [open, setOpen] = React.useState(false);
  if (!links.length) return null;
  return (
    <div className="smn-nav-menu">
      <button
        type="button"
        className="smn-nav-toggle"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          {open ? <><path d="M5 5l14 14" /><path d="M19 5L5 19" /></> : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
        </svg>
      </button>
      {open && (
        <nav className="smn-nav-panel" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>
      )}
    </div>
  );
}
