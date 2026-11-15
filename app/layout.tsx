import localFont from "next/font/local";
import { pageMetadata } from "../lib/site";
import AnnouncementBar from "./components/announcement-bar";
import { contact } from "./data";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

export const metadata = pageMetadata({
  title: "LISAMON — Art Beyond the Canvas",
  description: "LISAMON is a Dubai-based creative studio bringing art beyond the canvas through sculptural walls, installations, murals and bespoke pieces.",
  path: "/",
  image: "/images/home/hero.webp",
  imageAlt: "LISAMON creative studio",
});

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LISAMON",
  url: "https://www.lisamon.ae/",
  logo: "https://www.lisamon.ae/icon.png",
  email: contact.email,
  sameAs: [contact.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
        <AnnouncementBar />
        {children}
      </body>
    </html>
  );
}
