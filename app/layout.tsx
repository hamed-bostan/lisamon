import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "LISAMON — Art Shaped by Hand", description: "Original artwork, custom creations, and art made personal." };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
