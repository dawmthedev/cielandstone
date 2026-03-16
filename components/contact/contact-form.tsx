"use client";

import React, { useMemo, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const disabled = useMemo(() => status === "submitting", [status]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error || "Failed to submit.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="rounded-2xl border border-black/10 bg-muted p-8 dark:border-white/10 dark:bg-black">
      <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Inquiry</div>
      <div className="mt-4 text-balance text-2xl font-medium tracking-[-0.03em]">Start with a few essentials.</div>
      <p className="mt-4 text-sm leading-6 text-foreground/65">
        Share as much or as little as you have. We’ll reply with clarity and next steps.
      </p>

      <form onSubmit={onSubmit} className="mt-10 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Name</span>
            <input
              name="name"
              required
              disabled={disabled}
              className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none ring-0 focus:border-black/20 dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Phone</span>
            <input
              name="phone"
              disabled={disabled}
              className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none ring-0 focus:border-black/20 dark:border-white/10 dark:bg-white/5"
            />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Email</span>
          <input
            name="email"
            type="email"
            required
            disabled={disabled}
            className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none ring-0 focus:border-black/20 dark:border-white/10 dark:bg-white/5"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Message</span>
          <textarea
            name="message"
            required
            disabled={disabled}
            rows={5}
            className="resize-none rounded-xl border border-black/10 bg-background px-4 py-3 text-sm outline-none ring-0 focus:border-black/20 dark:border-white/10 dark:bg-white/5"
          />
        </label>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={disabled}
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : status === "success" ? "Sent" : "Submit"}
          </button>

          {status === "success" ? (
            <div className="text-sm text-foreground/65">Received. We’ll respond soon.</div>
          ) : status === "error" ? (
            <div className="text-sm text-red-500/90">{error}</div>
          ) : (
            <div className="text-sm text-foreground/55">No spam. No pressure.</div>
          )}
        </div>
      </form>
    </div>
  );
}
