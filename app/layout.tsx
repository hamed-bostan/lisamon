import localFont from "next/font/local";
import type { Metadata } from "next";
import { siteUrl } from "../lib/site";
import AnnouncementBar from "./components/announcement-bar";
import { contact } from "./data";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = { metadataBase: siteUrl };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LISAMON",
  url: new URL("/", siteUrl).toString(),
  logo: new URL("/icon.png", siteUrl).toString(),
  email: contact.email,
  sameAs: [contact.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
        <AnnouncementBar />
        {children}
      </body>
    </html>
  );
}
