import type { Metadata } from "next";

export const siteUrl = new URL("https://www.lisamon.ae");

export function pageMetadata({ title, description, path, image, imageAlt, imageWidth, imageHeight }: {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
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
      images: [{ url: image, alt: imageAlt, width: imageWidth, height: imageHeight }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
