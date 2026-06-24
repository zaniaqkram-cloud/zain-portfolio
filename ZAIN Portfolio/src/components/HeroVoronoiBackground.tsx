import { useState, useEffect } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";
import { voronoiCells } from "./voronoiCells";
import VoronoiCell from "./VoronoiCell";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ORIGINAL_W = 1920;
const ORIGINAL_H = 1080;
const CANVAS_CENTER_X = ORIGINAL_W / 2;
const CANVAS_CENTER_Y = ORIGINAL_H / 2;

export default function HeroVoronoiBackground() {
  const [vw, setVw] = useState(window.innerWidth);
  const [vh, setVh] = useState(window.innerHeight);

  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handler = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setVw(window.innerWidth);
        setVh(window.innerHeight);
      }, 80);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const hero = document.querySelector("#hero");
    if (!hero) return;

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        scrollProgress.set(self.progress);
      },
    });

    return () => trigger.kill();
  }, [scrollProgress]);

  const overlayOpacity = useTransform(scrollProgress, [0.35, 1], [0, 1]);

  const scale = Math.max(vw / ORIGINAL_W, vh / ORIGINAL_H);
  const offsetX = (ORIGINAL_W * scale - vw) / 2;
  const offsetY = (ORIGINAL_H * scale - vh) / 2;

  return (
    <div className="bg-[#73060E] w-full h-full">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(102, 2, 2, 1), transparent 60%)",
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.025, mixBlendMode: "overlay" }}
        aria-hidden="true"
      >
        <filter id="bg-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-noise)" />
      </svg>

      <div className="absolute inset-0">
        {voronoiCells.map((cell) => (
          <VoronoiCell
            key={cell.id}
            cell={cell}
            canvasScale={scale}
            offsetX={offsetX}
            offsetY={offsetY}
            viewportW={vw}
            viewportH={vh}
            scrollProgress={scrollProgress}
            canvasCenterX={CANVAS_CENTER_X}
            canvasCenterY={CANVAS_CENTER_Y}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "#000", opacity: overlayOpacity }}
      />

      <div
        className="absolute left-0 bottom-0 w-full h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 10%, #000000 95%)",
        }}
      />
    </div>
  );
}
