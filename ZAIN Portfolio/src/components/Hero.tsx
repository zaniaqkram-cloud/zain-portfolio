import HeroVoronoiBackground from "./HeroVoronoiBackground";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import gsap from "gsap";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const roles = ["Creative Designer", "Video Editor", "UI/UX Designer", "Brand Identity Designer"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // HLS video
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

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );
      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        "-=0.9"
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-black z-0 h-screen min-h-[100dvh] w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-10 pointer-events-none">
        <HeroVoronoiBackground />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">

        <span className="blur-in text-[10px] sm:text-xs text-white/60 uppercase tracking-[0.3em] mb-6 sm:mb-8">
          COLLECTION '26
        </span>

        <h1 className="name-reveal text-[2.5rem] sm:text-5xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-4 sm:mb-6">
          Zain Akram
        </h1>

        <p className="blur-in text-sm sm:text-base md:text-lg text-white/60 mb-3 sm:mb-4">
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {roles[roleIndex]}
          </span>{" "}
          For all your brand needs.
        </p>

        <p className="blur-in text-xs sm:text-sm md:text-base text-white/60 max-w-xs sm:max-w-md mb-10 sm:mb-12">
          Designing seamless digital interactions by focusing on the unique
          nuances which bring systems to life.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in flex flex-col sm:flex-row gap-3 sm:gap-4 pointer-events-auto w-full sm:w-auto max-w-xs sm:max-w-none">
          <a
            href="#explorations"
            style={{ pointerEvents: "auto" }}
            className="group relative rounded-full text-sm px-7 py-3.5 min-h-[48px] flex items-center justify-center bg-text-primary text-bg hover:bg-bg hover:text-text-primary transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">See Works</span>
          </a>
          <a
            href="mailto:zaniaqkram@gmail.com"
            style={{ pointerEvents: "auto" }}
            className="group relative rounded-full text-sm px-7 py-3.5 min-h-[48px] flex items-center justify-center border-2 border-stroke bg-bg text-text-primary hover:border-transparent transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Reach out...</span>
          </a>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          SCROLL
        </span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute w-full h-3 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
