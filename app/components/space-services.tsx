import Image from "next/image";
import styles from "./space-services.module.css";
import wallRelief from "../../public/New images/02.png";
import sculpturalElements from "../../public/New images/03.png";
import wallFinishes from "../../public/New images/01.jpg";
import murals from "../../public/New images/00-Thumbnail.png";

const services = [
  { id: "sculptures", title: "Wall Relief Art", lines: ["Wall Relief Art"], description: "Sculpted stories in light and shadow.", image: wallRelief, alt: "Sculpted face in an ivory wall relief with delicate textured cracks" },
  { id: "space", title: "Sculptural Elements for Interiors", lines: ["Sculptural Elements", "for Interiors"], description: "Distinctive forms for thoughtful spaces.", image: sculpturalElements, alt: "Reflective sculptural wall elements in a warm contemporary interior" },
  { id: "wall-finishes", title: "Artistic Wall Finishes", lines: ["Artistic Wall", "Finishes"], description: "Texture that transforms the everyday.", image: wallFinishes, alt: "Flowing sculptural white wall finish in a sunlit interior" },
  { id: "murals", title: "Custom Wall Murals", lines: ["Custom Wall", "Murals"], description: "Original art, made for your walls.", image: murals, alt: "Artist painting flowing black lines on a large interior wall" },
];

export default function SpaceServices() {
  return (
    <section className={styles.services} aria-labelledby="services-title">
      <h2 id="services-title" className={styles.eyebrow}>Art for your space</h2>
      <div className={styles.rows}>
        {services.map((service, index) => (
          <article key={service.id} id={service.id} className={styles.row} aria-labelledby={`${service.id}-title`}>
            <div className={styles.details}>
              <span className={styles.number} aria-hidden="true">0{index + 1}</span>
              <h3 id={`${service.id}-title`} className={`${styles.title} ${index === 1 ? styles.longTitle : ""}`}>
                {service.lines.map(line => <span key={line}>{line}</span>)}
              </h3>
              <p className={styles.description}>{service.description}</p>
              <a className={styles.link} href="#inquiry" aria-label={`Enquire about ${service.title.toLowerCase()}`}>
                <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M7 25 25 7M8 7h17v17" stroke="currentColor" strokeWidth="1.4" /></svg>
              </a>
            </div>
            <div className={styles.image}>
              <Image src={service.image} alt={service.alt} fill sizes="(max-width: 639px) 94vw, (max-width: 1600px) 70vw, 1120px" className="object-cover" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
