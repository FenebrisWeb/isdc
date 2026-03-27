import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Wrapper from "@/app/components/layout/Wrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ISDC - Industrial Safety Development Council | EHS Training & Services",
  description:
    "ISDC is India's premier industrial safety training council offering world-class EHS training, fire safety, first aid, scaffolding, confined space, and defensive driving courses. ISO 9001, ISO 14001, and OHSAS 45001 certified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
