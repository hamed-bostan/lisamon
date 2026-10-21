"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useState, type ReactNode } from "react";
import { coverSizes } from "../components/cover-sizes";
import Lightbox from "../components/lightbox";
import { useModal } from "../components/use-modal";
import { galleries, projects, type Gallery, type Project } from "../data";
import styles from "./artist.module.css";

import portrait from "../../public/images/artist/portrait.jpg";

// The portrait column is usually taller than it is wide (the text beside it sets its height).
const portraitBoxRatio = 3 / 4;

type Zoomed = { images: StaticImageData[]; alt: string };

// The card image no longer shows on the page, so it leads each project's images.
const imagesOf = (project: Project) => [project.image, ...(project.gallery ? galleries[project.gallery].images : [])];

/** One clickable list row: year column, text, and a "VIEW →" style cue that lights up on hover. */
function Row({ year, label, cue, onClick, children }: { year?: string; label: string; cue: string; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className={`${styles.rowGrid} ${styles.rowButton}`} onClick={onClick} aria-label={label}>
      <span className={styles.rowYear}>{year}</span>
      <span className={styles.rowBody}>
        <span className={styles.rowMain}>{children}</span>
        <span className={styles.cue}>
          <span>{cue}</span>
          <span aria-hidden="true" className={styles.cueArrow}>→</span>
        </span>
      </span>
    </button>
  );
}

function AboutModal({ onClose }: { onClose: () => void }) {
  const closeButton = useModal(onClose);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="artist-title" className={styles.aboutModal} onClick={event => event.stopPropagation()}>
        <div className={styles.aboutCopy}>
          <p className={styles.eyebrow}>CATALOGUE 05 — ARTIST</p>
          <h2 id="artist-title" className={styles.aboutTitle}>About the Artist</h2>
          <p className={styles.name}>MAEDEH AKBARI <span>FARIMANI</span></p>
          <div className={styles.bioText}>
            <p><b>Maedeh Akbari Farimani</b> is a Dubai-based independent visual artist with a background in painting and sculpture.</p>
            <p>Holding a Bachelor of Arts in Painting, her artistic practice explores the human form, emotions, identity, and the relationship between material and expression.</p>
            <p>Working across painting, sculpture, and mixed media, she experiments with texture, dimension, and unconventional forms to create thought-provoking works that move beyond traditional artistic boundaries.</p>
            <p>Her work reflects a personal exploration of the human experience, balancing abstraction, symbolism, and contemporary expression.</p>
          </div>
        </div>
        <div className={styles.portrait}>
          <Image src={portrait} alt="Maedeh Akbari Farimani painting in the studio" fill sizes={coverSizes("(max-width: 900px) 100vw, 640px", portrait, portraitBoxRatio)} className={styles.cover} style={{ objectPosition: "62% 50%" }} />
        </div>
        <button ref={closeButton} type="button" aria-label="Close" className={styles.modalClose} onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

function GalleryModal({ gallery, images, onClose }: { gallery: Gallery; images: StaticImageData[]; onClose: () => void }) {
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
            {images.map((src, i) => {
              const alt = `${gallery.title} — work ${i + 1}`;
              return (
                <button key={src.src} type="button" className={styles.tile} onClick={() => setZoomed({ images: [src], alt })} aria-label={`Enlarge ${alt}`}>
                  <Image src={src} alt={alt} fill sizes={coverSizes("(max-width: 600px) 92vw, 300px", src, 1)} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {zoomed && <Lightbox images={zoomed.images} alt={zoomed.alt} onClose={closeZoom} />}
    </>
  );
}

/** The "About the Artist" row and the project rows; each opens the bio, a gallery, or a single image. */
export default function ArtistRows() {
  const [about, setAbout] = useState(false);
  const [open, setOpen] = useState<Project | null>(null);
  const [zoomed, setZoomed] = useState<Zoomed | null>(null);
  const closeAbout = useCallback(() => setAbout(false), []);
  const close = useCallback(() => setOpen(null), []);
  const closeZoom = useCallback(() => setZoomed(null), []);

  return (
    <>
      <ol aria-label="About the artist" className={styles.list}>
        <li>
          <Row label="About the Artist — read full biography" cue="READ MORE" onClick={() => setAbout(true)}>
            <span className={styles.rowTitle}>About the Artist</span>
            <span className={styles.rowVenue}>Maedeh Akbari Farimani</span>
            <span className={styles.rowText}>Dubai-based independent visual artist with a background in painting and sculpture.</span>
          </Row>
        </li>
      </ol>

      <ol aria-label="Selected projects" className={styles.list}>
        {projects.map(project => {
          const count = imagesOf(project).length;
          const view = () => (project.gallery ? setOpen(project) : setZoomed({ images: [project.image], alt: project.alt }));
          return (
            <li key={project.title} className={styles.row}>
              <Row year={project.year} label={`${project.title} — ${count > 1 ? `open gallery (${count} images)` : "view image"}`} cue={count > 1 ? "VIEW IMAGES" : "VIEW IMAGE"} onClick={view}>
                <span className={styles.rowTitle}>{project.title}</span>
                {project.note && (
                  <>
                    <span className={styles.rowVenue}>{project.note.degree}</span>
                    <span className={styles.rowText}>{project.note.description}</span>
                  </>
                )}
              </Row>
            </li>
          );
        })}
      </ol>

      {about && <AboutModal onClose={closeAbout} />}
      {open?.gallery && <GalleryModal gallery={galleries[open.gallery]} images={imagesOf(open)} onClose={close} />}
      {zoomed && <Lightbox images={zoomed.images} alt={zoomed.alt} onClose={closeZoom} />}
    </>
  );
}
