import Image from "next/image";
import InquiryForm from "./inquiry-form";
import { Artwork, Copy, Divider, Heading, HeadingAccent } from "./components/art";

import studio from "../public/Final pics/01.png";
import bust from "../public/Final pics/06.png";
import figurines from "../public/Final pics/08.png";
import portrait from "../public/Final pics/09.jpg";
import redFish from "../public/Final pics/13.png";
import landscape from "../public/Final pics/14.png";
import underwater from "../public/Final pics/15.png";
import koi from "../public/Regenerated/Ivory koi yin-yang wall relief.png";
import wallRelief from "../public/wall-relief-thumbnail.png";
import sculpturalElements from "../public/sculptural-elements-thumbnail.png";
import artisticWallFinishes from "../public/artistic-wall-finishes-thumbnail.jpg";
import customWallMurals from "../public/custom-wall-murals-thumbnail.png";
import heroWallpaper from "../public/lisamon-hero.png";
const works = [
  { image: portrait, imageClass: "object-center", title: "Paintings", description: "Stories in colour and texture.", href: "#paintings", alt: "Textured portrait with a seascape and white bird" },
  { image: bust, imageClass: "object-[76%_center]", title: "Sculptures", description: "Characters with a story to tell.", href: "#sculptures", alt: "Hand-sculpted terracotta portrait bust" },
  { image: figurines, imageClass: "object-[68%_center]", title: "Figurines", description: "Playful, expressive and full of life.", href: "#sculptures", alt: "Four colourful handmade character figurines" },
  { image: koi, imageClass: "object-center", title: "Commissioned works", description: "Art made for your space.", href: "#inquiry", alt: "Ivory koi fish wall relief" },
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
    <main className="overflow-clip" id="top">
      <section className="w-full bg-[#e9e9e9]" aria-labelledby="hero-title">
        <h1 id="hero-title" className="sr-only">LISAMON</h1>
        <Image src={heroWallpaper} alt="Lisamon walking with a paintbrush in front of the LISAMON lettering" preload unoptimized className="block h-auto w-full" />
      </section>
      <div className="mx-auto max-w-[1600px] [container-type:inline-size] min-[1600px]:shadow-[0_0_70px_#45272018]">
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
      <section className="relative isolate flex h-[300px] w-full items-center justify-center overflow-hidden bg-[#d5c8b3] px-[6cqw] py-8 text-center" id="sculptures" aria-labelledby="sculptures-title">
        <Image src={wallRelief} alt="Sculpted face in an ivory wall relief with delicate textured cracks" fill unoptimized className="-z-20 object-cover object-center" />
        <Heading id="sculptures-title" className="text-[clamp(2rem,5cqw,5rem)] normal-case tracking-normal">Wall Relief Art</Heading>
      </section>
      <section className="relative isolate flex h-[300px] w-full items-center justify-center overflow-hidden bg-[#b99f85] px-[6cqw] py-8 text-center" aria-labelledby="space-title">
        <Image className="-z-20 object-cover object-center" src={sculpturalElements} alt="Reflective sculptural wall elements in a warm contemporary interior" fill unoptimized />
        <Heading id="space-title" className="text-[clamp(2rem,5cqw,5rem)] normal-case tracking-normal">Sculptural Elements for Interiors</Heading>
      </section>
      <section className="relative isolate flex h-[300px] w-full items-center justify-center overflow-hidden bg-[#ded5c5] px-[6cqw] py-8 text-center" aria-labelledby="wall-finishes-title">
        <Image className="-z-20 object-cover object-center" src={artisticWallFinishes} alt="Flowing sculptural white wall finish in a sunlit interior" fill unoptimized />
        <Heading id="wall-finishes-title" className="text-[clamp(2rem,5cqw,5rem)] normal-case tracking-normal">Artistic Wall Finishes</Heading>
      </section>
      <section className="relative isolate flex h-[300px] w-full items-center justify-center overflow-hidden bg-[#d3c6b9] px-[6cqw] py-8 text-center" aria-labelledby="murals-title">
        <Image className="-z-20 object-cover object-center" src={customWallMurals} alt="Artist painting flowing black lines on a large interior wall" fill unoptimized />
        <Heading id="murals-title" className="text-[clamp(2rem,5cqw,5rem)] normal-case tracking-normal">Custom Wall Murals</Heading>
      </section>
      <section aria-labelledby="inquiry-title" className="relative grid gap-[6cqw] bg-[radial-gradient(ellipse_at_35%_40%,#550c2b,var(--color-plum))] px-[6cqw] py-[8cqw] text-[#ead9d2] md:min-h-[24.5cqw] md:grid-cols-[33%_43%] md:gap-[3%] md:px-[6.2cqw] md:pt-[3cqw] md:pb-[3.6cqw]" id="inquiry">
        <Heading id="inquiry-title" tone="cream" className="z-10 text-[12cqw] md:text-[6.4cqw]">Let’s create{" "}<HeadingAccent className="block text-[12cqw] md:text-[6.1cqw]">together</HeadingAccent></Heading>
        <InquiryForm />
        <Botanical />
      </section>
      </div>
    </main>
  );
}
