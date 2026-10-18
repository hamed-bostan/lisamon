import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { exhibitions } from "../data";
import { coverSizes } from "../components/cover-sizes";
import ProjectGrid from "./project-grid";
import styles from "./artist.module.css";

import portrait from "../../public/images/artist/portrait.jpg";

// The portrait column is usually taller than it is wide (the text beside it sets its height).
const portraitBoxRatio = 3 / 4;

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
        <section className={styles.bio} aria-labelledby="artist-title">
          <div className={styles.bioCopy}>
            <p className={styles.eyebrow}>CATALOGUE 05 — ARTIST</p>
            <h1 id="artist-title" className={styles.title}>About the Artist</h1>
            <h2 className={styles.name}>MAEDEH AKBARI <span>FARIMANI</span></h2>
            <div className={styles.bioText}>
              <p><b>Maedeh Akbari Farimani</b> is a Dubai-based independent visual artist with a background in painting and sculpture.</p>
              <p>Holding a Bachelor of Arts in Painting, her artistic practice explores the human form, emotions, identity, and the relationship between material and expression.</p>
              <p>Working across painting, sculpture, and mixed media, she experiments with texture, dimension, and unconventional forms to create thought-provoking works that move beyond traditional artistic boundaries.</p>
              <p>Her work reflects a personal exploration of the human experience, balancing abstraction, symbolism, and contemporary expression.</p>
            </div>
          </div>
          <div className={styles.portrait}>
            <Image src={portrait} alt="Maedeh Akbari Farimani painting in the studio" fill preload sizes={coverSizes("(max-width: 840px) 100vw, 50vw", portrait, portraitBoxRatio)} className={styles.cover} style={{ objectPosition: "62% 50%" }} />
          </div>
        </section>

        <section className={styles.works} aria-label="Selected projects and exhibitions">
          <ProjectGrid />
          <ol className={styles.exhibitions}>
            {exhibitions.map(item => (
              <li key={item.title} className={styles.exhibition}>
                <span className={styles.exhibitionYear}>{item.year}</span>
                <div>
                  <h3 className={styles.exhibitionTitle}>{item.title}</h3>
                  <p className={styles.exhibitionVenue}>{item.venue}</p>
                  <p className={styles.exhibitionText}>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
