import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const items = [
  { image: "https://unsplash.com", title: "Abstract Flow" },
  { image: "https://unsplash.com", title: "Geometric Light" },
  { image: "https://unsplash.com", title: "Color Study" },
  { image: "https://unsplash.com", title: "Digital Terrain" },
  { image: "https://unsplash.com", title: "Neon Dreams" },
  { image: "https://unsplash.com", title: "Fluid Motion" },
];

export default function Explorations() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  // Hook to track the scrolling progress of this section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["top bottom", "bottom top"]
  });

  // Track 1 shifts upward moderately
  const yColumnOne = useTransform(scrollYProgress, [0, 1], [0, -120]);
  // Track 2 shifts downward slowly
  const yColumnTwo = useTransform(scrollYProgress, [0, 1], [0, 80]);
  // Track 3 shifts upward faster
  const yColumnThree = useTransform(scrollYProgress, [0, 1], [0, -220]);

  return (
    <section id="explorations" ref={targetRef} className="relative w-full bg-black py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Static Content Header */}
        <div className="mb-20 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-neutral-800" />
            <span className="text-xs text-neutral-400 uppercase tracking-[0.3em]">Explorations</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-body font-light text-white mb-4">
            Visual <span className="font-display italic text-[#C9A84C]">playground</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            A collection of experimental visual work, personal projects, and digital motion systems.
          </p>
        </div>

        {/* ==========================================================
            CHARN'S MULTI-COLUMN STAGGERED PARALLAX SCROLL GRID
           ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">

          {/* TRACK 1: Moves upward moderately */}
          <motion.div style={{ y: yColumnOne }} className="flex flex-col gap-6">
            <div onClick={() => setLightbox(0)} className="cursor-pointer group relative overflow-hidden rounded-2xl border border-neutral-900 aspect-[3/4]">
              <img src={items[0].image} alt={items[0].title} className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-500 group-hover:scale-105" />
            </div>
            <div onClick={() => setLightbox(1)} className="cursor-pointer group relative overflow-hidden rounded-2xl border border-neutral-900 aspect-square">
              <img src={items[1].image} alt={items[1].title} className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-500 group-hover:scale-105" />
            </div>
          </motion.div>

          {/* TRACK 2: Moves downward slowly */}
          <motion.div style={{ y: yColumnTwo }} className="flex flex-col gap-6 md:mt-12">
            <div onClick={() => setLightbox(2)} className="cursor-pointer group relative overflow-hidden rounded-2xl border border-neutral-900 aspect-square">
              <img src={items[2].image} alt={items[2].title} className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-500 group-hover:scale-105" />
            </div>
            <div onClick={() => setLightbox(3)} className="cursor-pointer group relative overflow-hidden rounded-2xl border border-neutral-900 aspect-[4/5]">
              <img src={items[3].image} alt={items[3].title} className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-500 group-hover:scale-105" />
            </div>
          </motion.div>

          {/* TRACK 3: Moves upward rapidly */}
          <motion.div style={{ y: yColumnThree }} className="flex flex-col gap-6">
            <div onClick={() => setLightbox(4)} className="cursor-pointer group relative overflow-hidden rounded-2xl border border-neutral-900 aspect-[3/2]">
              <img src={items[4].image} alt={items[4].title} className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-500 group-hover:scale-105" />
            </div>
            <div onClick={() => setLightbox(5)} className="cursor-pointer group relative overflow-hidden rounded-2xl border border-neutral-900 aspect-square">
              <img src={items[5].image} alt={items[5].title} className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-500 group-hover:scale-105" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Lightbox Pop-Up */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-8 cursor-pointer">
            <motion.img initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} src={items[lightbox].image} alt={items[lightbox].title} className="max-w-full max-h-full rounded-2xl object-contain border border-neutral-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
