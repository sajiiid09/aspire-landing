"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/lib/content";
import { CONTACT_FORM_ENDPOINT, SITE } from "@/lib/config";
import { Reveal } from "@/components/reveal";

type Status = "idle" | "sending" | "sent" | "error";

const inputClasses =
  "w-full border-b border-input bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:border-[hsl(var(--ring))] focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No backend: third-party endpoint when configured, mailto fallback otherwise
    if (!CONTACT_FORM_ENDPOINT) {
      const subject = encodeURIComponent("Study abroad inquiry");
      const body = encodeURIComponent(
        `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nDestination: ${data.get("destination")}\n\n${data.get("message")}`,
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <Image
        src={CONTACT.backgroundImage}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      {/* Overlay keeps form and text legible over the photo in every theme */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, hsl(var(--background) / 0.96) 35%, hsl(var(--background) / 0.82))",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-8 md:grid-cols-2">
        <Reveal>
          <div className="text-sm text-muted-foreground">{CONTACT.eyebrow}</div>
          <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {CONTACT.title}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            {CONTACT.body}
          </p>

          <address className="mt-10 flex flex-col gap-4 text-sm not-italic text-muted-foreground">
            <span className="flex items-center gap-3">
              <MapPin aria-hidden className="h-4 w-4" /> {SITE.address}
            </span>
            <a
              href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-3 transition-colors hover:text-foreground"
            >
              <Phone aria-hidden className="h-4 w-4" /> {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 transition-colors hover:text-foreground"
            >
              <Mail aria-hidden className="h-4 w-4" /> {SITE.email}
            </a>
          </address>
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <label className="sr-only" htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              required
              placeholder="Full name"
              className={inputClasses}
            />
            <label className="sr-only" htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              className={inputClasses}
            />
            <label className="sr-only" htmlFor="contact-phone">Phone</label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="Phone (optional)"
              className={inputClasses}
            />
            <label className="sr-only" htmlFor="contact-destination">
              Destination interest
            </label>
            <select
              id="contact-destination"
              name="destination"
              required
              defaultValue=""
              className={`${inputClasses} appearance-none`}
            >
              <option value="" disabled>
                Destination interest
              </option>
              {CONTACT.destinationOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-background text-foreground">
                  {opt}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder="Tell us about your plans"
              className={inputClasses}
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="liquid-glass mt-4 self-start rounded-full px-10 py-4 text-base text-foreground transition-transform hover:scale-[1.03] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            <p aria-live="polite" className="text-sm text-muted-foreground">
              {status === "sent" && "Thanks — we will reach out within one business day."}
              {status === "error" && "Something went wrong. Please email us directly."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
