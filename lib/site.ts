import type { Metadata } from "next";

export const siteUrl = new URL("https://www.lisamon.ae");

export function pageMetadata({ title, description, path, image, imageAlt }: {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
}): Metadata {
  return {
    metadataBase: siteUrl,
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_AE",
      siteName: "LISAMON",
      title,
      description,
      url: path,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
