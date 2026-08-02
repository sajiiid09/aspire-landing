import nodemailer from "nodemailer";
import { CONTACT } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_REQUEST_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_RATE_LIMIT_ENTRIES = 10_000;

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
let nextRateLimitSweep = Date.now() + RATE_LIMIT_WINDOW_MS;

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
  if (now >= nextRateLimitSweep) {
    for (const [key, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(key);
    }
    nextRateLimitSweep = now + RATE_LIMIT_WINDOW_MS;
  }

  const current = rateLimits.get(ip);

  if (!current || current.resetAt <= now) {
    if (!current && rateLimits.size >= MAX_RATE_LIMIT_ENTRIES) {
      const oldestKey = rateLimits.keys().next().value;
      if (oldestKey) rateLimits.delete(oldestKey);
    }
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function isAllowedBrowserRequest(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.url;
    return origin === new URL(siteUrl).origin;
  } catch {
    return false;
  }
}

type JsonBodyResult =
  | { ok: true; value: unknown }
  | { ok: false; status: 400 | 413 };

async function readJsonBody(request: Request): Promise<JsonBodyResult> {
  const reader = request.body?.getReader();
  if (!reader) return { ok: false, status: 400 };

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_REQUEST_BYTES) {
        await reader.cancel().catch(() => undefined);
        return { ok: false, status: 413 };
      }
      chunks.push(value);
    }

    const body = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }

    return {
      ok: true,
      value: JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body)),
    };
  } catch {
    return { ok: false, status: 400 };
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  if (request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") {
    return Response.json({ error: "Content-Type must be application/json." }, { status: 415 });
  }

  if (!isAllowedBrowserRequest(request)) {
    return Response.json({ error: "Cross-site submissions are not allowed." }, { status: 403 });
  }

  if (isRateLimited(getClientIp(request))) {
    return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await readJsonBody(request);
  if (!body.ok) {
    const error = body.status === 413 ? "Request is too large." : "Invalid request.";
    return Response.json({ error }, { status: body.status });
  }

  const submission = parseSubmission(body.value);
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
