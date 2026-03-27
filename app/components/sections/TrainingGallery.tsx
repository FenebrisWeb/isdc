import Image from "next/image";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const galleryImages = [
  { src: "/Training/ehs1.webp", alt: "EHS Training Session 1" },
  { src: "/Training/ehs2.webp", alt: "EHS Training Session 2" },
  { src: "/Training/ehs3.webp", alt: "EHS Training Session 3" },
  { src: "/Training/ehs4.webp", alt: "EHS Training Session 4" },
  { src: "/Training/ehs5.webp", alt: "EHS Training Session 5" },
  { src: "/Training/ehs6.webp", alt: "EHS Training Session 6" },
  { src: "/Gallery/training3-1.jpg", alt: "ISDC Training Gallery 1" },
  { src: "/Gallery/service14.jpg", alt: "ISDC Service Gallery" },
  { src: "/Gallery/events5-1.jpg", alt: "ISDC Events Gallery" },
];

export default function TrainingGallery() {
  return (
    <section className="py-20 bg-dark">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AnimateOnScroll animation="fadeUp">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Training in Action
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-0.5 w-12 bg-accent rounded-full" />
              <span className="h-1.5 w-6 bg-accent rounded-full" />
              <span className="h-0.5 w-12 bg-accent rounded-full" />
            </div>
            <p className="text-gray-400 max-w-xl mx-auto">
              See our world-class training programs in action — real professionals,
              real environments, real results.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <AnimateOnScroll key={index} animation="scaleIn" delay={index * 60}>
              <div
                className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/40 transition-colors duration-300" />
                {/* Hover overlay icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
