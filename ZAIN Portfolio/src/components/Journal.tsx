import { motion } from "framer-motion";

const entries = [
  {
    title: "The Art of Minimalism in Modern UI",
    image:
      "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=200&q=80",
    readTime: "5 min read",
    date: "Jan 2026",
  },
  {
    title: "Why Typography Matters More Than You Think",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=200&q=80",
    readTime: "3 min read",
    date: "Dec 2025",
  },
  {
    title: "Building Design Systems That Scale",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&q=80",
    readTime: "7 min read",
    date: "Nov 2025",
  },
  {
    title: "From Sketch to Ship: My Workflow",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=200&q=80",
    readTime: "4 min read",
    date: "Oct 2025",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" },
};

export default function Journal() {
  return (
    <section id="journal" className="bg-black py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div {...fadeUp} className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Journal
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary mb-3">
                Recent{" "}
                <span className="font-display italic">thoughts</span>
              </h2>
              <p className="text-sm md:text-base text-muted max-w-lg">
                Musings on design, development, and creative process.
              </p>
            </div>
            <a
              href="#"
              className="hidden md:inline-flex group relative items-center gap-2 rounded-full text-sm px-6 py-3 text-text-primary transition-all duration-300 hover:scale-105 overflow-hidden border border-stroke"
            >
              <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2 bg-bg rounded-full px-4 py-1">
                View all →
              </span>
            </a>
          </div>
        </motion.div>

        {/* Journal Entries */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, i) => (
            <motion.a
              key={entry.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-all duration-300 cursor-pointer"
            >
              <img
                src={entry.image}
                alt={entry.title}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
              <span className="flex-1 text-sm md:text-base text-text-primary group-hover:text-white transition-colors">
                {entry.title}
              </span>
              <div className="flex items-center gap-4 text-xs text-muted shrink-0">
                <span>{entry.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-stroke" />
                <span>{entry.date}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

