import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";
import CTA from "@/app/components/sections/CTA";

/* ── Timeline milestones ── */
const timeline = [
  {
    year: "2008",
    title: "ISDC Founded",
    body: "Three like-minded industrial safety experts, each with over a decade of field experience, came together to form ISDC with five founding team membersdriven by a shared mission to raise safety standards across Indian workplaces.",
    color: "#cc2128",
  },
  {
    year: "2012",
    title: "International Trainer Certification",
    body: "ISDC launched its flagship International Trainer Certification Programme on-site, training and certifying its safety trainers through internationally recognised pro-trainers. The programme has since run multiple times, continuously raising the quality of ISDC's training delivery.",
    color: "#257e43",
  },
  {
    year: "2015",
    title: "Expanding the Service Offering",
    body: "ISDC added Occupational Health & Wellness training to its portfolioaddressing ergonomics, stress management, and behavioural safety alongside its core EHS programmes. Defensive Driving & Road Safety training was also introduced, responding to growing demand from fleet-intensive industries.",
    color: "#fe5a0e",
  },
  {
    year: "Today",
    title: "India's Leading EHS Training Provider",
    body: "With 80+ internal staff and certified trainers, 200+ regular clients, 150,000+ training sessions delivered, and offices in Delhi-NCR, Dhanbad, and AhmedabadISDC is recognised as a one-stop solution for all EHS training requirements across corporate and government verticals.",
    color: "#1a7a8a",
  },
];

/* ── Three pillars ── */
const pillars = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    color: "#cc2128",
    title: "Who We Are",
    body: "A global leader in the field of environment, health & safetyestablished to combat the alarming increase of severe workplace accidents. ISDC was built on the belief that every worker deserves a safe environment, and every organisation deserves the expertise to provide one.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: "#257e43",
    title: "Our Commitment",
    body: "We have widened our EHS services across all corporate and industrial verticals to prevent hazardous accidents before they happen. Our programmes are designed to real international standardsISO 9001, ISO 14001, and OHSAS 45001delivered by certified professionals with genuine field experience.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.63 48.63 0 0112 20.904a48.63 48.63 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    color: "#fe5a0e",
    title: "Our Process",
    body: "ISDC provides learning solutions in EHS, soft skills, and high-end technology training. Our certified trainerstrained by international pro-trainersdeliver programmes on-site at client facilities or at our own training centres, tailored to the specific hazards and regulatory needs of each organisation.",
  },
];

/* ── Key numbers ── */
const numbers = [
  { value: "2008", label: "Year Founded" },
  { value: "80+",  label: "Staff & Trainers" },
  { value: "200+", label: "Regular Clients" },
  { value: "1,50,000+", label: "Training Sessions" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── same visual DNA as homepage Hero.tsx ── */}
      <section className="relative w-full overflow-hidden bg-dark" style={{ height: "clamp(520px, 70vh, 750px)" }}>

        {/* background image */}
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
          alt="ISDC About Us"
          fill
          className="object-cover scale-[1.04]"
          priority
        />

        {/* overlays */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(10,10,20,0.95) 30%, rgba(10,10,20,0.75) 60%, rgba(10,10,20,0.35) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,20,0.7) 0%, transparent 40%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(700px circle at 30% 50%, rgba(204,33,40,0.10) 0%, transparent 65%)" }} />

        {/* floating shapes */}
        {[
          { size: 480, left: "78%", top: "-8%",  opacity: 0.055, ring: true  },
          { size: 260, left: "88%", top: "55%",  opacity: 0.04,  ring: true  },
          { size: 160, left: "6%",  top: "12%",  opacity: 0.06,  ring: false },
          { size: 90,  left: "58%", top: "82%",  opacity: 0.09,  ring: false },
          { size: 320, left: "18%", top: "72%",  opacity: 0.035, ring: true  },
        ].map((s, i) => (
          <div key={i} className="absolute pointer-events-none" style={{ left: s.left, top: s.top, width: s.size, height: s.size, marginLeft: -(s.size / 2), marginTop: -(s.size / 2), opacity: s.opacity }}>
            {s.ring
              ? <div className="w-full h-full rounded-full border border-white hero-spin-slow" />
              : <div className="relative w-full h-full flex items-center justify-center"><div className="absolute w-full h-full rounded-full bg-primary/30 hero-ring-pulse" /><div className="w-1/3 h-1/3 rounded-full bg-white/60" /></div>
            }
          </div>
        ))}

        {/* corner brackets */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-primary/60 pointer-events-none" />
        <div className="absolute bottom-20 right-8 w-10 h-10 border-b-2 border-r-2 border-primary/60 pointer-events-none" />

        {/* content */}
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center">
          <div className="max-w-3xl">

            {/* breadcrumb */}
            <div className="hero-animate-badge flex items-center gap-2 text-xs text-white/40 font-medium mb-5">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/70">About Us</span>
            </div>

            {/* eyebrow */}
            <div className="hero-animate-badge flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-primary" />
              <span className="text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">About ISDC</span>
              <span className="h-px w-4 bg-primary/40" />
            </div>

            {/* heading */}
            <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-[3.6rem] font-black text-white leading-[1.08] tracking-tight mb-6">
              Educate, Prepare &amp;{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">Prevent</span>
                <span className="absolute bottom-0 left-0 h-[3px] w-full bg-primary rounded-full" style={{ animation: "fadeInLeft 0.6s ease 0.5s both" }} />
              </span>
            </h1>

            {/* subtitle */}
            <p className="hero-animate-sub text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mb-10">
              Established in 2008 with a prime aim to make every workplace safe. ISO 9001, ISO 14001 &amp; OHSAS 45001 certified, trusted by 200+ organisations across India.
            </p>

            {/* stat strip */}
            <div className="hero-animate-stat flex flex-wrap items-center gap-6">
              {numbers.map((n, i) => (
                <div key={n.label} className="flex items-center gap-6">
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-white leading-none">{n.value}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{n.label}</p>
                  </div>
                  {i < numbers.length - 1 && <div className="hidden sm:block w-px h-8 bg-white/10" />}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* bottom accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/8">
          <div className="h-full w-1/3 bg-primary" />
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateOnScroll animation="fadeUp" className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-secondary" />
              <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">Our Foundation</span>
              <span className="h-px w-10 bg-secondary" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-dark leading-[1.08] tracking-tight">
              What <span className="text-primary">Drives</span> Us
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <AnimateOnScroll key={i} animation="fadeUp" delay={i * 80}>
                <div className="relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 h-full">
                  {/* top accent */}
                  <div className="absolute top-0 left-7 right-7 h-[2px] rounded-full" style={{ background: p.color }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 mt-2" style={{ background: `${p.color}15`, color: p.color }}>
                    {p.icon}
                  </div>
                  <h3 className="text-dark font-black text-lg mb-3">{p.title}</h3>
                  <p className="text-dark text-sm leading-relaxed">{p.body}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY / TIMELINE ── */}
      <section className="py-20 lg:py-28 overflow-hidden" style={{ background: "#080C18" }}>
        {/* texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 56px)" }} />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateOnScroll animation="fadeUp" className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Our Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white leading-[1.08] tracking-tight">
              Changing the Landscape of <span className="text-primary">Safety</span>
            </h2>
            <p className="text-white text-sm mt-4 max-w-2xl leading-relaxed">
              Industrial Safety Development Council began its venture in 2008three like-minded safety experts with a shared goal of making a real difference in workplace safety across India and beyond.
            </p>
          </AnimateOnScroll>

          {/* timeline */}
          <div className="relative">
            {/* vertical linedesktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-px" />

            <div className="flex flex-col gap-12 lg:gap-0">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <AnimateOnScroll key={i} animation={isLeft ? "fadeRight" : "fadeLeft"} delay={i * 80}>
                    <div className={`relative lg:grid lg:grid-cols-2 lg:gap-16 items-center ${i > 0 ? "lg:-mt-4" : ""}`}>

                      {/* year dotdesktop */}
                      <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-4 h-4 rounded-full ring-4 ring-[#080C18]" style={{ background: item.color }} />
                      </div>

                      {/* contentalternates left/right */}
                      <div className={`${isLeft ? "lg:text-right lg:pr-8" : "lg:col-start-2 lg:pl-8"} lg:py-10`}>
                        <div className={`inline-flex items-center gap-2 mb-3 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                          <span
                            className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
                            style={{ background: `${item.color}20`, color: item.color }}
                          >
                            {item.year}
                          </span>
                        </div>
                        <h3 className="text-white font-black text-xl lg:text-2xl mb-3">{item.title}</h3>
                        <p className="text-white text-sm leading-relaxed max-w-lg">{item.body}</p>
                      </div>

                      {/* empty col for alternating layout */}
                      {isLeft && <div className="hidden lg:block" />}
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <AnimateOnScroll animation="fadeRight">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-primary" />
                <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Mission & Vision</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-dark leading-snug mb-6">
                We Are in Business to <span className="text-primary">Save Human Lives</span>
              </h2>
              <p className="text-dark text-sm leading-relaxed mb-4">
                ISDC was founded with a prime aimto impart safety training among workers and staff exposed to unchecked occupational hazards and the risk of fatal accidents. Our goal also includes training safety professionals, equipping them with the skills and knowledge to act with confidence and competence in responding to accidents.
              </p>
              <p className="text-dark text-sm leading-relaxed mb-4">
                As our motto says <span className="font-bold text-primary">"Educate, Prepare &amp; Prevent"</span>we believe that every accident is preventable, and that the right training at the right time can be the difference between life and death.
              </p>
              <p className="text-dark text-sm leading-relaxed mb-8">
                Committed to delivering skill development and all-round excellence in safety, we are working to reduce unwanted incidents and serve a noble causehelping our environment and aiding the national economy, one training programme at a time.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/complete-EHS-services-Package"
                  className="inline-flex items-center gap-2 border border-gray-200 text-dark text-sm font-bold px-6 py-3 rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  Our Services
                </Link>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeLeft" delay={80}>
              <div className="grid grid-cols-2 gap-4">
                {/* cert logos */}
                {[
                  { label: "ISO 9001:2015", sub: "Quality Management", color: "#cc2128" },
                  { label: "ISO 14001:2015", sub: "Environmental Management", color: "#257e43" },
                  { label: "OHSAS 45001", sub: "Occupational Health & Safety", color: "#fe5a0e" },
                  { label: "Since 2008", sub: "15+ Years of Excellence", color: "#1a7a8a" },
                ].map((c, i) => (
                  <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c.color}15` }}>
                      <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                    </div>
                    <p className="text-dark font-black text-sm leading-snug">{c.label}</p>
                    <p className="text-dark text-[11px] leading-snug">{c.sub}</p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
