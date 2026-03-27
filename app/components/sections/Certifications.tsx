import Image from "next/image";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const isoCerts = [
  { src: "/ISO-9001.webp", alt: "ISO 9001 Certification", label: "ISO 9001:2015" },
  { src: "/ISO-14001.webp", alt: "ISO 14001 Certification", label: "ISO 14001:2015" },
  { src: "/cert3.webp", alt: "OHSAS 45001 Certification", label: "OHSAS 45001" },
];

const sampleCerts = [
  { src: "/Certificate/C1.jpg", alt: "ISDC Sample Certificate 1" },
  { src: "/Certificate/C2.jpg", alt: "ISDC Sample Certificate 2" },
  { src: "/Certificate/C3.jpg", alt: "ISDC Sample Certificate 3" },
];

export default function Certifications() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AnimateOnScroll animation="fadeUp">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              Our Accreditations &amp; Certifications
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-0.5 w-12 bg-primary rounded-full" />
              <span className="h-1.5 w-6 bg-primary rounded-full" />
              <span className="h-0.5 w-12 bg-primary rounded-full" />
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ISDC is proud to be certified by internationally recognized
              standards bodies, ensuring the highest quality of training and
              safety management.
            </p>
          </div>
        </AnimateOnScroll>

        {/* ISO cert logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
          {isoCerts.map((cert, i) => (
            <AnimateOnScroll key={cert.label} animation="scaleIn" delay={i * 120}>
              <div
                className="flex flex-col items-center gap-3 p-6 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow bg-gray-50 w-44"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    fill
                    loading="lazy"
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-dark text-center">
                  {cert.label}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-14" />

        {/* Sample certificates */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-dark mb-2">
            Sample Certificates
          </h3>
          <p className="text-gray-500 text-sm">
            Officially accredited certificates issued upon successful course completion
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCerts.map((cert, i) => (
            <AnimateOnScroll key={i} animation="fadeUp" delay={i * 100}>
              <div
                className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors" />
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* ISO badge row */}
        <AnimateOnScroll animation="fadeUp" delay={200}>
          <div className="mt-12 bg-gray-50 rounded-2xl p-6 text-center">
            <p className="text-gray-700 font-medium">
              <span className="text-primary font-bold">ISDC</span> is officially
              certified under{" "}
              <span className="font-semibold text-dark">ISO 9001:2015</span>{" "}
              (Quality Management),{" "}
              <span className="font-semibold text-dark">ISO 14001:2015</span>{" "}
              (Environmental Management), and{" "}
              <span className="font-semibold text-dark">OHSAS 45001</span>{" "}
              (Occupational Health &amp; Safety) — reflecting our commitment to
              excellence in every training program we deliver.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
