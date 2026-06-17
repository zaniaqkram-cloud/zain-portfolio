import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&q=80",
    title: "Abstract Flow",
  },
  {
    image:
      "https://images.unsplash.com/photo-1567095761054-7a02e69e5b2e?w=600&q=80",
    title: "Geometric Light",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80",
    title: "Color Study",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=600&q=80",
    title: "Digital Terrain",
  },
  {
    image:
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&q=80",
    title: "Neon Dreams",
  },
  {
    image:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80",
    title: "Fluid Motion",
  },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the center content
      if (contentRef.current) {
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: "top center",
          endTrigger: sectionRef.current,
          end: "bottom center",
          pin: true,
          pinSpacing: false,
        });
      }

      // Parallax columns
      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
      if (col2Ref.current) {
        gsap.to(col2Ref.current, {
          y: -400,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const col1 = items.slice(0, 3);
  const col2 = items.slice(3, 6);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[300vh] bg-bg overflow-hidden"
    >
      {/* Pinned Center Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            Explorations
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary mb-3">
          Visual <span className="font-display italic">playground</span>
        </h2>
        <p className="text-sm md:text-base text-muted max-w-md mb-8">
          A collection of experimental visual work, personal projects, and
          creative explorations.
        </p>
        <a
          href="#"
          className="group relative inline-flex items-center gap-2 rounded-full text-sm px-6 py-3 text-text-primary transition-all duration-300 hover:scale-105 overflow-hidden border border-stroke"
        >
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center gap-2 bg-bg rounded-full px-4 py-1">
            Dribbble →
          </span>
        </a>
      </div>

      {/* Parallax Columns */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto h-full grid grid-cols-2 gap-12 md:gap-40 px-6">
          <div ref={col1Ref} className="flex flex-col gap-8 pt-[20vh]">
            {col1.map((item, i) => (
              <div
                key={item.title}
                onClick={() => setLightbox(i)}
                className="pointer-events-auto cursor-pointer aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface group transition-transform duration-500 hover:rotate-1"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
          <div
            ref={col2Ref}
            className="flex flex-col gap-8 pt-[50vh] items-end"
          >
            {col2.map((item, i) => (
              <div
                key={item.title}
                onClick={() => setLightbox(i + 3)}
                className="pointer-events-auto cursor-pointer aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface group transition-transform duration-500 hover:-rotate-1"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-8 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={items[lightbox].image}
              alt={items[lightbox].title}
              className="max-w-full max-h-full rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

