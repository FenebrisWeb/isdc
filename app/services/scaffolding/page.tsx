import ServiceHero from "@/app/services/components/ServiceHero";
import ServiceDetail from "@/app/services/components/ServiceDetail";
import CTA from "@/app/components/sections/CTA";

export const metadata = {
  title: "Scaffolding Safety Training | ISDC",
  description:
    "ISDC's 2-3 day certified Scaffolding Safety training — safe erection, load calculation, inspection, tagging & dismantling. IS code & Factories Act compliant. Nationally recognised certificate.",
  keywords: [
    "scaffolding safety training India",
    "scaffold erection training",
    "scaffolding inspection course",
    "IS code scaffolding",
    "Factories Act scaffolding",
    "scaffolding certification India",
    "construction safety scaffolding",
    "scaffold dismantling training",
  ],
  alternates: { canonical: "/services/scaffolding" },
  openGraph: {
    title: "Scaffolding Safety Training | ISDC",
    description:
      "2-3 day certified Scaffolding Safety training — safe erection, load calculation, inspection & dismantling. IS code & Factories Act compliant.",
    url: "/services/scaffolding",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scaffolding Safety Training | ISDC",
    description:
      "2-3 day certified Scaffolding Safety training — safe erection, load calculation, inspection & dismantling.",
  },
};

const data = {
  intro:
    "ISDC's Scaffolding Safety training provides workers and supervisors with the practical skills and statutory knowledge required to erect, inspect, and dismantle scaffolding structures safely. The programme follows Indian Standard codes and Factories Act provisions, giving participants a certification that is recognised across construction, infrastructure, and industrial projects nationwide.",
  stats: [
    { value: "2 to 3 Days", label: "Training Duration" },
    { value: "Nationally Certified", label: "Certification Awarded" },
    { value: "Practical Sessions", label: "On-Site Training" },
    { value: "All Industries", label: "Sectors Covered" },
  ],
  modules: [
    {
      title: "Introduction to Scaffolding",
      desc: "Types of scaffolding systems (tube-and-coupler, system, putlog, suspended), component names, terminology, and statutory requirements.",
    },
    {
      title: "Material Inspection and Storage",
      desc: "Inspecting tubes, couplers, boards, and base plates before use, identifying and rejecting defective components, and correct storage practices.",
    },
    {
      title: "Safe Erection Procedures",
      desc: "Step-by-step erection sequence, setting base plates and sole boards, ledger and transom placement, bracing, tying, and anchoring to structure.",
    },
    {
      title: "Load Calculation and Stability",
      desc: "Understanding working loads, distributed and point load limits, ground condition assessment, and foundation requirements for stable scaffolding.",
    },
    {
      title: "Scaffold Inspection Checklist",
      desc: "Pre-use, weekly, and post-modification inspection protocols, completing inspection records, and the scaffold tagging (Green/Red) system.",
    },
    {
      title: "Safe Access and Egress",
      desc: "Ladder positioning and securing, stair tower construction, trap door management, and preventing unauthorised access to incomplete scaffolds.",
    },
    {
      title: "Dismantling Procedures",
      desc: "Safe dismantling sequence, top-down removal, controlled lowering of materials, housekeeping during dismantling, and site clearance.",
    },
    {
      title: "Statutory Compliance",
      desc: "IS code requirements for scaffolding, Factories Act provisions, permit-to-erect systems, and documentation requirements for project records.",
    },
  ],
  audience: [
    "Scaffolding erectors and scaffolders",
    "Site supervisors and safety officers",
    "Civil contractors and project managers",
    "Construction labourers working near scaffold structures",
    "Maintenance teams at industrial and power plants",
    "Infrastructure, telecom, and high-rise project workers",
  ],
  benefits: [
    "Nationally recognised Scaffolding Safety certificate",
    "Hands-on practical sessions at real or simulated sites",
    "Compliant with IS codes and Factories Act provisions",
    "Expert trainers with construction industry experience",
    "Inspection and tagging system training included",
    "Full coverage of erection and dismantling procedures",
  ],
  certText:
    "Graduates receive a nationally recognised Scaffolding Safety certificate covering erection, inspection, and dismantling, meeting the requirements of Indian statutory scaffolding and Factories Act regulations.",
};

export default function ScaffoldingPage() {
  return (
    <>
      <ServiceHero
        title="Scaffolding Safety Training"
        highlight="Scaffolding Safety"
        eyebrow="Construction Safety Training"
        subtitle="Nationally certified scaffolding training covering safe erection, inspection, load limits, and dismantling procedures, fully compliant with IS codes and the Factories Act."
        breadcrumb="Scaffolding Training"
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80"
      />
      <ServiceDetail data={data} />
      <CTA />
    </>
  );
}
