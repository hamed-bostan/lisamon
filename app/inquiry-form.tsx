"use client";

import { useState, type FormEvent } from "react";

export default function InquiryForm() {
  const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Message delivery is not connected yet. Please keep your message and try again once contact details are available.");
  }
  return <form className="inquiry-form" onSubmit={submit}>
    <p>Have a project, commission or idea in mind?<br />I’d love to hear from you.</p>
    <div className="form-row"><label><span className="sr-only">Your name</span><input name="name" placeholder="Your Name" autoComplete="name" required /></label><label><span className="sr-only">Your email</span><input type="email" name="email" placeholder="Your Email" autoComplete="email" required /></label></div>
    <label><span className="sr-only">Your message</span><textarea name="message" placeholder="Your Message" rows={3} required /></label>
    <button type="submit">Send message</button>
    {message && <p className="form-status" role="status">{message}</p>}
  </form>;
}
