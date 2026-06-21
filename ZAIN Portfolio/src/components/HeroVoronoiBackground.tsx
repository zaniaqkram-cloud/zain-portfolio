import { voronoiCells } from "./voronoiCells";
import VoronoiCell from "./VoronoiCell";

export default function HeroVoronoiBackground() {
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
              id="accent-stroke"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#A80A19" stopOpacity="0" />
              <stop offset="25%" stopColor="#A80A19" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#A80A19" stopOpacity="0" />
              <stop offset="75%" stopColor="#A80A19" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#A80A19" stopOpacity="0" />
            </linearGradient>
          </defs>

          {voronoiCells.map((cell) => (
            <VoronoiCell key={cell.id} cell={cell} />
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
