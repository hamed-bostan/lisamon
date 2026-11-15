import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "../../../content/portfolio";
import { categoryImages } from "../../../lib/media/catalogue";
import { pageMetadata } from "../../../lib/site";
import cover01 from "../../../public/images/catalogue/covers/01-bas-relief.jpg";
import cover02 from "../../../public/images/catalogue/covers/02-sculptures.jpg";
import cover03 from "../../../public/images/catalogue/covers/03-textured-walls.jpg";
import cover04 from "../../../public/images/catalogue/covers/04-murals.jpg";

const covers = { "01": cover01, "02": cover02, "03": cover03, "04": cover04 };

const galleries = categories.filter(category => category.kind === "gallery");
export const dynamicParams = false;

export function generateStaticParams() {
  return galleries.map(category => ({ slug: category.kind === "gallery" ? category.slug : "" }));
}

function galleryFor(slug: string) {
  return galleries.find(category => category.kind === "gallery" && category.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/catalogue/[slug]">) {
  const { slug } = await params;
  const category = galleryFor(slug);
  if (!category) return {};
  const cover = covers[category.index as keyof typeof covers];
  return pageMetadata({ title: category.name, description: category.name, path: category.href, image: category.cover, imageAlt: category.name, imageWidth: cover.width, imageHeight: cover.height });
}

export default async function CategoryPage({ params }: PageProps<"/catalogue/[slug]">) {
  const { slug } = await params;
  const category = galleryFor(slug);
  if (!category) notFound();
  const works = categoryImages[category.index];
  return (
    <div className="min-h-screen bg-white text-ink">
      <header className="flex items-center justify-between border-b border-line px-5 py-6 md:px-16">
        <Link href="/" className="text-xs font-semibold tracking-[0.35em]">← BACK</Link>
        <span className="text-xs tracking-[0.5em]">LISAMON</span>
      </header>
      <main id="main-content" tabIndex={-1} className="px-5 py-12 md:px-16">
        <p className="text-xs font-semibold tracking-[0.4em] text-taupe">CATALOGUE {category.index}</p>
        <h1 className="mt-4 mb-12 text-3xl font-black md:text-5xl">{category.name}</h1>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {works.flatMap((images, workIndex) => images.map((src, imageIndex) => (
            <Image
              key={src.src}
              src={src}
              alt={images.length > 1 && imageIndex > 0 ? `${category.name} — work ${workIndex + 1} — view ${imageIndex + 1} of ${images.length}` : `${category.name} — work ${workIndex + 1}`}
              width={src.width}
              height={src.height}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="aspect-[4/5] w-full object-cover"
            />
          )))}
        </div>
      </main>
    </div>
  );
}
