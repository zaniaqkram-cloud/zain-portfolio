import { Delaunay } from "d3-delaunay";

export interface VoronoiCellData {
  id: number;
  d: string;
  x: number;
  y: number;
  width: number;
  height: number;
  canvasWidth: number;
  canvasHeight: number;
}

function seededRandom(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return (s >>> 0) / 4294967296;
  };
}

function cellCountForViewport(w: number): number {
  if (w < 480) return 14;
  if (w < 768) return 22;
  if (w < 1024) return 30;
  return 42;
}

export function generateVoronoiCells(
  width: number,
  height: number,
  count?: number,
): VoronoiCellData[] {
  const cellCount = count ?? cellCountForViewport(width);
  const rng = seededRandom(42);

  const points: [number, number][] = [];
  for (let i = 0; i < cellCount; i++) {
    points.push([rng() * width, rng() * height]);
  }

  const delaunay = Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, width, height]);

  const cells: VoronoiCellData[] = [];

  for (let i = 0; i < cellCount; i++) {
    const polygon: Delaunay.Polygon | undefined =
      voronoi.cellPolygon(i);
    if (!polygon) continue;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const p of polygon) {
      const px = p[0];
      const py = p[1];
      if (px < minX) minX = px;
      if (py < minY) minY = py;
      if (px > maxX) maxX = px;
      if (py > maxY) maxY = py;
    }

    if (!isFinite(minX) || !isFinite(minY)) continue;

    const d =
      polygon
        .map((p, j) => `${j === 0 ? "M" : "L"}${p[0]},${p[1]}`)
        .join("") + "Z";

    cells.push({
      id: i,
      d,
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
      canvasWidth: width,
      canvasHeight: height,
    });
  }

  return cells;
}
