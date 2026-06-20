export interface GlassPanelData {
  id: number;
  points: [number, number][];
}

export const glassPanels: GlassPanelData[] = [
  {
    id: 0,
    points: [[0, 0], [780, 0], [520, 450], [0, 550]],
  },
  {
    id: 1,
    points: [[780, 0], [1420, 0], [1280, 330], [520, 450]],
  },
  {
    id: 2,
    points: [[1420, 0], [1920, 0], [1920, 620], [1280, 330]],
  },
  {
    id: 3,
    points: [[0, 550], [520, 450], [480, 1080], [0, 1080]],
  },
  {
    id: 4,
    points: [[520, 450], [1280, 330], [1580, 1080], [480, 1080]],
  },
  {
    id: 5,
    points: [[1280, 330], [1920, 620], [1920, 1080], [1580, 1080]],
  },
];
