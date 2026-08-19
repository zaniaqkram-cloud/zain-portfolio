import { CircularGallery } from "@/components/ui/circular-gallery-2";

// Tailored portfolio items pointing to your local public folder assets
const portfolioItems = [
  // --- PREVIOUS IMAGES (1-25) ---
  { image: "/play1.webp", text: "EV Scooter App" },
  { image: "/play2.webp", text: "Brand Identity" },
  { image: "/play3.webp", text: "Canvas Painting" },
  { image: "/play4.webp", text: "3D Layout" },
  { image: "/play5.webp", text: "Marketing Poster" },
  { image: "/play6.webp", text: "Horticulture" },
  { image: "/play7.webp", text: "UI Components" },
  { image: "/play8.webp", text: "Warranty Card" },
  { image: "/play9.webp", text: "Media Wall" },
  { image: "/play10.webp", text: "Corporate Mascot" },
  { image: "/play11.webp", text: "Web Layout" },
  { image: "/play12.webp", text: "Typography" },
  { image: "/play13.webp", text: "Studio Render" },
  { image: "/play14.webp", text: "Product Showcase" },
  { image: "/play15.webp", text: "App Interface" },
  { image: "/play16.webp", text: "Event Teaser" },
  { image: "/play17.webp", text: "Print Design" },
  { image: "/play18.webp", text: "3D Model" },
  { image: "/play19.webp", text: "Abstract Art" },
  { image: "/play20.webp", text: "Visual System" },
  { image: "/play21.webp", text: "Digital Packaging" },
  { image: "/play22.webp", text: "Concept Art" },
  { image: "/play23.webp", text: "Automotive Render" },
  { image: "/play24.webp", text: "SketchUp Space" },
  { image: "/play25.webp", text: "Design System" },
  // --- NEWLY ADDED IMAGES (26-36) ---
  { image: "/play26.webp", text: "AE7 Launch Teaser" },
  { image: "/play27.webp", text: "AE4 Studio Render" },
  { image: "/play28.webp", text: "Elevate Campaign" },
  { image: "/play29.webp", text: "Pop Art Promo" },
  { image: "/play30.webp", text: "AE6+ Spec Sheet" },
  { image: "/play31.webp", text: "Mobility App Concept" },
  { image: "/play32.webp", text: "Motorcycle Launch" },
  { image: "/play33.webp", text: "Concrete Shadow Render" },
  { image: "/play34.webp", text: "Cyberpunk Aesthetic" },
  { image: "/play35.webp", text: "Infographic Layout" },
  { image: "/play36.webp", text: "Corporate Comparison" },
];

export default function VisualPlayground() {
  return (
    <section className="bg-[#0a0a0a] py-20 md:py-32 overflow-hidden relative">
      {/* Header Area */}
      <div className="flex flex-col items-center text-center px-4 mb-16 relative z-10">
        {/* Eyebrow / Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-[0.3em]">
            Explorations
          </span>
          <div className="w-8 h-px bg-white/20" />
        </div>

        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-body font-light text-white mb-6">
          Visual <span className="font-display italic">Playground</span>
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base text-white/60 max-w-[500px] leading-relaxed mb-10">
          A curated gallery of ongoing creative explorations, interface concepts,
          and visual design systems.
        </p>

        {/* CTA Button */}
        <button className="group relative inline-flex items-center gap-2 rounded-full text-xs sm:text-sm px-6 py-3 text-white transition-all duration-300 hover:scale-105 overflow-hidden border border-white/20 hover:border-white/40 bg-black">
          <span className="relative flex items-center gap-2">
            Explore Projects ↓
          </span>
        </button>
      </div>

      {/* 3D Circular Gallery Area */}
      <div className="relative h-[450px] md:h-[600px] w-full">
        {/* Gradient overlay to smoothly fade the gallery into the background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 pointer-events-none opacity-50" />

        <CircularGallery
          items={portfolioItems}
          bend={3}
          borderRadius={0.03}
          scrollEase={0.05}
          scrollSpeed={2.5}
        />
      </div>
    </section>
  );
}
