import { SharedInfoPage } from "../shared-info-page";

export default function EditorialPrinciplesPage() {
  return (
    <SharedInfoPage
      eyebrow="Editorial Principles"
      title="Clarity, independence, and restraint are the operating standard."
      intro="Simple Media Network publishes educational guidance for consequential decisions. The editorial system is designed to explain how decisions work before anyone is asked to take action."
      sections={[
        {
          heading: "Independence",
          body: [
            "Our editorial content is built to stand apart from commercial execution. Education and action are intentionally separated so informational content can remain neutral, useful, and readable on its own terms.",
            "We do not frame content as personalized advice, and we do not position editorial pages as sales environments.",
          ],
        },
        {
          heading: "Standards",
          body: [
            "Articles are written in plain language, reviewed for factual accuracy, and updated when systems, products, or regulations materially change.",
            "We prioritize mechanics, tradeoffs, and definitions over hype, urgency, or exaggerated claims.",
          ],
        },
        {
          heading: "Audience Trust",
          body: [
            "The network is designed for readers navigating high-stakes life and business decisions. That requires calm language, clear disclosures, and a refusal to blur explanation with promotion.",
          ],
        },
      ]}
    />
  );
}
