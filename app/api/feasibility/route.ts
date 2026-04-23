import { NextResponse } from "next/server";

const STUDIO_EMAIL = "info@cielandstone.com";
const DEFAULT_LEAD_EMAIL = "lead@cielandstone.com";

type Tier = "A" | "B" | "C";

type FeasibilityPayload = {
  role?: string;
  scope?: string;
  region?: string;
  investment?: string;
  timeline?: string;
  readiness?: string;
  propertyAddress?: string;
  propertyNotes?: string;
  name?: string;
  email?: string;
  phone?: string;
  referral?: string;
  score?: number;
  tier?: Tier;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildStudioHtml(data: FeasibilityPayload & { tierLabel: string }) {
  const rows = [
    ["Tier", `${data.tier ?? "—"} · ${data.tierLabel}`],
    ["Score", String(data.score ?? "—")],
    ["Name", data.name ?? "—"],
    ["Email", data.email ?? "—"],
    ["Phone", data.phone ?? "—"],
    ["Referral", data.referral ?? "—"],
    ["Role", data.role ?? "—"],
    ["Scope", data.scope ?? "—"],
    ["Region", data.region ?? "—"],
    ["Investment", data.investment ?? "—"],
    ["Timeline", data.timeline ?? "—"],
    ["Readiness", data.readiness ?? "—"],
    ["Property", data.propertyAddress ?? "—"],
  ];

  const rowHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5a4d45;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;">${escapeHtml(
          k,
        )}</td><td style="padding:6px 0;color:#201814;font-size:14px;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: #201814; max-width:640px;">
      <h2 style="margin:0 0 8px;">New Feasibility Read intake · Tier ${escapeHtml(data.tier ?? "—")}</h2>
      <div style="color:#5a4d45;font-size:13px;margin-bottom:20px;">${escapeHtml(data.tierLabel)}</div>
      <table style="border-collapse:collapse;width:100%;">${rowHtml}</table>
      ${
        data.propertyNotes
          ? `<div style="margin-top:20px;"><div style="font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#5a4d45;margin-bottom:6px;">Property notes</div><div style="white-space:pre-wrap;">${escapeHtml(
              data.propertyNotes,
            )}</div></div>`
          : ""
      }
    </div>
  `;
}

function buildLeadConfirmationHtml(data: FeasibilityPayload & { tierLabel: string }) {
  return `
    <div style="font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: #201814; max-width:640px;">
      <h2 style="margin:0 0 16px;">Your Feasibility Read is in our inbox.</h2>
      <p style="font-size:14px;">Thanks, ${escapeHtml(data.name ?? "")}. We received your intake for a ${escapeHtml(
    data.scope ?? "",
  )} project ${data.region ? `in ${escapeHtml(data.region)}` : ""}.</p>
      <p style="font-size:14px;">Status: <strong>${escapeHtml(data.tierLabel)}</strong>.</p>
      <p style="font-size:14px;">The written read summarizes scope bracket, preconstruction plan, risk notes, and a recommendation. Expect a follow-up from info@cielandstone.com within 24 hours for priority-fit projects, 1–2 business days otherwise.</p>
      <p style="font-size:14px;color:#5a4d45;margin-top:24px;">— Ciel &amp; Stone</p>
    </div>
  `;
}

async function sendMailgunMessage(args: {
  mailgunBaseUrl: string;
  mailgunDomain: string;
  mailgunKey: string;
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  priority?: boolean;
}) {
  const form = new FormData();
  form.append("from", args.from);
  form.append("to", args.to.join(","));
  form.append("subject", args.subject);
  form.append("text", args.text);
  form.append("html", args.html);
  if (args.replyTo) form.append("h:Reply-To", args.replyTo);
  if (args.priority) {
    form.append("h:X-Priority", "1");
    form.append("h:Importance", "High");
    form.append("o:tag", "tier-a");
  }

  return fetch(`${args.mailgunBaseUrl}/v3/${args.mailgunDomain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${args.mailgunKey}`).toString("base64")}`,
    },
    body: form,
  });
}

function tierLabel(tier: Tier | undefined): string {
  if (tier === "A") return "Priority fit — studio response within 24 hours";
  if (tier === "B") return "Strong fit — Feasibility Read recommended";
  return "Early-stage fit — discovery / Feasibility Read";
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as FeasibilityPayload | null;

  const name = (body?.name ?? "").trim();
  const email = (body?.email ?? "").trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Please provide your name and email." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const tier: Tier = body?.tier === "A" || body?.tier === "B" || body?.tier === "C" ? body.tier : "C";
  const label = tierLabel(tier);

  const mailgunKey = process.env.MAILGUN_API_KEY?.trim();
  const mailgunDomain = process.env.MAILGUN_DOMAIN?.trim();
  const mailgunBaseUrl = (process.env.MAILGUN_BASE_URL || "https://api.mailgun.net").replace(/\/$/, "");
  const from = process.env.MAILGUN_FROM || `Ciel & Stone <postmaster@${mailgunDomain || "mg.cielandstone.com"}>`;
  const leadEmail = process.env.MAILGUN_LEAD_EMAIL?.trim() || DEFAULT_LEAD_EMAIL;

  const payload = { ...body, name, email, tierLabel: label };

  if (!mailgunKey || !mailgunDomain) {
    console.log("[feasibility:queued]", { to: STUDIO_EMAIL, tier, ...payload });
    return NextResponse.json({ ok: true, queued: true, tier });
  }

  const text = [
    `New Feasibility Read intake`,
    `Tier: ${tier} — ${label}`,
    `Score: ${body?.score ?? "—"}`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${body?.phone || "—"}`,
    `Referral: ${body?.referral || "—"}`,
    ``,
    `Role: ${body?.role || "—"}`,
    `Scope: ${body?.scope || "—"}`,
    `Region: ${body?.region || "—"}`,
    `Investment: ${body?.investment || "—"}`,
    `Timeline: ${body?.timeline || "—"}`,
    `Readiness: ${body?.readiness || "—"}`,
    ``,
    `Property: ${body?.propertyAddress || "—"}`,
    `Notes: ${body?.propertyNotes || "—"}`,
  ].join("\n");

  const tag = tier === "A" ? "tier-a" : tier === "B" ? "tier-b" : "tier-c";

  const [leadResponse, confirmationResponse] = await Promise.all([
    sendMailgunMessage({
      mailgunBaseUrl,
      mailgunDomain,
      mailgunKey,
      from,
      to: [STUDIO_EMAIL, leadEmail],
      subject:
        tier === "A"
          ? `[Priority · Tier A] ${name} — ${body?.scope ?? "Project"} in ${body?.region ?? "region"}`
          : `[Tier ${tier}] ${name} — ${body?.scope ?? "Project"}${body?.region ? ` · ${body.region}` : ""}`,
      html: buildStudioHtml({ ...payload, tierLabel: label }),
      text,
      replyTo: email,
      priority: tier === "A",
    }),
    sendMailgunMessage({
      mailgunBaseUrl,
      mailgunDomain,
      mailgunKey,
      from,
      to: [email],
      subject: "Your Ciel & Stone Feasibility Read is in our inbox",
      html: buildLeadConfirmationHtml({ ...payload, tierLabel: label }),
      text: [
        `Thanks, ${name}.`,
        ``,
        `We received your Feasibility Read intake.`,
        `Status: ${label}.`,
        ``,
        `Expect a follow-up from info@cielandstone.com within 24 hours for priority-fit projects, 1–2 business days otherwise.`,
        ``,
        `— Ciel & Stone`,
      ].join("\n"),
    }),
  ]);

  if (!leadResponse.ok || !confirmationResponse.ok) {
    const leadError = await leadResponse.text().catch(() => "");
    const confirmError = await confirmationResponse.text().catch(() => "");
    console.error("[feasibility:mailgun-error]", { leadError, confirmError });
    return NextResponse.json(
      {
        error:
          "We could not deliver the Feasibility Read email right now. Your intake was captured; please try again or email info@cielandstone.com.",
      },
      { status: 502 },
    );
  }

  console.log("[feasibility:delivered]", {
    to: [STUDIO_EMAIL, leadEmail],
    tier,
    tag,
    name,
    email,
    region: body?.region,
    scope: body?.scope,
  });

  return NextResponse.json({ ok: true, delivered: true, tier });
}
