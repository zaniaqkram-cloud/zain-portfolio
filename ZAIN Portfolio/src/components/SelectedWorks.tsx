import { motion } from "framer-motion";
import RevealText from "./ui/RevealText";

const projects = [
  {
    title: "Automotive Motion",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[7/5]",
  },
  {
    title: "Urban Architecture",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    span: "md:col-span-5",
    aspect: "aspect-square",
  },
  {
    title: "Human Perspective",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    span: "md:col-span-5",
    aspect: "aspect-square",
  },
  {
    title: "Brand Identity",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[7/5]",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" },
};

export default function SelectedWorks() {
  return (
    <section id="works" className="bg-black py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div {...fadeUp} className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              <RevealText>Selected Work</RevealText>
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary mb-3">
                <RevealText as="span">Featured </RevealText>
                <span className="font-display italic"><RevealText as="span">projects</RevealText></span>
              </h2>
              <p className="text-sm md:text-base text-muted max-w-lg">
                A selection of projects I've worked on, from concept to
                launch.
              </p>
            </div>
            <a
              href="#"
              className="hidden md:inline-flex group relative items-center gap-2 rounded-full text-sm px-6 py-3 text-text-primary transition-all duration-300 hover:scale-105 overflow-hidden border border-stroke"
            >
              <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2 bg-bg rounded-full px-4 py-1">
                View all work →
              </span>
            </a>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className={`${p.span} group relative rounded-3xl overflow-hidden bg-surface border border-stroke cursor-pointer`}
            >
              <div className={`${p.aspect} relative overflow-hidden`}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Halftone overlay */}
                <div className="absolute inset-0 halftone opacity-20 mix-blend-multiply" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-all duration-500 flex items-center justify-center">
                  <span className="relative rounded-full px-6 py-2 text-sm text-white overflow-hidden">
                    <span className="absolute inset-0 accent-gradient animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
                    <span className="relative">
                      View —{" "}
                      <span className="font-display italic">{p.title}</span>
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

