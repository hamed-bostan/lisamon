"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState, type ComponentType, type ReactNode } from "react";
import { categories, type Category } from "../data";
import Modal from "./ui/modal";
import styles from "./catalogue.styles";

type CategoryModalType = typeof import("./catalogue-modal")["default"];
type Selection = { status: "idle" } | { status: "loading"; category: Category } | { status: "ready"; category: Category } | { status: "error"; category: Category };

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
  const [selection, setSelection] = useState<Selection>({ status: "idle" });
  const [modal, setModal] = useState<ComponentType<{ category: Category; onClose: () => void }> | null>(null);
  const request = useRef(0);
  const close = useCallback(() => { request.current++; setSelection({ status: "idle" }); }, []);
  const open = async (category: Category) => {
    const token = ++request.current;
    setSelection({ status: modal ? "ready" : "loading", category });
    if (modal) return;
    try {
      const loaded = (await import("./catalogue-modal")).default as CategoryModalType;
      if (token !== request.current) return;
      setModal(() => loaded);
      setSelection({ status: "ready", category });
    } catch {
      if (token === request.current) setSelection({ status: "error", category });
    }
  };

  return (
    <section id="catalogue" aria-label="Catalogue" className={styles.bars}>
      {categories.map(category =>
        category.kind === "artist" ? (
          <Link key={category.index} href={category.href} className={styles.bar}>
            <Bar category={category}><span className="sr-only">— about the artist</span></Bar>
          </Link>
        ) : (
          <Link key={category.index} href={category.href} className={styles.bar} onClick={event => { event.preventDefault(); event.currentTarget.focus(); void open(category); }}>
            <Bar category={category}><span className="sr-only">— open catalogue</span></Bar>
          </Link>
        ),
      )}
      {selection.status === "ready" && modal && (() => { const LoadedModal = modal; return <LoadedModal category={selection.category} onClose={close} />; })()}
      {selection.status === "loading" && <Modal label="Loading catalogue" className={styles.overlay} onClose={close}><div className={styles.modal}><button data-modal-close type="button" onClick={close}>Close</button><p role="status">Loading catalogue…</p></div></Modal>}
      {selection.status === "error" && <Modal label="Catalogue unavailable" className={styles.overlay} onClose={close}><div className={styles.modal}><button data-modal-close type="button" onClick={close}>Close</button><p role="alert">Catalogue could not be loaded.</p><button type="button" onClick={() => window.location.reload()}>Reload page</button></div></Modal>}
    </section>
  );
}
