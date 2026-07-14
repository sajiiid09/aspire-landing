"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/lib/content";
import { CONTACT_FORM_ENDPOINT, SITE } from "@/lib/config";
import { Reveal } from "@/components/reveal";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [inquiryType, setInquiryType] = useState<(typeof CONTACT.inquiryTypes)[number]>("Student inquiry");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("type") === "partner") {
      setInquiryType("Partner inquiry");
    }
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!CONTACT_FORM_ENDPOINT) {
      if (!SITE.email) {
        setStatus("error");
        return;
      }
      const subject = encodeURIComponent(`${data.get("inquiryType")} for Aspire Global Education`);
      const body = encodeURIComponent(
        `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nDestination: ${data.get("destination")}\n\n${data.get("message")}`,
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);
      form.reset();
      setInquiryType("Student inquiry");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative overflow-hidden section-pad">
      <Image src={CONTACT.backgroundImage} alt="" fill sizes="100vw" className="object-cover" aria-hidden />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,hsl(var(--background)/0.98)_30%,hsl(var(--background)/0.86))]" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="font-display text-4xl text-foreground md:text-5xl">{CONTACT.title}</h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{CONTACT.body}</p>
          {(SITE.address || SITE.phone || SITE.email) && <address className="mt-10 grid gap-4 text-sm not-italic text-muted-foreground">
            {SITE.address && <span className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{SITE.address}</span>}
            {SITE.phone && <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 hover:text-foreground"><Phone className="h-4 w-4" aria-hidden />{SITE.phone}</a>}
            {SITE.email && <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-foreground"><Mail className="h-4 w-4" aria-hidden />{SITE.email}</a>}
          </address>}
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} className="surface grid gap-6 rounded-xl p-6 sm:grid-cols-2 sm:p-8">
            <Field label={CONTACT.form.inquiryType} htmlFor="inquiry-type">
              <select id="inquiry-type" name="inquiryType" value={inquiryType} onChange={(event) => setInquiryType(event.target.value as typeof inquiryType)} className="form-input" required>
                {CONTACT.inquiryTypes.map((type) => <option key={type} value={type} className="bg-background text-foreground">{type}</option>)}
              </select>
            </Field>
            <Field label={CONTACT.form.destination} htmlFor="destination">
              <select id="destination" name="destination" defaultValue="" className="form-input" required>
                <option value="" disabled className="bg-background">{CONTACT.form.destinationPrompt}</option>
                {CONTACT.destinations.map((destination) => <option key={destination} value={destination} className="bg-background text-foreground">{destination}</option>)}
              </select>
            </Field>
            <Field label={CONTACT.form.name} htmlFor="name"><input id="name" name="name" autoComplete="name" className="form-input" required minLength={2} /></Field>
            <Field label={CONTACT.form.email} htmlFor="email"><input id="email" name="email" type="email" autoComplete="email" className="form-input" required /></Field>
            <Field label={CONTACT.form.phone} htmlFor="phone"><input id="phone" name="phone" type="tel" autoComplete="tel" className="form-input" /></Field>
            <div className="sm:col-span-2">
              <Field label={CONTACT.form.message} htmlFor="message"><textarea id="message" name="message" rows={5} className="form-input resize-y" required minLength={10} /></Field>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground sm:col-span-2">{CONTACT.form.consent}</p>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button type="submit" disabled={status === "sending"} className="rounded-lg bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60">
                {status === "sending" ? CONTACT.form.sending : CONTACT.form.submit}
              </button>
              <p aria-live="polite" className={`${status === "error" ? "text-red-200" : "text-muted-foreground"} text-sm`}>
                {status === "sent" && CONTACT.form.success}
                {status === "error" && CONTACT.form.error}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return <div className="grid gap-2"><label htmlFor={htmlFor} className="text-sm font-medium text-foreground">{label}</label>{children}</div>;
}
