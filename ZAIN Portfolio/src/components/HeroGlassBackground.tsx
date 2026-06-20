import { glassPanels } from "./glassPanels";
import GlassPanel from "./GlassPanel";

export default function HeroGlassBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(102, 2, 2, 1), transparent 60%)",
        }}
      />

      <div
        className="w-full h-full"
        style={{ transform: "rotateX(4deg)", transformStyle: "preserve-3d" }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <defs>
            <linearGradient
              id="gold-stroke"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
              <stop offset="25%" stopColor="#C9A84C" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#C9A84C" stopOpacity="0" />
              <stop offset="75%" stopColor="#C9A84C" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </linearGradient>
          </defs>

          {glassPanels.map((panel) => (
            <GlassPanel key={panel.id} panel={panel} />
          ))}
        </svg>
      </div>

      <div
        className="absolute left-0 bottom-0 w-full h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 10%, #000000 95%)",
        }}
      />
    </div>
  );
}
