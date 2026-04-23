import { NextResponse } from "next/server";
import {
  deliverLead,
  escapeHtml,
  extractSourceFromPayload,
  formatSourceHtml,
  formatSourceText,
  isValidEmail,
  leadErrorResponse,
  type LeadRecord,
} from "@/lib/lead-capture";

const STUDIO_EMAIL = "info@cielandstone.com";
const DEFAULT_LEAD_EMAIL = "lead@cielandstone.com";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  /** Marketing source attribution (UTMs, referrer, landing page). */
  source?: Record<string, unknown>;
};

// Very small in-memory rate limit per-IP. Sufficient guardrail against casual
// form-spam once ads start running. For heavier load, swap in Upstash/Redis.
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, { count: number; windowStart: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

function buildStudioHtml(data: {
  name: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  sourceHtml: string;
}) {
  return `
    <div style="font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: #201814;">
      <h2 style="margin-bottom: 16px;">New Ciel &amp; Stone Project Brief</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone || "Not provided")}</p>
      <p><strong>Location:</strong> ${escapeHtml(data.location)}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(data.projectType)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(data.budget || "Not provided")}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(data.timeline || "Not provided")}</p>
      <p><strong>Project Notes:</strong></p>
      <p>${escapeHtml(data.message).replaceAll("\n", "<br />")}</p>
      ${data.sourceHtml}
    </div>
  `;
}

function buildConfirmationHtml(data: { name: string; location: string; projectType: string }) {
  return `
    <div style="font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: #201814;">
      <h2 style="margin-bottom: 16px;">We received your Ciel &amp; Stone project brief</h2>
      <p>Thanks, ${escapeHtml(data.name)}. Your brief for <strong>${escapeHtml(data.projectType)}</strong> in <strong>${escapeHtml(data.location)}</strong> is in our inbox.</p>
      <p>Our team will review it and reply from <strong>info@cielandstone.com</strong> soon.</p>
    </div>
  `;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  const body = (await req.json().catch(() => null)) as ContactPayload | null;

  const name = (body?.name ?? "").trim();
  const email = (body?.email ?? "").trim();
  const phone = (body?.phone ?? "").trim();
  const location = (body?.location ?? "").trim();
  const projectType = (body?.projectType ?? "").trim();
  const budget = (body?.budget ?? "").trim();
  const timeline = (body?.timeline ?? "").trim();
  const message = (body?.message ?? "").trim();

  if (!name || !email || !location || !projectType || !message) {
    return NextResponse.json(
      { error: "Please provide your name, email, location, project type, and project notes." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const source = extractSourceFromPayload((body ?? {}) as Record<string, unknown>);
  const sourceHtml = formatSourceHtml(source);
  const sourceText = formatSourceText(source);

  const leadEmail = process.env.MAILGUN_LEAD_EMAIL?.trim() || DEFAULT_LEAD_EMAIL;

  const payload = { name, email, phone, location, projectType, budget, timeline, message, sourceHtml };
  const html = buildStudioHtml(payload);

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Location: ${location}`,
    `Project Type: ${projectType}`,
    `Budget: ${budget || "Not provided"}`,
    `Timeline: ${timeline || "Not provided"}`,
    "",
    "Project Notes:",
    message,
    "",
    sourceText ? "— Lead Source —" : "",
    sourceText,
  ].filter(Boolean).join("\n");

  const record: LeadRecord = {
    type: "contact",
    timestamp: new Date().toISOString(),
    source,
    data: { name, email, phone, location, projectType, budget, timeline, message },
  };

  // Subject carries the service/location when they're present — makes the
  // inbox scannable once ad leads start flowing.
  const subjectTag = source.service && source.location
    ? `[${source.service}/${source.location}] `
    : source.service
    ? `[${source.service}] `
    : "";
  const subject = `${subjectTag}New project brief from ${name}`;

  const result = await deliverLead({
    type: "contact",
    subject,
    studioHtml: html,
    studioText: text,
    confirmationHtml: buildConfirmationHtml({ name, location, projectType }),
    confirmationText: [
      `Thanks, ${name}.`,
      `We received your brief for ${projectType} in ${location}.`,
      `Our team will review it and reply from info@cielandstone.com soon.`,
    ].join("\n"),
    to: [STUDIO_EMAIL, leadEmail],
    confirmationTo: [email],
    replyTo: email,
    tag: "contact-form",
    record,
  });

  if (!result.anyOk) {
    return leadErrorResponse(result.errors);
  }

  return NextResponse.json({
    ok: true,
    delivered: result.mailgunOk,
    webhookDelivered: result.webhookOk,
    queued: !result.mailgunOk && (result.webhookOk || result.diskOk),
  });
}
