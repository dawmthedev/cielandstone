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
  source?: Record<string, unknown>;
};

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 4;
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

function buildStudioHtml(data: FeasibilityPayload & { tierLabel: string; sourceHtml: string }) {
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
      ${data.sourceHtml}
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

function tierLabel(tier: Tier | undefined): string {
  if (tier === "A") return "Priority fit — studio response within 24 hours";
  if (tier === "B") return "Strong fit — Feasibility Read recommended";
  return "Early-stage fit — discovery / Feasibility Read";
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  const body = (await req.json().catch(() => null)) as FeasibilityPayload | null;

  const name = (body?.name ?? "").trim();
  const email = (body?.email ?? "").trim();

  if (!name || !email) {
    return NextResponse.json({ error: "Please provide your name and email." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const tier: Tier = body?.tier === "A" || body?.tier === "B" || body?.tier === "C" ? body.tier : "C";
  const label = tierLabel(tier);

  const source = extractSourceFromPayload((body ?? {}) as Record<string, unknown>);
  const sourceHtml = formatSourceHtml(source);
  const sourceText = formatSourceText(source);

  const leadEmail = process.env.MAILGUN_LEAD_EMAIL?.trim() || DEFAULT_LEAD_EMAIL;

  const payload = { ...body, name, email, tierLabel: label, sourceHtml };

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
    ``,
    sourceText ? "— Lead Source —" : "",
    sourceText,
  ].filter(Boolean).join("\n");

  const tag = tier === "A" ? "tier-a" : tier === "B" ? "tier-b" : "tier-c";

  const subject =
    tier === "A"
      ? `[Priority · Tier A] ${name} — ${body?.scope ?? "Project"} in ${body?.region ?? "region"}`
      : `[Tier ${tier}] ${name} — ${body?.scope ?? "Project"}${body?.region ? ` · ${body.region}` : ""}`;

  const record: LeadRecord = {
    type: "feasibility",
    timestamp: new Date().toISOString(),
    source,
    data: {
      ...body,
      name,
      email,
      tier,
      tierLabel: label,
    },
  };

  const result = await deliverLead({
    type: "feasibility",
    subject,
    studioHtml: buildStudioHtml(payload),
    studioText: text,
    confirmationHtml: buildLeadConfirmationHtml(payload),
    confirmationText: [
      `Thanks, ${name}.`,
      ``,
      `We received your Feasibility Read intake.`,
      `Status: ${label}.`,
      ``,
      `Expect a follow-up from info@cielandstone.com within 24 hours for priority-fit projects, 1–2 business days otherwise.`,
      ``,
      `— Ciel & Stone`,
    ].join("\n"),
    to: [STUDIO_EMAIL, leadEmail],
    confirmationTo: [email],
    replyTo: email,
    priority: tier === "A",
    tag,
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
    tier,
  });
}
