"use client";

import { useEffect, useRef, useState } from "react";

// Glass strip behind the fixed logo and Instagram link; appears once the page has scrolled past its own height.
export default function NavbarBackdrop({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > (barRef.current?.offsetHeight ?? 0));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={barRef} className={className} data-visible={visible || undefined} aria-hidden="true" />;
}
