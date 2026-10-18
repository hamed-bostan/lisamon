"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useState } from "react";
import { coverSizes } from "../components/cover-sizes";
import Lightbox from "../components/lightbox";
import { useModal } from "../components/use-modal";
import { galleries, projects, type Gallery, type GalleryKey, type Project } from "../data";
import styles from "./artist.module.css";

const cardSizes = "(max-width: 700px) 92vw, 30vw";

type Zoomed = { src: StaticImageData; alt: string };

function CardContent({ project }: { project: Project }) {
  return (
    <>
      <Image src={project.image} alt={project.alt} fill sizes={coverSizes(cardSizes, project.image, 4 / 5)} className={styles.cover} style={{ objectPosition: project.position }} />
      <span className={styles.cardShade} aria-hidden="true" />
      <span className={styles.cardCaption}>
        <span className={styles.cardYear}>{project.year}</span>
        <span className={styles.cardTitle}>{project.title}</span>
      </span>
    </>
  );
}

function GalleryModal({ gallery, onClose }: { gallery: Gallery; onClose: () => void }) {
  const [zoomed, setZoomed] = useState<Zoomed | null>(null);
  const closeZoom = useCallback(() => setZoomed(null), []);
  // Esc closes the enlarged image first, then the gallery.
  const closeButton = useModal(zoomed === null ? onClose : closeZoom);

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div role="dialog" aria-modal="true" aria-labelledby="gallery-title" className={styles.modal} onClick={event => event.stopPropagation()}>
          <button ref={closeButton} type="button" aria-label="Close" className={styles.modalClose} onClick={onClose}>✕</button>
          <p className={styles.eyebrow}>{gallery.label}</p>
          <h2 id="gallery-title" className={styles.modalTitle}>{gallery.title}</h2>
          <div className={styles.modalGrid}>
            {gallery.images.map((src, i) => {
              const alt = `${gallery.title} — work ${i + 1}`;
              return (
                <button key={src.src} type="button" className={styles.tile} onClick={() => setZoomed({ src, alt })} aria-label={`Enlarge ${alt}`}>
                  <Image src={src} alt={alt} fill sizes={coverSizes("(max-width: 600px) 92vw, 300px", src, 1)} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {zoomed && <Lightbox src={zoomed.src} alt={zoomed.alt} onClose={closeZoom} />}
    </>
  );
}

export default function ProjectGrid() {
  const [open, setOpen] = useState<GalleryKey | null>(null);
  const [zoomed, setZoomed] = useState<Zoomed | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const closeZoom = useCallback(() => setZoomed(null), []);

  return (
    <>
      <ul className={styles.grid}>
        {projects.map(project => {
          const { gallery } = project;
          return (
            <li key={project.title}>
              {gallery ? (
                <button type="button" className={styles.card} onClick={() => setOpen(gallery)} aria-label={`${project.title} — open gallery`}>
                  <CardContent project={project} />
                </button>
              ) : (
                <button type="button" className={`${styles.card} ${styles.zoomable}`} onClick={() => setZoomed({ src: project.image, alt: project.alt })} aria-label={`${project.title} — enlarge image`}>
                  <CardContent project={project} />
                </button>
              )}
              {project.note && (
                <div className={styles.cardNote}>
                  <p className={styles.cardDegree}>{project.note.degree}</p>
                  <p className={styles.cardDescription}>{project.note.description}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {open && <GalleryModal gallery={galleries[open]} onClose={close} />}
      {zoomed && <Lightbox src={zoomed.src} alt={zoomed.alt} onClose={closeZoom} />}
    </>
  );
}
