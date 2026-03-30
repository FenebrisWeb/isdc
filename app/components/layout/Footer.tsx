import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Logo & About */}
          <AnimateOnScroll animation="fadeUp" delay={0}>
            <div className="space-y-4">
              <Link href="/">
                <Image
                  src="/isdc logo.png"
                  alt="ISDC Logo"
                  width={190}
                  height={60}
                  loading="lazy"
                  className="h-16 w-auto object-contain brightness-200"
                />
              </Link>
              <p className="text-sm font-semibold text-white">
                ISDC Services Division Pvt. Ltd.
              </p>
              <p className="text-sm leading-relaxed text-gray-400">
                India&apos;s premier industrial safety training council, empowering
                professionals with world-class EHS training and safety expertise
                since 2008.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-secondary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Column 2: Quick Links */}
          <AnimateOnScroll animation="fadeUp" delay={100}>
            <div>
              <h3 className="text-white font-semibold text-base mb-5 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-secondary">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Services", href: "/complete-EHS-services-Package" },
                  { label: "Blog", href: "/blog" },
                  { label: "Gallery", href: "/gallery" },
                  { label: "Contact Us", href: "/contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all flex items-center gap-1.5"
                    >
                      <span className="text-primary text-xs">&#9658;</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>

          {/* Column 3: Our Services */}
          <AnimateOnScroll animation="fadeUp" delay={200}>
            <div>
              <h3 className="text-white font-semibold text-base mb-5 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-primary">
                Our Services
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Tower Climbing & Work at Height", href: "/services/height-safety" },
                  { label: "Fire Safety Training", href: "/services/fire-safety" },
                  { label: "First Aid Training", href: "/services/first-aid" },
                  { label: "Scaffolding Training", href: "/services/scaffolding" },
                  { label: "Confined Space Training", href: "/services/confined-space" },
                  { label: "Defensive Driving & Road Safety", href: "/services/defensive-driving" },
                ].map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all flex items-center gap-1.5"
                    >
                      <span className="text-secondary text-xs">&#9658;</span>
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>

          {/* Column 4: Contact */}
          <AnimateOnScroll animation="fadeUp" delay={300}>
            <div>
              <h3 className="text-white font-semibold text-base mb-5 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-secondary">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                  </svg>
                  <a href="tel:+918527266399" className="text-sm text-gray-400 hover:text-white transition-colors">
                    85272 66399
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <a href="mailto:info@isdcouncil.co.in" className="text-sm text-gray-400 hover:text-white transition-colors">
                    info@isdcouncil.co.in
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="text-sm text-gray-400">
                    H 47 Noida Sector 63
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <a
                    href="https://wa.me/918527266399"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    WhatsApp Us
                  </a>
                </li>
              </ul>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>
            &copy; 2024 ISDC. All rights reserved. &nbsp;Developed by{" "}
            <a
              href="https://fenebrisindia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-white transition-colors duration-200"
            >
              Fenebris India Pvt Ltd
            </a>
          </p>
          <p className="text-xs">ISO 9001 | ISO 14001 | OHSAS 45001 Certified</p>
        </div>
      </div>
    </footer>
  );
}
