import ServiceHero from "@/app/services/components/ServiceHero";
import ServiceDetail from "@/app/services/components/ServiceDetail";
import CTA from "@/app/components/sections/CTA";

export const metadata = {
  title: "Tower Climbing & Work at Height Training | ISDC",
  description:
    "ISDC's 2-day certified Work at Height training — fall protection, harness fitting, tower climbing, anchor points & emergency rescue. DGFASLI compliant. Ideal for construction, telecom & power sectors.",
  keywords: [
    "work at height training India",
    "tower climbing certification",
    "fall protection training",
    "harness training",
    "height safety course",
    "DGFASLI work at height",
    "scaffold safety training",
    "aerial rescue training",
    "construction safety training",
  ],
  alternates: { canonical: "/services/height-safety" },
  openGraph: {
    title: "Tower Climbing & Work at Height Training | ISDC",
    description:
      "2-day certified Work at Height training — fall protection, harness fitting, tower climbing & emergency rescue. DGFASLI compliant.",
    url: "/services/height-safety",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tower Climbing & Work at Height Training | ISDC",
    description:
      "2-day certified Work at Height training — fall protection, harness fitting, tower climbing & emergency rescue.",
  },
};

const data = {
  intro:
    "ISDC's Work at Height training equips workers with the knowledge and practical skills to identify, prevent, and manage fall hazards across construction, telecom, power, and industrial environments. Delivered by gravity-certified trainers with extensive field exposure on some of India's most demanding worksites, this programme is built for real-world application, not just theory.",
  stats: [
    { value: "2 Days", label: "Training Duration" },
    { value: "Nationally Certified", label: "Certification Awarded" },
    { value: "Practical Focus", label: "Hands-On Training" },
    { value: "All Industries", label: "Sectors Covered" },
  ],
  modules: [
    {
      title: "Introduction to Fall Hazards",
      desc: "Understanding gravity risks, accident statistics, and the real cost of fall-related injuries across construction, telecom, and industrial worksites.",
    },
    {
      title: "Fall Protection Systems",
      desc: "PPE selection for height work, harness types, lanyards, self-retracting lifelines, and correct usage and inspection of each system.",
    },
    {
      title: "Anchor Points and Structural Integrity",
      desc: "Safe anchor point identification, load capacity requirements, structural assessment, and pre-use inspection protocols.",
    },
    {
      title: "Harness Inspection and Fitting",
      desc: "Pre-use inspection routines, donning and adjustment procedures, storage requirements, and rejection criteria for damaged harnesses.",
    },
    {
      title: "Tower Climbing Fundamentals",
      desc: "Safe climbing techniques for communication towers, wind masts, and industrial structures, including three-point contact and work positioning.",
    },
    {
      title: "Rescue Procedures at Height",
      desc: "Suspended victim rescue, retrieval system setup, emergency response planning, and coordination with ground teams.",
    },
    {
      title: "Scaffold Safety Basics",
      desc: "Types of scaffolding, inspection criteria, safe access and egress requirements, load limits, and tagging systems.",
    },
    {
      title: "Practical Assessment",
      desc: "Supervised on-site practicals covering equipment use, climbing sequences, rescue simulation, and a final theory examination.",
    },
  ],
  audience: [
    "Construction site workers and labourers",
    "Telecom tower technicians and climbers",
    "Power sector and wind energy field staff",
    "Scaffolding erectors and supervisors",
    "Safety officers and site managers",
    "Maintenance crews working at elevated levels",
  ],
  benefits: [
    "Nationally recognised Work at Height certificate",
    "Hands-on practicals with certified PPE and equipment",
    "DGFASLI-compliant curriculum",
    "Expert trainers with real-world field experience",
    "Covers both general height work and specialist tower climbing",
    "Immediate applicability on construction, telecom, and power sites",
  ],
  certText:
    "Participants receive a nationally recognised Work at Height certificate upon successful completion of both the theory examination and supervised practical assessment.",
};

export default function HeightSafetyPage() {
  return (
    <>
      <ServiceHero
        title="Tower Climbing & Work at Height"
        highlight="Work at Height"
        eyebrow="Height Safety Training"
        subtitle="Nationally certified training in fall protection, harness use, tower climbing, and emergency rescue, delivered by gravity-certified experts with proven field experience."
        breadcrumb="Tower Climbing & Work at Height"
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80"
      />
      <ServiceDetail data={data} />
      <CTA />
    </>
  );
}
