"use client";

import { useRef } from "react";
import {
    useMotionValue,
    useSpring,
    useTransform,
    motion,
    type SpringOptions,
} from "framer-motion";
import type { VoronoiCellData } from "./voronoiCells";
import { useHasHover } from "../lib/useHasHover";

interface VoronoiCellProps {
    cell: VoronoiCellData;
    rotateDepth?: number;
    translateDepth?: number;
}

// Original SVG canvas size (from hero-bg.svg viewBox)
const SVG_WIDTH = 1920;
const SVG_HEIGHT = 1080;

export default function VoronoiCell({
    cell,
    rotateDepth = 14,
    translateDepth = 6,
}: VoronoiCellProps) {
    const ref = useRef<HTMLDivElement>(null);
    const hasHover = useHasHover();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springValues: SpringOptions = {
        damping: 25,
        stiffness: 220,
        mass: 0.6,
    };

    const rotateX = useSpring(
        useTransform(y, [-0.5, 0.5], [rotateDepth, -rotateDepth]),
        springValues
    );
    const rotateY = useSpring(
        useTransform(x, [-0.5, 0.5], [-rotateDepth, rotateDepth]),
        springValues
    );
    const translateX = useSpring(
        useTransform(x, [-0.5, 0.5], [-translateDepth, translateDepth]),
        springValues
    );
    const translateY = useSpring(
        useTransform(y, [-0.5, 0.5], [-translateDepth, translateDepth]),
        springValues
    );
    const scale = useSpring(1, springValues);

    const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
    const glareOpacity = useSpring(0, springValues);

    const glareBackground = useTransform(
        [glareX, glareY],
        ([gx, gy]: number[]) =>
            `radial-gradient(circle at ${gx}% ${gy}%, rgba(207, 2, 2, 0.45), transparent 65%)`
    );

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!hasHover || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
        const offsetY = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(offsetX);
        y.set(offsetY);
    }

    function handleMouseEnter() {
        if (!hasHover) return;
        scale.set(1.04);
        glareOpacity.set(1);
    }

    function handleMouseLeave() {
        if (!hasHover) return;
        x.set(0);
        y.set(0);
        scale.set(1);
        glareOpacity.set(0);
    }

    // Position this cell exactly where it sits in the original 1920x1080 canvas,
    // using percentages so it scales responsively with the hero section.
    const leftPct = (cell.x / SVG_WIDTH) * 100;
    const topPct = (cell.y / SVG_HEIGHT) * 100;
    const widthPct = (cell.width / SVG_WIDTH) * 100;
    const heightPct = (cell.height / SVG_HEIGHT) * 100;

    return (
        <div
            ref={ref}
            {...(hasHover ? {
                onMouseMove: handleMouseMove,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
            } : {})}
            className="absolute"
            style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                width: `${widthPct}%`,
                height: `${heightPct}%`,
                perspective: "800px",
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
                    width: "100%",
                    height: "100%",
                }}
                className="relative"
            >
                <svg
                    viewBox={`0 0 ${cell.width} ${cell.height}`}
                    width="100%"
                    height="100%"
                    style={{ overflow: "visible" }}
                >
                    <defs>
                        <linearGradient
                            id={`cell-stroke-${cell.id}`}
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="white" stopOpacity="0" />
                            <stop offset="28%" stopColor="white" stopOpacity="0.9" />
                            <stop offset="65%" stopColor="white" stopOpacity="0" />
                            <stop offset="100%" stopColor="white" stopOpacity="0.9" />
                        </linearGradient>
                        <clipPath id={`cell-clip-${cell.id}`}>
                            <path d={cell.d} transform={`translate(${-cell.x}, ${-cell.y})`} />
                        </clipPath>
                    </defs>

                    {/* Glass fill */}
                    <path
                        d={cell.d}
                        transform={`translate(${-cell.x}, ${-cell.y})`}
                        fill="black"
                        fillOpacity="0.12"
                        stroke={`url(#cell-stroke-${cell.id})`}
                        strokeWidth="1"
                    />

                    {/* Glare layer, clipped to the cell shape */}
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
        </div>
    );
}