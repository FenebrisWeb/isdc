import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Training Gallery - EHS Programmes in Action",
  description:
    "Explore ISDC's photo gallery showcasing real EHS training programmes — fire safety, work at height, first aid, scaffolding, confined space, and defensive driving. See our expert trainers and participants in action.",
  keywords: [
    "EHS training gallery",
    "safety training photos",
    "fire safety training India",
    "work at height training photos",
    "ISDC training gallery",
    "industrial safety training pictures",
  ],
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Training Gallery - ISDC EHS Programmes in Action",
    description:
      "A visual showcase of ISDC's world-class EHS training programmes — real professionals, real environments, real results.",
    url: "/gallery",
    type: "website",
  },
  twitter: {
    title: "Training Gallery - ISDC EHS Programmes in Action",
    description:
      "A visual showcase of ISDC's world-class EHS training programmes — real professionals, real environments, real results.",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
