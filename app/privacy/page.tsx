import { SharedInfoPage } from "../shared-info-page";

export default function PrivacyPage() {
  return (
    <SharedInfoPage
      eyebrow="Privacy"
      title="Privacy should be understandable before it is accepted."
      intro="This launch version of the site is intentionally lightweight. It functions primarily as a publisher-network overview, with limited direct data collection on the homepage itself."
      sections={[
        {
          heading: "Information we may collect",
          body: [
            "Basic analytics, device information, and referral data may be collected to understand site performance, traffic quality, and general audience behavior.",
            "If future forms, newsletters, or partner workflows are added, those experiences should disclose what data is collected and why.",
          ],
        },
        {
          heading: "How information is used",
          body: [
            "Operational data may be used to maintain the site, improve content, detect abuse, and understand which topics or entry points are most useful to readers.",
          ],
        },
        {
          heading: "Third parties",
          body: [
            "External links to network brands or partner platforms are governed by the policies of those destinations. Visiting an external site means its own terms and privacy practices apply.",
          ],
        },
      ]}
    />
  );
}
