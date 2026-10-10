import Image from "next/image";

const images = {
  hero: "/Regenerated/Ivory Koi Relief in Sunlight.png",
  koi: "/Regenerated/Ivory koi yin-yang wall relief.png",
  artist: "/Regenerated/Artist Sculpting a Cherry Blossom Relief.png",
  portrait: "/Regenerated/Dual portrait in warm and cool tones.png",
  jester: "/Regenerated/Whimsical Ceramic Jester with Striped Hat.png",
  bag: "/Regenerated/Teal quilted bag with birds and flowers.png",
  eyes: "/Regenerated/Three Teal Eyes in Burgundy.png",
  rose: "/Regenerated/Ivory rose relief on plum shadows.png",
  figurine: "/Regenerated/Artist painting a tiny blue figurine.png",
  interior: "/Regenerated/Warm arched botanical relief.png",
  mural: "/Regenerated/Artist Painting a Playful Animal Mural.png",
  objects: "/Regenerated/Hand-painted geometry on black leather.png",
} as const;

const freshWorks = [
  { image: images.koi, title: "Koi wall relief", kind: "Sculpture" },
  { image: images.portrait, title: "Duality", kind: "Painting" },
  { image: images.jester, title: "Character sculpture", kind: "Sculpture" },
  { image: images.bag, title: "Birds bag", kind: "Wearable art" },
] as const;

const categories = [
  { image: images.eyes, number: "01", kicker: "Bold expressions", title: "Paintings", id: "paintings" },
  { image: images.jester, number: "02", kicker: "Sculpted forms", title: "Sculptures", id: "sculptures" },
  { image: images.rose, number: "03", kicker: "Textures for walls", title: "Wall reliefs", id: "wall-reliefs" },
  { image: images.bag, number: "04", kicker: "Art you can carry", title: "Wearable art", id: "wearable-art" },
] as const;

const selectedWorks = [
  { image: images.jester, title: "The Jester", kind: "Sculpture" },
  { image: images.figurine, title: "Hand-painted figure", kind: "Sculpture" },
  { image: images.bag, title: "Songbirds", kind: "Wearable art" },
] as const;

const places = [
  { image: images.interior, kicker: "Interior", title: <>Art in<br />your space</> },
  { image: images.mural, kicker: "Murals", title: <>Stories<br />on walls</> },
  { image: images.objects, kicker: "Everyday objects", title: <>Art<br />in daily life</> },
] as const;

export default function Home() {
  return (
    <main className="site" id="top">
      <div className="topline">Art shaped by hand</div>

      <section className="hero" aria-labelledby="hero-title">
        <Image src={images.hero} alt="Ivory koi wall relief lit by warm sunlight" fill priority sizes="100vw" />
        <a className="hero-brand" href="#top" aria-label="Lisamon home">LISAMON <small>DUBAI</small></a>
        <div className="hero-copy">
          <p>Handmade art for your world</p>
          <h1 id="hero-title">Art made<br />personal<span>.</span></h1>
        </div>
      </section>

      <section className="story" id="story" aria-labelledby="story-title">
        <div className="story-copy">
          <div className="story-heading">
            <span className="script story-script">Behind</span>
            <h2 id="story-title">The<br />Art</h2>
          </div>
          <div className="story-text">
            <p>LISAMON celebrates handmade art and personal expression.</p>
            <p>From textured walls to hand-painted bags, each piece brings beauty, story and soul into your world.</p>
            <p>Original pieces. Custom creations. Made by hand.</p>
            <strong>Made personal.</strong>
          </div>
        </div>
        <div className="story-photo">
          <Image src={images.artist} alt="Artist creating a cherry blossom wall relief" fill sizes="(max-width: 620px) 100vw, 50vw" />
        </div>
      </section>

      <section className="fresh" id="studio" aria-labelledby="fresh-title">
        <h2 id="fresh-title">Fresh from the studio</h2>
        <p className="script fresh-subtitle">Discover our latest creations.</p>
        <div className="fresh-grid">
          {freshWorks.map((work) => (
            <a className="fresh-card" href="#inquiry" key={work.title}>
              <Image src={work.image} alt="" fill sizes="(max-width: 620px) 50vw, 25vw" />
              <span className="fresh-caption"><strong>{work.title}</strong><span>{work.kind}</span></span>
            </a>
          ))}
        </div>
        <div className="studio-marker" aria-hidden="true"><span /></div>
      </section>

      <nav className="category-stripes" aria-label="Art categories">
        {categories.map((category) => (
          <a className="category-stripe" href="#selected" id={category.id} key={category.title}>
            <Image src={category.image} alt="" fill sizes="100vw" />
            <span className="category-copy">
              <span className="category-number">{category.number}</span>
              <span className="category-words"><em>{category.kicker}</em><strong>{category.title}</strong></span>
            </span>
          </a>
        ))}
      </nav>

      <section className="selected" id="selected" aria-labelledby="selected-title">
        <div className="selected-heading">
          <h2 id="selected-title">Selected<br />Works</h2>
          <p className="script">Made by hand</p>
        </div>
        <div className="selected-grid">
          {selectedWorks.map((work) => (
            <a className="selected-card" href="#inquiry" key={work.title}>
              <div className="selected-image"><Image src={work.image} alt="" fill sizes="(max-width: 620px) 50vw, 33vw" /></div>
              <div className="selected-caption"><strong>{work.title}</strong><span>{work.kind}</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="places" aria-labelledby="places-title">
        <div className="places-heading">
          <h2 id="places-title">Where art<br />belongs</h2>
          <p className="script">Art for real spaces. Real stories. Yours.</p>
        </div>
        <div className="places-grid">
          {places.map((place) => (
            <a className="place-card" href="#inquiry" key={place.kicker}>
              <Image src={place.image} alt="" fill sizes="(max-width: 620px) 100vw, 33vw" />
              <span className="place-caption"><span>{place.kicker}</span><strong>{place.title}</strong></span>
            </a>
          ))}
        </div>
      </section>

      <footer className="inquiry" id="inquiry">
        <div className="footer-wordmark" aria-hidden="true">LISAMON</div>
        <div className="inquiry-layout">
          <div className="inquiry-copy">
            <p className="script">Inquiry</p>
            <h2>Let’s create<br />together</h2>
            <p className="inquiry-intro">Tell us your idea, space or inspiration.</p>
            <span className="location">Dubai</span>
          </div>
          <form className="inquiry-form" action="mailto:sample@example.com?subject=Lisamon%20Inquiry" method="post" encType="text/plain">
            <label>Full name<input type="text" name="name" autoComplete="name" required /></label>
            <label>Email address<input type="email" name="email" autoComplete="email" required /></label>
            <fieldset>
              <legend>I’m interested in</legend>
              <div className="interests">
                <label><input type="checkbox" name="interest" value="Paintings" />Paintings</label>
                <label><input type="checkbox" name="interest" value="Sculpture" />Sculpture</label>
                <label><input type="checkbox" name="interest" value="Wall art" />Wall art</label>
                <label><input type="checkbox" name="interest" value="Wearable art" />Wearable art</label>
              </div>
            </fieldset>
            <label>Tell us about your project<textarea name="project" rows={2} required /></label>
            <button type="submit">Send inquiry</button>
          </form>
        </div>
        <div className="footer-bottom">Lisamon <span>/</span> Art for a kinder world</div>
      </footer>
    </main>
  );
}
