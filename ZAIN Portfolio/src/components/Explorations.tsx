import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ContainerScroll,
  ContainerSticky,
  GalleryContainer,
  GalleryCol,
} from "./ui/animated-gallery";
import RevealText from "./ui/RevealText";

// ── Image Data (unchanged deck, split into 3 columns) ────────────────────────

const IMAGES_1 = [
  { image: "/play1.webp", alt: "Exploration 1" },
  { image: "/play2.webp", alt: "Exploration 2" },
  { image: "/play3.webp", alt: "Exploration 3" },
  { image: "/play4.webp", alt: "Exploration 4" },
  { image: "/play5.webp", alt: "Exploration 5" },
  { image: "/play6.webp", alt: "Exploration 6" },
  { image: "/play7.webp", alt: "Exploration 7" },
  { image: "/play8.webp", alt: "Exploration 8" },
];

const IMAGES_2 = [
  { image: "/play9.webp", alt: "Exploration 9" },
  { image: "/play10.webp", alt: "Exploration 10" },
  { image: "/play11.webp", alt: "Exploration 11" },
  { image: "/play12.webp", alt: "Exploration 12" },
  { image: "/play13.webp", alt: "Exploration 13" },
  { image: "/play14.webp", alt: "Exploration 14" },
  { image: "/play15.webp", alt: "Exploration 15" },
  { image: "/play16.webp", alt: "Exploration 16" },
  { image: "/play17.webp", alt: "Exploration 17" },
];

const IMAGES_3 = [
  { image: "/play18.webp", alt: "Exploration 18" },
  { image: "/play19.webp", alt: "Exploration 19" },
  { image: "/play20.webp", alt: "Exploration 20" },
  { image: "/play21.webp", alt: "Exploration 21" },
  { image: "/play22.webp", alt: "Exploration 22" },
  { image: "/play23.webp", alt: "Exploration 23" },
  { image: "/play24.webp", alt: "Exploration 24" },
  { image: "/play25.webp", alt: "Exploration 25" },
];

const ALL_IMAGES = [...IMAGES_1, ...IMAGES_2, ...IMAGES_3].map((i) => i.image);

// ── Animation Variants ───────────────────────────────────────────────────────

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ── Gallery Card ─────────────────────────────────────────────────────────────

function GalleryCard({
  src,
  alt,
  index,
  onOpen,
}: {
  src: string;
  alt: string;
  index: number;
  onOpen: (idx: number) => void;
}) {
  return (
    <motion.button
      type="button"
      variants={cardVariants}
      onClick={() => onOpen(index)}
      className="group relative w-full overflow-hidden rounded-2xl border border-stroke bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B111E] min-h-[48px] min-w-[48px]"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[ cubic-bezier(0.25,0.1,0.25,1) ] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute bottom-3 left-3 text-xs font-medium tracking-wider text-[#E63946] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {alt}
      </span>
    </motion.button>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function Explorations() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="explorations" className="relative w-full bg-bg">
      {/* ── Section Header ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 sm:pt-20 md:px-12 md:pt-32 pb-8 sm:pb-12">
        <div className="mb-8 text-left">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-neutral-800" />
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              <RevealText>Explorations</RevealText>
            </span>
          </div>
          <h2 className="mb-2 text-3xl font-body font-light text-white sm:text-4xl md:text-5xl">
            <RevealText as="span">Visual </RevealText>
            <span className="font-display italic text-white">
              <RevealText as="span">Playground</RevealText>
            </span>
          </h2>
          <p className="max-w-md text-sm text-neutral-400 md:text-base">
            A collection of experimental visual work, personal projects, and
            digital motion systems.
          </p>
        </div>
      </div>

      {/* ── Scroll-Driven 3D Gallery ───────────────────────────────────── */}
      <div ref={galleryRef}>
        <ContainerScroll className="h-[300vh]">
          <ContainerSticky>
            <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-12">
              <GalleryContainer className="h-[65vh] sm:h-[70vh] md:h-[75vh] items-start pt-8 md:pt-12">
                <GalleryCol yRange={["-10%", "2%"]}>
                  {IMAGES_1.map((item, i) => (
                    <GalleryCard
                      key={item.image}
                      src={item.image}
                      alt={item.alt}
                      index={i}
                      onOpen={setLightbox}
                    />
                  ))}
                </GalleryCol>

                <GalleryCol
                  yRange={["15%", "5%"]}
                  className="-mt-[50%]"
                >
                  {IMAGES_2.map((item, i) => (
                    <GalleryCard
                      key={item.image}
                      src={item.image}
                      alt={item.alt}
                      index={IMAGES_1.length + i}
                      onOpen={setLightbox}
                    />
                  ))}
                </GalleryCol>

                <GalleryCol yRange={["-10%", "2%"]}>
                  {IMAGES_3.map((item, i) => (
                    <GalleryCard
                      key={item.image}
                      src={item.image}
                      alt={item.alt}
                      index={IMAGES_1.length + IMAGES_2.length + i}
                      onOpen={setLightbox}
                    />
                  ))}
                </GalleryCol>
              </GalleryContainer>
            </div>
          </ContainerSticky>
        </ContainerScroll>
      </div>

      {/* ── CTA Block ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 md:px-12">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-neutral-800" />
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              <RevealText>Let&apos;s collaborate</RevealText>
            </span>
          </div>
          <h2 className="text-3xl font-body font-light text-white sm:text-4xl md:text-5xl">
            <RevealText as="span">Invisible to </RevealText>
            <span className="font-display italic text-white">
              <RevealText as="span">recognizable.</RevealText>
            </span>
          </h2>
          <p className="max-w-md text-sm text-neutral-400 md:text-base">
            Good design is obvious. Great design is felt.
          </p>
          <motion.button
            type="button"
            onClick={scrollToGallery}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-stroke bg-bg px-6 py-3 text-sm tracking-wide text-white transition-colors duration-300 hover:border-[#9B111E] hover:text-[#E63946] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B111E]"
          >
            Explore my work ↓
          </motion.button>
        </div>
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => setLightbox(null)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setLightbox(null);
            }}
            className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/95 p-8"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <motion.img
              key={ALL_IMAGES[lightbox]}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              src={ALL_IMAGES[lightbox]}
              alt={`Exploration ${lightbox + 1}`}
              className="max-h-full max-w-full rounded-2xl border border-neutral-800 object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
