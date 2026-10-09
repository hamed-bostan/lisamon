import Image from "next/image";

const freshWorks = [
  { image: "/r4-fresh-koi.webp", title: "Koi wall relief", kind: "Sculpture" },
  { image: "/r4-fresh-duality.webp", title: "Duality", kind: "Painting" },
  { image: "/r4-fresh-jester.webp", title: "Character sculpture", kind: "Sculpture" },
  { image: "/r4-fresh-bag.webp", title: "Birds bag", kind: "Wearable art" },
] as const;

const categories = [
  { image: "/r4-stripe-paintings.webp", title: "Paintings", id: "paintings" },
  { image: "/r4-stripe-sculptures.webp", title: "Sculptures", id: "sculptures" },
  { image: "/r4-stripe-reliefs.webp", title: "Wall reliefs", id: "wall-reliefs" },
  { image: "/r4-stripe-wearable.webp", title: "Wearable art", id: "wearable-art" },
] as const;

const selectedWorks = [
  { image: "/r4-selected-jester.webp", title: "The Jester", kind: "Sculpture" },
  { image: "/r4-selected-figure.webp", title: "Hand-painted figure", kind: "Sculpture" },
  { image: "/r4-selected-bag.webp", title: "Songbirds", kind: "Wearable art" },
] as const;

const places = [
  { image: "/r4-place-interior.webp", title: "Art in your space" },
  { image: "/r4-place-mural.webp", title: "Stories on walls" },
  { image: "/r4-place-objects.webp", title: "Art in daily life" },
] as const;

export default function Home() {
  return (
    <main className="site" id="top">
      <div className="topline">Art shaped by hand</div>

      <section className="hero" aria-labelledby="hero-title">
        <Image src="/r4-hero.webp" alt="Carved koi wall relief with warm studio lighting" fill priority sizes="100vw" />
        <h1 id="hero-title" className="visually-hidden">Lisamon — art made personal</h1>
        <div className="mobile-brand" aria-hidden="true">LISAMON <small>DUBAI</small></div>
        <div className="mobile-hero-content" aria-hidden="true"><p>Handmade art for your world</p><strong>Art made<br />personal<span>.</span></strong></div>
        <a className="hero-home-link" href="#top" aria-label="Lisamon home" />
        <a className="hero-scroll-link" href="#story" aria-label="Explore the Lisamon story" />
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
          <Image src="/r4-story-artist.webp" alt="Lisamon artist creating a floral wall relief" fill sizes="(max-width: 620px) 100vw, 50vw" />
        </div>
      </section>

      <section className="fresh" id="studio" aria-labelledby="fresh-title">
        <h2 id="fresh-title">Fresh from the studio</h2>
        <p className="script fresh-subtitle">Discover our latest creations.</p>
        <div className="fresh-grid">
          {freshWorks.map((work) => (
            <a className="fresh-card" href="#inquiry" key={work.title} aria-label={`Ask about ${work.title}, ${work.kind}`}>
              <Image src={work.image} alt={work.title} fill sizes="(max-width: 620px) 50vw, 25vw" />
            </a>
          ))}
        </div>
        <div className="studio-marker" aria-hidden="true"><span /></div>
      </section>

      <nav className="category-stripes" aria-label="Art categories">
        {categories.map((category) => (
          <a className="category-stripe" href="#selected" id={category.id} key={category.title} aria-label={`Explore ${category.title}`}>
            <Image src={category.image} alt="" fill sizes="100vw" />
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
              <div className="selected-image"><Image src={work.image} alt={work.title} fill sizes="(max-width: 620px) 100vw, 33vw" /></div>
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
            <a className="place-card" href="#inquiry" key={place.title} aria-label={place.title}>
              <Image src={place.image} alt="" fill sizes="(max-width: 620px) 100vw, 33vw" />
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
