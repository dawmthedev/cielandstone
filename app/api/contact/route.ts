import { NextResponse } from "next/server";

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
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildInquiryHtml(data: {
  name: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}) {
  return `
    <div style="font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: #201814;">
      <h2 style="margin-bottom: 16px;">New Ciel &amp; Stone Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone || "Not provided")}</p>
      <p><strong>Location:</strong> ${escapeHtml(data.location)}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(data.projectType)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(data.budget || "Not provided")}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(data.timeline || "Not provided")}</p>
      <p><strong>Project Notes:</strong></p>
      <p>${escapeHtml(data.message).replaceAll("\n", "<br />")}</p>
    </div>
  `;
}

function buildConfirmationHtml(data: { name: string; location: string; projectType: string }) {
  return `
    <div style="font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: #201814;">
      <h2 style="margin-bottom: 16px;">We received your Ciel &amp; Stone inquiry</h2>
      <p>Thanks, ${escapeHtml(data.name)}. Your inquiry for <strong>${escapeHtml(data.projectType)}</strong> in <strong>${escapeHtml(data.location)}</strong> is in our inbox.</p>
      <p>Our team will review it and reply from <strong>info@cielandstone.com</strong> soon.</p>
    </div>
  `;
}

async function sendMailgunMessage({
  mailgunBaseUrl,
  mailgunDomain,
  mailgunKey,
  from,
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  mailgunBaseUrl: string;
  mailgunDomain: string;
  mailgunKey: string;
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const form = new FormData();
  form.append("from", from);
  form.append("to", to.join(","));
  form.append("subject", subject);
  form.append("text", text);
  form.append("html", html);
  if (replyTo) form.append("h:Reply-To", replyTo);

  return fetch(`${mailgunBaseUrl}/v3/${mailgunDomain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${mailgunKey}`).toString("base64")}`,
    },
    body: form,
  });
}

export async function POST(req: Request) {
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

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const mailgunKey = process.env.MAILGUN_API_KEY?.trim();
  const mailgunDomain = process.env.MAILGUN_DOMAIN?.trim();
  const mailgunBaseUrl = (process.env.MAILGUN_BASE_URL || "https://api.mailgun.net").replace(/\/$/, "");
  const from = process.env.MAILGUN_FROM || `Ciel & Stone <postmaster@${mailgunDomain || "mg.cielandstone.com"}>`;
  const leadEmail = process.env.MAILGUN_LEAD_EMAIL?.trim() || DEFAULT_LEAD_EMAIL;

  const payload = { name, email, phone, location, projectType, budget, timeline, message };
  const html = buildInquiryHtml(payload);

  if (!mailgunKey || !mailgunDomain) {
    console.log("[contact:queued]", {
      to: STUDIO_EMAIL,
      ...payload,
      note: "MAILGUN_API_KEY or MAILGUN_DOMAIN missing; capture recorded in logs only.",
    });
    return NextResponse.json({ ok: true, queued: true });
  }

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
  ].join("\n");

  const [leadResponse, confirmationResponse] = await Promise.all([
    sendMailgunMessage({
      mailgunBaseUrl,
      mailgunDomain,
      mailgunKey,
      from,
      to: [STUDIO_EMAIL, leadEmail],
      subject: `New inquiry from ${name}`,
      html,
      text,
      replyTo: email,
    }),
    sendMailgunMessage({
      mailgunBaseUrl,
      mailgunDomain,
      mailgunKey,
      from,
      to: [email],
      subject: "We received your Ciel & Stone inquiry",
      html: buildConfirmationHtml(payload),
      text: [
        `Thanks, ${name}.`,
        `We received your inquiry for ${projectType} in ${location}.`,
        `Our team will review it and reply from info@cielandstone.com soon.`,
      ].join("\n"),
    }),
  ]);

  if (!leadResponse.ok || !confirmationResponse.ok) {
    const leadError = await leadResponse.text().catch(() => "");
    const confirmError = await confirmationResponse.text().catch(() => "");
    console.error("[contact:mailgun-error]", { leadError, confirmError });
    return NextResponse.json(
      {
        error:
          "We could not deliver the inquiry email right now. The lead was captured on the server; please try again or email info@cielandstone.com.",
      },
      { status: 502 },
    );
  }

  console.log("[contact:delivered]", {
    to: [STUDIO_EMAIL, leadEmail],
    provider: "mailgun",
    name,
    email,
    location,
    projectType,
  });

  return NextResponse.json({ ok: true, delivered: true });
}
