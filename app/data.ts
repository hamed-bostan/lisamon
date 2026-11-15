export const contact = {
  email: "lisamon.artt@gmail.com",
  whatsapp: "https://wa.me/971501471996",
  instagram: "https://www.instagram.com/lisamondubai/",
};

export type Category = {
  index: string;
  name: string;
  cover: string;
  href?: string;
};

export const categories: Category[] = [
  { index: "01", name: "BAS-RELIEF & SCULPTURAL WALL", cover: "/images/catalogue/covers/01-bas-relief.jpg" },
  { index: "02", name: "CUSTOM SCULPTURES & ART INSTALLATIONS", cover: "/images/catalogue/covers/02-sculptures.jpg" },
  { index: "03", name: "DECORATIVE & TEXTURED WALLS", cover: "/images/catalogue/covers/03-textured-walls.jpg" },
  { index: "04", name: "CUSTOM MURALS & WALL PAINTINGS", cover: "/images/catalogue/covers/04-murals.jpg" },
  { index: "05", name: "ARTIST", cover: "/images/catalogue/covers/05-artist.jpg", href: "/artist" },
];

export type GalleryKey = "fish" | "fold" | "dust";
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
