import Image, { type ImageProps } from "next/image";
import type { ComponentPropsWithoutRef } from "react";

type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  as?: "h1" | "h2";
  tone?: "plum" | "cream";
};

export function Heading({ as: Tag = "h2", tone = "plum", className = "", ...props }: HeadingProps) {
  return (
    <Tag
      className={`font-display font-normal uppercase leading-[1.08] tracking-[-.045em] ${tone === "cream" ? "text-cream" : "text-plum"} ${className}`}
      {...props}
    />
  );
}

export function HeadingAccent({ className = "", ...props }: ComponentPropsWithoutRef<"em">) {
  return <em className={`font-serif font-normal text-rose tracking-[-.07em] ${className}`} {...props} />;
}

export function Copy({ className = "", ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={`text-body leading-snug ${className}`} {...props} />;
}

const dividerTones = {
  rose: "bg-rose",
  ochre: "bg-[#ae8050]",
  bronze: "bg-[#ba8763]",
};

export function Divider({ tone = "rose", className = "" }: {
  tone?: keyof typeof dividerTones;
  className?: string;
}) {
  return <span aria-hidden="true" className={`block h-px w-[9cqw] md:w-[4.9cqw] ${dividerTones[tone]} ${className}`} />;
}

type ArtworkProps = Pick<ImageProps, "src" | "alt" | "sizes"> & {
  href?: string;
  className?: string;
  imageClassName?: string;
};

export function Artwork({ src, alt, sizes, href, className = "", imageClassName = "" }: ArtworkProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={`object-cover ${href ? "motion-safe:transition-transform motion-safe:duration-350 motion-safe:group-hover:scale-[1.035] motion-safe:group-focus-visible:scale-[1.035]" : ""} ${imageClassName}`}
    />
  );

  return href ? (
    <a href={href} className={`group relative block overflow-hidden ${className}`}>{image}</a>
  ) : (
    <div className={`relative overflow-hidden ${className}`}>{image}</div>
  );
}
