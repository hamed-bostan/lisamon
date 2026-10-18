"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { categories, type Category } from "../data";
import styles from "./catalogue.module.css";
import { useModal } from "./use-modal";

function Bar({ category, children }: { category: Category; children: ReactNode }) {
  return (
    <>
      <span className={styles.barMedia} aria-hidden="true">
        <Image src={category.cover} alt="" fill sizes="100vw" className={styles.barImage} />
        <span className={styles.barShade} />
      </span>
      <span className={styles.barIndex} aria-hidden="true">{category.index}</span>
      <span className={styles.barTitle}>
        <span className={styles.barName}>{category.name}</span>
        <span className={styles.barBrowse} aria-hidden="true">
          <span className={styles.barBrowseLabel}>BROWSE</span>
          <span className={styles.barBrowseIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
          </span>
        </span>
      </span>
      <span className={styles.barCta} aria-hidden="true">CATALOGUE →</span>
      {children}
    </>
  );
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const { props } = getImageProps({ src, alt, fill: true, sizes: "92vw" });

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    return () => previousFocus?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className={styles.lightbox}
      onClick={onClose}
    >
      {/* A plain <img> keeps the picture's own aspect ratio inside the viewport; getImageProps still serves optimized sizes. */}
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img {...props} style={undefined} className={styles.lightboxImage} onClick={event => event.stopPropagation()} />
      <button ref={closeButton} type="button" aria-label="Close image" className={styles.lightboxClose} onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>
  );
}

function CategoryModal({ category, onClose }: { category: Category; onClose: () => void }) {
  const [zoomed, setZoomed] = useState<number | null>(null);
  const closeZoom = useCallback(() => setZoomed(null), []);
  // Esc closes the enlarged image first, then the gallery.
  const closeButton = useModal(zoomed === null ? onClose : closeZoom);
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
              {category.images.map((src, i) => (
                <button key={src} type="button" className={styles.tile} onClick={() => setZoomed(i)} aria-label={`Enlarge ${imageAlt(i)}`}>
                  <Image src={src} alt={imageAlt(i)} fill sizes="(max-width: 600px) 92vw, (max-width: 1200px) 30vw, 300px" />
                </button>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>Gallery coming soon</p>
          )}
        </div>
      </div>
      {zoomed !== null && <Lightbox src={category.images[zoomed]} alt={imageAlt(zoomed)} onClose={closeZoom} />}
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
