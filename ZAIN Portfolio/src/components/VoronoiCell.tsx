"use client";

import { useRef, useEffect, useMemo } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  motion,
  type SpringOptions,
  type MotionValue,
} from "framer-motion";
import type { VoronoiCellData } from "./voronoiCells";
import { useHasHover } from "../lib/useHasHover";

interface VoronoiCellProps {
  cell: VoronoiCellData;
  canvasScale: number;
  offsetX: number;
  offsetY: number;
  viewportW: number;
  viewportH: number;
  rotateDepth?: number;
  translateDepth?: number;
  scrollProgress: MotionValue<number>;
  canvasCenterX: number;
  canvasCenterY: number;
}

const GAP_SCALE = 0.965;
const SCATTER_DIST = 3000;
const CELL_COUNT = 16;

function gapTransform(cell: VoronoiCellData): string {
  const cx = cell.width / 2;
  const cy = cell.height / 2;
  return `translate(${-cell.x}, ${-cell.y}) translate(${cx}, ${cy}) scale(${GAP_SCALE}) translate(${-cx}, ${-cy})`;
}

export default function VoronoiCell({
  cell,
  canvasScale,
  offsetX,
  offsetY,
  viewportW,
  viewportH,
  rotateDepth = 14,
  translateDepth = 6,
  scrollProgress,
  canvasCenterX,
  canvasCenterY,
}: VoronoiCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasHover = useHasHover();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHovered = useRef(false);

  const springValues: SpringOptions = {
    damping: 25,
    stiffness: 220,
    mass: 0.6,
  };

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [rotateDepth, -rotateDepth]),
    springValues,
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-rotateDepth, rotateDepth]),
    springValues,
  );
  const translateX = useSpring(
    useTransform(x, [-0.5, 0.5], [-translateDepth, translateDepth]),
    springValues,
  );
  const translateY = useSpring(
    useTransform(y, [-0.5, 0.5], [-translateDepth, translateDepth]),
    springValues,
  );
  const scale = useSpring(1, springValues);

  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useSpring(0, springValues);

  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]: number[]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(207, 2, 2, 0.45), transparent 65%)`,
  );

  const strokeOpacity = useSpring(0, springValues);

  const { scatterDirX, scatterDirY, stagger } = useMemo(() => {
    const cellCx = cell.x + cell.width / 2;
    const cellCy = cell.y + cell.height / 2;
    const dx = cellCx - canvasCenterX;
    const dy = cellCy - canvasCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    return {
      scatterDirX: dx / dist,
      scatterDirY: dy / dist,
      stagger: (cell.id / CELL_COUNT) * 0.2,
    };
  }, [cell.x, cell.y, cell.width, cell.height, canvasCenterX, canvasCenterY, cell.id]);

  const scatterTranslateX = useTransform(
    scrollProgress,
    [stagger, 1],
    [0, scatterDirX * SCATTER_DIST],
  );
  const scatterTranslateY = useTransform(
    scrollProgress,
    [stagger, 1],
    [0, scatterDirY * SCATTER_DIST],
  );
  const scatterOpacity = useTransform(
    scrollProgress,
    [stagger, stagger + 0.4],
    [1, 0],
  );
  const scatterRotate = useTransform(
    scrollProgress,
    [stagger, 1],
    [0, scatterDirX * 20],
  );

  useEffect(() => {
    if (!hasHover) return;

    function onMouseMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inside) {
        if (!isHovered.current) {
          isHovered.current = true;
          scale.set(1.03);
          glareOpacity.set(1);
          strokeOpacity.set(1);
          el.style.zIndex = "50";
        }
        const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
        const offsetY = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(offsetX);
        y.set(offsetY);
      } else if (isHovered.current) {
        isHovered.current = false;
        x.set(0);
        y.set(0);
        scale.set(1);
        glareOpacity.set(0);
        strokeOpacity.set(0);
        el.style.zIndex = "";
      }
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [hasHover, scale, glareOpacity, strokeOpacity, x, y]);

  const leftPct = ((cell.x * canvasScale - offsetX) / viewportW) * 100;
  const topPct = ((cell.y * canvasScale - offsetY) / viewportH) * 100;
  const widthPct = (cell.width * canvasScale / viewportW) * 100;
  const heightPct = (cell.height * canvasScale / viewportH) * 100;

  const t = gapTransform(cell);

  return (
    <motion.div
      ref={ref}
      className="absolute overflow-visible"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        width: `${widthPct}%`,
        height: `${heightPct}%`,
        perspective: "800px",
        isolation: "isolate",
        translateX: scatterTranslateX,
        translateY: scatterTranslateY,
        opacity: scatterOpacity,
        rotateZ: scatterRotate,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          scale,
          transformStyle: "preserve-3d",
          transformOrigin: "center",
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
        className="relative"
      >
        <svg
          viewBox={`0 0 ${cell.width} ${cell.height}`}
          width="100%"
          height="100%"
          className="overflow-visible"
          style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
        >
          <defs>
            <clipPath id={`cell-clip-${cell.id}`}>
              <path d={cell.d} transform={t} />
            </clipPath>
            <filter
              id={`cell-shadow-${cell.id}`}
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="8"
                floodColor="rgba(0,0,0,0.6)"
              />
            </filter>
            <linearGradient
              id={`cell-stroke-${cell.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.04" />
              <stop offset="30%" stopColor="white" stopOpacity="0.12" />
              <stop offset="70%" stopColor="white" stopOpacity="0.04" />
              <stop offset="100%" stopColor="white" stopOpacity="0.10" />
            </linearGradient>
          </defs>

          <foreignObject
            x="0"
            y="0"
            width={cell.width}
            height={cell.height}
            clipPath={`url(#cell-clip-${cell.id})`}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            />
          </foreignObject>

          <path
            d={cell.d}
            transform={t}
            fill="rgba(10, 0, 1, 0.2)"
            stroke={`url(#cell-stroke-${cell.id})`}
            strokeWidth="1"
            filter={`url(#cell-shadow-${cell.id})`}
          />

          <motion.path
            d={cell.d}
            transform={t}
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1.5"
            style={{ opacity: strokeOpacity }}
          />

          <foreignObject
            x="0"
            y="0"
            width={cell.width}
            height={cell.height}
            clipPath={`url(#cell-clip-${cell.id})`}
          >
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                background: glareBackground,
                opacity: glareOpacity,
              }}
            />
          </foreignObject>
        </svg>
      </motion.div>
    </motion.div>
  );
}
