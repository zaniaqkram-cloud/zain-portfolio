import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HoldToAction from "./ui/HoldToAction";

const links = ["Home", "About", "Services", "Content", "Process", "Contact"];

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.4, ease },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (label: string) => {
    setActive(label);
    setMenuOpen(false);
    const map: Record<string, string> = {
      Home: "hero",
      About: "about",
      Services: "services",
      Content: "explorations",
      Process: "process",
      Contact: "contact",
    };
    const el = document.getElementById(map[label] || "hero");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${scrolled ? "shadow-md shadow-black/10" : ""
          }`}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("Home")}
          className="group relative w-10 h-10 rounded-full p-[1px] transition-transform duration-300 hover:scale-110 shrink-0"
          style={{
            background: "linear-gradient(90deg, #42040A 0%, #A80A19 100%)",
          }}
        >
          <span className="flex items-center justify-center w-full h-full rounded-full bg-bg overflow-hidden">
            <img
              src="/Logo.svg"
              alt="Zain"
              className="w-8 h-8 object-contain"
            />
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center">
          <span className="w-px h-5 bg-stroke mx-1" />

          {links.map((l) => (
            <button
              key={l}
              onClick={() => handleNav(l)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ${active === l
                  ? "text-text-primary bg-stroke/50"
                  : "text-muted hover:text-text-primary hover:bg-stroke/50"
                }`}
            >
              {l}
            </button>
          ))}

          <span className="w-px h-5 bg-stroke mx-1" />

          <HoldToAction
            href="mailto:zaniaqkram@gmail.com"
            className="group relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary overflow-hidden"
          >
            Say hi <span className="text-xs">↗</span>
          </HoldToAction>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 min-w-[48px] min-h-[48px] gap-[5px] px-2 py-2 rounded-full hover:bg-stroke/50 transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block h-[2px] w-5 bg-text-primary rounded-full transition-transform duration-200 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`block h-[2px] w-5 bg-text-primary rounded-full transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-5 bg-text-primary rounded-full transition-transform duration-200 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 md:hidden bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-2">
              {links.map((l, i) => (
                <motion.button
                  key={l}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => handleNav(l)}
                  className={`min-h-[48px] text-center rounded-2xl px-8 py-3 text-lg transition-colors duration-200 ${active === l
                      ? "text-text-primary bg-stroke/50"
                      : "text-muted hover:text-text-primary hover:bg-stroke/50"
                    }`}
                >
                  {l}
                </motion.button>
              ))}
              <motion.div
                custom={links.length}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-6"
              >
                <HoldToAction
                  href="mailto:zaniaqkram@gmail.com"
                  className="group relative inline-flex items-center gap-2 rounded-full text-base px-8 py-4 min-h-[48px] text-text-primary overflow-hidden border border-stroke"
                  innerClassName="flex items-center gap-2 bg-bg rounded-full px-6 py-2"
                >
                  Say hi <span className="text-xs">↗</span>
                </HoldToAction>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
