import { PartnerNav } from "../../../_ds/kits/partners/PartnerNav";
import { wizardStyles } from "./wizardStyles";
import { PartnerApplyWizard } from "./PartnerApplyWizard";
import type { WizardConfig } from "./WizardConfig";

export function ApplyPageShell({ config }: { config: WizardConfig }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: wizardStyles }} />
      <PartnerNav
        secondaryHref={config.backHref}
        secondaryLabel={config.backLabel ?? "Back to overview"}
      />
      <div className="wizard-shell">
        <PartnerApplyWizard config={config} />
      </div>
    </>
  );
}
