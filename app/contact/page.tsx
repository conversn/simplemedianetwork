import { SharedInfoPage } from "../shared-info-page";

export default function ContactPage() {
  return (
    <SharedInfoPage
      eyebrow="Contact"
      title="For editorial, network, or partnership questions."
      intro="Simple Media Network is being launched as a shared-infrastructure Next.js property. This page is a placeholder contact surface until the production inbox and routing rules are finalized."
      sections={[
        {
          heading: "Current contact path",
          body: [
            "For launch-stage inquiries, route messages through the existing CallReady operating channels you already use for publisher and platform work.",
          ],
        },
        {
          heading: "Recommended next step",
          body: [
            "Once domain and inbox ownership are finalized, replace this page with the canonical public contact address, press inquiry workflow, and any required legal business details.",
          ],
        },
      ]}
    />
  );
}
