"use client";

import Link from "next/link";

export default function Error({ retry }: { retry: () => void }) {
  return <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col items-start justify-center gap-6 px-6 md:px-20">
    <p className="text-sm tracking-[0.4em]">LISAMON</p>
    <h1 className="text-3xl font-black">Something went wrong.</h1>
    <button type="button" onClick={retry}>Try again</button>
    <Link href="/">Home</Link>
  </main>;
}
