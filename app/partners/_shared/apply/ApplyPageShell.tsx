import { partnerLanderStyles } from "../styles";
import { wizardStyles } from "./wizardStyles";
import { PartnerApplyWizard } from "./PartnerApplyWizard";
import type { WizardConfig } from "./WizardConfig";

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";

export function ApplyPageShell({ config }: { config: WizardConfig }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONTS_HREF} />
      <style dangerouslySetInnerHTML={{ __html: partnerLanderStyles }} />
      <style dangerouslySetInnerHTML={{ __html: wizardStyles }} />

      <div className="smn-partner">
        <div className="wizard-shell">
          <header className="wizard-topbar">
            <a
              href="/partners"
              className="brand"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Simple Media Network
              <small>Partner Program</small>
            </a>
            <a href={config.backHref}>
              ← {config.backLabel ?? "Back to overview"}
            </a>
          </header>
          <PartnerApplyWizard config={config} />
        </div>
      </div>
    </>
  );
}
