import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Service {
  title: string;
  description: string;
  icon: ReactNode;
}

const services: Service[] = [
  {
    title: "UI/UX Design",
    description:
      "Intuitive interfaces and seamless user experiences crafted through research, iteration, and a deep understanding of user behavior.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    title: "Brand Identity",
    description:
      "Distinctive visual identities that communicate your story — from logos and color systems to complete brand guidelines.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: "Video Editing",
    description:
      "Polished video content with precise pacing, color grading, and motion graphics that elevate your visual storytelling.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              What I Do
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary">
            Services &{" "}
            <span className="font-display italic">expertise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative rounded-3xl border border-stroke bg-surface/30 p-8 hover:bg-surface transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-stroke/50 flex items-center justify-center text-text-primary mb-6">
                {service.icon}
              </div>
              <h3 className="text-lg font-body font-medium text-text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
