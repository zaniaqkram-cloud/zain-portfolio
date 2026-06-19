import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Understanding your vision, goals, and audience through research and collaboration.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Crafting wireframes, prototypes, and visual designs that bring concepts to life.",
  },
  {
    number: "03",
    title: "Develop",
    description:
      "Building with clean code, rigorous testing, and attention to every detail.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Launching polished products and ensuring ongoing support and iteration.",
  },
];

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "95+", label: "Projects Done" },
  { value: "200%", label: "Satisfied Clients" },
];

export default function Process() {
  return (
    <section id="process" className="bg-black py-16 md:py-24">
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
              Process
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary">
            How I{" "}
            <span className="font-display italic">work</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 md:mb-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              <span className="block text-4xl md:text-5xl font-display italic accent-gradient-text mb-4">
                {step.number}
              </span>
              <h3 className="text-lg font-body font-medium text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 -right-3 w-6 h-px bg-stroke" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center py-8 border border-stroke rounded-2xl bg-surface/20"
            >
              <div className="text-4xl md:text-5xl font-display italic text-text-primary mb-2 accent-gradient-text">
                {stat.value}
              </div>
              <div className="text-xs text-muted uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
