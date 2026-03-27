import ServiceHero from "@/app/services/components/ServiceHero";
import ServiceDetail from "@/app/services/components/ServiceDetail";
import CTA from "@/app/components/sections/CTA";

export const metadata = {
  title: "Defensive Driving & Road Safety Training | ISDC",
  description: "ISDC's Defensive Driving training reduces motor vehicle accidents through classroom, visual, and multimedia training trusted by Fortune 100 corporations, SMEs, and NGOs across India.",
};

const data = {
  intro:
    "Motor vehicle accidents remain one of the leading causes of workplace fatalities in India. ISDC's Defensive Driving programme reduces collision risk by building hazard perception, disciplined road behaviour, and emergency response skills in every driver. Trusted by Fortune 100 corporations, government departments, SMEs, and NGOs, the programme delivers measurable reductions in accident rates, insurance claims, and vehicle repair costs.",
  stats: [
    { value: "1 Day", label: "Training Duration" },
    { value: "Nationally Certified", label: "Certification Awarded" },
    { value: "Multimedia", label: "Training Method" },
    { value: "All Vehicle Types", label: "Fleet Coverage" },
  ],
  modules: [
    {
      title: "Road Safety Fundamentals",
      desc: "Indian and global road accident statistics, human factors in collisions, speed management, and the true financial and human cost of road accidents.",
    },
    {
      title: "Defensive Driving Principles",
      desc: "Hazard perception and anticipation techniques, the 2 and 3 second following rule, space management, and reading the road environment ahead.",
    },
    {
      title: "Vehicle Pre-Inspection",
      desc: "Systematic daily walkaround inspection covering tyres, brakes, lights, mirrors, fluid levels, and documentation of defects before departure.",
    },
    {
      title: "Urban and Highway Driving",
      desc: "Junction approach and exit safety, lane discipline, safe overtaking procedures, managing high-speed motorway environments, and roundabout rules.",
    },
    {
      title: "Night Driving and Adverse Weather",
      desc: "Reduced visibility techniques, wet and slippery road braking distances, fog light use, and adjusting speed and following distance in poor conditions.",
    },
    {
      title: "Distraction and Fatigue Management",
      desc: "Mobile phone and in-vehicle device risks, fatigue recognition and mitigation, scheduling mandatory rest breaks, and the dangers of microsleep.",
    },
    {
      title: "Emergency Braking and Skid Control",
      desc: "Controlled braking on ABS and non-ABS vehicles, skid identification and recovery techniques, and evasive steering manoeuvres.",
    },
    {
      title: "Accident Reporting and Legal Requirements",
      desc: "Post-accident safety procedures, Motor Vehicles Act notification obligations, insurance reporting, and completing the company accident register.",
    },
  ],
  audience: [
    "Corporate fleet and company vehicle drivers",
    "Logistics, transport, and delivery professionals",
    "NGO and government department vehicle operators",
    "School bus and public transport drivers",
    "Construction and project site vehicle operators",
    "Any employee who drives as part of their job role",
  ],
  benefits: [
    "Trusted by Fortune 100 corporations, SMEs, and NGOs across India",
    "Nationally recognised Defensive Driving certificate",
    "Multimedia training with classroom, visual, and practical elements",
    "Measurable reduction in accident rates and insurance claims",
    "Covers cars, trucks, buses, and light commercial vehicles",
    "Practical hazard perception and emergency technique drills included",
  ],
  certText:
    "Participants receive a nationally recognised Defensive Driving certificate. The programme is accredited and trusted by leading corporations across India for fleet safety compliance and insurance requirement fulfilment.",
};

export default function DefensiveDrivingPage() {
  return (
    <>
      <ServiceHero
        title="Defensive Driving & Road Safety"
        highlight="Defensive Driving"
        eyebrow="Road Safety Training"
        subtitle="Multimedia defensive driving training trusted by Fortune 100 companies, SMEs, and NGOs. Reduces accident rates, insurance costs, and vehicle damage across all fleet types."
        breadcrumb="Defensive Driving"
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80"
      />
      <ServiceDetail data={data} />
      <CTA />
    </>
  );
}
