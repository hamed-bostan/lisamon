import Link from "next/link";
import Image from "next/image";
import { pageMetadata, siteUrl } from "../../lib/site";
import { exhibitions } from "../data";
import ArtistRows from "./artist-rows";
import styles from "./artist.styles";
import portrait from "../../public/images/artist/portrait.jpg";

export const metadata = pageMetadata({
  title: "About the Artist — Maedeh Akbari Farimani | LISAMON",
  description: "Maedeh Akbari Farimani is a Dubai-based independent visual artist working across painting, sculpture and mixed media.",
  path: "/artist",
  image: "/images/artist/portrait.jpg",
  imageAlt: "Maedeh Akbari Farimani painting in the studio",
  imageWidth: portrait.width,
  imageHeight: portrait.height,
});

const person = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Maedeh Akbari Farimani",
    description: "Maedeh Akbari Farimani is a Dubai-based independent visual artist working across painting, sculpture and mixed media.",
    image: new URL("/images/artist/portrait.jpg", siteUrl).toString(),
  },
};

export default function ArtistPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      <header className={styles.topBar}>
        <Link href="/" className={styles.back}>← BACK</Link>
        <span className={styles.brand}>LISAMON</span>
      </header>

      <main id="main-content" tabIndex={-1} className={styles.main}>
        <h1 className="sr-only">Maedeh Akbari Farimani — About the Artist</h1>
        <section className={styles.works} aria-label="Selected projects and exhibitions">
          <h2 className="sr-only">About the artist and selected projects</h2>
          <details id="biography" className={styles.row}>
            <summary className={`${styles.rowGrid} ${styles.rowButton}`} aria-label="About the Artist — read full biography">
              <span className={styles.rowYear} />
              <span className={styles.rowBody}>
                <span className={styles.rowMain}>
                  <span className={styles.rowTitle}>About the Artist</span>
                  <span className={styles.rowVenue}>Maedeh Akbari Farimani</span>
                  <span className={styles.rowText}>Dubai-based independent visual artist with a background in painting and sculpture.</span>
                </span>
                <span className={styles.cue}>READ MORE <span aria-hidden="true" className={styles.cueArrow}>→</span></span>
              </span>
            </summary>
            <div className={styles.aboutModal}>
              <div className={styles.aboutCopy}>
                <p className={styles.eyebrow}>CATALOGUE 05 — ARTIST</p>
                <h2 className={styles.aboutTitle}>About the Artist</h2>
                <p className={styles.name}>MAEDEH AKBARI <span>FARIMANI</span></p>
                <div className={styles.bioText}>
                  <p><b>Maedeh Akbari Farimani</b> is a Dubai-based independent visual artist with a background in painting and sculpture.</p>
                  <p>Holding a Bachelor of Arts in Painting, her artistic practice explores the human form, emotions, identity, and the relationship between material and expression.</p>
                  <p>Working across painting, sculpture, and mixed media, she experiments with texture, dimension, and unconventional forms to create thought-provoking works that move beyond traditional artistic boundaries.</p>
                  <p>Her work reflects a personal exploration of the human experience, balancing abstraction, symbolism, and contemporary expression.</p>
                </div>
              </div>
              <div className={styles.portrait}>
                <Image src={portrait} alt="Maedeh Akbari Farimani painting in the studio" fill sizes="(max-width: 900px) 100vw, 640px" className={`${styles.cover} object-[62%_50%]`} />
              </div>
            </div>
          </details>
          <ArtistRows />
          <h2 className="sr-only">Exhibitions</h2>
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
