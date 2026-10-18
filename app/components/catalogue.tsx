"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, type ReactNode } from "react";
import { categories, type Category } from "../data";
import styles from "./catalogue.module.css";
import { useModal } from "./use-modal";

function Bar({ category, children }: { category: Category; children: ReactNode }) {
  return (
    <>
      <Image src={category.cover} alt="" fill sizes="100vw" className={styles.barImage} />
      <span className={styles.barShade} aria-hidden="true" />
      <span className={styles.barIndex} aria-hidden="true">{category.index}</span>
      <span className={styles.barName}>{category.name}</span>
      <span className={styles.barCta} aria-hidden="true">CATALOGUE →</span>
      {children}
    </>
  );
}

function CategoryModal({ category, onClose }: { category: Category; onClose: () => void }) {
  const closeButton = useModal(onClose);

  return (
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
              <div key={src} className={styles.tile}>
                <Image src={src} alt={`${category.name} — work ${i + 1}`} fill sizes="(max-width: 600px) 92vw, (max-width: 1200px) 30vw, 300px" />
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Gallery coming soon</p>
        )}
      </div>
    </div>
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
