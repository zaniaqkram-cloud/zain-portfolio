import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircularGallery } from "./ui/circular-gallery-2";

const playgroundItems = [
  { image: "/play1.jpg", text: "Exploration 01" },
  { image: "/play2.jpg", text: "Exploration 02" },
  { image: "/play3.jpg", text: "Exploration 03" },
  { image: "/play4.jpg", text: "Exploration 04" },
  { image: "/play5.jpg", text: "Exploration 05" },
  { image: "/play6.jpg", text: "Exploration 06" },
  { image: "/play7.jpg", text: "Exploration 07" },
  { image: "/play8.jpg", text: "Exploration 08" },
  { image: "/play9.jpg", text: "Exploration 09" },
  { image: "/play10.jpg", text: "Exploration 10" },
  { image: "/play11.jpg", text: "Exploration 11" },
  { image: "/play12.jpg", text: "Exploration 12" },
  { image: "/play13.jpg", text: "Exploration 13" },
  { image: "/play14.jpg", text: "Exploration 14" },
  { image: "/play15.jpg", text: "Exploration 15" },
  { image: "/play16.jpg", text: "Exploration 16" },
  { image: "/play17.jpg", text: "Exploration 17" },
  { image: "/play18.jpg", text: "Exploration 18" },
  { image: "/play19.jpg", text: "Exploration 19" },
  { image: "/play20.jpg", text: "Exploration 20" },
  { image: "/play21.jpg", text: "Exploration 21" },
  { image: "/play22.jpg", text: "Exploration 22" },
];

const ALL_IMAGES = playgroundItems.map((item) => item.image);

export default function Explorations() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="explorations" className="relative w-full bg-black">

      {/* ── Section Header ─────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-12">
        <div className="mb-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-neutral-800" />
            <span className="text-xs text-neutral-400 uppercase tracking-[0.3em]">
              Explorations
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-body font-light text-white mb-2">
            Visual{" "}
            <span className="font-display italic text-[#A80A19]">Playground</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            A collection of experimental visual work, personal projects, and
            digital motion systems.
          </p>
        </div>
      </div>

      {/* ── WebGL Circular Gallery ──────────────────────────────────────────── */}
      <div className="relative h-[650px] w-full overflow-hidden bg-transparent">
        <CircularGallery
          items={playgroundItems}
          bend={2.8}
          borderRadius={0.04}
          scrollEase={0.03}
          className="text-[#9B111E] dark:text-[#E63946] font-extrabold tracking-wider"
        />
      </div>

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
