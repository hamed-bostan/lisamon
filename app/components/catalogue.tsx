"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useState, type ReactNode } from "react";
import { categories, type Category } from "../data";
import { Button } from "./ui/button";
import styles from "./catalogue.styles";

const CategoryModal = dynamic(() => import("./catalogue-modal"));

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
          <Button canvas key={category.index} type="button" className={styles.bar} onClick={() => setOpen(i)}>
            <Bar category={category}><span className="sr-only">— open catalogue</span></Bar>
          </Button>
        ),
      )}
      {openCategory && <CategoryModal category={openCategory} onClose={close} />}
    </section>
  );
}
