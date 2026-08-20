export const wizardStyles = `
.wizard-shell{min-height:100dvh;background:linear-gradient(180deg,var(--white) 0%,var(--surface-sunken) 100%);padding:0 0 96px}
.wizard{max-width:820px;margin:0 auto;padding:32px 20px 0}
.wizard-progress{margin-bottom:24px}
.wizard-progress-track{height:6px;background:var(--border-hairline);border-radius:999px;overflow:hidden}
.wizard-progress-fill{height:100%;background:var(--evergreen);border-radius:999px;transition:width .3s var(--ease-standard)}
.wizard-progress-label{font-family:var(--font-mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--text-muted);margin-top:10px}
.wizard-card{background:var(--white);border:1px solid var(--border-hairline);border-radius:24px;padding:44px 40px;box-shadow:var(--shadow-md)}
.wizard .eyebrow{font-family:var(--font-ui);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--evergreen);font-weight:600}
.wizard-heading{font-family:var(--font-display);font-size:30px;font-weight:400;color:var(--text-strong);line-height:1.15;letter-spacing:-.01em;margin:10px 0 8px;max-width:24ch}
.wizard-helper{font-size:15px;color:var(--text-muted);margin-bottom:28px;max-width:56ch}
.wizard-body{min-height:200px;margin-bottom:24px}
.wizard-footer{display:flex;justify-content:space-between;align-items:center;gap:16px;border-top:1px solid var(--border-hairline);padding-top:22px;margin-top:8px}
.wizard-footer .pill{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--evergreen);color:#fff;font-family:var(--font-ui);font-size:15px;font-weight:500;padding:14px 26px;border-radius:var(--radius-pill);text-decoration:none;border:1px solid var(--evergreen);cursor:pointer;transition:background .24s var(--ease-standard)}
.wizard-footer .pill:hover:not(:disabled){background:var(--evergreen-mid);border-color:var(--evergreen-mid)}
.wizard-footer .pill:disabled{opacity:.4;cursor:not-allowed}
.wizard-footer .pill-ghost{background:transparent;color:var(--evergreen);border:1px solid var(--border-accent);padding:14px 22px;border-radius:var(--radius-pill);font-family:var(--font-ui);font-size:14px;font-weight:500;cursor:pointer;transition:background .2s var(--ease-standard)}
.wizard-footer .pill-ghost:hover:not(:disabled){background:var(--evergreen-soft)}
.wizard-footer .pill-ghost:disabled{opacity:.4;cursor:not-allowed}
.wizard-error{background:var(--danger-soft);border:1px solid #E8CDC8;color:var(--danger);padding:12px 16px;border-radius:12px;font-size:14px;margin-bottom:16px}

.pill-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
.pill-grid-2{grid-template-columns:repeat(2,1fr);max-width:400px}
.pill-choice{background:var(--white);border:1.5px solid var(--border-hairline);border-radius:14px;padding:18px 22px;font-family:var(--font-ui);font-size:15px;font-weight:500;color:var(--text-strong);text-align:left;cursor:pointer;transition:all .18s var(--ease-standard);min-height:56px;position:relative}
.pill-choice:hover{border-color:var(--evergreen);background:var(--evergreen-soft)}
.pill-choice.is-active{border-color:var(--evergreen);background:var(--evergreen);color:#fff}
.pill-choice:focus-visible{outline:3px solid var(--evergreen);outline-offset:2px}

.states-controls{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:12px}
.states-count{font-family:var(--font-mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--evergreen);font-weight:600}
.states-actions{display:flex;gap:12px}
.text-btn{background:none;border:none;color:var(--evergreen);font-family:var(--font-ui);font-size:13px;font-weight:500;cursor:pointer;padding:6px 4px;text-decoration:underline;text-underline-offset:3px}
.text-btn:hover{color:var(--text-strong)}
.states-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(64px,1fr));gap:8px}
.state-pill{background:var(--white);border:1.5px solid var(--border-hairline);border-radius:12px;padding:14px 4px;font-family:var(--font-mono);font-size:13px;font-weight:600;color:var(--text-strong);letter-spacing:.05em;cursor:pointer;transition:all .14s var(--ease-standard);min-height:48px;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.state-pill:hover{border-color:var(--evergreen);background:var(--evergreen-soft)}
.state-pill.is-active{border-color:var(--evergreen);background:var(--evergreen);color:#fff}
.state-pill:focus-visible{outline:3px solid var(--evergreen);outline-offset:2px}

.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.contact-grid .field{display:flex;flex-direction:column}
.contact-grid label{font-family:var(--font-ui);font-size:12px;font-weight:600;color:var(--text-muted);letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px}
.contact-grid input{width:100%;font-family:var(--font-ui);font-size:16px;padding:14px 16px;border:1.5px solid var(--border-hairline);border-radius:12px;background:var(--white);color:var(--text-strong);min-height:52px}
.contact-grid input:focus{outline:3px solid var(--evergreen);outline-offset:1px;border-color:var(--evergreen)}
.contact-consent{grid-column:1 / -1;font-size:12px;color:var(--text-muted);line-height:1.5;margin-top:6px}

@media (max-width:720px){
  .wizard-shell{padding:0 0 64px}
  .wizard{padding:16px 12px 0}
  .wizard-card{padding:24px 20px;border-radius:20px}
  .wizard-heading{font-size:24px}
  .wizard-helper{font-size:14px;margin-bottom:22px}
  .wizard-body{min-height:auto}
  .wizard-footer{flex-direction:column-reverse;gap:12px;padding-top:18px}
  .wizard-footer .pill,.wizard-footer .pill-ghost{width:100%;text-align:center;justify-content:center;padding:16px 22px;font-size:15px;min-height:52px}
  .pill-grid{grid-template-columns:1fr;gap:10px}
  .pill-grid-2{grid-template-columns:1fr 1fr;max-width:none}
  .pill-choice{padding:16px 18px;min-height:52px;font-size:15px}
  .states-grid{grid-template-columns:repeat(5,1fr);gap:6px}
  .text-btn{padding:12px 8px;min-height:44px}
  .state-pill{padding:12px 2px;font-size:12px;min-height:44px;border-radius:10px}
  .contact-grid{grid-template-columns:1fr;gap:14px}
  .contact-grid input{font-size:16px;padding:13px 14px}
}
`;
