"use client";

import { useEffect, useRef } from "react";

const openDialogs: HTMLElement[] = [];
const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Esc to close, body scroll lock, and focus handling for a mounted modal. */
export function useModal(onClose: () => void) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const latestOnClose = useRef(onClose);

  useEffect(() => {
    latestOnClose.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const dialog = closeButton.current?.closest<HTMLElement>('[role="dialog"]');
    if (!dialog) return;
    openDialogs.push(dialog);
    const isTopmost = () => openDialogs.at(-1) === dialog;
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isTopmost()) return;
      if (event.key === "Escape") {
        event.preventDefault();
        latestOnClose.current();
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
        .filter(element => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (isTopmost() && !dialog.contains(event.target as Node)) closeButton.current?.focus();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocus);
    closeButton.current?.focus();

    return () => {
      openDialogs.splice(openDialogs.indexOf(dialog), 1);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocus);
      previousFocus?.focus();
    };
  }, []);

  return closeButton;
}
