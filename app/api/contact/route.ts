import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { name?: string; email?: string; phone?: string; message?: string }
    | null;

  const name = (body?.name ?? "").trim();
  const email = (body?.email ?? "").trim();
  const phone = (body?.phone ?? "").trim();
  const message = (body?.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please provide name, email, and message." }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  console.log("[contact]", { name, email, phone, message });

  return NextResponse.json({ ok: true });
}
