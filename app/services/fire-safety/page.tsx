import ServiceHero from "@/app/services/components/ServiceHero";
import ServiceDetail from "@/app/services/components/ServiceDetail";
import CTA from "@/app/components/sections/CTA";

export const metadata = {
  title: "Fire Safety Training & Audit | ISDC",
  description: "ISDC delivers Basic and Advanced certified fire safety training covering fire classification, extinguisher use, emergency evacuation, and systematic fire risk audits for all premises.",
};

const data = {
  intro:
    "ISDC's Fire Safety training programme is available at Basic (1 day) and Advanced (2 day) levels, giving organisations the flexibility to train all employees, regardless of their role or prior knowledge. From understanding fire science to conducting systematic fire risk audits, the programme is designed to build genuine preparedness, not just checkbox compliance.",
  stats: [
    { value: "1 or 2 Days", label: "Course Duration" },
    { value: "Basic and Advanced", label: "Levels Available" },
    { value: "Nationally Certified", label: "Certification Awarded" },
    { value: "Audit Included", label: "Advanced Level Feature" },
  ],
  modules: [
    {
      title: "Fire Science and Combustion",
      desc: "Principles of fire, the fire triangle, heat transfer methods, and how fires spread in different materials and environments.",
    },
    {
      title: "Fire Classification and Identification",
      desc: "Class A through F fires, common ignition sources, and industry-specific fire risks encountered in factories, offices, and warehouses.",
    },
    {
      title: "Fire Extinguisher Selection and Use",
      desc: "Matching extinguisher type to fire class, the PASS technique, safe discharge distances, and limitations of portable equipment.",
    },
    {
      title: "Emergency Evacuation Planning",
      desc: "Assembly point designation, evacuation route mapping, roles and duties of fire wardens, and conducting effective fire drills.",
    },
    {
      title: "Fire Detection and Suppression Systems",
      desc: "Overview of alarm systems, sprinkler systems, suppression agents, and basic maintenance responsibilities for non-technical staff.",
    },
    {
      title: "Fire Risk Assessment",
      desc: "Systematic assessment methodology for identifying fire hazards, evaluating risk levels, implementing controls, and creating compliant documentation.",
    },
    {
      title: "Practical Drills and Exercises",
      desc: "Hands-on extinguisher operation on live fire simulators, full evacuation practice, and post-incident reporting procedures.",
    },
  ],
  audience: [
    "Factory, warehouse, and industrial workers",
    "Office staff and building occupants",
    "Fire wardens and emergency response team members",
    "Facility managers and building owners",
    "Safety officers and HSE professionals",
    "Hotels, hospitals, schools, and public venue staff",
  ],
  benefits: [
    "Basic (1 day) and Advanced (2 day) levels available",
    "Nationally recognised Fire Safety certificate",
    "Hands-on live fire drill with real extinguishers",
    "Fire audit methodology covered in Advanced level",
    "DGFASLI-compliant curriculum",
    "Trusted by industries and institutions across India",
  ],
  certText:
    "Participants receive a nationally recognised Fire Safety certificate. Advanced level graduates are also qualified to conduct systematic fire risk audits for commercial and industrial premises.",
};

export default function FireSafetyPage() {
  return (
    <>
      <ServiceHero
        title="Fire Safety Training & Audit"
        highlight="Fire Safety"
        eyebrow="Fire Safety Training"
        subtitle="Basic and Advanced certified fire safety programmes covering fire science, extinguisher use, emergency evacuation, and fire risk audits for all industries and premises."
        breadcrumb="Fire Safety Training"
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80"
      />
      <ServiceDetail data={data} />
      <CTA />
    </>
  );
}
