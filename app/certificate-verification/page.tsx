import type { Metadata } from "next";
import CertificateVerificationClient from "./CertificateVerificationClient";

export const metadata: Metadata = {
  title: "Certificate Verification - ISO & Nationally Recognised Certifications",
  description:
    "Verify ISDC's certifications — ISO 9001, ISO 14001, OHSAS 45001, and DGFASLI approved. View our nationally recognised safety training certificates awarded to participants across India.",
  keywords: [
    "ISDC certificate verification",
    "ISO 9001 certificate",
    "ISO 14001 certificate",
    "OHSAS 45001 certification",
    "DGFASLI approved certificate",
    "safety training certification India",
    "EHS certificate",
  ],
  alternates: { canonical: "/certificate-verification" },
  openGraph: {
    title: "Certificate Verification - ISDC ISO & Nationally Recognised Certifications",
    description:
      "Verify ISDC's ISO 9001, ISO 14001, OHSAS 45001 & DGFASLI certifications. Nationally recognised safety training certificates.",
    url: "/certificate-verification",
    type: "website",
  },
  twitter: {
    title: "Certificate Verification - ISDC ISO & Nationally Recognised Certifications",
    description:
      "Verify ISDC's ISO 9001, ISO 14001, OHSAS 45001 & DGFASLI certifications.",
  },
};

export default function CertificateVerificationPage() {
  return <CertificateVerificationClient />;
}
