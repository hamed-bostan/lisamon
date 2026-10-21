import Image, { getImageProps } from "next/image";
import Catalogue from "./components/catalogue";
import Intro from "./components/intro";
import NavbarBackdrop from "./components/navbar-backdrop";
import WhatsAppButton from "./components/whatsapp-button";
import { contact } from "./data";
import styles from "./home.module.css";

import hero from "../public/images/home/hero.png";
import heroMobile from "../public/images/home/hero-mobile.jpg";
import logoMark from "../public/images/home/logo-mark.png";
import team from "../public/images/home/about-team.jpg";
import founder from "../public/images/home/founder.jpg";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.arrow} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

// Art direction: portrait crop on phones (matches the 700px breakpoint in home.module.css), landscape elsewhere.
function HeroImage() {
  const common = { alt: "", fill: true, sizes: "100vw" } as const;
  const { props: { srcSet: mobileSrcSet } } = getImageProps({ ...common, src: heroMobile });
  const { props: { alt, ...desktop } } = getImageProps({ ...common, src: hero });
  return (
    <picture>
      <source media="(max-width: 700px)" srcSet={mobileSrcSet} />
      <img {...desktop} alt={alt} loading="eager" fetchPriority="high" className={styles.cover} />
    </picture>
  );
}

export default function Home() {
  return (
    <div className={styles.page} id="top">
      <Intro />
      <header className={styles.hero}>
        <h1 className="sr-only">LISAMON</h1>
        <HeroImage />
        <NavbarBackdrop className={styles.navbar} />
        <div className={styles.logoMark} aria-hidden="true">
          <Image src={logoMark} alt="" unoptimized />
        </div>
        <a href={contact.instagram} target="_blank" rel="noopener" aria-label="LISAMON on Instagram" className={styles.instagram}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5.5" />
            <circle cx="12" cy="12" r="4.2" />
            <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </header>

      <main>
        <section className={styles.welcome} aria-labelledby="welcome-title">
          <h2 id="welcome-title" className={styles.eyebrow}>WELCOME</h2>
          <span className={styles.welcomeRule} aria-hidden="true" />
          <p className={styles.welcomeQuote}>LISAMON, where art and design come together to create spaces with character and soul.</p>
        </section>

        <Catalogue />

        <section id="about" className={styles.about} aria-labelledby="about-title">
          <div className={styles.aboutCopy}>
            <h2 id="about-title" className={styles.aboutTitle}>About Us</h2>
            <div className={styles.aboutText}>
              <p>LISAMON is a Dubai-based creative studio born from a shared passion for art, design, and the desire to create something beyond the ordinary.</p>
              <p>Our team brings together art, interior styling, sculptural elements, and creative craftsmanship to transform spaces into unique, inspiring environments.</p>
              <p>We believe a home should be more than a beautifully designed interior. It should reflect the personality, emotions, and lifestyle of the people who live within it.</p>
              <p>We don’t believe in repeating trends or creating spaces that look alike. Every project begins with a new perspective, a unique story, and the freedom to imagine something different.</p>
              <p>Our mission is simple: to bring art beyond the canvas and into everyday life.</p>
            </div>
          </div>
          <div className={styles.aboutImage}>
            <Image src={team} alt="The LISAMON team" fill sizes="(max-width: 700px) 100vw, 50vw" className={styles.cover} style={{ objectPosition: "center 60%" }} />
          </div>
        </section>
      </main>

      <footer id="contact" className={styles.footer}>
        <div className={styles.footerGrid}>
          <nav aria-label="Footer" className={styles.footerNav}>
            <a href="#top">Home</a>
            <a href="#about">About</a>
            <a href="#catalogue">Catalogue</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className={styles.footerMain}>
            <div className={styles.founder}>
              <Image src={founder} alt="LISAMON founder" fill sizes="(max-width: 1200px) 180px, 15vw" />
            </div>
            <p className={styles.footerText}>LISAMON is a Dubai-based creative studio bringing art beyond the canvas, through sculptural walls, installations and bespoke pieces.</p>
            <p className={styles.copyright}>© LISAMON. All rights reserved.</p>
            <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Consultation request")}`} className={styles.consultation}>
              Request a Consultation<ArrowIcon />
            </a>
            <div className={styles.footerLinks}>
              <a href={`mailto:${contact.email}`}>Email<ArrowIcon /></a>
              <a href={contact.instagram} target="_blank" rel="noopener">Instagram<ArrowIcon /></a>
              <a href={contact.whatsapp} target="_blank" rel="noopener">WhatsApp<ArrowIcon /></a>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
