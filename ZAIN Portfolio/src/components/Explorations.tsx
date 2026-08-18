import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from "@/components/ui/animated-gallery";
import RevealText from "./ui/RevealText";

// ── Image Data (unchanged deck, split into 3 columns) ────────────────────────

const COLUMN_1 = [
  { src: "/play1.webp", alt: "Exploration 1" },
  { src: "/play2.webp", alt: "Exploration 2" },
  { src: "/play3.webp", alt: "Exploration 3" },
  { src: "/play4.webp", alt: "Exploration 4" },
  { src: "/play5.webp", alt: "Exploration 5" },
  { src: "/play6.webp", alt: "Exploration 6" },
  { src: "/play7.webp", alt: "Exploration 7" },
  { src: "/play8.webp", alt: "Exploration 8" },
];

const COLUMN_2 = [
  { src: "/play9.webp", alt: "Exploration 9" },
  { src: "/play10.webp", alt: "Exploration 10" },
  { src: "/play11.webp", alt: "Exploration 11" },
  { src: "/play12.webp", alt: "Exploration 12" },
  { src: "/play13.webp", alt: "Exploration 13" },
  { src: "/play14.webp", alt: "Exploration 14" },
  { src: "/play15.webp", alt: "Exploration 15" },
  { src: "/play16.webp", alt: "Exploration 16" },
  { src: "/play17.webp", alt: "Exploration 17" },
];

const COLUMN_3 = [
  { src: "/play18.webp", alt: "Exploration 18" },
  { src: "/play19.webp", alt: "Exploration 19" },
  { src: "/play20.webp", alt: "Exploration 20" },
  { src: "/play21.webp", alt: "Exploration 21" },
  { src: "/play22.webp", alt: "Exploration 22" },
  { src: "/play23.webp", alt: "Exploration 23" },
  { src: "/play24.webp", alt: "Exploration 24" },
  { src: "/play25.webp", alt: "Exploration 25" },
];

const ALL_IMAGES = [...COLUMN_1, ...COLUMN_2, ...COLUMN_3].map((i) => i.src);

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
      className="group relative w-full overflow-hidden rounded-xl border border-stroke bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B111E] min-h-[48px] min-w-[48px]"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="aspect-video w-full object-cover transition-transform duration-700 ease-[ cubic-bezier(0.25,0.1,0.25,1) ] group-hover:scale-105"
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
    <section id="explorations" className="relative overflow-hidden bg-bg py-16 text-white">
      {/* ── Background Gradient Effect ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[60vh] w-full opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(168, 10, 25, 0.4), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Section Header (ContainerStagger + ContainerAnimated) ──────── */}
      <ContainerStagger className="relative z-20 mx-auto max-w-3xl place-self-center px-6 pt-8 text-center">
        <ContainerAnimated>
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-neutral-800" />
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              <RevealText>Explorations</RevealText>
            </span>
            <div className="h-px w-8 bg-neutral-800" />
          </div>
        </ContainerAnimated>
        <ContainerAnimated>
          <h2 className="mb-4 text-3xl font-light tracking-tight text-neutral-100 sm:text-4xl md:text-6xl">
            <RevealText as="span">Visual </RevealText>
            <span className="font-display italic text-neutral-400">
              <RevealText as="span">Playground</RevealText>
            </span>
          </h2>
        </ContainerAnimated>
        <ContainerAnimated className="mb-6">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
            A curated gallery of ongoing creative explorations, interface
            concepts, and visual design systems.
          </p>
        </ContainerAnimated>
        <ContainerAnimated>
          <button
            type="button"
            onClick={scrollToGallery}
            className="rounded-full border border-stroke bg-bg px-6 py-3 text-sm tracking-wide text-neutral-200 transition-colors duration-300 hover:border-[#9B111E] hover:text-[#E63946] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B111E]"
          >
            Explore Projects ↓
          </button>
        </ContainerAnimated>
      </ContainerStagger>

      {/* ── 3D Scrolling Gallery ───────────────────────────────────────── */}
      <div ref={galleryRef}>
        <ContainerScroll className="relative mt-8 h-[280vh]">
          <ContainerSticky className="h-screen">
            <GalleryContainer className="px-4 md:px-12">
              <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
                {COLUMN_1.map((item, idx) => (
                  <GalleryCard
                    key={`col1-${item.src}`}
                    src={item.src}
                    alt={item.alt}
                    index={idx}
                    onOpen={setLightbox}
                  />
                ))}
              </GalleryCol>
              <GalleryCol yRange={["15%", "5%"]} className="mt-[-40%]">
                {COLUMN_2.map((item, idx) => (
                  <GalleryCard
                    key={`col2-${item.src}`}
                    src={item.src}
                    alt={item.alt}
                    index={COLUMN_1.length + idx}
                    onOpen={setLightbox}
                  />
                ))}
              </GalleryCol>
              <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
                {COLUMN_3.map((item, idx) => (
                  <GalleryCard
                    key={`col3-${item.src}`}
                    src={item.src}
                    alt={item.alt}
                    index={COLUMN_1.length + COLUMN_2.length + idx}
                    onOpen={setLightbox}
                  />
                ))}
              </GalleryCol>
            </GalleryContainer>
          </ContainerSticky>
        </ContainerScroll>
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
