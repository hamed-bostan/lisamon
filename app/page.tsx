import Image from "next/image";
import InquiryForm from "./inquiry-form";

const asset = (name: string) => `/Final pics/${name}`;
const koi = "/Regenerated/Ivory koi yin-yang wall relief.png";
const works = [
  { image: asset("09.jpg"), title: "Paintings", description: <>Stories in colour<br />and texture.</>, href: "#paintings", alt: "Textured portrait with a seascape and white bird" },
  { image: asset("06.png"), title: "Sculptures", description: <>Characters with<br />a story to tell.</>, href: "#sculptures", alt: "Hand-sculpted terracotta portrait bust" },
  { image: asset("08.png"), title: "Figurines", description: <>Playful, expressive<br />and full of life.</>, href: "#sculptures", alt: "Four colourful handmade character figurines" },
  { image: koi, title: "Commissioned works", description: <>Art made for<br />your space.</>, href: "#inquiry", alt: "Ivory koi fish wall relief" },
];

export default function Home() {
  return (
    <main className="site" id="top">
      <div className="topline">Art shaped by hand</div>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art"><Image src={koi} alt="Two sculpted ivory koi among flowing waves" fill preload sizes="60vw" /></div>
        <a href="#top" className="brand" aria-label="Lisamon home">LISAMON</a>
        <div className="hero-copy">
          <h1 id="hero-title">Art made<em>personal.</em></h1>
          <p>Paintings, sculptures and stories<br />that live a little closer to you.</p>
          <a className="rule-link" href="#studio" aria-label="Explore the studio" />
        </div>
      </section>
      <section className="story" aria-labelledby="story-title">
        <div className="story-photo"><Image src={asset("01.png")} alt="Lisamon painting at her studio table, surrounded by paints and brushes" fill sizes="(max-width: 600px) 100vw, 66vw" /></div>
        <div className="story-copy">
          <h2 id="story-title">Behind<br />the art</h2><span className="rule" />
          <p><span className="small-caps">Lisamon</span> is a Dubai-based artist creating expressive paintings and hand-sculpted figures that explore memory, emotion and the people who shape our lives.</p>
          <p>Each piece begins with curiosity, a story and a belief that art can make the everyday more human.</p><span className="rule" />
        </div>
      </section>
      <section className="fresh" id="studio" aria-labelledby="fresh-title">
        <div className="fresh-heading"><h2 id="fresh-title">Fresh from <em>the studio</em></h2><div><p>A selection of recent works, from textured paintings to hand-sculpted figures, each one a glimpse into an ongoing story.</p><span className="rule" /></div></div>
        <div className="fresh-grid">{works.map(work => <a className="work-card" href={work.href} key={work.title}><div className="work-image"><Image src={work.image} alt={work.alt} fill sizes="(max-width: 600px) 46vw, 24vw" /></div><div className="work-caption"><h3>{work.title}</h3><p>{work.description}</p></div></a>)}</div>
      </section>
      <section className="paintings" id="paintings" aria-labelledby="paintings-title">
        <div className="paintings-copy"><h2 id="paintings-title">Paintings</h2><h3>People, places<br />and feelings.</h3><span className="rule" /><p>Figurative works that explore identity, memory and the quiet moments in between. Layered textures and bold colours bring every story to life.</p></div>
        <a className="painting-main artwork" href="#inquiry"><Image src={asset("09.jpg")} alt="Portrait of a woman with a white bird and a painted seascape" fill sizes="31vw" /></a>
        <div className="painting-grid"><a className="painting-wide artwork" href="#inquiry"><Image src={asset("14.png")} alt="Three women in a colourful landscape" fill sizes="29vw" /></a><a className="artwork" href="#inquiry"><Image src={asset("13.png")} alt="Woman surrounded by vibrant red fish" fill sizes="14vw" /></a><a className="artwork" href="#inquiry"><Image src={asset("15.png")} alt="Woman beneath the water with fish and reflections" fill sizes="14vw" /></a></div>
      </section>
      <section className="sculptures" id="sculptures" aria-labelledby="sculptures-title"><div className="sculpture-copy"><h2 id="sculptures-title">Sculpted<em>by hand</em></h2><span className="rule" /><p>From expressive busts to whimsical characters, each sculpture is carefully hand-shaped to capture emotion, personality and a sense of play.</p></div><div className="sculpture-art"><Image src={asset("06.png")} alt="Expressive terracotta bust resting its face in its hands" fill sizes="34vw" /></div><div className="sculpture-art"><Image src={asset("08.png")} alt="Playful hand-painted figurines on a white plinth" fill sizes="34vw" /></div></section>
      <section className="space" aria-labelledby="space-title"><Image src={asset("03.png")} alt="Lisamon paintings displayed in a warm contemporary gallery" fill sizes="100vw" /><div className="space-copy"><h2 id="space-title">Art in <em>space</em></h2><span className="rule" /><p><span className="small-caps">Lisamon’s</span> work finds home in private collections, curated interiors and contemporary spaces across Dubai and beyond.</p></div></section>
      <footer className="inquiry" id="inquiry"><h2>Let’s create<em>together</em></h2><InquiryForm /><svg className="botanical" viewBox="0 0 200 260" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1"><path d="M158 260Q115 163 135 52M151 234Q95 191 38 191M140 198Q159 151 193 112M133 158Q93 112 51 87M135 120Q170 74 160 16" />{[0,1,2,3,4].map(i=><g key={i} transform={`translate(${i*9} ${i*30})`}><path d="M130 100Q88 85 81 52Q118 54 130 100ZM129 103Q151 68 173 64Q173 91 129 103Z"/><path d="M130 100L89 61M129 103L166 73"/></g>)}</g></svg></footer>
    </main>
  );
}

