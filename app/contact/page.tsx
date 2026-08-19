import type { Metadata } from "next";

import { SharedInfoPage } from "../shared-info-page";

const CONTACT_EMAIL = "hello@simplemedianetwork.com";

export const metadata: Metadata = {
  title: "Contact — Simple Media Network",
  description:
    "How to reach Simple Media Network for editorial, partnership, press, and privacy inquiries.",
};

function MailLink() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--text-strong)", textDecoration: "underline" }}>
      {CONTACT_EMAIL}
    </a>
  );
}

export default function ContactPage() {
  return (
    <SharedInfoPage
      eyebrow="Contact"
      title="For editorial, network, or partnership questions."
      intro="Simple Media Network owns and operates consumer brands across money, retirement, family, legal, and business decisions. Use the paths below and we'll route your message to the right team."
      sections={[
        {
          heading: "General and editorial",
          body: [
            <>Email <MailLink />. This is the inbox for editorial questions, corrections, press inquiries, and anything about the network as a whole.</>,
            <>For corrections, include the property, the page URL, and what you believe is inaccurate. Our approach to corrections is described in our editorial principles.</>,
          ],
        },
        {
          heading: "Partnerships",
          body: [
            <>Companies that want to buy consumer demand directly from the publisher should start at the <a href="/partners" style={{ color: "var(--text-strong)", textDecoration: "underline" }}>SMN Partner Program</a> and submit the availability form there. It captures the markets, verticals, and volume we need to respond usefully.</>,
            <>Partnership questions that don't fit the form can go to <MailLink />.</>,
          ],
        },
        {
          heading: "Privacy and data requests",
          body: [
            <>Data access, correction, and deletion requests go to <MailLink /> with &ldquo;Privacy request&rdquo; in the subject line. Details on what we collect are in our <a href="/privacy" style={{ color: "var(--text-strong)", textDecoration: "underline" }}>privacy policy</a>.</>,
          ],
        },
      ]}
    />
  );
}
