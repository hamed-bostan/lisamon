"use client";

import { getImageProps, type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import styles from "./lightbox.styles";
import Modal from "./ui/modal";

function Slide({ src, alt }: { src: StaticImageData; alt: string }) {
  const [failed, setFailed] = useState(false);
  const aspect = (src.width / src.height).toFixed(3);
  const { props } = getImageProps({ src, alt, fill: true, sizes: `min(calc(100vw - 32px), calc((100vh - 112px) * ${aspect}))` });
  return (
    <div className={styles.slide}>
      {/* A plain <img> keeps the picture's own aspect ratio inside the viewport; getImageProps still serves optimized sizes. */}
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      {failed ? <p role="alert" className="text-white" onClick={event => event.stopPropagation()}>Image unavailable.</p> : <img {...props} style={undefined} className={styles.image} onError={() => setFailed(true)} onClick={event => event.stopPropagation()} />}
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
    <Modal label={alt} className={styles.lightbox} onClose={onClose}>
      <div ref={track} className={styles.track} onScroll={multiple ? onScroll : undefined} onClick={onClose}>
        {images.map((src, i) => (
          <Slide key={src.src} src={src} alt={multiple ? `${alt} — view ${i + 1} of ${images.length}` : alt} />
        ))}
      </div>
      {multiple && (
        <>
          <Button canvas type="button" aria-label="Previous image" className={`${styles.nav} ${styles.prev}`} disabled={current === 0} onClick={event => { event.stopPropagation(); goTo(current - 1); }}>
            <Chevron />
          </Button>
          <Button canvas type="button" aria-label="Next image" className={`${styles.nav} ${styles.next}`} disabled={current === images.length - 1} onClick={event => { event.stopPropagation(); goTo(current + 1); }}>
            <Chevron flip />
          </Button>
          <div className={styles.dots} onClick={event => event.stopPropagation()}>
            {images.map((src, i) => (
              <Button canvas key={src.src} type="button" aria-label={`Show image ${i + 1}`} aria-current={i === current} className={styles.dot} onClick={() => goTo(i)} />
            ))}
          </div>
          <span className="sr-only" role="status" aria-live="polite">Image {current + 1} of {images.length}</span>
        </>
      )}
      <Button canvas data-modal-close type="button" aria-label="Close image" className={styles.close} onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </Button>
    </Modal>
  );
}
