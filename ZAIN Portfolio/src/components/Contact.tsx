import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import { motion } from "framer-motion";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const marqueeText = "VISUAL DESIGN • BRANDING • CREATIVITY • EDITING • ";

const socialLinks = [
  { name: "Instagram", url: "https://instagram.com/yourhandle" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/zain-uiuxdesigner/" },
  { name: "Behance", url: "https://www.behance.net/zainakram8" },
  { name: "Whatsapp", url: "https://wa.me/923183508841" },
  { name: "Email", url: "mailto:zaniaqkram@gmail.com" },
];

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }
  }, []);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative bg-black pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        <div className="overflow-hidden mb-16 md:mb-24">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/10"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="mr-4">
                {marqueeText}
              </span>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={`dup-${i}`} className="mr-4">
                {marqueeText}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-16 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-stroke" />
                <span className="text-xs text-muted uppercase tracking-[0.3em]">
                  Contact
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-body font-light text-text-primary mb-4">
                Let's work{" "}
                <span className="font-display italic">together</span>
              </h2>
              <p className="text-sm md:text-base text-muted max-w-md mb-8">
                Have a project in mind? Let's create something extraordinary.
              </p>
              <a
                href="mailto:zaniaqkram@gmail.com"
                className="group relative inline-flex items-center gap-2 rounded-full text-sm px-8 py-4 text-text-primary transition-all duration-300 hover:scale-105 overflow-hidden border border-stroke mb-8"
              >
                <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2 bg-bg rounded-full px-6 py-2">
                  zaniaqkram@gmail.com ↗
                </span>
              </a>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-xs text-muted">
                  Available for projects
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
              viewport={{ once: true }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 rounded-full accent-gradient flex items-center justify-center mb-4">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-lg font-body font-medium text-text-primary mb-1">
                    Message sent!
                  </p>
                  <p className="text-sm text-muted">
                    I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name *"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-surface/50 border border-stroke rounded-2xl px-5 py-3.5 text-sm text-text-primary placeholder:text-muted focus:outline-none focus:border-text-primary/30 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-surface/50 border border-stroke rounded-2xl px-5 py-3.5 text-sm text-text-primary placeholder:text-muted focus:outline-none focus:border-text-primary/30 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Message *"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-surface/50 border border-stroke rounded-2xl px-5 py-3.5 text-sm text-text-primary placeholder:text-muted focus:outline-none focus:border-text-primary/30 transition-colors duration-200 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full rounded-2xl text-sm px-6 py-3.5 text-text-primary transition-all duration-300 overflow-hidden border border-stroke"
                  >
                    <span className="absolute inset-[-2px] rounded-2xl accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center justify-center gap-2 bg-bg rounded-2xl px-4 py-1.5">
                      Send Message &rarr;
                    </span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        <div className="border-t border-stroke pt-6 px-6 md:px-10 lg:px-16 max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-text-primary transition-colors uppercase tracking-[0.15em]"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <span className="text-xs text-muted">
              Available for projects
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
