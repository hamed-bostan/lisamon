"use client";

import styles from "./editorial.module.css";

import { useState, type FormEvent, type ReactNode } from "react";

const fieldClassName = styles.field;

function FieldLabel({ children, label }: { children: ReactNode; label: string }) {
  return <label className="block min-w-0"><span className="font-sans text-xs tracking-wide text-plum">{label}</span>{children}</label>;
}

export default function InquiryForm() {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `LISAMON enquiry: ${data.get("projectType")}`;
    const body = `Full name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject type: ${data.get("projectType")}\n\n${data.get("details")}`;
    window.location.href = `mailto:lisamon.artt@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMessage("Your enquiry is ready to send in your email app. If it did not open, email lisamon.artt@gmail.com or contact us on WhatsApp. Your details remain here for you to copy.");
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <h3 className={styles.formTitle}>Start your project</h3>
      <p className="mt-3 mb-7 text-base text-ink">Tell us about your space and your vision.</p>
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldLabel label="Full Name">
            <input className={fieldClassName} name="name" autoComplete="name" maxLength={120} required />
          </FieldLabel>
          <FieldLabel label="Email Address">
            <input className={fieldClassName} type="email" name="email" autoComplete="email" maxLength={254} required />
          </FieldLabel>
        </div>
        <FieldLabel label="Project Type">
          <select className={fieldClassName} name="projectType" defaultValue="" required>
            <option value="" disabled>Select a project type</option>
            <option>Sculptural wall art / 3D bas-relief</option>
            <option>Custom sculpture</option>
            <option>Artistic installation</option>
            <option>Hand-painted mural</option>
            <option>Other / I would like guidance</option>
          </select>
        </FieldLabel>
        <FieldLabel label="Project Details">
          <textarea className={`${fieldClassName} min-h-36 resize-y`} name="details" placeholder="Share the location, dimensions, ideas and timeline for your space…" rows={5} maxLength={3000} required />
        </FieldLabel>
      </div>
      <p id="delivery-note" className="mt-4 text-sm leading-relaxed text-ink">This opens your email app with your enquiry prepared for you to send.</p>
      <button aria-describedby="delivery-note" className={styles.submit} type="submit">Send Enquiry <span aria-hidden="true" className="ml-5">↗</span></button>
      {message && <p className="mt-4 text-sm leading-relaxed" role="status">{message}</p>}
    </form>
  );
}
