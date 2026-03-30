import dynamic from "next/dynamic";
import Hero from "@/app/components/sections/Hero";
import Stats from "@/app/components/sections/Stats";

// Lazy-load everything below the fold
const About           = dynamic(() => import("@/app/components/sections/About"),          { loading: () => <div className="h-[600px] bg-white" /> });
const Services        = dynamic(() => import("@/app/components/sections/Services"),        { loading: () => <div className="h-[600px] bg-gray-50" /> });
const WhyChooseUs     = dynamic(() => import("@/app/components/sections/WhyChooseUs"),     { loading: () => <div className="h-[600px] bg-white" /> });
const ClientWork      = dynamic(() => import("@/app/components/sections/ClientWork"),      { loading: () => <div className="h-[600px]" style={{ background: "#080C18" }} /> });
const PartnerLogos    = dynamic(() => import("@/app/components/sections/PartnerLogos"),    { loading: () => <div className="h-[260px] bg-white" /> });
const Reviews         = dynamic(() => import("@/app/components/sections/Reviews"),         { loading: () => <div className="h-[500px] bg-white" /> });
const MarqueeBanner   = dynamic(() => import("@/app/components/sections/MarqueeBanner"),   { loading: () => <div className="h-20" style={{ background: "#080C18" }} /> });
const TrainingGallery = dynamic(() => import("@/app/components/sections/TrainingGallery"), { loading: () => <div className="h-[500px] bg-dark" /> });
const FAQ             = dynamic(() => import("@/app/components/sections/FAQ"),             { loading: () => <div className="h-[600px] bg-white" /> });
const CTA             = dynamic(() => import("@/app/components/sections/CTA"),             { loading: () => <div className="h-[300px] bg-primary" /> });

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <PartnerLogos />
      <About />
      <Services />
      <WhyChooseUs />
      <ClientWork />
      <Reviews />
      <MarqueeBanner />
      <TrainingGallery />
      <FAQ />
      <CTA />
    </>
  );
}
