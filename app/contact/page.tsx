import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Get a Free EHS Training Proposal",
  description:
    "Get in touch with ISDC's EHS training experts. Request a free proposal for fire safety, first aid, scaffolding, confined space, work at height, or defensive driving training. 24-hour response guaranteed.",
  keywords: [
    "contact ISDC",
    "EHS training enquiry",
    "safety training quote India",
    "request training proposal",
    "industrial safety training contact",
    "Noida EHS training",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact ISDC - Get a Free EHS Training Proposal",
    description:
      "Request a free, tailored EHS training proposal. Our experts respond within 24 hours. ISO 9001 certified.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    title: "Contact ISDC - Get a Free EHS Training Proposal",
    description:
      "Request a free, tailored EHS training proposal. Our experts respond within 24 hours.",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
