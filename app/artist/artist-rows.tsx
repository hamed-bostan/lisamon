"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import Modal from "../components/ui/modal";
import { galleryImageIds, projects, type Project } from "../data";
import { Button } from "../components/ui/button";
import styles from "./artist.styles";

type MediaData = typeof import("../../lib/media/artist");
type GalleryView = typeof import("./artist-gallery-modal")["default"];
type SingleView = typeof import("../components/lightbox")["default"];
type Selection =
  | { status: "idle" }
  | { status: "loading"; project: Project }
  | { status: "ready"; project: Project; media: MediaData; galleryView: GalleryView | null; singleView: SingleView | null }
  | { status: "error"; project: Project };

// The card image no longer shows on the page, so it leads each project's images.
const imagesOf = (project: Project, media: MediaData) => [media.projectImages[project.imageKey], ...(project.gallery ? media.galleries[project.gallery].images : [])];

/** One clickable list row: year column, text, and a "VIEW →" style cue that lights up on hover. */
function Row({ year, label, cue, onClick, children }: { year?: string; label: string; cue: string; onClick: () => void; children: ReactNode }) {
  return (
    <Button canvas type="button" className={`${styles.rowGrid} ${styles.rowButton}`} onClick={event => { event.currentTarget.focus(); onClick(); }} aria-label={label}>
      <span className={styles.rowYear}>{year}</span>
      <span className={styles.rowBody}>
        <span className={styles.rowMain}>{children}</span>
        <span className={styles.cue}>
          <span>{cue}</span>
          <span aria-hidden="true" className={styles.cueArrow}>→</span>
        </span>
      </span>
    </Button>
  );
}

/** The "About the Artist" row and the project rows; each opens the bio, a gallery, or a single image. */
export default function ArtistRows() {
  const media = useRef<MediaData | null>(null);
  const galleryView = useRef<GalleryView | null>(null);
  const singleView = useRef<SingleView | null>(null);
  const request = useRef(0);
  const [selection, setSelection] = useState<Selection>({ status: "idle" });
  const close = useCallback(() => { request.current++; setSelection({ status: "idle" }); }, []);
  const select = async (project: Project) => {
    const token = ++request.current;
    setSelection({ status: "loading", project });
    try {
      const [loaded, gallery, single] = await Promise.all([
        media.current ?? import("../../lib/media/artist"),
        project.gallery ? galleryView.current ?? import("./artist-gallery-modal").then(module => module.default) : null,
        project.gallery ? null : singleView.current ?? import("../components/lightbox").then(module => module.default),
      ]);
      if (token !== request.current) return;
      media.current = loaded;
      if (gallery) galleryView.current = gallery;
      if (single) singleView.current = single;
      setSelection({ status: "ready", project, media: loaded, galleryView: gallery, singleView: single });
    } catch {
      if (token === request.current) setSelection({ status: "error", project });
    }
  };
  return (
    <>
      <ol aria-label="Selected projects" className={styles.list}>
        {projects.map(project => {
          const count = 1 + (project.gallery ? galleryImageIds[project.gallery].length : 0);
          return (
            <li key={project.title} className={styles.row}>
              <Row year={project.year} label={`${project.title} — ${count > 1 ? `open gallery (${count} images)` : "view image"}`} cue={count > 1 ? "VIEW IMAGES" : "VIEW IMAGE"} onClick={() => void select(project)}>
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

      {selection.status === "loading" && <div className="fixed bottom-4 left-4 z-100 bg-white p-4 shadow-lg"><p role="status">Loading artwork…</p><Button canvas type="button" onClick={close}>Close</Button></div>}
      {selection.status === "error" && <Modal className={styles.overlay} label="Artwork unavailable" onClose={close}><div className={styles.modal}><Button canvas data-modal-close type="button" className={styles.modalClose} aria-label="Close" onClick={close}>✕</Button><p>Artwork could not be loaded.</p><Button canvas type="button" onClick={() => window.location.reload()}>Reload page</Button></div></Modal>}
      {selection.status === "ready" && (selection.project.gallery
        ? selection.galleryView && <selection.galleryView gallery={selection.media.galleries[selection.project.gallery]} images={imagesOf(selection.project, selection.media)} onClose={close} />
        : selection.singleView && <selection.singleView src={selection.media.projectImages[selection.project.imageKey]} alt={selection.project.alt} onClose={close} />)}
    </>
  );
}
