"use client";

import React, { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [deliveryState, setDeliveryState] = useState<"delivered" | "queued" | null>(null);

  const disabled = status === "submitting";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus("submitting");
    setDeliveryState(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      location: String(formData.get("location") ?? ""),
      projectType: String(formData.get("projectType") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = (await res.json().catch(() => null)) as { error?: string; ok?: boolean; delivered?: boolean; queued?: boolean } | null;
      if (!res.ok) {
        throw new Error(body?.error || "Failed to submit.");
      }

      form.reset();
      setDeliveryState(body?.delivered ? "delivered" : body?.queued ? "queued" : null);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="rounded-[30px] border border-black/10 bg-[var(--panel)] p-5 shadow-[0_24px_80px_rgba(43,27,17,0.08)] backdrop-blur dark:border-white/10 sm:p-8">
      <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Project Brief</div>
      <div className="relative mt-4 min-h-[540px] overflow-hidden rounded-[28px] border border-black/8 bg-background/55 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5 sm:min-h-[640px] sm:p-6">
        <div
          className={[
            "grid gap-8 transition-all duration-500 ease-out",
            status === "success" ? "-translate-y-2 opacity-0 pointer-events-none absolute inset-5 sm:inset-6" : "opacity-100",
          ].join(" ")}
        >
          <div>
            <div className="text-sm leading-6 text-foreground/65">
              The more context you share, the more useful our first response can be. All submissions route to
              info@cielandstone.com.
            </div>
          </div>

          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Name</span>
                <input
                  name="name"
                  required
                  disabled={disabled}
                  className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  disabled={disabled}
                  className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Phone</span>
                <input
                  name="phone"
                  disabled={disabled}
                  className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Project Location</span>
                <input
                  name="location"
                  required
                  disabled={disabled}
                  className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <label className="grid gap-2">
                <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Project Type</span>
                <select
                  name="projectType"
                  required
                  disabled={disabled}
                  className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="Renovation">Renovation</option>
                  <option value="Addition">Addition</option>
                  <option value="New Home">New Home</option>
                  <option value="Feasibility / Planning">Feasibility / Planning</option>
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Budget Range</span>
                <input
                  name="budget"
                  placeholder="Optional"
                  disabled={disabled}
                  className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Timeline</span>
                <input
                  name="timeline"
                  placeholder="Optional"
                  disabled={disabled}
                  className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5"
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Project Notes</span>
              <textarea
                name="message"
                required
                disabled={disabled}
                rows={7}
                className="resize-none rounded-xl border border-black/10 bg-background px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-white/10 dark:bg-white/5"
                placeholder="Tell us what you are hoping to build, improve, or understand."
              />
            </label>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={disabled}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent-strong)] px-6 text-sm font-medium text-[var(--accent-contrast)] transition-opacity hover:opacity-92 disabled:opacity-60 sm:self-start"
              >
                {status === "submitting" ? "Sending..." : "Start your project"}
              </button>

              {status === "error" ? (
                <div className="text-sm text-red-500/90">{error}</div>
              ) : (
                <div className="text-sm text-foreground/55 sm:text-right">Prefer direct email? info@cielandstone.com</div>
              )}
            </div>
          </form>
        </div>

        <div
          className={[
            "absolute inset-5 flex items-center justify-center transition-all duration-500 ease-out sm:inset-6",
            status === "success" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
          ].join(" ")}
        >
          <div className="w-full max-w-xl rounded-[28px] border border-black/10 bg-[var(--panel)] p-6 text-center shadow-[0_24px_80px_rgba(43,27,17,0.08)] backdrop-blur dark:border-white/10 sm:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-strong)]/15 text-[var(--accent-strong)]">
              ✓
            </div>
            <h3 className="mt-6 text-balance text-3xl leading-[1.05] tracking-[-0.03em]">
              {deliveryState === "delivered" ? "Request sent." : "Request captured."}
            </h3>
            <p className="mt-4 text-sm leading-6 text-foreground/65">
              {deliveryState === "delivered"
                ? "Your request was delivered to info@cielandstone.com and lead@cielandstone.com. You should also receive a confirmation email shortly."
                : "We captured your request. Once Mailgun is configured in Vercel, this will be delivered to info@cielandstone.com and lead@cielandstone.com with a confirmation to the submitter."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="mailto:info@cielandstone.com"
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
              >
                Email Studio
              </a>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/12 px-6 text-sm font-medium text-foreground/85 dark:border-white/12"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
