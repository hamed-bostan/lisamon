"use client";

import { useCallback, useState, type ReactNode } from "react";
import Modal from "../components/ui/modal";
import { Button } from "../components/ui/button";
import styles from "./artist.styles";

export default function ArtistBiography({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <div id="biography">
      <Button canvas type="button" className={`${styles.rowGrid} ${styles.rowButton}`} aria-label="About the Artist — read full biography" aria-haspopup="dialog" onClick={event => { event.currentTarget.focus(); setOpen(true); }}>
        {summary}
      </Button>
      {open && (
        <Modal className={styles.overlay} labelledBy="artist-title" onClose={close}>
          <div className={styles.aboutModal}>
            {children}
            <Button canvas data-modal-close type="button" aria-label="Close" className={styles.modalClose} onClick={close}>✕</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
