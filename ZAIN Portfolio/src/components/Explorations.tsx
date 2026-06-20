import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ContainerScroll,
  ContainerSticky,
  GalleryContainer,
  GalleryCol,
} from "./ui/animated-gallery";

// ── Column image lists ────────────────────────────────────────────────────────
const IMAGES_1 = [
  "/play1.jpg",
  "/play2.jpg",
  "/play3.jpg",
  "/play4.jpg",
  "/play5.jpg",
  "/play6.jpg",
];

const IMAGES_2 = [
  "/play7.jpg",
  "/play8.jpg",
  "/play9.jpg",
  "/play10.jpg",
  "/play11.jpg",
  "/play12.jpg",
];

const IMAGES_3 = [
  "/play13.jpg",
  "/play14.jpg",
  "/play15.jpg",
  "/play16.jpg",
  "/play17.jpg",
  "/play18.jpg",
];

// Flattened list used only by the lightbox so it can reference any image by
// its global index (col-1 images first, then col-2, then col-3).
const ALL_IMAGES = [...IMAGES_1, ...IMAGES_2, ...IMAGES_3];

// Aspect-ratio variants cycled per-column to keep the grid visually varied.
const ASPECTS_1 = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]", "aspect-[4/3]", "aspect-square"];
const ASPECTS_2 = ["aspect-square", "aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]"];
const ASPECTS_3 = ["aspect-[3/2]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-square", "aspect-[3/4]"];

// ── Helper ────────────────────────────────────────────────────────────────────
function GalleryCard({
  src,
  globalIndex,
  aspectClass,
  onOpen,
}: {
  src: string;
  globalIndex: number;
  aspectClass: string;
  onOpen: (idx: number) => void;
}) {
  return (
    <div
      onClick={() => onOpen(globalIndex)}
      className={`cursor-pointer group relative overflow-hidden rounded-2xl border border-neutral-900 ${aspectClass}`}
    >
      <img
        src={src}
        alt={`Play ${globalIndex + 1}`}
        className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-sm font-body text-white/90">Play {globalIndex + 1}</span>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Explorations() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="explorations" className="relative w-full bg-black">

      {/* ── Scroll Runway ────────────────────────────────────────────────────── */}
      <ContainerScroll className="bg-black">

        {/* ── Sticky Viewport Lock ─────────────────────────────────────────── */}
        <ContainerSticky>

          {/* Section header — absolutely overlaid so it stays visible while
              the gallery zooms in beneath it */}
          <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-12 pt-10 md:pt-14 pointer-events-none">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-neutral-800" />
                <span className="text-xs text-neutral-400 uppercase tracking-[0.3em]">
                  Explorations
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-body font-light text-white mb-2">
                Visual{" "}
                <span className="font-display italic text-[#C9A84C]">playground</span>
              </h2>
              <p className="text-sm md:text-base text-neutral-400 max-w-md">
                A collection of experimental visual work, personal projects, and
                digital motion systems.
              </p>
            </div>
          </div>

          {/* ── Gallery grid centered inside the sticky lock ────────────────── */}
          <GalleryContainer className="gap-4 p-4 w-full h-full">

            {/* TRACK 1 — drifts upward moderately */}
            <GalleryCol yRange={["0%", "-15%"]}>
              {IMAGES_1.map((src, i) => (
                <GalleryCard
                  key={src}
                  src={src}
                  globalIndex={i}
                  aspectClass={ASPECTS_1[i % ASPECTS_1.length]}
                  onOpen={setLightbox}
                />
              ))}
            </GalleryCol>

            {/* TRACK 2 — drifts downward slowly */}
            <GalleryCol yRange={["0%", "10%"]}>
              {IMAGES_2.map((src, i) => (
                <GalleryCard
                  key={src}
                  src={src}
                  globalIndex={IMAGES_1.length + i}
                  aspectClass={ASPECTS_2[i % ASPECTS_2.length]}
                  onOpen={setLightbox}
                />
              ))}
            </GalleryCol>

            {/* TRACK 3 — drifts upward rapidly */}
            <GalleryCol yRange={["0%", "-25%"]}>
              {IMAGES_3.map((src, i) => (
                <GalleryCard
                  key={src}
                  src={src}
                  globalIndex={IMAGES_1.length + IMAGES_2.length + i}
                  aspectClass={ASPECTS_3[i % ASPECTS_3.length]}
                  onOpen={setLightbox}
                />
              ))}
            </GalleryCol>

          </GalleryContainer>

        </ContainerSticky>
      </ContainerScroll>

      {/* ── Lightbox ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-8 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={ALL_IMAGES[lightbox]}
              alt={`Play ${lightbox + 1}`}
              className="max-w-full max-h-full rounded-2xl object-contain border border-neutral-800"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
