import nodemailer from "nodemailer";
import { CONTACT } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_REQUEST_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type ContactSubmission = {
  inquiryType: string;
  destination: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

type RateLimitEntry = { count: number; resetAt: number };

const rateLimits = new Map<string, RateLimitEntry>();

function getText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength + 1) : "";
}

function parseSubmission(value: unknown): ContactSubmission | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;

  return {
    inquiryType: getText(body.inquiryType, 50),
    destination: getText(body.destination, 100),
    name: getText(body.name, 120),
    email: getText(body.email, 254).toLowerCase(),
    phone: getText(body.phone, 50),
    message: getText(body.message, 5_000),
    website: getText(body.website, 200),
  };
}

function isValid(submission: ContactSubmission) {
  return (
    CONTACT.inquiryTypes.some((type) => type === submission.inquiryType) &&
    CONTACT.destinations.some((destination) => destination === submission.destination) &&
    submission.name.length >= 2 &&
    submission.name.length <= 120 &&
    submission.email.length <= 254 &&
    EMAIL_RE.test(submission.email) &&
    submission.phone.length <= 50 &&
    submission.message.length >= 10 &&
    submission.message.length <= 5_000
  );
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimits.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  if (isRateLimited(getClientIp(request))) {
    return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let submission: ContactSubmission | null;
  try {
    submission = parseSubmission(await request.json());
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!submission) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Silently accept honeypot submissions so bots do not learn how they were detected.
  if (submission.website) {
    return Response.json({ ok: true });
  }

  if (!isValid(submission)) {
    return Response.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const recipient = process.env.CONTACT_EMAIL || smtpUser;

  if (!smtpUser || !smtpPass || !recipient) {
    console.error("Contact email is not configured.");
    return Response.json({ error: "Email service is unavailable." }, { status: 503 });
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const rows = [
    ["Inquiry type", submission.inquiryType],
    ["Destination", submission.destination],
    ["Name", submission.name],
    ["Email", submission.email],
    ["Phone", submission.phone || "Not provided"],
  ] as const;

  const text = [
    "New website inquiry",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    submission.message,
  ].join("\n");

  const htmlRows = rows.map(([label, value]) => (
    `<tr><th align="left" style="padding:6px 16px 6px 0">${label}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
  )).join("");

  try {
    await transporter.sendMail({
      from: { name: "Aspire Global Education Website", address: smtpUser },
      to: recipient,
      replyTo: { name: submission.name, address: submission.email },
      subject: `${submission.inquiryType}: ${submission.name}`,
      text,
      html: `<h2>New website inquiry</h2><table>${htmlRows}</table><h3>Message</h3><p style="white-space:pre-wrap">${escapeHtml(submission.message)}</p>`,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact email delivery failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "Email delivery failed." }, { status: 502 });
  }
}
