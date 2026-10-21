"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, type ReactNode } from "react";
import { categories, type Category } from "../data";
import { coverSizes } from "./cover-sizes";
import Lightbox from "./lightbox";
import styles from "./catalogue.module.css";
import { useModal } from "./use-modal";

function Bar({ category, children }: { category: Category; children: ReactNode }) {
  return (
    <>
      <span className={styles.barMedia} aria-hidden="true">
        <Image src={category.cover} alt="" fill sizes="100vw" className={styles.barImage} />
        <span className={styles.barShade} />
      </span>
      <span className={styles.barTitle}>
        <span className={styles.barName}>{category.name}</span>
        <span className={styles.barBrowse} aria-hidden="true">
          <span className={styles.barBrowseLabel}>BROWSE</span>
          <span className={styles.barBrowseIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
          </span>
        </span>
      </span>
      {children}
    </>
  );
}

/** Marks a tile that opens several shots, like Instagram's multi-photo badge. */
function CarouselIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.tileBadge} aria-hidden="true">
      <path d="M8 4.5A2.5 2.5 0 0 1 10.5 2h9A2.5 2.5 0 0 1 22 4.5v9a2.5 2.5 0 0 1-2.5 2.5H18V8.5A2.5 2.5 0 0 0 15.5 6H8z" />
      <rect x="2" y="8" width="14" height="14" rx="2.5" />
    </svg>
  );
}

function CategoryModal({ category, onClose }: { category: Category; onClose: () => void }) {
  const [zoomed, setZoomed] = useState<number | null>(null);
  const closeZoom = useCallback(() => setZoomed(null), []);
  // Esc closes the enlarged image first, then the gallery.
  const closeButton = useModal(zoomed === null ? onClose : closeZoom);
  const tileSizes = "(max-width: 600px) 92vw, (max-width: 1200px) 30vw, 300px";
  const imageAlt = (i: number) => `${category.name} — work ${i + 1}`;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="catalogue-title"
          className={styles.modal}
          onClick={event => event.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <span className={styles.modalEyebrow}>CATALOGUE {category.index}</span>
            <h2 id="catalogue-title" className={styles.modalTitle}>{category.name}</h2>
            <button ref={closeButton} type="button" aria-label="Close" className={styles.modalClose} onClick={onClose}>✕</button>
          </div>
          {category.images.length > 0 ? (
            <div className={styles.modalGrid}>
              {category.images.map(([src, ...more], i) => (
                <button key={src.src} type="button" className={styles.tile} onClick={() => setZoomed(i)} aria-label={`Enlarge ${imageAlt(i)}${more.length ? ` (${more.length + 1} images)` : ""}`}>
                  <Image src={src} alt={imageAlt(i)} fill sizes={coverSizes(tileSizes, src, 4 / 5)} />
                  {more.length > 0 && <CarouselIcon />}
                </button>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>Gallery coming soon</p>
          )}
        </div>
      </div>
      {zoomed !== null && <Lightbox images={category.images[zoomed]} alt={imageAlt(zoomed)} onClose={closeZoom} />}
    </>
  );
}

export default function Catalogue() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const openCategory = open === null ? null : categories[open];

  return (
    <section id="catalogue" aria-label="Catalogue" className={styles.bars}>
      {categories.map((category, i) =>
        category.href ? (
          <Link key={category.index} href={category.href} className={styles.bar}>
            <Bar category={category}><span className="sr-only">— about the artist</span></Bar>
          </Link>
        ) : (
          <button key={category.index} type="button" className={styles.bar} onClick={() => setOpen(i)}>
            <Bar category={category}><span className="sr-only">— open catalogue</span></Bar>
          </button>
        ),
      )}
      {openCategory && <CategoryModal category={openCategory} onClose={close} />}
    </section>
  );
}
