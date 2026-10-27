"use client";

import { useCallback, useEffect, useState } from "react";

import { CreativeReviewGallery } from "./CreativeReviewGallery";
import "./gallery.css";
import { assetBase, PROBE_PATH } from "./slate";

/**
 * The review code gate.
 *
 * Why a code and not just an unguessable route: simplemedianetwork is a public
 * GitHub repo, so anything committed here — a secret path included — is readable
 * by anyone. The code lives only in the partner link, and the Supabase prefix is
 * built from it, so a visitor without it cannot reach the page's media at all.
 *
 * Partners still get a one-click link (`?c=<code>`); the form is the fallback for
 * when the code is relayed separately or the query string is stripped in a
 * forward.
 */

/** Hex token. Also the guard against a code smuggling path segments into the URL. */
const CODE_RE = /^[a-z0-9]{6,32}$/;

type State =
  | { phase: "loading" }
  | { phase: "prompt"; error?: string }
  | { phase: "checking"; code: string }
  | { phase: "open"; code: string };

const STORAGE_KEY = "cr-legalsimple-mva";

export function CreativeReviewGate() {
  const [state, setState] = useState<State>({ phase: "loading" });
  const [entry, setEntry] = useState("");

  const check = useCallback(async (raw: string) => {
    const code = raw.trim().toLowerCase();
    if (!CODE_RE.test(code)) {
      setState({ phase: "prompt", error: "That does not look like a review code." });
      return;
    }
    setState({ phase: "checking", code });
    try {
      const res = await fetch(`${assetBase(code)}/${PROBE_PATH}`, {
        method: "HEAD",
        cache: "no-store",
      });
      if (!res.ok) {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // Private browsing — nothing cached to clear.
        }
        setState({ phase: "prompt", error: "That code does not match this review." });
        return;
      }
      try {
        sessionStorage.setItem(STORAGE_KEY, code);
      } catch {
        // Private browsing — the code just won't survive a reload.
      }
      setState({ phase: "open", code });
    } catch {
      setState({
        phase: "prompt",
        error: "Could not reach the media host. Check the connection and try again.",
      });
    }
  }, []);

  // Read the code once, from the link or from this tab's earlier entry. Reading
  // location directly rather than useSearchParams keeps the route statically
  // renderable and needs no Suspense boundary.
  useEffect(() => {
    const fromLink = new URLSearchParams(window.location.search).get("c");
    let remembered: string | null = null;
    try {
      remembered = sessionStorage.getItem(STORAGE_KEY);
    } catch {
      // Private browsing — fall through to the form.
    }
    const code = fromLink ?? remembered;
    if (code) {
      void check(code);
    } else {
      setState({ phase: "prompt" });
    }
  }, [check]);

  if (state.phase === "open") {
    return <CreativeReviewGallery code={state.code} />;
  }

  return (
    <div className="cr-page cr-gate-page">
      <div className="cr-gate">
        <h1>LegalSimple — MVA Creative Review</h1>
        <p className="cr-sub">
          Partner review copy — pre-launch drafts pending attorney sign-off. Enter the review code from your link.
        </p>
        {state.phase === "loading" || state.phase === "checking" ? (
          <p className="cr-gate-status">Checking…</p>
        ) : (
          <form
            className="cr-gate-form"
            onSubmit={(e) => {
              e.preventDefault();
              void check(entry);
            }}
          >
            <label className="cr-gate-label" htmlFor="cr-code">
              Review code
            </label>
            <input
              id="cr-code"
              name="code"
              className="cr-gate-input"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="e.g. 2b68…"
            />
            <button type="submit" className="cr-gate-submit">
              View the slate
            </button>
            {state.error ? <p className="cr-gate-error">{state.error}</p> : null}
          </form>
        )}
      </div>
    </div>
  );
}
