import { voronoiCells } from "./voronoiCells";
import VoronoiCell from "./VoronoiCell";

export default function HeroVoronoiBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#73060E]">
            {/* Base radial gradient matching the original SVG background */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 50% 35%, rgba(102, 2, 2, 1), transparent 60%)",
                }}
            />

            {/* Container that mimics the 1920x1080 SVG canvas, scaled responsively */}
            <div className="absolute inset-0">
                {voronoiCells.map((cell) => (
                    <VoronoiCell key={cell.id} cell={cell} />
                ))}
            </div>

            {/* This gradient overlay merges the cells into your bottom dark section */}
            <div
                className="absolute left-0 bottom-0 w-full h-48 pointer-events-none"
                style={{
                    background: "linear-gradient(to bottom, transparent 10%, #000000 95%)"
                }}
            />
        </div>
    );
}
