import { useRef, type ReactNode } from "react";
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

  const words = children.split(" ");
  const elements: ReactNode[] = [];
  let charIdx = 0;

  words.forEach((word, wi) => {
    if (wi > 0) {
      elements.push(
        <span
          key={`sp-${wi}`}
          className="inline-block"
          style={{ width: "0.25em" }}
        />,
      );
    }
    const chars = word.split("").map((char) => {
      const i = charIdx++;
      return (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "100%" }}
          animate={inView ? { y: 0 } : { y: "100%" }}
          transition={{
            duration,
            ease: [0.25, 0.1, 0.25, 1],
            delay: delay + i * stagger,
          }}
        >
          {char}
        </motion.span>
      );
    });
    elements.push(
      <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
        {chars}
      </span>,
    );
  });

  return (
    <Tag ref={ref as never} className={className}>
      <span
        className="inline-block overflow-hidden"
        style={{ paddingBottom: "0.15em", marginBottom: "-0.15em" }}
      >
        {elements}
      </span>
    </Tag>
  );
}
