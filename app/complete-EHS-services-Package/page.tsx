import ServiceHero from "@/app/services/components/ServiceHero";
import EHSPackageOverview from "@/app/services/components/EHSPackageOverview";
import Outsourcing from "@/app/services/components/Outsourcing";
import CTA from "@/app/components/sections/CTA";

export const metadata = {
  title: "Complete EHS Services & Package | ISDC",
  description:
    "ISDC's Complete EHS Services Package — end-to-end Environment, Health & Safety training, outsourcing, auditing & compliance for construction, mining, oil & gas, and industrial sites. ISO 9001 certified.",
  keywords: [
    "complete EHS services India",
    "EHS outsourcing India",
    "environment health safety package",
    "EHS compliance India",
    "industrial EHS services",
    "safety management outsourcing",
    "EHS audit India",
    "construction EHS services",
    "oil gas safety services",
  ],
  alternates: { canonical: "/complete-EHS-services-Package" },
  openGraph: {
    title: "Complete EHS Services & Package | ISDC",
    description:
      "End-to-end EHS training, outsourcing, auditing & compliance for construction, mining, oil & gas, and industrial sites. ISO 9001 certified.",
    url: "/complete-EHS-services-Package",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete EHS Services & Package | ISDC",
    description:
      "End-to-end EHS training, outsourcing, auditing & compliance for industrial sites. ISO 9001 certified.",
  },
};

export default function CompleteEHSServicesPage() {
  return (
    <>
      <ServiceHero
        title="Complete EHS Services & Package"
        highlight="EHS Services"
        eyebrow="Our Services"
        subtitle="Quality and state-of-the-art EHS solutions for construction projects and operation industries across India and abroad — from mining and oil & gas to power and high-tech installations."
        breadcrumb="Complete EHS Services & Package"
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80"
      />
      <EHSPackageOverview />
      <Outsourcing />
      <CTA />
    </>
  );
}
