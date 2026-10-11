import Image from "next/image";
import InquiryForm from "./inquiry-form";
import { Artwork, Copy, Divider, Heading, HeadingAccent } from "./components/art";

import studio from "../public/Final pics/01.png";
import gallery from "../public/Final pics/03.png";
import bust from "../public/Final pics/06.png";
import figurines from "../public/Final pics/08.png";
import portrait from "../public/Final pics/09.jpg";
import redFish from "../public/Final pics/13.png";
import landscape from "../public/Final pics/14.png";
import underwater from "../public/Final pics/15.png";
import koi from "../public/Regenerated/Ivory koi yin-yang wall relief.png";
const works = [
  { image: portrait, imageClass: "object-center", title: "Paintings", description: "Stories in colour and texture.", href: "#paintings", alt: "Textured portrait with a seascape and white bird" },
  { image: bust, imageClass: "object-[76%_center]", title: "Sculptures", description: "Characters with a story to tell.", href: "#sculptures", alt: "Hand-sculpted terracotta portrait bust" },
  { image: figurines, imageClass: "object-[68%_center]", title: "Figurines", description: "Playful, expressive and full of life.", href: "#sculptures", alt: "Four colourful handmade character figurines" },
  { image: koi, imageClass: "object-center", title: "Commissioned works", description: "Art made for your space.", href: "#inquiry", alt: "Ivory koi fish wall relief" },
];
const sculptures = [
  { image: bust, alt: "Expressive terracotta bust resting its face in its hands" },
  { image: figurines, alt: "Playful hand-painted figurines on a white plinth" },
];

function Botanical() {
  return (
    <svg className="pointer-events-none absolute top-0 right-[-2%] h-1/2 w-[45%] text-[#bb6f72] opacity-35 md:top-auto md:bottom-[-7%] md:h-full md:w-[24%] md:opacity-65" viewBox="0 0 200 260" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1">
        <path d="M158 260Q115 163 135 52M151 234Q95 191 38 191M140 198Q159 151 193 112M133 158Q93 112 51 87M135 120Q170 74 160 16" />
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i} transform={`translate(${i * 9} ${i * 30})`}>
            <path d="M130 100Q88 85 81 52Q118 54 130 100ZM129 103Q151 68 173 64Q173 91 129 103Z" />
            <path d="M130 100L89 61M129 103L166 73" />
          </g>
        ))}
      </g>
    </svg>
  );
}

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
    <main className="mx-auto max-w-[1600px] overflow-clip [container-type:inline-size] min-[1600px]:shadow-[0_0_70px_#45272018]" id="top">
      <div className="grid min-h-7 place-items-center bg-plum px-4 py-1 font-sans text-label font-semibold tracking-[.4em] text-[#c79065] uppercase md:min-h-[3.1cqw] md:tracking-[.55em]">
        Art shaped by hand
      </div>
      <section className="relative isolate min-h-[78cqw] bg-[linear-gradient(118deg,#efe3ce,#faf3e7_31%,#d5c1a6)] px-[6.3cqw] pt-[5cqw] pb-[4cqw] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:bg-[linear-gradient(125deg,transparent_10%,#fff9e985_13%,#fff9e985_23%,transparent_26%,transparent_37%,#b6a18355_40%,transparent_48%)] md:min-h-[43cqw] md:pt-[2.4cqw]" aria-labelledby="hero-title">
        <div className="absolute inset-y-0 right-0 left-[32%] -z-20 overflow-hidden opacity-72 after:absolute after:inset-0 after:bg-[linear-gradient(90deg,#e5d5bc,transparent_65%)] md:left-[42%] md:opacity-100 md:after:bg-[linear-gradient(90deg,#e5d5bc,transparent_22%)]">
          <Image className="object-cover object-[center_48%]" src={koi} alt="Two sculpted ivory koi among flowing waves" fill preload sizes="(max-width: 767px) 68vw, (max-width: 1600px) 58vw, 928px" />
        </div>
        <a href="#top" className="font-display text-[8cqw] font-normal tracking-[.03em] text-plum md:text-[5.3cqw]" aria-label="Lisamon home">LISAMON</a>
        <div className="mt-[9cqw] md:mt-[2.5cqw]">
          <Heading as="h1" id="hero-title" className="text-[16cqw] leading-[1.02] md:text-[10.5cqw]">
            Art made{" "}<HeadingAccent className="block text-[14cqw] leading-[.97] md:text-[9.5cqw]">personal.</HeadingAccent>
          </Heading>
          <Copy className="mt-[4cqw] max-w-[65%] md:mt-[1.9cqw] md:max-w-[40%]">Paintings, sculptures and stories<br />that live a little closer to you.</Copy>
          <a className="mt-[.7cqw] flex min-h-11 w-fit min-w-11 items-center" href="#studio" aria-label="Explore the studio"><Divider /></a>
        </div>
      </section>
      <section className="grid md:min-h-[44.7cqw] md:grid-cols-[65.5%_34.5%]" aria-labelledby="story-title">
        <Artwork src={studio} alt="Lisamon painting at her studio table, surrounded by paints and brushes" sizes="(max-width: 767px) 100vw, (max-width: 1600px) 66vw, 1056px" imageClassName="object-[48%_center]" className="h-[65cqw] md:h-auto" />
        <div className="space-y-5 bg-[linear-gradient(110deg,#ffcc79,#ffbd61)] p-[7cqw] md:space-y-[1.4cqw] md:pt-[3.1cqw] md:pr-[5.2cqw] md:pb-[2.5cqw] md:pl-[5.5cqw]">
          <Heading id="story-title" className="text-[12cqw] leading-[1.02] md:text-[7.7cqw]">Behind<br />the art</Heading>
          <Divider tone="ochre" />
          <Copy><span className="[font-variant:small-caps]">Lisamon</span> is a Dubai-based artist creating expressive paintings and hand-sculpted figures that explore memory, emotion and the people who shape our lives.</Copy>
          <Copy>Each piece begins with curiosity, a story and a belief that art can make the everyday more human.</Copy>
          <Divider tone="ochre" />
        </div>
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
      <section className="grid grid-cols-2 bg-[linear-gradient(100deg,#f8f4ef,#e8e4de)] px-[4cqw] pt-[7cqw] md:min-h-[34.7cqw] md:grid-cols-[31%_34.5%_34.5%] md:pt-[2.2cqw] md:pr-[3.2cqw] md:pl-[6.3cqw]" id="sculptures" aria-labelledby="sculptures-title">
        <div className="z-10 col-span-2 pb-6 md:col-span-1 md:pr-[2cqw]">
          <Heading id="sculptures-title" className="text-[11cqw] md:text-[7.8cqw]">Sculpted{" "}<HeadingAccent className="block text-[9cqw] md:text-[5.8cqw]">by hand</HeadingAccent></Heading>
          <Divider className="my-[2cqw]" />
          <Copy>From expressive busts to whimsical characters, each sculpture is carefully hand-shaped to capture emotion, personality and a sense of play.</Copy>
        </div>
        {sculptures.map(sculpture => <Artwork key={sculpture.image.src} src={sculpture.image} alt={sculpture.alt} sizes="(max-width: 767px) 46vw, (max-width: 1600px) 34vw, 544px" imageClassName="object-[76%_center]" className="min-h-[55cqw] md:min-h-0" />)}
      </section>
      <section className="relative isolate min-h-[65cqw] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:bg-[linear-gradient(90deg,#f3eadaee,#f3eadacc_35%,transparent_80%)] md:min-h-[28.7cqw] md:after:bg-[linear-gradient(90deg,#f3eadadf_0%,#f3eadadf_27%,#f3eada00_46%)]" aria-labelledby="space-title">
        <Image className="-z-20 object-cover object-[center_58%]" src={gallery} alt="Lisamon paintings displayed in a warm contemporary gallery" fill sizes="(max-width: 1600px) 100vw, 1600px" />
        <div className="w-[70%] py-[9cqw] pl-[6cqw] md:w-[32%] md:py-[3.6cqw] md:pl-[6.1cqw]">
          <Heading id="space-title" className="text-[9cqw] whitespace-nowrap md:text-[6.8cqw]">Art in <HeadingAccent>space</HeadingAccent></Heading>
          <Divider className="my-[3cqw] md:mt-[1.6cqw] md:mb-[2cqw]" />
          <Copy><span className="[font-variant:small-caps]">Lisamon’s</span> work finds home in private collections, curated interiors and contemporary spaces across Dubai and beyond.</Copy>
        </div>
      </section>
      <section aria-labelledby="inquiry-title" className="relative grid gap-[6cqw] bg-[radial-gradient(ellipse_at_35%_40%,#550c2b,var(--color-plum))] px-[6cqw] py-[8cqw] text-[#ead9d2] md:min-h-[24.5cqw] md:grid-cols-[33%_43%] md:gap-[3%] md:px-[6.2cqw] md:pt-[3cqw] md:pb-[3.6cqw]" id="inquiry">
        <Heading id="inquiry-title" tone="cream" className="z-10 text-[12cqw] md:text-[6.4cqw]">Let’s create{" "}<HeadingAccent className="block text-[12cqw] md:text-[6.1cqw]">together</HeadingAccent></Heading>
        <InquiryForm />
        <Botanical />
      </section>
    </main>
  );
}
