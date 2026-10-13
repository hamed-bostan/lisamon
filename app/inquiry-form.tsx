"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Copy } from "./components/art";

const fieldClassName = "min-h-11 w-full rounded-none border-field-border bg-transparent px-1 py-2.5 text-base text-field-text placeholder:text-field-placeholder placeholder:italic md:p-[.6cqw]";

function FieldLabel({ children, label }: { children: ReactNode; label: string }) {
  return <label className="block min-w-0"><span className="sr-only">{label}</span>{children}</label>;
}

export default function InquiryForm() {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Message delivery is not connected yet. Please keep your message and try again once contact details are available.");
  }

  return (
    <form className="z-10 min-w-0 max-w-full" onSubmit={submit}>
      <Copy className="mb-4 md:mb-[1.1cqw]">
        Have a project, commission or idea in mind?<br />I’d love to hear from you.
      </Copy>
      <div className="grid gap-3 sm:grid-cols-2">
        <FieldLabel label="Your name">
          <input className={`${fieldClassName} border-0 border-b`} name="name" placeholder="Your Name" autoComplete="name" required />
        </FieldLabel>
        <FieldLabel label="Your email">
          <input className={`${fieldClassName} border-0 border-b`} type="email" name="email" placeholder="Your Email" autoComplete="email" required />
        </FieldLabel>
      </div>
      <FieldLabel label="Your message">
        <textarea className={`${fieldClassName} mt-3 min-h-24 resize-y border`} name="message" placeholder="Your Message" rows={3} required />
      </FieldLabel>
      <button className="mt-2.5 min-h-11 cursor-pointer rounded-full bg-gold px-8 py-3 font-sans text-label font-semibold tracking-[.24em] text-plum uppercase hover:bg-[#ffd494] md:px-[4.4cqw] md:py-[1.35cqw]" type="submit">
        Send message
      </button>
      {message && <p className="mt-3 text-sm leading-normal" role="status">{message}</p>}
    </form>
  );
}
