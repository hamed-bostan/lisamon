import type { CSSProperties } from "react";
import Image from "next/image";

const sourceWidth = 1024;
const sourceHeight = 1536;

function Crop({ x, y, w, h, className = "", label }: { x: number; y: number; w: number; h: number; className?: string; label: string }) {
  const style: CSSProperties = {
    backgroundImage: "url('/reference-art.png')",
    backgroundSize: `${(sourceWidth / w) * 100}% auto`,
    backgroundPosition: `${(x / (sourceWidth - w)) * 100}% ${(y / (sourceHeight - h)) * 100}%`,
  };
  return <div className={`art-crop ${className}`} style={style} role="img" aria-label={label} />;
}

function Arrow() { return <span className="arrow" aria-hidden="true">⟶</span>; }

function Logo() {
  return <Image src="/logo4.png" alt="" width={70} height={70} priority />
}

const categories = [
  { title: "Paintings", caption: "Original works", rect: [40, 669, 181, 215], label: "Textured painting of an eagle" },
  { title: "Wall Art & Relief", caption: "Texture for your space", rect: [230, 669, 181, 215], label: "White floral relief artwork" },
  { title: "Sculpture & Objects", caption: "Playful. One of a kind.", rect: [420, 669, 182, 215], label: "Hand painted sculptural face" },
  { title: "Wearable Art", caption: "Hand-painted customization", rect: [612, 669, 181, 215], label: "Painted birds and blossoms on a bag" },
  { title: "Murals", caption: "Bigger stories", rect: [802, 669, 182, 215], label: "Artist painting a mural" },
] as const;

const steps = [
  { icon: "♧", number: "01", title: "Tell us\nyour vision", detail: "Share your idea,\nspace or inspiration." },
  { icon: "✎", number: "02", title: "We explore\ntogether", detail: "Sketches, materials\nand details." },
  { icon: "❧", number: "03", title: "Handmade\nwith care", detail: "Your piece comes\nto life in the studio." },
  { icon: "⌂", number: "04", title: "Art finds\nits home", detail: "A unique piece,\nmade for you." },
];

export default function Home() {
  return <main className="site-shell">
    <header className="site-header"><Logo /><nav className="main-nav" aria-label="Main navigation"><span>Artworks</span><span>Custom Art</span><span>Wearable Art</span><span>About</span></nav><div className="header-actions"><span className="search-icon" aria-label="Search" /><span className="shop-button">Shop</span><span className="bag-icon" aria-label="Shopping bag">♙</span></div></header>

    <section className="hero">
      <Crop x={300} y={65} w={315} h={549} className="hero-relief" label="Sculptural floral wall relief" />
      <Crop x={320} y={65} w={280} h={548} className="hero-floral-side" label="Fine floral plaster relief" />
      <div className="hero-copy"><div className="eyebrow hero-eyebrow">Art lives<br />in a kinder<br />world <span /></div><h1>Art<br />shaped<br />by hand.</h1><p>Original pieces, custom creations,<br />and art made personal.</p><div className="hero-ctas"><span className="button button-filled">Explore the collection <Arrow /></span><span className="button button-outline">Commission a piece</span></div><div className="handwritten hero-script">More<br /><span>than art</span><i /></div></div>
      <Crop x={619} y={130} w={108} h={313} className="hero-artist" label="Artist working on a floral wall relief" />
      <Crop x={686} y={344} w={180} h={270} className="hero-object" label="Whimsical sculptural planter" />
      <Crop x={879} y={65} w={145} h={387} className="hero-portrait" label="Expressive portrait painting" />
      <div className="hero-side-script handwritten">Handmade<br />Unique<br />Yours<i /></div>
    </section>

    <section className="collection"><div className="section-bar"><div className="eyebrow line-after">Explore the collection</div><p>Art for real spaces. Real stories. Yours.</p><span className="text-link">View all <Arrow /></span></div><div className="category-grid">{categories.map(({ title, caption, rect, label }) => <div className="category" key={title}><Crop x={rect[0]} y={rect[1]} w={rect[2]} h={rect[3]} label={label} className="category-image" /><div className="category-meta"><div><h3>{title}</h3><p>{caption}</p></div><Arrow /></div></div>)}</div></section>

    <section className="process"><div className="process-intro"><div className="eyebrow line-after">A bespoke process</div><h2>From idea<br />to art, together.</h2><p>Custom art is a conversation. We turn your ideas, spaces and stories into one-of-a-kind pieces, made by hand, with heart.</p><span className="button button-outline">Start your commission <Arrow /></span></div><div className="steps">{steps.map((step) => <div className="step" key={step.number}><span className="step-icon">{step.icon}</span><span className="step-number">{step.number}</span><h3>{step.title}</h3><p>{step.detail}</p></div>)}</div><Crop x={320} y={65} w={280} h={548} className="process-relief" label="Close view of white textured wall art" /><div className="handwritten process-script">Custom<br />Creates<br />Meaning<i /></div></section>

    <section className="story"><Crop x={0} y={1184} w={360} h={244} className="story-photo" label="Artist painting a ceramic figurine in her studio" /><div className="story-copy"><div className="eyebrow line-after">The artist</div><h2>A more<br />artful everyday.</h2><p>LISAMON is a celebration of handmade art, personal expression and beautifully lived spaces. From textured walls to hand-painted bags, each piece is created to bring more beauty, story and soul into your world.</p><span className="text-link">Our story <Arrow /></span></div><Crop x={687} y={1184} w={337} h={244} className="story-studio" label="Paintbrushes, sketches and sculpture in the studio" /></section>

    <footer className="site-footer"><div className="footer-main"><Logo /><div className="footer-nav"><span>Artworks</span><span>Custom Art</span><span>Wearable Art</span><span>About</span><span>Contact</span></div><div className="handwritten footer-script">Art for<br />a kinder world</div><div className="socials"><span>◎</span><span>℘</span><span>▶</span><span>✉</span></div></div><div className="footer-bottom"><span>© 2024 LISAMON. All rights reserved.</span><span>Handmade stories for brighter spaces</span></div></footer>
  </main>;
}
