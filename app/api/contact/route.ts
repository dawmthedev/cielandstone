import { NextResponse } from "next/server";

const STUDIO_EMAIL = "info@cielandstone.com";

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

  const form = new FormData();
  form.append("from", from);
  form.append("to", STUDIO_EMAIL);
  form.append("subject", `New inquiry from ${name}`);
  form.append("text", [
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
  ].join("\n"));
  form.append("html", html);
  form.append("h:Reply-To", email);

  const response = await fetch(`${mailgunBaseUrl}/v3/${mailgunDomain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${mailgunKey}`).toString("base64")}`,
    },
    body: form,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("[contact:mailgun-error]", errorText);
    return NextResponse.json(
      {
        error:
          "We could not deliver the inquiry email right now. The lead was captured on the server; please try again or email info@cielandstone.com.",
      },
      { status: 502 },
    );
  }

  console.log("[contact:delivered]", {
    to: STUDIO_EMAIL,
    provider: "mailgun",
    name,
    email,
    location,
    projectType,
  });

  return NextResponse.json({ ok: true });
}
