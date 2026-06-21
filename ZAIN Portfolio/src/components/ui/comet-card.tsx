"use client";

import type React from "react";
import { useRef } from "react";
import {
    useMotionValue,
    useSpring,
    useTransform,
    motion,
    type SpringOptions,
} from "framer-motion";
import { useHasHover } from "../../lib/useHasHover";

export const CometCard = ({
    rotateDepth = 17.5,
    translateDepth = 20,
    className,
    children,
}: {
    rotateDepth?: number;
    translateDepth?: number;
    className?: string;
    children: React.ReactNode;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const hasHover = useHasHover();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springValues: SpringOptions = {
        damping: 30,
        stiffness: 100,
        mass: 2,
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

    const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);

    const glareBackground = useTransform(
        [glareX, glareY],
        ([gx, gy]: number[]) =>
            `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.25), transparent 60%)`
    );

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!hasHover || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
        const offsetY = (e.clientY - rect.top) / rect.height - 0.5;

        x.set(offsetX);
        y.set(offsetY);
    }

    function handleMouseLeave() {
        if (!hasHover) return;
        x.set(0);
        y.set(0);
    }

    if (!hasHover) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{ perspective: "1200px" }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    translateX,
                    translateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative"
            >
                {children}

                {/* Glare overlay */}
                <motion.div
                    style={{
                        background: glareBackground,
                    }}
                    className="pointer-events-none absolute inset-0 rounded-[16px] mix-blend-overlay"
                />
            </motion.div>
        </div>
    );
};