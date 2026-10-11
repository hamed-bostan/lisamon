import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const antonio = localFont({
  src: "./fonts/Antonio.ttf",
  weight: "100 700",
  display: "swap",
  variable: "--font-antonio",
});

export const metadata: Metadata = {
  title: "LISAMON — Art Shaped by Hand",
  description: "Original artwork, custom creations, and art made personal.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={antonio.variable}>
      <body>{children}</body>
    </html>
  );
}
