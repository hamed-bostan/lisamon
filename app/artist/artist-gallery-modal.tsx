"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useState } from "react";
import { coverSizes } from "../components/cover-sizes";
import Lightbox from "../components/lightbox";
import Modal from "../components/ui/modal";
import { Button } from "../components/ui/button";
import type { Gallery } from "../../lib/media/artist";
import styles from "./artist.styles";

export default function ArtistGalleryModal({ gallery, images, onClose }: { gallery: Gallery; images: StaticImageData[]; onClose: () => void }) {
  const [zoomed, setZoomed] = useState<{ images: StaticImageData[]; alt: string } | null>(null);
  const closeZoom = useCallback(() => setZoomed(null), []);
  return <>
    <Modal className={styles.overlay} labelledBy="gallery-title" onClose={onClose}>
      <div className={styles.modal} onClick={event => event.stopPropagation()}>
        <Button canvas data-modal-close type="button" aria-label="Close" className={styles.modalClose} onClick={onClose}>✕</Button>
        <p className={styles.eyebrow}>{gallery.label}</p>
        <h2 id="gallery-title" className={styles.modalTitle}>{gallery.title}</h2>
        <div className={styles.modalGrid}>
          {images.map((src, i) => {
            const alt = `${gallery.title} — work ${i + 1}`;
            return <Button canvas key={src.src} type="button" className={styles.tile} onClick={event => { event.currentTarget.focus(); setZoomed({ images: [src], alt }); }} aria-label={`Enlarge ${alt}`}>
              <Image src={src} alt={alt} fill sizes={coverSizes("(max-width: 600px) 92vw, 300px", src, 1)} />
            </Button>;
          })}
        </div>
      </div>
    </Modal>
    {zoomed && <Lightbox images={zoomed.images} alt={zoomed.alt} onClose={closeZoom} />}
  </>;
}
