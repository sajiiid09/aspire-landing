"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { CheckCircle2, ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/lib/content";
import { CONTACT_FORM_ENDPOINT, SITE } from "@/lib/config";
import { Reveal } from "@/components/reveal";

type Status = "idle" | "sending" | "sent" | "error";
type FieldName = "destination" | "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [inquiryType, setInquiryType] = useState<(typeof CONTACT.inquiryTypes)[number]>("Student inquiry");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("type") === "partner") {
      setInquiryType("Partner inquiry");
    }
  }, []);

  function validateField(name: FieldName, value: string): string | undefined {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? CONTACT.form.errName : undefined;
      case "email":
        return EMAIL_RE.test(value) ? undefined : CONTACT.form.errEmail;
      case "destination":
        return value === "" ? CONTACT.form.errDestination : undefined;
      case "message":
        return value.trim().length < 10 ? CONTACT.form.errMessage : undefined;
      default:
        return undefined;
    }
  }

  function validateAll(data: FormData): Errors {
    const next: Errors = {};
    (["name", "email", "destination", "message"] as FieldName[]).forEach((name) => {
      const message = validateField(name, String(data.get(name) ?? ""));
      if (message) next[name] = message;
    });
    return next;
  }

  function onBlur(name: FieldName, value: string) {
    if (!submitted) return;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validateAll(data);
    setErrors(nextErrors);
    setSubmitted(true);
    if (Object.keys(nextErrors).length > 0) {
      form.querySelector<HTMLElement>(`#${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }

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
      setErrors({});
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  function resetForm() {
    setStatus("idle");
    setErrors({});
    setSubmitted(false);
    setInquiryType("Student inquiry");
  }

  return (
    <section className="section-generous relative overflow-hidden">
      <Image src={CONTACT.backgroundImage} alt="" fill priority sizes="100vw" className="object-cover" aria-hidden />
      <div className="absolute inset-0 bg-[image:var(--contact-overlay)]" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="font-display text-4xl text-foreground md:text-5xl">{CONTACT.title}</h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{CONTACT.body}</p>
          {(SITE.address || SITE.phone || SITE.email) && <address className="mt-10 grid gap-4 text-sm not-italic text-muted-foreground">
            {SITE.address && <span className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden />{SITE.address}</span>}
            {SITE.phone && <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 hover:text-foreground"><Phone className="h-4 w-4" aria-hidden />{SITE.phone}</a>}
            {SITE.email && <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-foreground"><Mail className="h-4 w-4" aria-hidden />{SITE.email}</a>}
          </address>}
        </Reveal>

        <Reveal>
          {status === "sent" ? (
            <div role="status" aria-live="polite" className="surface grid place-items-center gap-4 rounded-xl px-6 py-16 text-center sm:p-12">
              <CheckCircle2 className="h-10 w-10 text-accent" strokeWidth={1.5} aria-hidden />
              <h3 className="font-display text-2xl text-foreground md:text-3xl">{CONTACT.form.successTitle}</h3>
              <p className="mx-auto max-w-md leading-relaxed text-muted-foreground">{CONTACT.form.success}</p>
              <button type="button" onClick={resetForm} className="btn btn-ghost mt-2">{CONTACT.form.sendAnother}</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="surface grid gap-6 rounded-xl p-6 sm:grid-cols-2 sm:p-8">
              <Field label={CONTACT.form.inquiryType} htmlFor="inquiry-type" required>
                <div className="relative">
                  <select id="inquiry-type" name="inquiryType" value={inquiryType} onChange={(event) => setInquiryType(event.target.value as typeof inquiryType)} className="form-input appearance-none pr-10" required>
                    {CONTACT.inquiryTypes.map((type) => <option key={type} value={type} className="bg-background text-foreground">{type}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                </div>
              </Field>
              <Field label={CONTACT.form.destination} htmlFor="destination" required error={errors.destination} errorId="destination-error">
                <div className="relative">
                  <select id="destination" name="destination" defaultValue="" onBlur={(event) => onBlur("destination", event.target.value)} aria-invalid={!!errors.destination} aria-describedby={errors.destination ? "destination-error" : undefined} className="form-input appearance-none pr-10" required>
                    <option value="" disabled className="bg-background">{CONTACT.form.destinationPrompt}</option>
                    {CONTACT.destinations.map((destination) => <option key={destination} value={destination} className="bg-background text-foreground">{destination}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                </div>
              </Field>
              <Field label={CONTACT.form.name} htmlFor="name" required error={errors.name} errorId="name-error">
                <input id="name" name="name" autoComplete="name" onBlur={(event) => onBlur("name", event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className="form-input" required minLength={2} />
              </Field>
              <Field label={CONTACT.form.email} htmlFor="email" required error={errors.email} errorId="email-error">
                <input id="email" name="email" type="email" autoComplete="email" onBlur={(event) => onBlur("email", event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className="form-input" required />
              </Field>
              <Field label={CONTACT.form.phone} htmlFor="phone">
                <input id="phone" name="phone" type="tel" autoComplete="tel" className="form-input" />
              </Field>
              <div className="sm:col-span-2">
                <Field label={CONTACT.form.message} htmlFor="message" required error={errors.message} errorId="message-error">
                  <textarea id="message" name="message" rows={5} onBlur={(event) => onBlur("message", event.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} className="form-input resize-y" required minLength={10} />
                </Field>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground sm:col-span-2">{CONTACT.form.consent}</p>
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
                  {status === "sending" ? CONTACT.form.sending : CONTACT.form.submit}
                </button>
                <p aria-live="polite" className={`${status === "error" ? "text-destructive" : "text-muted-foreground"} text-sm`}>
                  {status === "error" && CONTACT.form.error}
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, required, error, errorId, children }: { label: string; htmlFor: string; required?: boolean; error?: string; errorId?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required && (<><span aria-hidden className="text-accent"> *</span><span className="sr-only"> ({CONTACT.form.required})</span></>)}
      </label>
      {children}
      <p id={errorId} role={error ? "alert" : undefined} aria-hidden={error ? undefined : true} className={`min-h-[1lh] text-xs ${error ? "text-destructive" : "invisible"}`}>{error ?? "No error"}</p>
    </div>
  );
}
