'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QuoteModal from "@/app/components/ui/QuoteModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Certificate Verification", href: "/certificate-verification" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { label: "Complete EHS Services & Package", href: "/complete-EHS-services-Package", highlight: true },
  { label: "Tower Climbing & Work at Height", href: "/services/height-safety" },
  { label: "Fire Safety Training", href: "/services/fire-safety" },
  { label: "First Aid Training", href: "/services/first-aid" },
  { label: "Scaffolding Training", href: "/services/scaffolding" },
  { label: "Confined Space Training", href: "/services/confined-space" },
  { label: "Defensive Driving", href: "/services/defensive-driving" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-dark text-white text-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between py-2 gap-1 sm:gap-0">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <a
              href="tel:012043-76696"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
              </svg>
              <span>0120-43-76696</span>
            </a>
            <a
              href="mailto:info@isdcouncil.com"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>info@isdcouncil.com</span>
            </a>
          </div>
          <div className="text-xs text-gray-300 font-medium tracking-wide">
            ISO 9001 | ISO 14001 | OHSAS 45001 Certified
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/isdc logo.png"
                alt="ISDC Logo"
                width={160}
                height={50}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded"
              >
                About Us
              </Link>

              {/* Services dropdown */}
              <div className="relative group">
                <Link href="/complete-EHS-services-Package" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded">
                  Services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform group-hover:rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className={`block px-4 py-2.5 text-sm transition-colors ${s.highlight ? "font-bold text-primary hover:bg-primary/5 border-b border-gray-100 mb-1" : "text-gray-700 hover:bg-gray-50 hover:text-primary"}`}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/blog"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded"
              >
                Blog
              </Link>
              <Link
                href="/gallery"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded"
              >
                Gallery
              </Link>
              <Link
                href="/certificate-verification"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded"
              >
                Certificate Verification
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded"
              >
                Contact Us
              </Link>

              <button
                onClick={() => setQuoteOpen(true)}
                className="ml-2 px-5 py-2 text-sm font-semibold text-white bg-primary rounded-full hover:bg-red-700 transition-colors"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile services accordion */}
              <div>
                <button
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  <span>Services</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className={`block px-3 py-2 text-sm rounded transition-colors ${s.highlight ? "font-bold text-primary hover:bg-primary/5" : "text-dark hover:text-primary hover:bg-gray-50"}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 pb-1">
                <button
                  className="block w-full text-center px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-red-700 transition-colors"
                  onClick={() => { setMobileOpen(false); setQuoteOpen(true); }}
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </header>
  );
}
