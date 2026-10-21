"use client";

import { getImageProps, type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./lightbox.module.css";
import { useModal } from "./use-modal";

function Slide({ src, alt }: { src: StaticImageData; alt: string }) {
  const { props } = getImageProps({ src, alt, fill: true, sizes: "92vw" });
  return (
    <div className={styles.slide}>
      {/* A plain <img> keeps the picture's own aspect ratio inside the viewport; getImageProps still serves optimized sizes. */}
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img {...props} style={undefined} className={styles.image} onClick={event => event.stopPropagation()} />
    </div>
  );
}

function Chevron({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={flip ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
    </svg>
  );
}

/**
 * Full-screen view of one image, or a swipeable slider when given several shots of the same piece.
 * Click outside the image, the ✕, or Esc closes it; arrows, ← → keys and swipes move between shots.
 */
export default function Lightbox({ alt, onClose, ...props }: { alt: string; onClose: () => void } & ({ images: StaticImageData[] } | { src: StaticImageData })) {
  const images = "images" in props ? props.images : [props.src];
  const closeButton = useModal(onClose);
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const multiple = images.length > 1;

  const goTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: Math.max(0, Math.min(images.length - 1, index)) * el.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const latestGoTo = useRef(goTo);
  useEffect(() => {
    latestGoTo.current = goTo;
  });

  useEffect(() => {
    if (!multiple) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const el = track.current;
      if (!el) return;
      const index = Math.round(el.scrollLeft / el.clientWidth);
      if (event.key === "ArrowLeft") latestGoTo.current(index - 1);
      if (event.key === "ArrowRight") latestGoTo.current(index + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [multiple]);

  const onScroll = () => {
    const el = track.current;
    if (el) setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div role="dialog" aria-modal="true" aria-label={alt} className={styles.lightbox} onClick={onClose}>
      <div ref={track} className={styles.track} onScroll={multiple ? onScroll : undefined}>
        {images.map((src, i) => (
          <Slide key={src.src} src={src} alt={multiple ? `${alt} — view ${i + 1} of ${images.length}` : alt} />
        ))}
      </div>
      {multiple && (
        <>
          <button type="button" aria-label="Previous image" className={`${styles.nav} ${styles.prev}`} disabled={current === 0} onClick={event => { event.stopPropagation(); goTo(current - 1); }}>
            <Chevron />
          </button>
          <button type="button" aria-label="Next image" className={`${styles.nav} ${styles.next}`} disabled={current === images.length - 1} onClick={event => { event.stopPropagation(); goTo(current + 1); }}>
            <Chevron flip />
          </button>
          <div className={styles.dots} onClick={event => event.stopPropagation()}>
            {images.map((src, i) => (
              <button key={src.src} type="button" aria-label={`Show image ${i + 1}`} aria-current={i === current} className={styles.dot} onClick={() => goTo(i)} />
            ))}
          </div>
        </>
      )}
      <button ref={closeButton} type="button" aria-label="Close image" className={styles.close} onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>
  );
}
