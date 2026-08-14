export const wizardStyles = `
.smn-partner .wizard-shell{min-height:100dvh;background:linear-gradient(180deg,var(--canvas) 0%,#faf9f5 100%);padding:32px 0 96px}
.smn-partner .wizard-topbar{display:flex;align-items:center;justify-content:space-between;padding:0 24px;max-width:820px;margin:0 auto 32px}
.smn-partner .wizard-topbar .brand{font-size:18px}
.smn-partner .wizard-topbar a{color:var(--muted);text-decoration:none;font-size:13px}
.smn-partner .wizard-topbar a:hover{color:var(--evergreen)}
.smn-partner .wizard{max-width:820px;margin:0 auto;padding:0 20px}
.smn-partner .wizard-progress{margin-bottom:24px}
.smn-partner .wizard-progress-track{height:6px;background:var(--hairline);border-radius:999px;overflow:hidden}
.smn-partner .wizard-progress-fill{height:100%;background:var(--evergreen);border-radius:999px;transition:width .3s var(--ease)}
.smn-partner .wizard-progress-label{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-top:10px}
.smn-partner .wizard-card{background:#fff;border:1px solid var(--hairline);border-radius:24px;padding:44px 40px;box-shadow:0 24px 60px -30px rgba(21,33,28,.18)}
.smn-partner .wizard-heading{font-family:var(--serif);font-size:30px;font-weight:400;color:var(--ink);line-height:1.15;letter-spacing:-.01em;margin:10px 0 8px;max-width:24ch}
.smn-partner .wizard-helper{font-size:15px;color:var(--muted);margin-bottom:28px;max-width:56ch}
.smn-partner .wizard-body{min-height:200px;margin-bottom:24px}
.smn-partner .wizard-footer{display:flex;justify-content:space-between;align-items:center;gap:16px;border-top:1px solid var(--hairline);padding-top:22px;margin-top:8px}
.smn-partner .wizard-footer .pill-ghost{background:transparent;color:var(--evergreen);border:1px solid var(--evergreen);padding:14px 22px;border-radius:var(--r-pill);font-family:var(--sans);font-size:14px;font-weight:500;cursor:pointer;transition:background .2s var(--ease)}
.smn-partner .wizard-footer .pill-ghost:hover:not(:disabled){background:var(--evergreen-soft)}
.smn-partner .wizard-footer .pill-ghost:disabled{opacity:.4;cursor:not-allowed}
.smn-partner .wizard-footer .pill:disabled{opacity:.4;cursor:not-allowed}
.smn-partner .wizard-error{background:#fdf1f1;border:1px solid #f0c8c8;color:#8a1f1f;padding:12px 16px;border-radius:12px;font-size:14px;margin-bottom:16px}

.smn-partner .pill-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
.smn-partner .pill-grid-2{grid-template-columns:repeat(2,1fr);max-width:400px}
.smn-partner .pill-choice{background:#fff;border:1.5px solid var(--hairline);border-radius:14px;padding:18px 22px;font-family:var(--sans);font-size:15px;font-weight:500;color:var(--ink);text-align:left;cursor:pointer;transition:all .18s var(--ease);min-height:56px;position:relative}
.smn-partner .pill-choice:hover{border-color:var(--evergreen);background:var(--evergreen-soft)}
.smn-partner .pill-choice.is-active{border-color:var(--evergreen);background:var(--evergreen);color:#fff}
.smn-partner .pill-choice:focus-visible{outline:3px solid var(--evergreen);outline-offset:2px}

.smn-partner .states-controls{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:12px}
.smn-partner .states-count{font-family:var(--mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--evergreen);font-weight:600}
.smn-partner .states-actions{display:flex;gap:12px}
.smn-partner .text-btn{background:none;border:none;color:var(--evergreen);font-family:var(--sans);font-size:13px;font-weight:500;cursor:pointer;padding:6px 4px;text-decoration:underline;text-underline-offset:3px}
.smn-partner .text-btn:hover{color:var(--ink)}
.smn-partner .states-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(64px,1fr));gap:8px}
.smn-partner .state-pill{background:#fff;border:1.5px solid var(--hairline);border-radius:12px;padding:14px 4px;font-family:var(--mono);font-size:13px;font-weight:600;color:var(--ink);letter-spacing:.05em;cursor:pointer;transition:all .14s var(--ease);min-height:48px;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.smn-partner .state-pill:hover{border-color:var(--evergreen);background:var(--evergreen-soft)}
.smn-partner .state-pill.is-active{border-color:var(--evergreen);background:var(--evergreen);color:#fff}
.smn-partner .state-pill:focus-visible{outline:3px solid var(--evergreen);outline-offset:2px}

.smn-partner .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.smn-partner .contact-grid .field{display:flex;flex-direction:column}
.smn-partner .contact-grid label{font-size:12px;font-weight:600;color:var(--muted);letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px}
.smn-partner .contact-grid input{width:100%;font-family:var(--sans);font-size:16px;padding:14px 16px;border:1.5px solid var(--hairline);border-radius:12px;background:#fff;color:var(--ink);min-height:52px}
.smn-partner .contact-grid input:focus{outline:3px solid var(--evergreen);outline-offset:1px;border-color:var(--evergreen)}
.smn-partner .contact-consent{grid-column:1 / -1;font-size:12px;color:var(--muted);line-height:1.5;margin-top:6px}

@media (max-width:720px){
  .smn-partner .wizard-shell{padding:16px 0 64px}
  .smn-partner .wizard-topbar{padding:0 16px;margin-bottom:20px}
  .smn-partner .wizard{padding:0 12px}
  .smn-partner .wizard-card{padding:24px 20px;border-radius:20px}
  .smn-partner .wizard-heading{font-size:24px}
  .smn-partner .wizard-helper{font-size:14px;margin-bottom:22px}
  .smn-partner .wizard-body{min-height:auto}
  .smn-partner .wizard-footer{flex-direction:column-reverse;gap:12px;padding-top:18px}
  .smn-partner .wizard-footer .pill,.smn-partner .wizard-footer .pill-ghost{width:100%;text-align:center;justify-content:center;padding:16px 22px;font-size:15px;min-height:52px}
  .smn-partner .pill-grid{grid-template-columns:1fr;gap:10px}
  .smn-partner .pill-grid-2{grid-template-columns:1fr 1fr;max-width:none}
  .smn-partner .pill-choice{padding:16px 18px;min-height:52px;font-size:15px}
  .smn-partner .states-grid{grid-template-columns:repeat(5,1fr);gap:6px}
  .smn-partner .state-pill{padding:12px 2px;font-size:12px;min-height:44px;border-radius:10px}
  .smn-partner .contact-grid{grid-template-columns:1fr;gap:14px}
  .smn-partner .contact-grid input{font-size:16px;padding:13px 14px}
}
`;
