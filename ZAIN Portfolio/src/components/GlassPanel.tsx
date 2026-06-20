"use client";

import { useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  motion,
  type SpringOptions,
} from "framer-motion";
import type { GlassPanelData } from "./glassPanels";

interface GlassPanelProps {
  panel: GlassPanelData;
}

export default function GlassPanel({ panel }: GlassPanelProps) {
  const ref = useRef<SVGGElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springOpts: SpringOptions = { damping: 25, stiffness: 200, mass: 0.5 };

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [12, -12]),
    springOpts,
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-12, 12]),
    springOpts,
  );
  const scale = useSpring(1, springOpts);
  const glareOpacity = useSpring(0, springOpts);

  const pointsStr = panel.points.map((p) => `${p[0]},${p[1]}`).join(" ");

  const xs = panel.points.map((p) => p[0]);
  const ys = panel.points.map((p) => p[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  const bw = maxX - minX;
  const bh = maxY - minY;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  const glareBg = useTransform(
    [x, y],
    ([gx, gy]: number[]) =>
      `radial-gradient(circle at ${(gx + 0.5) * 100}% ${(gy + 0.5) * 100}%, rgba(201,168,76,0.30), rgba(201,168,76,0.05) 50%, transparent 70%)`,
  );

  const fillColor =
    panel.id % 2 === 0 ? "rgba(10,10,10,0.25)" : "rgba(115,6,14,0.12)";

  function handleMouseMove(e: React.MouseEvent<SVGGElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const ox = (e.clientX - rect.left) / rect.width - 0.5;
    const oy = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(ox);
    y.set(oy);
  }

  function handleMouseEnter() {
    scale.set(1.04);
    glareOpacity.set(1);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
    glareOpacity.set(0);
  }

  return (
    <motion.g
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformOrigin: `${cx} ${cy}`,
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
    >
      <polygon
        points={pointsStr}
        fill={fillColor}
        stroke="url(#gold-stroke)"
        strokeWidth="1"
      />

      <clipPath id={`g-clip-${panel.id}`}>
        <polygon points={pointsStr} />
      </clipPath>

      <foreignObject
        x={minX}
        y={minY}
        width={bw}
        height={bh}
        clipPath={`url(#g-clip-${panel.id})`}
      >
        <motion.div
          className="pointer-events-none"
          style={{
            width: "100%",
            height: "100%",
            background: glareBg,
            opacity: glareOpacity,
          }}
        />
      </foreignObject>
    </motion.g>
  );
}
