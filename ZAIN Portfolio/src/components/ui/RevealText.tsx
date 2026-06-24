import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  duration?: number;
}

export default function RevealText({
  children,
  className = "",
  as: Tag = "span",
  delay = 0,
  stagger = 0.02,
  duration = 0.6,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Tag ref={ref as never} className={className}>
      <span style={{ display: "inline-block", overflow: "hidden" }}>
        {children.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration,
              ease: [0.25, 0.1, 0.25, 1],
              delay: delay + i * stagger,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
