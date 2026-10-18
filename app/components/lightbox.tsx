"use client";

import { getImageProps, type StaticImageData } from "next/image";
import styles from "./lightbox.module.css";
import { useModal } from "./use-modal";

/** Full-screen view of one image. Click outside it, the ✕, or Esc closes it. */
export default function Lightbox({ src, alt, onClose }: { src: StaticImageData; alt: string; onClose: () => void }) {
  const closeButton = useModal(onClose);
  const { props } = getImageProps({ src, alt, fill: true, sizes: "92vw" });

  return (
    <div role="dialog" aria-modal="true" aria-label={alt} className={styles.lightbox} onClick={onClose}>
      {/* A plain <img> keeps the picture's own aspect ratio inside the viewport; getImageProps still serves optimized sizes. */}
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img {...props} style={undefined} className={styles.image} onClick={event => event.stopPropagation()} />
      <button ref={closeButton} type="button" aria-label="Close image" className={styles.close} onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>
  );
}
