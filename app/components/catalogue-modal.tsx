"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Category } from "../data";
import { categoryImages } from "../gallery-data";
import { coverSizes } from "./cover-sizes";
import Lightbox from "./lightbox";
import { Button } from "./ui/button";
import styles from "./catalogue.styles";
import { useModal } from "./use-modal";

function CarouselIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.tileBadge} aria-hidden="true">
      <path d="M8 4.5A2.5 2.5 0 0 1 10.5 2h9A2.5 2.5 0 0 1 22 4.5v9a2.5 2.5 0 0 1-2.5 2.5H18V8.5A2.5 2.5 0 0 0 15.5 6H8z" />
      <rect x="2" y="8" width="14" height="14" rx="2.5" />
    </svg>
  );
}

export default function CategoryModal({ category, onClose }: { category: Category; onClose: () => void }) {
  const [zoomed, setZoomed] = useState<number | null>(null);
  const closeZoom = useCallback(() => setZoomed(null), []);
  const closeButton = useModal(zoomed === null ? onClose : closeZoom);
  const tileSizes = "(max-width: 600px) 92vw, (max-width: 1200px) 30vw, 300px";
  const imageAlt = (i: number) => `${category.name} — work ${i + 1}`;
  const images = categoryImages[category.index] ?? [];

  return (
    <>
      <div className={styles.overlay} aria-hidden={zoomed !== null} onClick={onClose}>
        <div role="dialog" aria-modal="true" aria-labelledby="catalogue-title" className={styles.modal} onClick={event => event.stopPropagation()}>
          <div className={styles.modalHeader}>
            <span className={styles.modalEyebrow}>CATALOGUE {category.index}</span>
            <h2 id="catalogue-title" className={styles.modalTitle}>{category.name}</h2>
            <Button canvas ref={closeButton} type="button" aria-label="Close" className={styles.modalClose} onClick={onClose}>✕</Button>
          </div>
          {images.length > 0 ? (
            <div className={styles.modalGrid}>
              {images.map(([src, ...more], i) => (
                <Button canvas key={src.src} type="button" className={styles.tile} onClick={() => setZoomed(i)} aria-label={`Enlarge ${imageAlt(i)}${more.length ? ` (${more.length + 1} images)` : ""}`}>
                  <Image src={src} alt={imageAlt(i)} fill sizes={coverSizes(tileSizes, src, 4 / 5)} />
                  {more.length > 0 && <CarouselIcon />}
                </Button>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>Gallery coming soon</p>
          )}
        </div>
      </div>
      {zoomed !== null && <Lightbox images={images[zoomed]} alt={imageAlt(zoomed)} onClose={closeZoom} />}
    </>
  );
}
