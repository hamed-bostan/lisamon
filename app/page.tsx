import Image from "next/image";
import styles from "./editorial.module.css";
import InquiryForm from "./inquiry-form";
import SpaceServices from "./components/space-services";
import { Artwork, Copy, Divider, Heading, HeadingAccent } from "./components/art";

import studio from "../public/Final pics/01.png";
import bust from "../public/Final pics/06.png";
import figurines from "../public/Final pics/08.png";
import portrait from "../public/Final pics/09.jpg";
import redFish from "../public/Final pics/13.png";
import landscape from "../public/Final pics/14.png";
import underwater from "../public/Final pics/15.png";
import koi from "../public/Regenerated/Ivory koi yin-yang wall relief.png";
import heroWallpaper from "../public/lisamon-hero.png";
const works = [
  { image: portrait, imageClass: "object-center", title: "Paintings", description: "Stories in colour and texture.", href: "#paintings", alt: "Textured portrait with a seascape and white bird" },
  { image: bust, imageClass: "object-[76%_center]", title: "Sculptures", description: "Characters with a story to tell.", href: "#sculptures", alt: "Hand-sculpted terracotta portrait bust" },
  { image: figurines, imageClass: "object-[68%_center]", title: "Figurines", description: "Playful, expressive and full of life.", href: "#sculptures", alt: "Four colourful handmade character figurines" },
  { image: koi, imageClass: "object-center", title: "Commissioned works", description: "Art made for your space.", href: "#inquiry", alt: "Ivory koi fish wall relief" },
];

function WorkCard({ work }: { work: typeof works[number] }) {
  return (
    <article>
      <Artwork src={work.image} alt={work.alt} href={work.href} linkLabel={`Explore ${work.title.toLowerCase()}`} imageClassName={work.imageClass} sizes="(max-width: 767px) 46vw, (max-width: 1600px) 24vw, 384px" className="aspect-[170/226] bg-[#e4dfd8]" />
      <div className="px-[1cqw] py-[2.5cqw] md:px-[1.1cqw] md:pt-[1.3cqw] md:pb-0">
        <h3 className="font-sans text-label font-semibold tracking-[.16em] text-[#71424c] uppercase">
          <a href={work.href}>{work.title}</a>
        </h3>
        <Copy className="mt-[1.4cqw] text-[#875f65] italic md:mt-[.65cqw]">{work.description}</Copy>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="overflow-clip" id="top">
      <section className="w-full bg-[#e9e9e9]" aria-labelledby="hero-title">
        <h1 id="hero-title" className="sr-only">LISAMON</h1>
        <Image src={heroWallpaper} alt="Lisamon walking with a paintbrush in front of the LISAMON lettering" preload unoptimized className="block h-auto w-full" />
      </section>
      <div className="mx-auto max-w-[1600px] [container-type:inline-size] min-[1600px]:shadow-[0_0_70px_#45272018]">
      <section id="about" className={styles.about} aria-labelledby="story-title">
<header className={styles.aboutHeader}><p className={styles.eyebrow}>About Lisamon <span>Dubai, UAE</span></p><h2 id="story-title" className={styles.title}>Where art becomes<br /><em>part of architecture.</em></h2></header>
<div className={styles.aboutGrid}>
<figure className={styles.portrait}><Artwork src={studio} alt="Maedeh Akbari Farimani painting by hand, surrounded by paints and brushes" sizes="(max-width: 767px) 90vw, 38vw" imageClassName="object-[48%_center]" className={styles.portraitImage} /><figcaption><span>Maedeh Akbari Farimani</span><span>Founder &amp; visual artist</span></figcaption></figure>
<div className={styles.story}><p className={styles.eyebrow}>The studio</p><p className={styles.lead}>LISAMON is a Dubai-based bespoke art studio founded by visual artist Maedeh Akbari Farimani, specializing in sculptural wall art, 3D bas-reliefs, custom sculptures, artistic installations and hand-painted murals.</p><p>Rooted in fine art and contemporary sculpture, LISAMON brings together artistic expression, craftsmanship and spatial design to create distinctive works that become an integral part of their surroundings.</p><div className={styles.process}><h3>From vision to installation</h3><p>From concept development and material exploration to handcrafted production and final installation, each project is thoughtfully tailored to its architectural setting and the client&apos;s vision.</p><p>Based in Dubai and working across the UAE, LISAMON creates bespoke artistic features for private residences, villas, hotels, restaurants and commercial interiors.</p></div></div></div>
<div className={styles.founder}><div><p className={styles.eyebrow}>The artist behind Lisamon</p><h3>A foundation in fine art.<br /><em>A practice without boundaries.</em></h3></div><p>With a Bachelor&apos;s degree in Painting and Sculpture from Neyshabur University of Art, Maedeh brings an established artistic background to the studio. Her experience includes a solo exhibition, participation in art events at Gate Avenue in DIFC, collaboration with M2L Concepts and selection among the Top 20 artists in the Jokal Art Competition from approximately 2,000 submissions. She is also a UAE Golden Visa holder.</p></div>
</section>
      <section className="bg-cream px-[4cqw] py-[7cqw] md:px-[2.55cqw] md:pt-[3.5cqw] md:pb-[2.8cqw]" id="studio" aria-labelledby="fresh-title">
        <div className="mb-[5cqw] grid items-center gap-5 md:mx-[3.2cqw] md:mb-[2.8cqw] md:grid-cols-[60%_36%] md:gap-[4%]">
          <Heading id="fresh-title" className="text-[7.5cqw] md:text-[5.1cqw]">Fresh from <HeadingAccent>the studio</HeadingAccent></Heading>
          <div className="space-y-[1.5cqw]"><Copy>A selection of recent works, from textured paintings to hand-sculpted figures, each one a glimpse into an ongoing story.</Copy><Divider /></div>
        </div>
        <div className="grid grid-cols-2 gap-x-[3cqw] gap-y-[5cqw] md:grid-cols-4 md:gap-[1.45cqw]">{works.map(work => <WorkCard key={work.title} work={work} />)}</div>
      </section>
      <section className="grid grid-cols-2 gap-[4cqw] bg-[radial-gradient(ellipse_at_center,#560b2b,var(--color-plum))] px-[5cqw] py-[7cqw] text-[#f0ddd7] md:min-h-[41.2cqw] md:grid-cols-[31%_33%_30%] md:gap-[2.2%] md:py-[2.4cqw] md:pr-[3.6cqw] md:pl-[6.3cqw]" id="paintings" aria-labelledby="paintings-title">
        <div className="col-span-2 md:col-span-1">
          <Heading id="paintings-title" tone="cream" className="text-[13cqw] md:text-[9cqw]">Paintings</Heading>
          <p className="mt-[1cqw] text-[max(1.5rem,3.6cqw)] leading-none tracking-[-.05em] text-[#df939b] uppercase italic">People, places<br />and feelings.</p>
          <Divider tone="bronze" className="my-[3cqw]" />
          <Copy>Figurative works that explore identity, memory and the quiet moments in between. Layered textures and bold colours bring every story to life.</Copy>
        </div>
        <Artwork href="#inquiry" linkLabel="View inquiry availability" src={portrait} alt="Portrait of a woman with a white bird and a painted seascape" sizes="(max-width: 767px) 43vw, (max-width: 1600px) 31vw, 496px" className="min-h-[59cqw] md:min-h-[36.4cqw]" />
        <div className="grid grid-cols-2 grid-rows-[45fr_53fr] gap-[3%] md:gap-x-[4%] md:gap-y-[2%]">
          <Artwork href="#inquiry" linkLabel="View inquiry availability" src={landscape} alt="Three women in a colourful landscape" sizes="(max-width: 767px) 43vw, (max-width: 1600px) 29vw, 464px" className="col-span-2" imageClassName="object-[center_24%]" />
          <Artwork href="#inquiry" linkLabel="View inquiry availability" src={redFish} alt="Woman surrounded by vibrant red fish" sizes="(max-width: 767px) 21vw, (max-width: 1600px) 14vw, 224px" />
          <Artwork href="#inquiry" linkLabel="View inquiry availability" src={underwater} alt="Woman beneath the water with fish and reflections" sizes="(max-width: 767px) 21vw, (max-width: 1600px) 14vw, 224px" />
        </div>
      </section>
      <SpaceServices />
      <section aria-labelledby="inquiry-title" className={styles.contact} id="inquiry">
<div className={styles.contactGrid}><div className={styles.contactCopy}>
<p className={styles.eyebrow}>Contact Lisamon</p><h2 id="inquiry-title" className={styles.title}>Let’s create<br /><em>something<br />exceptional.</em></h2>
<h3>Have a space in mind? Let’s bring it to life.</h3>
<p>From bespoke sculptures and sculptural wall art to hand-painted murals and artistic installations, every project begins with a vision.</p><p>We welcome enquiries from private clients, interior designers, architects and businesses seeking distinctive, custom-made artwork.</p>
<div className={styles.contactDetails}><h3 className={styles.eyebrow}>Get in touch</h3><dl>
<div><dt>Email</dt><dd><a href="mailto:lisamon.artt@gmail.com">lisamon.artt@gmail.com <span aria-hidden="true">↗</span></a></dd></div>
<div><dt>WhatsApp</dt><dd><a href="https://wa.me/971501471996">+971 50 147 1996 <span aria-hidden="true">↗</span></a></dd></div>
<div><dt>Instagram</dt><dd><a href="https://www.instagram.com/lisamondubai/">@lisamondubai <span aria-hidden="true">↗</span></a></dd></div>
<div><dt>Location</dt><dd>Dubai, United Arab Emirates</dd></div></dl><p className={styles.availability}>Available for bespoke projects across the UAE.</p></div>
</div><InquiryForm /></div></section>
      </div>
    </main>
  );
}
