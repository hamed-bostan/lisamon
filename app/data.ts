export const contact = {
  email: "lisamon.artt@gmail.com",
  whatsapp: "https://wa.me/971501471996",
  instagram: "https://www.instagram.com/lisamondubai/",
};

const numbered = (folder: string, count: number, ext = "jpg") =>
  Array.from({ length: count }, (_, i) => `/images/${folder}/${String(i + 1).padStart(2, "0")}.${ext}`);

export type Category = {
  index: string;
  name: string;
  cover: string;
  images: string[];
  href?: string;
};

export const categories: Category[] = [
  { index: "01", name: "BAS-RELIEF & SCULPTURAL WALL", cover: "/images/catalogue/covers/01-bas-relief.jpg", images: numbered("catalogue/bas-relief", 19) },
  { index: "02", name: "CUSTOM SCULPTURES & ART INSTALLATIONS", cover: "/images/catalogue/covers/02-sculptures.jpg", images: numbered("catalogue/sculptures", 21) },
  { index: "03", name: "DECORATIVE & TEXTURED WALLS", cover: "/images/catalogue/covers/03-textured-walls.jpg", images: numbered("catalogue/textured-walls", 2) },
  { index: "04", name: "CUSTOM MURALS & WALL PAINTINGS", cover: "/images/catalogue/covers/04-murals.jpg", images: numbered("catalogue/murals", 8) },
  { index: "05", name: "ARTIST", cover: "/images/catalogue/covers/05-artist.jpg", images: [], href: "/artist" },
];

export type Gallery = { label: string; title: string; images: string[] };

const yellowRedFish = numbered("artist/yellow-red-fish", 11, "png");
yellowRedFish[5] = "/images/artist/yellow-red-fish/06.jpg";

export const galleries = {
  fish: { label: "SOLO EXHIBITION — 2021", title: "YELLOW RED FISH", images: yellowRedFish },
  fold: { label: "GRADUATION THESIS — 2019", title: "A FOLDED WOMAN", images: numbered("artist/folded-woman", 2, "png") },
  dust: { label: "PUBLIC SCULPTURE — 2016", title: "DUSTMAN", images: numbered("artist/dustman", 1, "png") },
} satisfies Record<string, Gallery>;

export type GalleryKey = keyof typeof galleries;

export type Project = {
  year: string;
  title: string;
  image: string;
  alt: string;
  position?: string;
  gallery?: GalleryKey;
  note?: { degree: string; description: string };
};

export const projects: Project[] = [
  { year: "2023–PRESENT", title: "HAND-PAINTED ART — VONTO", image: "/images/artist/projects/vonto.png", alt: "Hand-painted leather art for VONTO" },
  { year: "2022", title: "ART EXHIBITION — DIFC, DUBAI", image: "/images/artist/projects/difc.png", alt: "Art exhibition at DIFC, Dubai" },
  { year: "2021", title: "INTERNATIONAL EXHIBITION — ISTANBUL", image: "/images/artist/projects/istanbul.png", alt: "International exhibition, Istanbul" },
  { year: "2021", title: "SOLO EXHIBITION — YELLOW RED FISH", image: "/images/artist/projects/yellow-red-fish.jpg", alt: "Yellow Red Fish solo exhibition painting", position: "50% 32%", gallery: "fish" },
  {
    year: "2019",
    title: "A FOLDED WOMAN — GRADUATION THESIS",
    image: "/images/artist/projects/folded-woman.png",
    alt: "A Folded Woman, graduation thesis painting",
    position: "50% 40%",
    gallery: "fold",
    note: {
      degree: "Bachelor of Arts in Painting | University of Neyshabur, Iran",
      description: "Developed A Folded Woman as a final thesis project, exploring the complexities of feminine identity, psychological tension, and the relationship between vulnerability and resilience through figurative painting.",
    },
  },
  { year: "2019", title: "4TH NATIONAL JOKAL STUDENT PAINTING FESTIVAL", image: "/images/artist/projects/jokal.png", alt: "4th National Jokal Student Painting Festival poster", position: "50% 28%" },
  { year: "2016", title: "DUSTMAN — PUBLIC SCULPTURE", image: "/images/artist/projects/dustman.png", alt: "Dustman public sculpture", position: "50% 42%", gallery: "dust" },
];

export const exhibitions = [
  { year: "", title: "International Group Exhibition", venue: "Next Art Gallery — Istanbul, Turkey", description: "Participated in an international group exhibition featuring contemporary visual artworks by artists from Iran and Turkey." },
  { year: "2017", title: "Contemporary Art Group Exhibition", venue: "Farzad Gallery — Mashhad, Iran", description: "Participated in a group exhibition presenting contemporary artistic practices and visual expression." },
  { year: "2017", title: "Public Art & Urban Projects", venue: "Mashhad, Iran", description: "Contributed to public art initiatives involving painting and sculptural practices, exploring the relationship between artistic expression and urban environments." },
  { year: "2012", title: "First Place — Unglazed Pottery", venue: "30th Student Cultural & Artistic Festival — Khorasan Razavi, Iran", description: "Awarded first place at the provincial level in the Unglazed Pottery category, recognizing artistic craftsmanship and ceramic techniques." },
];
