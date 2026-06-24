import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircularGallery } from "./ui/circular-gallery-2";

const playgroundItems = [
  { image: "/play1.webp", text: "Exploration 01" },
  { image: "/play2.webp", text: "Exploration 02" },
  { image: "/play3.webp", text: "Exploration 03" },
  { image: "/play4.webp", text: "Exploration 04" },
  { image: "/play5.webp", text: "Exploration 05" },
  { image: "/play6.webp", text: "Exploration 06" },
  { image: "/play7.webp", text: "Exploration 07" },
  { image: "/play8.webp", text: "Exploration 08" },
  { image: "/play9.webp", text: "Exploration 09" },
  { image: "/play10.webp", text: "Exploration 10" },
  { image: "/play11.webp", text: "Exploration 11" },
  { image: "/play12.webp", text: "Exploration 12" },
  { image: "/play13.webp", text: "Exploration 13" },
  { image: "/play14.webp", text: "Exploration 14" },
  { image: "/play15.webp", text: "Exploration 15" },
  { image: "/play16.webp", text: "Exploration 16" },
  { image: "/play17.webp", text: "Exploration 17" },
  { image: "/play18.webp", text: "Exploration 18" },
  { image: "/play19.webp", text: "Exploration 19" },
  { image: "/play20.webp", text: "Exploration 20" },
  { image: "/play21.webp", text: "Exploration 21" },
  { image: "/play22.webp", text: "Exploration 22" },
  { image: "/play23.webp", text: "Exploration 23" },
  { image: "/play24.webp", text: "Exploration 24" },
  { image: "/play25.webp", text: "Exploration 25" },
];

const ALL_IMAGES = playgroundItems.map((item) => item.image);

export default function Explorations() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [bend, setBend] = useState(2.8);
  const [galleryHeight, setGalleryHeight] = useState(650);

  useEffect(() => {
    function onResize() {
      const w = window.innerWidth;
      setBend(w < 768 ? 1.2 : w < 1024 ? 2.0 : 2.8);
      setGalleryHeight(w < 768 ? 400 : w < 1024 ? 500 : 650);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section id="explorations" className="relative w-full bg-black">

      {/* ── Section Header ─────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-16 sm:pt-20 md:pt-32 pb-8 sm:pb-12">
        <div className="mb-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-neutral-800" />
            <span className="text-xs text-neutral-400 uppercase tracking-[0.3em]">
              Explorations
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-body font-light text-white mb-2">
            Visual{" "}
            <span className="font-display italic text-[#FFFFFF]">Playground</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            A collection of experimental visual work, personal projects, and
            digital motion systems.
          </p>
        </div>
      </div>

      {/* ── WebGL Circular Gallery ──────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden bg-transparent"
        style={{ height: galleryHeight }}
      >
        <CircularGallery
          items={playgroundItems}
          bend={bend}
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
