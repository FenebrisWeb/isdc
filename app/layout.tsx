import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Wrapper from "@/app/components/layout/Wrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.isdcouncil.co.in"),
  title: {
    default: "ISDC - Industrial Safety Development Council | EHS Training & Services",
    template: "%s | ISDC",
  },
  description:
    "India's premier industrial safety training council offering certified EHS training — fire safety, first aid, scaffolding, confined space, work at height, and defensive driving. ISO 9001, ISO 14001 & OHSAS 45001 certified. Trusted by 200+ clients.",
  keywords: [
    "EHS training India",
    "industrial safety training",
    "fire safety training",
    "first aid training",
    "scaffolding safety training",
    "confined space training",
    "work at height training",
    "defensive driving course",
    "ISDC",
    "Industrial Safety Development Council",
    "safety council India",
    "DGFASLI approved",
    "ISO 9001 certified",
    "EHS consulting",
    "occupational health and safety",
  ],
  authors: [{ name: "ISDC - Industrial Safety Development Council", url: "https://www.isdcouncil.co.in" }],
  creator: "ISDC",
  publisher: "ISDC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "ISDC - Industrial Safety Development Council",
    title: "ISDC - Industrial Safety Development Council | EHS Training & Services",
    description:
      "India's premier industrial safety training council. Certified EHS training programmes for fire safety, first aid, scaffolding, confined space, work at height & defensive driving.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ISDC - Industrial Safety Development Council | EHS Training & Services",
    description:
      "India's premier industrial safety training council. Certified EHS training programmes — ISO 9001, ISO 14001 & OHSAS 45001.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
