import { SharedInfoPage } from "../shared-info-page";

export default function DisclosurePage() {
  return (
    <SharedInfoPage
      eyebrow="Disclosures"
      title="Editorial information may exist alongside commercial relationships."
      intro="Simple Media Network operates as an educational publisher. Some parts of the broader network may work with partners, platforms, or service providers related to the topics covered on the site."
      sections={[
        {
          heading: "How to read the site",
          body: [
            "Homepage and editorial content are intended to help readers understand systems, terminology, and decision frameworks. They are not offers, solicitations, or individualized recommendations.",
          ],
        },
        {
          heading: "Potential relationships",
          body: [
            "A publication within the network may, now or in the future, maintain referral, technology, advertising, or data relationships with outside organizations.",
            "Where a material relationship affects a specific page or experience, that relationship should be disclosed in context.",
          ],
        },
        {
          heading: "Reader responsibility",
          body: [
            "Readers remain responsible for evaluating their own circumstances and for consulting qualified professionals when legal, financial, medical, or tax advice is required.",
          ],
        },
      ]}
    />
  );
}
