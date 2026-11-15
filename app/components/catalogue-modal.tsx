"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Category } from "../data";
import { categoryImages } from "../../lib/media/catalogue";
import { coverSizes } from "./cover-sizes";
import Lightbox from "./lightbox";
import { Button } from "./ui/button";
import styles from "./catalogue.styles";
import Modal from "./ui/modal";

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
  const tileSizes = "(max-width: 700px) calc(100vw - 80px), (max-width: 1200px) calc((100vw - 160px) / 2), 300px";
  const imageAlt = (i: number) => `${category.name} — work ${i + 1}`;
  const images = categoryImages[category.index] ?? [];

  return (
    <>
      <Modal className={styles.overlay} labelledBy="catalogue-title" onClose={onClose}>
        <div className={styles.modal} onClick={event => event.stopPropagation()}>
          <div className={styles.modalHeader}>
            <span className={styles.modalEyebrow}>CATALOGUE {category.index}</span>
            <h2 id="catalogue-title" className={styles.modalTitle}>{category.name}</h2>
            <Button canvas data-modal-close type="button" aria-label="Close" className={styles.modalClose} onClick={onClose}>✕</Button>
          </div>
          {images.length > 0 ? (
            <div className={styles.modalGrid}>
              {images.map(([src, ...more], i) => (
                <Button canvas key={src.src} type="button" className={styles.tile} onClick={event => { event.currentTarget.focus(); setZoomed(i); }} aria-label={`Enlarge ${imageAlt(i)}${more.length ? ` (${more.length + 1} images)` : ""}`}>
                  <Image src={src} alt={imageAlt(i)} fill sizes={coverSizes(tileSizes, src, 4 / 5)} />
                  {more.length > 0 && <CarouselIcon />}
                </Button>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>Gallery coming soon</p>
          )}
        </div>
      </Modal>
      {zoomed !== null && <Lightbox images={images[zoomed]} alt={imageAlt(zoomed)} onClose={closeZoom} />}
    </>
  );
}
