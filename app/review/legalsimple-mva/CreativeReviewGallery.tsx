/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

import "./gallery.css";
import { ASSET_COUNT, assetBase, SECTIONS } from "./slate";

/**
 * Partner-facing review gallery for the LegalSimple MVA slate.
 *
 * Client component for two reasons: the statics open in a lightbox, and the
 * asset base is derived from the review code the gate collected. The videos are
 * plain <video controls preload="metadata"> — metadata-only is what keeps a
 * 26-asset page from pulling ~230MB on load, so each clip downloads when a
 * reviewer presses play and not before.
 */
export function CreativeReviewGallery({ code }: { code: string }) {
  const base = assetBase(code);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="cr-page">
      <header className="cr-header">
        <h1>LegalSimple — MVA Creative Review</h1>
        <div className="cr-meta">
          Motor-Vehicle-Accident campaign · Phase 1 slate · {ASSET_COUNT} creatives · updated 2026-10-30
        </div>
      </header>

      <div className="cr-note">
        <b>Partner review copy.</b> These are pre-launch drafts pending attorney sign-off. Videos show
        captions-only; the required compliance line (dramatization / &ldquo;not a law firm&rdquo; / results vary) is
        applied at final export. Dramatized-story videos use AI avatars and are labeled as portrayals, not actual
        clients.
      </div>

      <main className="cr-main">
        {SECTIONS.map((section) => (
          <section className="cr-section" key={section.heading}>
            <h2>
              {section.heading} <span className="cr-count">{section.assets.length}</span>
            </h2>
            <p className="cr-sub">{section.sub}</p>
            <div className={`cr-grid cr-grid-${section.ratio}`}>
              {section.assets.map((asset) => {
                const src = `${base}/${section.dir}/${asset.file}`;
                return (
                  <figure className="cr-card" key={asset.file}>
                    {section.kind === "image" ? (
                      <button
                        type="button"
                        aria-label={`Enlarge ${asset.title}`}
                        onClick={() => setLightbox({ src, alt: asset.title })}
                      >
                        <img
                          className={`cr-media-${section.ratio}`}
                          src={src}
                          alt={asset.title}
                          loading="lazy"
                        />
                      </button>
                    ) : (
                      <video
                        className={`cr-media-${section.ratio}`}
                        src={src}
                        controls
                        preload="metadata"
                        playsInline
                      />
                    )}
                    <figcaption>
                      <b>{asset.title}</b>
                      <span>{asset.note}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {lightbox ? (
        <button
          type="button"
          className="cr-lightbox"
          aria-label="Close enlarged view"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox.src} alt={lightbox.alt} />
        </button>
      ) : null}
    </div>
  );
}
