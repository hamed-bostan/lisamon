import type { StaticImageData } from "next/image";
import { basRelief, dustman, foldedWoman, murals, projectImages, sculptures, texturedWalls, yellowRedFish } from "./images";

/** Gallery assets stay in this module so unopened galleries do not enter the initial client bundle. */
function works(images: StaticImageData[], shots: number[]): StaticImageData[][] {
  let start = 0;
  return shots.map(count => images.slice(start, (start += count)));
}

export const categoryImages: Record<string, StaticImageData[][]> = {
  "01": works(basRelief, [2, 1, 2, 2, 1, 1, 1, 2, 2, 2, 2]),
  "02": works(sculptures, [2, 3, 2, 1, 1, 2, 2, 3, 2, 1, 2]),
  "03": works(texturedWalls, [1, 1]),
  "04": works(murals, [3]),
};

export type Gallery = { label: string; title: string; images: StaticImageData[] };

export const galleries = {
  fish: { label: "SOLO EXHIBITION — 2021", title: "YELLOW RED FISH", images: yellowRedFish },
  fold: { label: "GRADUATION THESIS — 2019", title: "A FOLDED WOMAN", images: foldedWoman },
  dust: { label: "PUBLIC SCULPTURE — 2016", title: "DUSTMAN", images: dustman },
} satisfies Record<string, Gallery>;

export { projectImages };
