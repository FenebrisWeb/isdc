import ServiceHero from "@/app/services/components/ServiceHero";
import EHSPackageOverview from "@/app/services/components/EHSPackageOverview";
import Outsourcing from "@/app/services/components/Outsourcing";
import CTA from "@/app/components/sections/CTA";

export const metadata = {
  title: "Complete EHS Services & Package | ISDC",
  description: "ISDC provides comprehensive Environment, Health & Safety services including training, outsourcing, compliance, and complete EHS packages for construction and industrial sites.",
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
