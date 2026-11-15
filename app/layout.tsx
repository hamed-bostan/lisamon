import type { Metadata } from "next";
import localFont from "next/font/local";
import AnnouncementBar from "./components/announcement-bar";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LISAMON — Art Beyond the Canvas",
  description: "LISAMON is a Dubai-based creative studio bringing art beyond the canvas through sculptural walls, installations, murals and bespoke pieces.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AnnouncementBar />
        {children}
      </body>
    </html>
  );
}
