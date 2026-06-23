import { useEffect, useState, useRef } from "react";
import {
  generateVoronoiCells,
  type VoronoiCellData,
} from "./voronoiCells";
import VoronoiCell from "./VoronoiCell";

export default function HeroVoronoiBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cells, setCells] = useState<VoronoiCellData[]>([]);

  useEffect(() => {
    const updateCells = () => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w === 0 || h === 0) return;
      setCells(generateVoronoiCells(w, h));
    };

    updateCells();

    updateCells();

    let timer: ReturnType<typeof setTimeout>;
    const handler = () => {
      clearTimeout(timer);
      timer = setTimeout(updateCells, 160);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#73060E] w-full h-full">
      {/* Base radial gradient matching the original SVG background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(102, 2, 2, 1), transparent 60%)",
        }}
      />

      {/* Subtle noise texture */}
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

      {/* Voronoi cells */}
      <div className="absolute inset-0">
        {cells.map((cell) => (
          <VoronoiCell key={cell.id} cell={cell} />
        ))}
      </div>

      {/* Gradient overlay into dark section below */}
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
