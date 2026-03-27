import ServiceHero from "@/app/services/components/ServiceHero";
import ServiceDetail from "@/app/services/components/ServiceDetail";
import CTA from "@/app/components/sections/CTA";

export const metadata = {
  title: "Confined Space Entry & Rescue Training | ISDC",
  description: "ISDC's Confined Space training covers atmospheric testing, permit-to-work, entrant and attendant roles, PPE selection, and emergency rescue, compliant with OISD and Factories Act.",
};

const data = {
  intro:
    "Confined spaces are among the most hazardous environments in industry, responsible for a disproportionate number of fatal accidents each year. ISDC's Confined Space training equips workers with the technical knowledge, procedural discipline, and practical rescue skills needed to enter, work in, and respond to emergencies inside permit-required confined spaces, fully aligned with OISD guidelines and the Factories Act.",
  stats: [
    { value: "2 Days", label: "Training Duration" },
    { value: "Nationally Certified", label: "Certification Awarded" },
    { value: "Rescue Practical", label: "Hands-On Training" },
    { value: "Oil, Gas and Chemical", label: "Key Sectors" },
  ],
  modules: [
    {
      title: "Confined Space Identification and Classification",
      desc: "Legal definition of a confined space, classification as permit-required or non-permit-required, and industry examples across oil, gas, chemical, and utility sectors.",
    },
    {
      title: "Atmospheric Hazards and Testing",
      desc: "Oxygen deficiency and enrichment, flammable vapour thresholds, toxic gas exposure limits, and practical use of multi-gas monitors.",
    },
    {
      title: "Permit-to-Work System",
      desc: "PTW structure, the authorisation and approval chain, isolation certificates, cold and hot work conditions, and formal cancellation procedures.",
    },
    {
      title: "Entrant and Attendant Roles",
      desc: "Duties, responsibilities, and limitations of the confined space entrant, attendant, and entry supervisor, including communication protocols and emergency triggers.",
    },
    {
      title: "PPE Selection and Usage",
      desc: "Respiratory protective equipment (RPE) types and limitations, full-body harness requirements, lifelines, and retrieval device setup.",
    },
    {
      title: "Ventilation and Gas Freeing",
      desc: "Forced and natural ventilation methods, purging, inerting, and atmosphere verification intervals before and during entry.",
    },
    {
      title: "Emergency Rescue Procedures",
      desc: "Non-entry retrieval techniques using tripods and winches, external rescue team activation, and managing the confined space casualty.",
    },
    {
      title: "Incident Reporting and Investigation",
      desc: "Recording near-misses and incidents, statutory reporting obligations under the Factories Act and OISD, and corrective action processes.",
    },
  ],
  audience: [
    "Oil and gas field workers and technicians",
    "Chemical and petrochemical plant employees",
    "Utility, water, and wastewater sector workers",
    "Maintenance and turnaround shutdown teams",
    "Safety officers and permit-to-work authorities",
    "Contractors entering tanks, vessels, sewers, and pipework",
  ],
  benefits: [
    "Nationally recognised Confined Space Entry and Rescue certificate",
    "Compliant with OISD, Petroleum Act, and Factories Act",
    "Hands-on rescue simulation with tripod and retrieval systems",
    "Multi-gas monitor operation training included",
    "Full permit-to-work system coverage",
    "Expert trainers from oil, gas, and chemical industry backgrounds",
  ],
  certText:
    "Participants receive a nationally recognised Confined Space Entry and Rescue certificate, meeting OISD, Petroleum Act, and Factories Act requirements for confined space operations.",
};

export default function ConfinedSpacePage() {
  return (
    <>
      <ServiceHero
        title="Confined Space Entry & Rescue"
        highlight="Confined Space"
        eyebrow="Industrial Safety Training"
        subtitle="Certified confined space training covering atmospheric hazards, permit-to-work systems, entrant and attendant roles, PPE, and emergency non-entry rescue procedures."
        breadcrumb="Confined Space Training"
        image="https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=1600&q=80"
      />
      <ServiceDetail data={data} />
      <CTA />
    </>
  );
}
