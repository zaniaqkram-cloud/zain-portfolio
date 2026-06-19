import { CometCard } from "./comet-card";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-black py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
            viewport={{ once: true }}
            className="relative"
          >
            <CometCard className="w-full">
              <div
                className="aspect-[4/5] rounded-3xl overflow-hidden border border-stroke bg-surface"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src="/zain-card.png"
                  alt="Zain Akram"
                  className="w-full h-full object-cover"
                  style={{ transform: "translateZ(40px)" }}
                />
              </div>
            </CometCard>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full accent-gradient opacity-20 blur-2xl pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                About
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary mb-6">
              Creative Designer based in{" "}
              <span className="font-display italic">Lahore</span>
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-6">
              I'm Zain Akram - a multidisciplinary designer crafting digital
              experiences that blend thoughtful design with purposeful
              interaction. With expertise spanning UI/UX, brand identity, and
              video editing, I bring ideas to life through clean aesthetics and
              meticulous detail.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-8">
              Every project is an opportunity to push creative boundaries and
              deliver work that resonates. I believe in design that not only
              looks good but feels right.
            </p>
            <a
              href="mailto:zaniaqkram@gmail.com"
              className="group relative inline-flex items-center gap-2 rounded-full text-sm px-6 py-3 text-text-primary transition-all duration-300 hover:scale-105 overflow-hidden border border-stroke"
            >
              <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2 bg-bg rounded-full px-4 py-1">
                Let's talk ↗
              </span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
