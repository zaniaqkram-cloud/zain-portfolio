import { useState, useEffect } from "react";
import { voronoiCells } from "./voronoiCells";
import VoronoiCell from "./VoronoiCell";

const ORIGINAL_W = 1920;
const ORIGINAL_H = 1080;

export default function HeroVoronoiBackground() {
  const [vw, setVw] = useState(window.innerWidth);
  const [vh, setVh] = useState(window.innerHeight);

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

  // Uniform "cover" scale so the 1920×1080 canvas fills the viewport
  // without stretching cells on portrait screens
  const scale = Math.max(vw / ORIGINAL_W, vh / ORIGINAL_H);
  const offsetX = (ORIGINAL_W * scale - vw) / 2;
  const offsetY = (ORIGINAL_H * scale - vh) / 2;

  return (
    <div className="bg-[#73060E] w-full h-full">
      {/* Base radial gradient matching the original SVG background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(102, 2, 2, 1), transparent 60%)",
        }}
      />

      {/* Subtle noise texture — invisible alone, but gives the glass cells something to blur */}
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

      {/* Container that mimics the 1920x1080 SVG canvas, scaled responsively */}
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
          />
        ))}
      </div>

      {/* This gradient overlay merges the cells into your bottom dark section */}
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
