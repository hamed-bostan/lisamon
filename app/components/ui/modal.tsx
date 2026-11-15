"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type ReactNode } from "react";

let lockCount = 0;
let originalOverflow = "";

export default function Modal({ children, className, onClose, labelledBy, label }: {
  children: ReactNode;
  className: string;
  onClose: () => void;
  labelledBy?: string;
  label?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const latestClose = useRef(onClose);
  useEffect(() => { latestClose.current = onClose; }, [onClose]);
  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!mounted || !dialog.current) return;
    const element = dialog.current;
    opener.current = document.activeElement as HTMLElement | null;
    if (lockCount++ === 0) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    element.showModal();
    element.querySelector<HTMLElement>("[data-modal-close]")?.focus();
    return () => {
      if (element.open) element.close();
      if (--lockCount === 0) document.body.style.overflow = originalOverflow;
      const target = opener.current?.isConnected ? opener.current : document.querySelector<HTMLElement>("main a, main button, #main-content");
      window.setTimeout(() => { if (!element.open && target?.isConnected) target.focus(); }, 0);
    };
  }, [mounted]);

  if (!mounted) return null;
  return createPortal(
    <dialog
      ref={dialog}
      className={`modal-surface ${className}`}
      aria-labelledby={labelledBy}
      aria-label={label}
      onCancel={event => { event.preventDefault(); latestClose.current(); }}
      onClick={event => { if (event.target === event.currentTarget) latestClose.current(); }}
    >
      {children}
    </dialog>,
    document.body,
  );
}
