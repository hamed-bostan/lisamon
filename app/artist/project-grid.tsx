"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useModal } from "../components/use-modal";
import { galleries, projects, type Gallery, type GalleryKey, type Project } from "../data";
import styles from "./artist.module.css";

const cardSizes = "(max-width: 700px) 92vw, 30vw";

function CardContent({ project }: { project: Project }) {
  return (
    <>
      <Image src={project.image} alt={project.alt} fill sizes={cardSizes} className={styles.cover} style={{ objectPosition: project.position }} />
      <span className={styles.cardShade} aria-hidden="true" />
      <span className={styles.cardCaption}>
        <span className={styles.cardYear}>{project.year}</span>
        <span className={styles.cardTitle}>{project.title}</span>
      </span>
    </>
  );
}

function GalleryModal({ gallery, onClose }: { gallery: Gallery; onClose: () => void }) {
  const closeButton = useModal(onClose);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="gallery-title" className={styles.modal} onClick={event => event.stopPropagation()}>
        <button ref={closeButton} type="button" aria-label="Close" className={styles.modalClose} onClick={onClose}>✕</button>
        <p className={styles.eyebrow}>{gallery.label}</p>
        <h2 id="gallery-title" className={styles.modalTitle}>{gallery.title}</h2>
        <div className={styles.modalGrid}>
          {gallery.images.map((src, i) => (
            <div key={src} className={styles.tile}>
              <Image src={src} alt={`${gallery.title} — work ${i + 1}`} fill sizes="(max-width: 600px) 92vw, 300px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectGrid() {
  const [open, setOpen] = useState<GalleryKey | null>(null);
  const close = useCallback(() => setOpen(null), []);

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
                <div className={styles.card}><CardContent project={project} /></div>
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
    </>
  );
}
