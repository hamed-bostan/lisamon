import type { Metadata } from "next";
import Link from "next/link";
import { exhibitions } from "../data";
import ArtistRows from "./artist-rows";
import styles from "./artist.module.css";

export const metadata: Metadata = {
  title: "About the Artist — Maedeh Akbari Farimani | LISAMON",
  description: "Maedeh Akbari Farimani is a Dubai-based independent visual artist working across painting, sculpture and mixed media.",
};

export default function ArtistPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <Link href="/" className={styles.back}>← BACK</Link>
        <span className={styles.brand}>LISAMON</span>
      </header>

      <main className={styles.main}>
        <section className={styles.works} aria-label="Selected projects and exhibitions">
          <ArtistRows />
          <ol aria-label="Exhibitions" className={styles.list}>
            {exhibitions.map(item => (
              <li key={item.title} className={`${styles.row} ${styles.rowGrid}`}>
                <span className={styles.rowYear}>{item.year}</span>
                <div className={styles.rowMain}>
                  <h3 className={styles.rowTitle}>{item.title}</h3>
                  <p className={styles.rowVenue}>{item.venue}</p>
                  <p className={styles.rowText}>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
