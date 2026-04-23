/**
 * Shared lead capture utilities. Handles:
 * - Mailgun delivery when env vars are configured.
 * - Generic webhook forwarding (LEAD_WEBHOOK_URL) — Slack, Zapier, n8n, etc.
 * - Persistent fallback to disk (/tmp/leads.jsonl) when neither is configured.
 * - UTM + referrer capture.
 *
 * Goal: never silently lose a lead. If Mailgun is down or unconfigured,
 * the webhook or disk fallback still catches it. The response tells the
 * client which delivery channels succeeded.
 */

import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export type LeadSource = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landingPath?: string;
  service?: string;
  location?: string;
};

export type LeadRecord = {
  type: "contact" | "feasibility";
  timestamp: string;
  source: LeadSource;
  data: Record<string, unknown>;
};

export type DeliveryResult = {
  mailgunOk: boolean;
  webhookOk: boolean;
  diskOk: boolean;
  anyOk: boolean;
  errors: string[];
};

export function escapeHtml(value: string) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function extractSourceFromPayload(payload: Record<string, unknown>): LeadSource {
  const s = (payload.source ?? {}) as Record<string, unknown>;
  return {
    utmSource: typeof s.utmSource === "string" ? s.utmSource : undefined,
    utmMedium: typeof s.utmMedium === "string" ? s.utmMedium : undefined,
    utmCampaign: typeof s.utmCampaign === "string" ? s.utmCampaign : undefined,
    utmTerm: typeof s.utmTerm === "string" ? s.utmTerm : undefined,
    utmContent: typeof s.utmContent === "string" ? s.utmContent : undefined,
    gclid: typeof s.gclid === "string" ? s.gclid : undefined,
    fbclid: typeof s.fbclid === "string" ? s.fbclid : undefined,
    referrer: typeof s.referrer === "string" ? s.referrer : undefined,
    landingPath: typeof s.landingPath === "string" ? s.landingPath : undefined,
    service: typeof s.service === "string" ? s.service : undefined,
    location: typeof s.location === "string" ? s.location : undefined,
  };
}

function formatSourceText(source: LeadSource): string {
  const lines: string[] = [];
  if (source.service) lines.push(`Service: ${source.service}`);
  if (source.location) lines.push(`Location: ${source.location}`);
  if (source.landingPath) lines.push(`Landing: ${source.landingPath}`);
  if (source.utmSource) lines.push(`UTM Source: ${source.utmSource}`);
  if (source.utmMedium) lines.push(`UTM Medium: ${source.utmMedium}`);
  if (source.utmCampaign) lines.push(`UTM Campaign: ${source.utmCampaign}`);
  if (source.utmTerm) lines.push(`UTM Term: ${source.utmTerm}`);
  if (source.utmContent) lines.push(`UTM Content: ${source.utmContent}`);
  if (source.gclid) lines.push(`Google Click ID: ${source.gclid}`);
  if (source.fbclid) lines.push(`Meta Click ID: ${source.fbclid}`);
  if (source.referrer) lines.push(`Referrer: ${source.referrer}`);
  return lines.join("\n");
}

function formatSourceHtml(source: LeadSource): string {
  const rows: string[] = [];
  const push = (k: string, v?: string) => {
    if (v) rows.push(`<tr><td style="padding:4px 12px 4px 0;color:#5a4d45;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;">${escapeHtml(k)}</td><td style="padding:4px 0;color:#201814;font-size:14px;">${escapeHtml(v)}</td></tr>`);
  };
  push("Service", source.service);
  push("Location", source.location);
  push("Landing Page", source.landingPath);
  push("UTM Source", source.utmSource);
  push("UTM Medium", source.utmMedium);
  push("UTM Campaign", source.utmCampaign);
  push("UTM Term", source.utmTerm);
  push("UTM Content", source.utmContent);
  push("Google Click ID", source.gclid);
  push("Meta Click ID", source.fbclid);
  push("Referrer", source.referrer);

  if (rows.length === 0) return "";
  return `<div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;"><div style="font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#5a4d45;margin-bottom:8px;">Lead source</div><table style="border-collapse:collapse;width:100%;">${rows.join("")}</table></div>`;
}

async function sendMailgun(args: {
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
  tag?: string;
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
  }
  if (args.tag) form.append("o:tag", args.tag);

  return fetch(`${args.mailgunBaseUrl}/v3/${args.mailgunDomain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${args.mailgunKey}`).toString("base64")}`,
    },
    body: form,
  });
}

async function sendWebhook(url: string, record: LeadRecord): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(record),
    });
    return res.ok;
  } catch (err) {
    console.error("[lead:webhook-error]", err);
    return false;
  }
}

async function writeToDisk(record: LeadRecord): Promise<boolean> {
  // In serverless (Vercel), only /tmp is writable and ephemeral per instance.
  // This is a last-resort capture for local dev and small-scale self-hosting.
  // For production reliability, configure Mailgun or a webhook.
  try {
    const dir = process.env.LEAD_FALLBACK_DIR || "/tmp";
    const file = path.join(dir, "leads.jsonl");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(file, JSON.stringify(record) + "\n", "utf-8");
    return true;
  } catch (err) {
    console.error("[lead:disk-error]", err);
    return false;
  }
}

export type DeliverArgs = {
  type: "contact" | "feasibility";
  subject: string;
  studioHtml: string;
  studioText: string;
  confirmationHtml: string;
  confirmationText: string;
  to: string[];
  confirmationTo: string[];
  replyTo?: string;
  priority?: boolean;
  tag?: string;
  record: LeadRecord;
};

export async function deliverLead(args: DeliverArgs): Promise<DeliveryResult> {
  const errors: string[] = [];
  let mailgunOk = false;
  let webhookOk = false;
  let diskOk = false;

  const mailgunKey = process.env.MAILGUN_API_KEY?.trim();
  const mailgunDomain = process.env.MAILGUN_DOMAIN?.trim();
  const mailgunBaseUrl = (process.env.MAILGUN_BASE_URL || "https://api.mailgun.net").replace(/\/$/, "");
  const from = process.env.MAILGUN_FROM || `Ciel & Stone <postmaster@${mailgunDomain || "mg.cielandstone.com"}>`;

  // 1. Try Mailgun (primary).
  if (mailgunKey && mailgunDomain) {
    try {
      const [studioRes, confirmRes] = await Promise.all([
        sendMailgun({
          mailgunBaseUrl,
          mailgunDomain,
          mailgunKey,
          from,
          to: args.to,
          subject: args.subject,
          html: args.studioHtml,
          text: args.studioText,
          replyTo: args.replyTo,
          priority: args.priority,
          tag: args.tag,
        }),
        sendMailgun({
          mailgunBaseUrl,
          mailgunDomain,
          mailgunKey,
          from,
          to: args.confirmationTo,
          subject: args.type === "feasibility"
            ? "Your Ciel & Stone Feasibility Read is in our inbox"
            : "We received your Ciel & Stone project brief",
          html: args.confirmationHtml,
          text: args.confirmationText,
        }),
      ]);
      mailgunOk = studioRes.ok && confirmRes.ok;
      if (!mailgunOk) {
        const a = await studioRes.text().catch(() => "");
        const b = await confirmRes.text().catch(() => "");
        errors.push(`Mailgun: studio=${studioRes.status} ${a}; confirm=${confirmRes.status} ${b}`);
      }
    } catch (err) {
      errors.push(`Mailgun exception: ${err instanceof Error ? err.message : String(err)}`);
    }
  } else {
    errors.push("Mailgun not configured (MAILGUN_API_KEY or MAILGUN_DOMAIN missing)");
  }

  // 2. Webhook (redundant safety net). Always attempted if configured.
  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    webhookOk = await sendWebhook(webhookUrl, args.record);
    if (!webhookOk) errors.push("Webhook delivery failed");
  }

  // 3. Disk fallback only if nothing else succeeded.
  if (!mailgunOk && !webhookOk) {
    diskOk = await writeToDisk(args.record);
    if (!diskOk) errors.push("Disk fallback failed");
  }

  // Always log — Vercel captures these for at least a short window.
  console.log(`[lead:${args.type}]`, {
    mailgunOk,
    webhookOk,
    diskOk,
    subject: args.subject,
    source: args.record.source,
    dataKeys: Object.keys(args.record.data),
  });

  return {
    mailgunOk,
    webhookOk,
    diskOk,
    anyOk: mailgunOk || webhookOk || diskOk,
    errors,
  };
}

/**
 * Build a standard error response for lead endpoints.
 */
export function leadErrorResponse(errors: string[], status = 502) {
  return NextResponse.json(
    {
      error:
        "We couldn't deliver your inquiry through our primary channel. It has been captured on our server. Please try again or email info@cielandstone.com.",
      errors,
    },
    { status },
  );
}

export { formatSourceHtml, formatSourceText };
