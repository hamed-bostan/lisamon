import Link from "next/link";
import { contact } from "../content/site";

export default function NotFound() {
  return <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col items-start justify-center gap-6 px-6 md:px-20">
    <p className="text-sm tracking-[0.4em]">LISAMON</p>
    <h1 className="text-5xl font-black">404</h1>
    <p>Page not found.</p>
    <nav className="flex gap-6"><Link href="/">Home</Link><a href={`mailto:${contact.email}`}>Email</a></nav>
  </main>;
}
