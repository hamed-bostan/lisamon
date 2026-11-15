import type { StaticImageData } from "next/image";
import { categoryWorks } from "../../content/portfolio";
import { basRelief, murals, sculptures, texturedWalls } from "../../app/images";

const imageGroups = {
  basRelief,
  sculptures,
  texturedWalls,
  murals,
};

const imageById = new Map<string, StaticImageData>();
for (const [prefix, images] of Object.entries(imageGroups)) {
  images.forEach((image, index) => imageById.set(`${prefix}${String(index + 1).padStart(2, "0")}`, image));
}

const used = new Set<string>();
export const categoryImages: Record<string, StaticImageData[][]> = Object.fromEntries(
  Object.entries(categoryWorks).map(([category, works]) => [category, works.map(work => {
    if (!work.images.length) throw new Error(`Empty image set: ${work.id}`);
    return work.images.map(id => {
      const image = imageById.get(id);
      if (!image) throw new Error(`Missing image: ${id}`);
      if (used.has(id)) throw new Error(`Duplicate image: ${id}`);
      used.add(id);
      return image;
    });
  })]),
);
if (used.size !== imageById.size) throw new Error(`Unmapped catalogue images: ${imageById.size - used.size}`);
