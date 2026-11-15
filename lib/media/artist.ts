import type { StaticImageData } from "next/image";
import { dustman, foldedWoman, projectImages, yellowRedFish } from "../../app/images";
import { galleryImageIds, projects, type GalleryKey } from "../../content/portfolio";

const imageById = new Map<string, StaticImageData>();
for (const [prefix, images] of Object.entries({ yellowRedFish, foldedWoman, dustman })) {
  images.forEach((image, index) => imageById.set(`${prefix}${String(index + 1).padStart(2, "0")}`, image));
}
const used = new Set<string>();
const galleryImages = Object.fromEntries(
  (Object.keys(galleryImageIds) as GalleryKey[]).map(key => [key, galleryImageIds[key].map(id => {
    const image = imageById.get(id);
    if (!image) throw new Error(`Missing artist image: ${id}`);
    if (used.has(id)) throw new Error(`Duplicate artist image: ${id}`);
    used.add(id);
    return image;
  })]),
) as Record<GalleryKey, StaticImageData[]>;
if (used.size !== imageById.size) throw new Error(`Unmapped artist images: ${imageById.size - used.size}`);
for (const project of projects) {
  if (!projectImages[project.imageKey]) throw new Error(`Missing project cover: ${project.imageKey}`);
}

export type Gallery = { label: string; title: string; images: StaticImageData[] };
export const galleries = {
  fish: { label: "SOLO EXHIBITION — 2021", title: "YELLOW RED FISH", images: galleryImages.fish },
  fold: { label: "GRADUATION THESIS — 2019", title: "A FOLDED WOMAN", images: galleryImages.fold },
  dust: { label: "PUBLIC SCULPTURE — 2016", title: "DUSTMAN", images: galleryImages.dust },
} satisfies Record<string, Gallery>;
export { projectImages };
