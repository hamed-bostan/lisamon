export type Category = {
  index: string;
  name: string;
  cover: string;
  href: string;
} & ({ kind: "gallery"; slug: string } | { kind: "artist" });

export type Work = { id: string; images: [string, ...string[]] };
export const categoryWorks: Record<string, Work[]> = {
  "01": [
    { id: "01-01", images: ["basRelief01", "basRelief02"] },
    { id: "01-02", images: ["basRelief03"] },
    { id: "01-03", images: ["basRelief04", "basRelief05"] },
    { id: "01-04", images: ["basRelief06", "basRelief07"] },
    { id: "01-05", images: ["basRelief08"] },
    { id: "01-06", images: ["basRelief09"] },
    { id: "01-07", images: ["basRelief10"] },
    { id: "01-08", images: ["basRelief11", "basRelief12"] },
    { id: "01-09", images: ["basRelief13", "basRelief14"] },
    { id: "01-10", images: ["basRelief15", "basRelief16"] },
    { id: "01-11", images: ["basRelief17", "basRelief18"] },
  ],
  "02": [
    { id: "02-01", images: ["sculptures01", "sculptures02"] },
    { id: "02-02", images: ["sculptures03", "sculptures04", "sculptures05"] },
    { id: "02-03", images: ["sculptures06", "sculptures07"] },
    { id: "02-04", images: ["sculptures08"] },
    { id: "02-05", images: ["sculptures09"] },
    { id: "02-06", images: ["sculptures10", "sculptures11"] },
    { id: "02-07", images: ["sculptures12", "sculptures13"] },
    { id: "02-08", images: ["sculptures14", "sculptures15", "sculptures16"] },
    { id: "02-09", images: ["sculptures17", "sculptures18"] },
    { id: "02-10", images: ["sculptures19"] },
    { id: "02-11", images: ["sculptures20", "sculptures21"] },
  ],
  "03": [
    { id: "03-01", images: ["texturedWalls01"] },
    { id: "03-02", images: ["texturedWalls02"] },
  ],
  "04": [
    { id: "04-01", images: ["murals01", "murals02", "murals03"] },
  ],
};

export const categories: Category[] = [
  { kind: "gallery", index: "01", name: "BAS-RELIEF & SCULPTURAL WALL", cover: "/images/catalogue/covers/01-bas-relief.jpg", slug: "bas-relief-sculptural-walls", href: "/catalogue/bas-relief-sculptural-walls" },
  { kind: "gallery", index: "02", name: "CUSTOM SCULPTURES & ART INSTALLATIONS", cover: "/images/catalogue/covers/02-sculptures.jpg", slug: "sculptures-installations", href: "/catalogue/sculptures-installations" },
  { kind: "gallery", index: "03", name: "DECORATIVE & TEXTURED WALLS", cover: "/images/catalogue/covers/03-textured-walls.jpg", slug: "decorative-textured-walls", href: "/catalogue/decorative-textured-walls" },
  { kind: "gallery", index: "04", name: "CUSTOM MURALS & WALL PAINTINGS", cover: "/images/catalogue/covers/04-murals.jpg", slug: "murals-wall-paintings", href: "/catalogue/murals-wall-paintings" },
  { kind: "artist", index: "05", name: "ARTIST", cover: "/images/catalogue/covers/05-artist.jpg", href: "/artist" },
];

export type GalleryKey = "fish" | "fold" | "dust";
export const galleryImageIds: Record<GalleryKey, [string, ...string[]]> = {
  fish: ["yellowRedFish01", "yellowRedFish02", "yellowRedFish03", "yellowRedFish04", "yellowRedFish05", "yellowRedFish06", "yellowRedFish07", "yellowRedFish08", "yellowRedFish09", "yellowRedFish10", "yellowRedFish11"],
  fold: ["foldedWoman01", "foldedWoman02"],
  dust: ["dustman01"],
};
export type ProjectImageKey = "vonto" | "difc" | "istanbul" | "yellowRedFish" | "foldedWoman" | "jokal" | "dustman";

export type Project = {
  year: string;
  title: string;
  imageKey: ProjectImageKey;
  alt: string;
  gallery?: GalleryKey;
  note?: { degree: string; description: string };
};

export const projects: Project[] = [
  { year: "2023–PRESENT", title: "HAND-PAINTED ART — VONTO", imageKey: "vonto", alt: "Hand-painted leather art for VONTO" },
  { year: "2022", title: "ART EXHIBITION — DIFC, DUBAI", imageKey: "difc", alt: "Art exhibition at DIFC, Dubai" },
  { year: "2021", title: "INTERNATIONAL EXHIBITION — ISTANBUL", imageKey: "istanbul", alt: "International exhibition, Istanbul" },
  { year: "2021", title: "SOLO EXHIBITION — YELLOW RED FISH", imageKey: "yellowRedFish", alt: "Yellow Red Fish solo exhibition painting", gallery: "fish" },
  {
    year: "2019",
    title: "A FOLDED WOMAN — GRADUATION THESIS",
    imageKey: "foldedWoman",
    alt: "A Folded Woman, graduation thesis painting",
    gallery: "fold",
    note: {
      degree: "Bachelor of Arts in Painting | University of Neyshabur, Iran",
      description: "Developed A Folded Woman as a final thesis project, exploring the complexities of feminine identity, psychological tension, and the relationship between vulnerability and resilience through figurative painting.",
    },
  },
  { year: "2019", title: "4TH NATIONAL JOKAL STUDENT PAINTING FESTIVAL", imageKey: "jokal", alt: "4th National Jokal Student Painting Festival poster" },
  { year: "2016", title: "DUSTMAN — PUBLIC SCULPTURE", imageKey: "dustman", alt: "Dustman public sculpture", gallery: "dust" },
];

export const exhibitions = [
  { year: "", title: "International Group Exhibition", venue: "Next Art Gallery — Istanbul, Turkey", description: "Participated in an international group exhibition featuring contemporary visual artworks by artists from Iran and Turkey." },
  { year: "2017", title: "Contemporary Art Group Exhibition", venue: "Farzad Gallery — Mashhad, Iran", description: "Participated in a group exhibition presenting contemporary artistic practices and visual expression." },
  { year: "2017", title: "Public Art & Urban Projects", venue: "Mashhad, Iran", description: "Contributed to public art initiatives involving painting and sculptural practices, exploring the relationship between artistic expression and urban environments." },
  { year: "2012", title: "First Place — Unglazed Pottery", venue: "30th Student Cultural & Artistic Festival — Khorasan Razavi, Iran", description: "Awarded first place at the provincial level in the Unglazed Pottery category, recognizing artistic craftsmanship and ceramic techniques." },
];
