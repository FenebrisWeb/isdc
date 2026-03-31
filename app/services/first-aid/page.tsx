import ServiceHero from "@/app/services/components/ServiceHero";
import ServiceDetail from "@/app/services/components/ServiceDetail";
import CTA from "@/app/components/sections/CTA";

export const metadata = {
  title: "First Aid Training | ISDC",
  description:
    "ISDC's 1-2 day certified First Aid training delivered by WHO-certified doctors — CPR, AED, BLS, wound care, fractures, burns, cardiac emergencies & workplace accident response. Nationally recognised certificate.",
  keywords: [
    "first aid training India",
    "CPR training certification",
    "AED training",
    "basic life support training",
    "first aid certification WHO",
    "workplace first aid training",
    "emergency response training",
    "first aid course Noida",
    "corporate first aid training",
  ],
  alternates: { canonical: "/services/first-aid" },
  openGraph: {
    title: "First Aid Training | ISDC",
    description:
      "1-2 day certified First Aid training by WHO-certified doctors — CPR, AED, BLS, wound care & emergency response. Nationally recognised.",
    url: "/services/first-aid",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "First Aid Training | ISDC",
    description:
      "1-2 day certified First Aid training by WHO-certified doctors — CPR, AED, BLS, wound care & emergency response.",
  },
};

const data = {
  intro:
    "ISDC's First Aid training is delivered by WHO-certified medical doctors, ensuring participants receive clinically accurate instruction that meets international standards. The programme covers immediate response from minor workplace incidents to major trauma, giving employees the confidence and competence to act effectively when it matters most.",
  stats: [
    { value: "1 to 2 Days", label: "Training Duration" },
    { value: "WHO Certified", label: "Delivered By Doctors" },
    { value: "Hands-On", label: "Practical Sessions" },
    { value: "All Industries", label: "Sectors Covered" },
  ],
  modules: [
    {
      title: "First Aid Fundamentals",
      desc: "Principles of first aid, the primary survey (DR ABC), scene safety assessment, and how to summon emergency services effectively.",
    },
    {
      title: "Basic Life Support",
      desc: "Adult and child CPR techniques, rescue breathing, and an introduction to Automated External Defibrillators (AED) and when to use them.",
    },
    {
      title: "Wound Care and Bleeding Control",
      desc: "Cleaning and dressing open wounds, applying pressure to control severe bleeding, tourniquet application, and preventing infection.",
    },
    {
      title: "Fractures, Dislocations and Sprains",
      desc: "Recognising bone and joint injuries, safe immobilisation using splints and slings, and safe casualty movement techniques.",
    },
    {
      title: "Burns and Electrical Injuries",
      desc: "Classification of thermal, chemical, and electrical burns, immediate cooling and dressing procedures, and when to seek advanced care.",
    },
    {
      title: "Road and Workplace Accident Response",
      desc: "Triage basics for multi-casualty incidents, managing trauma at accident scenes, and safe extraction without causing further harm.",
    },
    {
      title: "Cardiac and Medical Emergencies",
      desc: "Recognising heart attack, stroke, seizure, and diabetic emergencies, and knowing which immediate interventions to apply.",
    },
    {
      title: "Incident Reporting and Documentation",
      desc: "Completing the accident register, first aid record-keeping requirements, and notifying supervisors and relevant authorities.",
    },
  ],
  audience: [
    "HR managers and workplace safety officers",
    "Construction site and industrial workers",
    "School, college, and institution staff",
    "Drivers and transport professionals",
    "Healthcare support and facility management teams",
    "Any employee wanting life-saving emergency response skills",
  ],
  benefits: [
    "Delivered by WHO-certified medical doctors",
    "Nationally recognised First Aid certificate",
    "Practical manikin and scenario-based sessions",
    "Covers workplace, road, and home emergencies",
    "Reduces injury severity and recovery time",
    "Meets statutory requirements for workplace first aid provision",
  ],
  certText:
    "Participants receive a nationally recognised First Aid certificate, delivered and endorsed by WHO-certified doctors. Annual refresher programmes are available to keep certification current.",
};

export default function FirstAidPage() {
  return (
    <>
      <ServiceHero
        title="First Aid Training"
        highlight="First Aid"
        eyebrow="Occupational Health Training"
        subtitle="Certified First Aid training delivered by WHO-certified doctors, covering life support, wound care, fractures, burns, cardiac emergencies, and workplace accident response."
        breadcrumb="First Aid Training"
        image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80"
      />
      <ServiceDetail data={data} />
      <CTA />
    </>
  );
}
