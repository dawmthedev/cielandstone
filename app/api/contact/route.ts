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

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log("[contact:missing-resend]", {
      to: STUDIO_EMAIL,
      name,
      email,
      phone,
      location,
      projectType,
      budget,
      timeline,
      message,
    });

    return NextResponse.json(
      {
        error:
          "Inquiry email delivery is not configured yet. Please email info@cielandstone.com directly, or add RESEND_API_KEY to enable form delivery.",
      },
      { status: 503 },
    );
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Ciel & Stone <onboarding@resend.dev>";

  const html = `
    <div style="font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: #201814;">
      <h2 style="margin-bottom: 16px;">New Ciel &amp; Stone Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
      <p><strong>Location:</strong> ${escapeHtml(location)}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budget || "Not provided")}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(timeline || "Not provided")}</p>
      <p><strong>Project Notes:</strong></p>
      <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [STUDIO_EMAIL],
      reply_to: email,
      subject: `New inquiry from ${name}`,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("[contact:resend-error]", errorText);
    return NextResponse.json(
      { error: "We could not deliver the inquiry email. Please email info@cielandstone.com directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
