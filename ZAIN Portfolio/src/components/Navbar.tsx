import { useEffect, useState } from "react";

const links = ["Home", "About", "Services", "Work", "Process", "Contact"];

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
      Work: "works",
      Process: "process",
      Contact: "contact",
    };
    const el = document.getElementById(map[label] || "hero");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
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
        <div className="hidden sm:flex items-center">
          <span className="w-px h-5 bg-stroke mx-1" />

          {links.map((l) => (
            <button
              key={l}
              onClick={() => handleNav(l)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ${
                active === l
                  ? "text-text-primary bg-stroke/50"
                  : "text-muted hover:text-text-primary hover:bg-stroke/50"
              }`}
            >
              {l}
            </button>
          ))}

          <span className="w-px h-5 bg-stroke mx-1" />

          <a
            href="mailto:zaniaqkram@gmail.com"
            className="group relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary overflow-hidden"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-1 bg-surface rounded-full px-3 py-1 backdrop-blur-md">
              Say hi <span className="text-xs">↗</span>
            </span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden flex flex-col items-center justify-center w-10 h-10 gap-[5px] px-2 py-2 rounded-full hover:bg-stroke/50 transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block h-[2px] w-5 bg-text-primary rounded-full transition-transform duration-200 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`block h-[2px] w-5 bg-text-primary rounded-full transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-5 bg-text-primary rounded-full transition-transform duration-200 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          className="fixed inset-x-4 top-20 sm:hidden rounded-3xl backdrop-blur-md border border-white/10 bg-surface/95 p-4 shadow-xl"
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l}
                onClick={() => handleNav(l)}
                className={`text-left rounded-2xl px-4 py-3 text-sm transition-colors duration-200 ${
                  active === l
                    ? "text-text-primary bg-stroke/50"
                    : "text-muted hover:text-text-primary hover:bg-stroke/50"
                }`}
              >
                {l}
              </button>
            ))}
            <span className="h-px bg-stroke/50 my-2" />
            <a
              href="mailto:zaniaqkram@gmail.com"
              className="group relative text-center rounded-2xl px-4 py-3 text-sm text-text-primary overflow-hidden border border-stroke"
            >
              <span className="absolute inset-[-2px] rounded-2xl accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2 bg-bg rounded-2xl px-4 py-1.5">
                Say hi <span className="text-xs">↗</span>
              </span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
