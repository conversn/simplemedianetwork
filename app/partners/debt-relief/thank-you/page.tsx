import type { Metadata } from "next";

import { partnerLanderStyles } from "../styles";

export const metadata: Metadata = {
  title: "Thanks — Partner Program request received",
  description: "Your Simple Media Network Partner Program request has been received.",
  robots: { index: false, follow: false },
};

const extraStyles = `
.smn-partner .ty-shell{min-height:100dvh;display:flex;flex-direction:column;background:linear-gradient(180deg,var(--canvas) 0%,#faf9f5 100%);padding:32px 0 80px}
.smn-partner .ty-topbar{display:flex;align-items:center;justify-content:space-between;padding:0 24px;max-width:820px;margin:0 auto 40px;width:100%}
.smn-partner .ty-topbar a{color:var(--muted);text-decoration:none;font-size:13px}
.smn-partner .ty-topbar a:hover{color:var(--evergreen)}
.smn-partner .ty-main{max-width:640px;margin:40px auto 0;padding:0 24px;text-align:center}
.smn-partner .ty-mark{width:76px;height:76px;border-radius:50%;background:var(--evergreen-soft);color:var(--evergreen);display:inline-flex;align-items:center;justify-content:center;margin-bottom:28px}
.smn-partner .ty-mark svg{width:34px;height:34px}
.smn-partner .ty-h1{font-family:var(--serif);font-size:38px;font-weight:400;color:var(--ink);line-height:1.12;letter-spacing:-.01em;margin:0 0 16px}
.smn-partner .ty-h1 .accent{font-style:italic;color:var(--evergreen)}
.smn-partner .ty-lede{font-size:17px;color:var(--muted);line-height:1.6;max-width:52ch;margin:0 auto 32px}
.smn-partner .ty-next{background:#fff;border:1px solid var(--hairline);border-radius:20px;padding:28px;text-align:left;box-shadow:0 24px 60px -32px rgba(21,33,28,.14)}
.smn-partner .ty-next h3{font-family:var(--serif);font-size:20px;font-weight:500;color:var(--ink);margin:0 0 14px}
.smn-partner .ty-next ol{padding-left:20px;color:var(--ink);font-size:15px;line-height:1.7}
.smn-partner .ty-next li{margin-bottom:10px}
.smn-partner .ty-next li strong{color:var(--evergreen)}
.smn-partner .ty-footer{margin-top:32px}
.smn-partner .ty-footer .pill{display:inline-flex}
@media(max-width:720px){
  .smn-partner .ty-h1{font-size:28px}
  .smn-partner .ty-lede{font-size:15px}
  .smn-partner .ty-next{padding:22px 20px}
  .smn-partner .ty-topbar{padding:0 16px;margin-bottom:24px}
  .smn-partner .ty-main{margin-top:20px;padding:0 16px}
}
`;

export default function ThankYouPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />
      <style dangerouslySetInnerHTML={{ __html: partnerLanderStyles }} />
      <style dangerouslySetInnerHTML={{ __html: extraStyles }} />

      <div className="smn-partner">
        <div className="ty-shell">
          <header className="ty-topbar">
            <div className="brand">
              Simple Media Network
              <small>Partner Program</small>
            </div>
            <a href="/partners/debt-relief">Partner Program overview</a>
          </header>

          <main className="ty-main">
            <div className="ty-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="ty-h1">
              Request received. <span className="accent">Thank you.</span>
            </h1>
            <p className="ty-lede">
              We&rsquo;ll review your criteria and reply within one business day with the current
              debt-relief availability for your markets and capacity.
            </p>

            <div className="ty-next">
              <h3>What happens next</h3>
              <ol>
                <li>
                  <strong>We review your intake.</strong> States, capacity, and qualification are
                  matched against current supply on MoneySimple.
                </li>
                <li>
                  <strong>You get a direct reply.</strong> A partner-program contact will email you
                  with availability and next steps — usually within one business day.
                </li>
                <li>
                  <strong>If it&rsquo;s a fit, we scope a trial.</strong> Prepaid daily cap so your
                  team can measure without flooding the floor.
                </li>
              </ol>
            </div>

            <div className="ty-footer">
              <a className="pill" href="/partners/debt-relief">
                Back to overview
              </a>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
