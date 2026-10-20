import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnnouncementBar from "./components/announcement-bar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
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
