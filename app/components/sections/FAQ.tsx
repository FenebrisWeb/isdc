"use client";

import { useState } from "react";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const faqs = [
  {
    q: "What is ISDC and when was it founded?",
    a: "ISDC — Industrial Safety Development Council — was founded in 2008 by three safety experts each with over a decade of field experience. Starting with a team of five, ISDC has grown to 80+ internal staff and certified trainers. We have delivered 150,000+ training sessions and trained 10,000+ professionals across India, earning ISO 9001, ISO 14001, and OHSAS 45001 certifications along the way.",
  },
  {
    q: "What training programs does ISDC offer?",
    a: "ISDC offers a comprehensive range of EHS programs including Work at Height, Tower Climbing, Material Lifting, First Aid, Ergonomics, Behaviour Based Safety, Stress Management, Emergency Preparedness, Fire Safety, Scaffolding, Confined Space Entry, and Defensive Driving & Road Safety. We are a one-stop solution for all occupational health, safety, and environment training needs.",
  },
  {
    q: "Is training delivered at our site or at an ISDC centre?",
    a: "Both. ISDC delivers training at client premises — factories, construction sites, office campuses, government facilities — as well as at our own training centres in Delhi-NCR (Noida and Sahibabad), with branch offices in Dhanbad (Jharkhand) and Ahmedabad (Gujarat). The format is agreed with the client based on workforce size and operational constraints.",
  },
  {
    q: "Which industries does ISDC serve?",
    a: "ISDC serves a broad cross-section of industries including chemical, construction, oil & gas, power distribution, manufacturing, healthcare, education, government departments, and logistics/fleet operations. Our clients range from Fortune 100 corporations and public sector undertakings to SMEs, nonprofits, and community service organisations.",
  },
  {
    q: "Who are the trainers at ISDC?",
    a: "Our panel of experts includes internationally certified professionals — NEBOSH Diploma holders, Members of the Institution of Fire Engineers (UK), Lead Auditors for OHSAS 18001 and ISO 14001, a retired Indian Air Force Wing Commander, a Gravity-certified height safety specialist, and WHO-certified doctors for First Aid. All trainers combine academic credentials with years of real field experience.",
  },
  {
    q: "Do participants receive a certificate after completing training?",
    a: "Yes. All participants who successfully complete an ISDC program receive a certificate of completion. Programmes such as Behaviour Based Safety award internationally recognised certifications. Fire Safety courses — offered at Basic (1-day) and Advanced (2-day) levels — include certification for workers and supervisors/engineers respectively.",
  },
  {
    q: "How long do the training courses take?",
    a: "Duration varies by programme. Fire Safety Basic is 1 day; Fire Safety Advanced is 2 days. Other programmes such as Confined Space, Work at Height, and Scaffolding are typically 1–2 days depending on the scope agreed. Emergency Preparedness includes live mock drills. Contact us for a detailed schedule tailored to your organisation's size and requirements.",
  },
  {
    q: "Can training be customised for our organisation?",
    a: "Absolutely. ISDC designs every programme around the specific hazards, regulatory obligations, and workforce profile of the client. Behaviour Based Safety training, for instance, is explicitly customised per client work environment. We assess your site, identify relevant risks, and tailor curriculum, delivery format, and assessment methods accordingly.",
  },
  {
    q: "Does ISDC conduct safety audits in addition to training?",
    a: "Yes. ISDC offers EHS audit and compliance services including fire safety audits (a systematic and independent evaluation of fire risks with control-measure recommendations), health & safety audits aligned with IS 14489:1988, ISO 14001, and OHSAS 18001. We also provide industrial tools testing and audit services.",
  },
  {
    q: "What is Behaviour Based Safety and why does it matter?",
    a: "Research shows that approximately 80% of workplace accidents result from unsafe behaviours rather than unsafe physical conditions. Behaviour Based Safety (BBS) training targets this root cause — building hazard recognition skills, increasing safety motivation, and embedding a positive safety culture. ISDC delivers BBS at Basic and Advanced levels, with internationally recognised certification awarded on completion.",
  },
  {
    q: "How do I get started or enrol my team?",
    a: "The process is simple: fill out an enquiry form on our website or call/WhatsApp us at +91-9555520299. Our team will schedule a consultation call to understand your requirements, after which we propose a customised training plan. Once agreed, your team completes the training and receives certification. You can also email us at info@isdcouncil.co.in.",
  },
  {
    q: "Does ISDC provide post-training support?",
    a: "Yes. ISDC's relationship with clients extends beyond the training room. We assist with statutory mock drill compliance (mandatory every 6 months for Emergency Preparedness), follow-up audits, refresher programmes, and ongoing EHS advisory. Over 200 organisations are regular ISDC clients — a reflection of the long-term partnerships we build.",
  },
];

const left  = faqs.slice(0, 6);
const right = faqs.slice(6);

function AccordionItem({ item, index, open, onToggle }: {
  item: typeof faqs[0];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-colors duration-300 ${open ? "border-primary/30 bg-primary/[0.03]" : "border-gray-100 bg-white hover:border-gray-200"}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 px-5 py-4 text-left cursor-pointer"
      >
        <span
          className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black transition-colors duration-300 ${open ? "bg-primary text-white" : "bg-gray-100 text-dark"}`}
        >
          {index + 1}
        </span>
        <span className={`flex-1 text-sm font-bold leading-snug transition-colors duration-200 ${open ? "text-primary" : "text-dark"}`}>
          {item.q}
        </span>
        <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}>
          <svg className={`w-4 h-4 transition-colors duration-200 ${open ? "text-primary" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
          </svg>
        </span>
      </button>

      {/* smooth height transition via grid rows trick */}
      <div
        className="grid transition-all duration-400 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 pt-0 text-dark text-sm leading-relaxed pl-14">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* header */}
        <AnimateOnScroll animation="fadeUp" className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-secondary" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">FAQ</span>
            <span className="h-px w-10 bg-secondary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-dark leading-[1.08] tracking-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-dark text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about ISDC's training programs, certifications, and services.
          </p>
        </AnimateOnScroll>

        {/* two-column accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

          {/* left column */}
          <AnimateOnScroll animation="fadeRight" className="flex flex-col gap-3">
            {left.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                open={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </AnimateOnScroll>

          {/* right column */}
          <AnimateOnScroll animation="fadeLeft" delay={80} className="flex flex-col gap-3">
            {right.map((item, i) => (
              <AccordionItem
                key={i + 6}
                item={item}
                index={i + 6}
                open={openIndex === i + 6}
                onToggle={() => toggle(i + 6)}
              />
            ))}
          </AnimateOnScroll>

        </div>

      </div>
    </section>
  );
}
