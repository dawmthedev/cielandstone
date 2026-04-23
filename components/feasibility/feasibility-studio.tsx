"use client";

import React, { useMemo, useState } from "react";

import { trackFormSubmit } from "@/lib/analytics";
import { useLeadSource, withSource } from "@/lib/use-lead-source";

type Role = "homeowner" | "architect" | "designer" | "developer" | "other";
type Scope =
  | "whole-home"
  | "addition-adu"
  | "kitchen-bath"
  | "outdoor-living"
  | "new-build"
  | "wellness-suite"
  | "feasibility-only";
type Region =
  | "pacific-palisades"
  | "beverly-hills"
  | "malibu"
  | "brentwood"
  | "santa-monica"
  | "hancock-park"
  | "manhattan-beach"
  | "other-la"
  | "orange-county"
  | "pnw"
  | "outside-region";
type Investment =
  | "under-250k"
  | "250-500k"
  | "500k-1m"
  | "1m-2m"
  | "2m-5m"
  | "5m-plus"
  | "not-sure";
type Timeline = "discovery" | "3-6mo" | "6-12mo" | "12mo-plus" | "immediate";
type Readiness = "just-exploring" | "planning-phase" | "drawings-ready" | "permitted" | "builder-selection";

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

type FormState = {
  role: Role | "";
  scope: Scope | "";
  region: Region | "";
  investment: Investment | "";
  timeline: Timeline | "";
  readiness: Readiness | "";
  propertyAddress: string;
  propertyNotes: string;
  name: string;
  email: string;
  phone: string;
  referral: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type FeasibilityRead = {
  tier: "A" | "B" | "C";
  tierLabel: string;
  tierSummary: string;
  scopeBrackets: { phase: string; range: string; note: string }[];
  preconDuration: string;
  buildDuration: string;
  riskNotes: string[];
  recommendation: string;
  nextStep: {
    title: string;
    price: string;
    detail: string;
  };
};

const ROLES: { value: Role; label: string; hint: string }[] = [
  { value: "homeowner", label: "Homeowner", hint: "Planning work on a home you own or are buying" },
  { value: "architect", label: "Architect", hint: "Engaging a builder for a client project" },
  { value: "designer", label: "Interior Designer", hint: "Bringing a build partner onto your project" },
  { value: "developer", label: "Developer", hint: "High-end spec or boutique residential" },
  { value: "other", label: "Something else", hint: "Tell us the context in a moment" },
];

const SCOPES: { value: Scope; label: string; hint: string }[] = [
  { value: "whole-home", label: "Whole-home renovation", hint: "Reworking most of an existing residence" },
  { value: "addition-adu", label: "Addition / ADU", hint: "Square footage, guest house, or secondary unit" },
  { value: "kitchen-bath", label: "Kitchen & bath", hint: "Focused, high-detail renovation" },
  { value: "outdoor-living", label: "Outdoor living", hint: "Outdoor kitchen, pool, landscape architecture" },
  { value: "new-build", label: "New home", hint: "Ground-up custom residence" },
  { value: "wellness-suite", label: "Wellness suite", hint: "Spa, gym, primary suite reimagined" },
  { value: "feasibility-only", label: "Feasibility study", hint: "Pre-design clarity before committing" },
];

const REGIONS: { value: Region; label: string; premium: number }[] = [
  { value: "pacific-palisades", label: "Pacific Palisades", premium: 3 },
  { value: "beverly-hills", label: "Beverly Hills", premium: 3 },
  { value: "malibu", label: "Malibu", premium: 3 },
  { value: "brentwood", label: "Brentwood", premium: 3 },
  { value: "santa-monica", label: "Santa Monica", premium: 2 },
  { value: "hancock-park", label: "Hancock Park", premium: 2 },
  { value: "manhattan-beach", label: "Manhattan Beach", premium: 2 },
  { value: "other-la", label: "Greater Los Angeles", premium: 1 },
  { value: "orange-county", label: "Orange County", premium: 1 },
  { value: "pnw", label: "Pacific Northwest", premium: 1 },
  { value: "outside-region", label: "Outside our regions", premium: 0 },
];

const INVESTMENTS: { value: Investment; label: string; weight: number }[] = [
  { value: "under-250k", label: "Under $250k", weight: 0 },
  { value: "250-500k", label: "$250k – $500k", weight: 1 },
  { value: "500k-1m", label: "$500k – $1M", weight: 2 },
  { value: "1m-2m", label: "$1M – $2M", weight: 3 },
  { value: "2m-5m", label: "$2M – $5M", weight: 4 },
  { value: "5m-plus", label: "$5M+", weight: 5 },
  { value: "not-sure", label: "Still forming", weight: 1 },
];

const TIMELINES: { value: Timeline; label: string; weight: number }[] = [
  { value: "immediate", label: "Ready to start", weight: 3 },
  { value: "3-6mo", label: "Within 3–6 months", weight: 3 },
  { value: "6-12mo", label: "Within 6–12 months", weight: 2 },
  { value: "12mo-plus", label: "12+ months out", weight: 1 },
  { value: "discovery", label: "Still in discovery", weight: 1 },
];

const READINESS: { value: Readiness; label: string; weight: number }[] = [
  { value: "builder-selection", label: "Selecting a builder now", weight: 3 },
  { value: "permitted", label: "Permits in hand", weight: 3 },
  { value: "drawings-ready", label: "Drawings underway", weight: 2 },
  { value: "planning-phase", label: "Planning / pre-design", weight: 1 },
  { value: "just-exploring", label: "Just exploring", weight: 0 },
];

const INITIAL: FormState = {
  role: "",
  scope: "",
  region: "",
  investment: "",
  timeline: "",
  readiness: "",
  propertyAddress: "",
  propertyNotes: "",
  name: "",
  email: "",
  phone: "",
  referral: "",
};

function computeScore(state: FormState) {
  const region = REGIONS.find((r) => r.value === state.region);
  const investment = INVESTMENTS.find((i) => i.value === state.investment);
  const timeline = TIMELINES.find((t) => t.value === state.timeline);
  const readiness = READINESS.find((r) => r.value === state.readiness);

  const roleWeight: Record<Role, number> = {
    architect: 2,
    designer: 2,
    developer: 1,
    homeowner: 1,
    other: 0,
  };

  let score = 0;
  score += (region?.premium ?? 0) * 1.2;
  score += (investment?.weight ?? 0) * 1.1;
  score += (timeline?.weight ?? 0);
  score += (readiness?.weight ?? 0);
  score += state.role ? roleWeight[state.role] : 0;
  return score;
}

function buildRead(state: FormState): FeasibilityRead {
  const score = computeScore(state);
  const tier: FeasibilityRead["tier"] = score >= 12 ? "A" : score >= 7 ? "B" : "C";

  const scopeMap: Record<Scope, { design: string; precon: string; build: string }> = {
    "whole-home": { design: "$45k – $95k", precon: "$18k – $35k", build: "$1.2M – $4.5M+" },
    "addition-adu": { design: "$22k – $48k", precon: "$12k – $22k", build: "$450k – $1.1M" },
    "kitchen-bath": { design: "$15k – $32k", precon: "$8k – $14k", build: "$180k – $650k" },
    "outdoor-living": { design: "$18k – $36k", precon: "$10k – $18k", build: "$250k – $900k" },
    "new-build": { design: "$85k – $180k", precon: "$32k – $60k", build: "$2.8M – $9M+" },
    "wellness-suite": { design: "$24k – $42k", precon: "$12k – $22k", build: "$350k – $1.1M" },
    "feasibility-only": { design: "—", precon: "$9,500 flat", build: "Deferred to post-study" },
  };

  const scopeBrackets = state.scope
    ? [
        { phase: "Design development", range: scopeMap[state.scope].design, note: "Concept through construction docs with our in-house studio." },
        { phase: "Preconstruction", range: scopeMap[state.scope].precon, note: "Site verification, estimating, constructability review." },
        { phase: "Construction", range: scopeMap[state.scope].build, note: "Fully managed build; final number set after precon closes." },
      ]
    : [];

  const preconDuration =
    state.scope === "new-build"
      ? "10–16 weeks"
      : state.scope === "whole-home"
      ? "8–12 weeks"
      : state.scope === "feasibility-only"
      ? "3–4 weeks"
      : "6–10 weeks";

  const buildDuration =
    state.scope === "new-build"
      ? "14–22 months"
      : state.scope === "whole-home"
      ? "9–14 months"
      : state.scope === "kitchen-bath"
      ? "12–18 weeks on site"
      : state.scope === "outdoor-living"
      ? "14–22 weeks on site"
      : state.scope === "wellness-suite"
      ? "18–28 weeks on site"
      : state.scope === "feasibility-only"
      ? "Defined after study"
      : "7–11 months";

  const riskNotes: string[] = [];
  if (state.region === "pacific-palisades" || state.region === "malibu") {
    riskNotes.push("Coastal zone + VHFHSZ ignition codes add 6–10 weeks to permitting and material cost.");
  }
  if (state.region === "beverly-hills" || state.region === "hancock-park") {
    riskNotes.push("HPOZ / design review likely; design and permit strategy must assume 3–5 month entitlement.");
  }
  if (state.scope === "new-build" || state.scope === "addition-adu") {
    riskNotes.push("Structural + Title 24 energy review typically set the critical path, not interior selections.");
  }
  if (state.readiness === "just-exploring" || state.readiness === "planning-phase") {
    riskNotes.push("Without construction-ready drawings, any bid you collect today is a placeholder, not a price.");
  }
  if (state.investment === "not-sure" || state.investment === "under-250k") {
    riskNotes.push("Investment framing should be set before design begins — otherwise scope always outruns budget.");
  }
  if (riskNotes.length === 0) {
    riskNotes.push("No structural risk signals in your intake. Next exposure is almost certainly selections drift — we'll set guardrails for that in precon.");
  }

  const tierLabel =
    tier === "A"
      ? "Priority fit"
      : tier === "B"
      ? "Strong fit"
      : "Early-stage fit";

  const tierSummary =
    tier === "A"
      ? "Your project signals aligned investment, real timing, and a scope we build well. We protect a limited number of priority slots per quarter; you should expect a direct response from the studio within 24 hours."
      : tier === "B"
      ? "Your project fits the work we do. The variables worth locking in next are scope clarity and sequencing — a paid Feasibility Read is the fastest way to turn this from intent into a buildable plan."
      : "Your intake tells us you're still in discovery. That's a useful place to be — most expensive mistakes in high-end residential happen before anyone pours concrete. A Feasibility Read is the right first step so design doesn't outrun budget.";

  const recommendation =
    tier === "A"
      ? "Move directly to a studio conversation. We'll frame scope, investment bracket, and the first 30 days of work in one session."
      : tier === "B"
      ? "Start with a paid Feasibility Read. You'll leave with a real scope bracket, a preconstruction plan, and a decision framework — before design spend accelerates."
      : "Use the Feasibility Read as a disciplined first step. If the numbers or timing don't hold up, you've protected yourself from committing to the wrong scope.";

  const nextStep =
    tier === "A"
      ? {
          title: "Studio conversation",
          price: "Complimentary for priority-fit projects",
          detail: "45 minutes with the principal, project lead, and our estimator. We'll confirm fit, framework, and the next 30 days of work.",
        }
      : {
          title: "Feasibility Read",
          price: "$9,500 flat — credited against preconstruction if we engage",
          detail: "A 3–4 week study: site walk, scope bracket, investment range, critical-path calendar, and a written read on what we would and wouldn't take on.",
        };

  return {
    tier,
    tierLabel,
    tierSummary,
    scopeBrackets,
    preconDuration,
    buildDuration,
    riskNotes,
    recommendation,
    nextStep,
  };
}

const STEP_LABELS = [
  "Your role",
  "Scope",
  "Location",
  "Investment",
  "Timing",
  "Readiness",
  "Property",
  "Contact",
] as const;

export function FeasibilityStudio() {
  const [step, setStep] = useState<Step>(0);
  const [state, setState] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [read, setRead] = useState<FeasibilityRead | null>(null);
  const source = useLeadSource();

  const totalSteps = STEP_LABELS.length;
  const pct = Math.round(((step + 1) / totalSteps) * 100);

  const preview = useMemo(() => buildRead(state), [state]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 0:
        return !!state.role;
      case 1:
        return !!state.scope;
      case 2:
        return !!state.region;
      case 3:
        return !!state.investment;
      case 4:
        return !!state.timeline;
      case 5:
        return !!state.readiness;
      case 6:
        return state.propertyAddress.trim().length > 2;
      case 7:
        return (
          state.name.trim().length > 1 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())
        );
      default:
        return false;
    }
  }

  function next() {
    if (!canAdvance()) return;
    if (step < totalSteps - 1) setStep((s) => (s + 1) as Step);
  }
  function back() {
    if (step > 0) setStep((s) => (s - 1) as Step);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canAdvance()) return;
    setStatus("submitting");
    setError(null);

    const generated = buildRead(state);

    try {
      const payload = withSource(
        {
          ...state,
          score: computeScore(state),
          tier: generated.tier,
        },
        source,
        { service: state.scope || undefined, location: state.region || undefined },
      );
      const res = await fetch("/api/feasibility", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => null)) as { error?: string; ok?: boolean } | null;
      if (!res.ok) throw new Error(body?.error || "Submission failed.");
      trackFormSubmit({
        form: "feasibility",
        tier: generated.tier,
        service: state.scope,
        location: state.region,
        email: state.email,
      });
      setRead(generated);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success" && read) {
    return <FeasibilityOutput read={read} state={state} onReset={() => {
      setState(INITIAL);
      setStep(0);
      setStatus("idle");
      setRead(null);
    }} />;
  }

  return (
    <div className="rounded-[30px] border border-black/10 bg-[var(--panel)] p-5 shadow-[0_24px_80px_rgba(43,27,17,0.08)] backdrop-blur dark:border-white/10 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">
          Feasibility Read · Step {step + 1} of {totalSteps}
        </div>
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/50">{STEP_LABELS[step]}</div>
      </div>

      <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-black/8 dark:bg-white/10">
        <div
          className="h-full bg-[var(--accent-strong)] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-8">
        {step === 0 && (
          <StepCards
            title="Who's bringing us in?"
            body="We work differently for homeowners, architects, and designers. Tell us where you're coming from."
            value={state.role}
            options={ROLES}
            onSelect={(v) => update("role", v)}
          />
        )}
        {step === 1 && (
          <StepCards
            title="What's the work?"
            body="Pick the closest fit. We'll refine together in discovery."
            value={state.scope}
            options={SCOPES}
            onSelect={(v) => update("scope", v)}
          />
        )}
        {step === 2 && (
          <StepCards
            title="Where is the property?"
            body="Jurisdiction shapes cost, timeline, and what we commit to on day one."
            value={state.region}
            options={REGIONS}
            onSelect={(v) => update("region", v)}
          />
        )}
        {step === 3 && (
          <StepCards
            title="What investment framing are you working with?"
            body="Not a commitment — a range so our read is useful, not generic."
            value={state.investment}
            options={INVESTMENTS}
            onSelect={(v) => update("investment", v)}
          />
        )}
        {step === 4 && (
          <StepCards
            title="When would you want to be on site?"
            body="Rough is fine. It tells us what sequence to shape the work in."
            value={state.timeline}
            options={TIMELINES}
            onSelect={(v) => update("timeline", v)}
          />
        )}
        {step === 5 && (
          <StepCards
            title="Where is the project today?"
            body="Your readiness determines whether any number you collect is a price or a guess."
            value={state.readiness}
            options={READINESS}
            onSelect={(v) => update("readiness", v)}
          />
        )}
        {step === 6 && (
          <StepText
            title="The property"
            body="Address or neighborhood and anything about the site that shapes the work — grade, views, setbacks, HOA, coastal, historic."
            addressValue={state.propertyAddress}
            notesValue={state.propertyNotes}
            onAddress={(v) => update("propertyAddress", v)}
            onNotes={(v) => update("propertyNotes", v)}
          />
        )}
        {step === 7 && (
          <StepContact
            state={state}
            update={update}
            preview={preview}
          />
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={back}
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/12 px-6 text-sm font-medium text-foreground/85 dark:border-white/12"
              >
                Back
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {status === "error" ? <div className="text-sm text-red-500/90">{error}</div> : null}
            {step < totalSteps - 1 ? (
              <button
                type="button"
                onClick={next}
                disabled={!canAdvance()}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent-strong)] px-6 text-sm font-medium text-[var(--accent-contrast)] disabled:opacity-40"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canAdvance() || status === "submitting"}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent-strong)] px-6 text-sm font-medium text-[var(--accent-contrast)] disabled:opacity-40"
              >
                {status === "submitting" ? "Preparing your read…" : "Generate Feasibility Read"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

type StepCardsProps<T extends string> = {
  title: string;
  body: string;
  value: T | "";
  options: { value: T; label: string; hint?: string }[];
  onSelect: (v: T) => void;
};

function StepCards<T extends string>({ title, body, value, options, onSelect }: StepCardsProps<T>) {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-balance text-2xl leading-[1.08] tracking-[-0.03em] sm:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-foreground/65 sm:text-base">{body}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={[
                "rounded-[22px] border p-5 text-left",
                active
                  ? "border-[var(--accent-strong)] bg-[var(--accent-strong)]/8 shadow-[0_14px_48px_rgba(143,75,36,0.18)]"
                  : "border-black/10 bg-background/55 hover:border-black/25 dark:border-white/10 dark:hover:border-white/25",
              ].join(" ")}
            >
              <div className="text-base leading-5 tracking-[-0.01em]">{opt.label}</div>
              {opt.hint ? (
                <div className="mt-2 text-xs leading-5 text-foreground/58">{opt.hint}</div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepText({
  title,
  body,
  addressValue,
  notesValue,
  onAddress,
  onNotes,
}: {
  title: string;
  body: string;
  addressValue: string;
  notesValue: string;
  onAddress: (v: string) => void;
  onNotes: (v: string) => void;
}) {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-balance text-2xl leading-[1.08] tracking-[-0.03em] sm:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-foreground/65 sm:text-base">{body}</p>
      </div>
      <label className="grid gap-2">
        <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Address or neighborhood</span>
        <input
          value={addressValue}
          onChange={(e) => onAddress(e.target.value)}
          placeholder="e.g. 15 Mariposa Ave, Pacific Palisades"
          className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">What shapes this property</span>
        <textarea
          value={notesValue}
          onChange={(e) => onNotes(e.target.value)}
          rows={5}
          placeholder="Views, grade, ocean proximity, HOA or HPOZ, existing plans, soils, anything we should know on day one."
          className="resize-none rounded-xl border border-black/10 bg-background px-4 py-3 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
        />
      </label>
    </div>
  );
}

function StepContact({
  state,
  update,
  preview,
}: {
  state: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  preview: FeasibilityRead;
}) {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-balance text-2xl leading-[1.08] tracking-[-0.03em] sm:text-3xl">
          Where should your Feasibility Read go?
        </h2>
        <p className="mt-3 text-sm leading-6 text-foreground/65 sm:text-base">
          Your read is generated on submit. A written version is emailed to you. Your intake routes directly to the
          principal.
        </p>
      </div>

      <div className="rounded-[20px] border border-black/10 bg-background/55 p-4 text-sm leading-6 text-foreground/75 dark:border-white/10 dark:bg-white/5">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">Preview · based on your intake</div>
        <div className="mt-2 text-foreground/85">
          <span className="font-medium">{preview.tierLabel}</span> — {preview.tierSummary}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Name</span>
          <input
            value={state.name}
            onChange={(e) => update("name", e.target.value)}
            required
            className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Email</span>
          <input
            value={state.email}
            onChange={(e) => update("email", e.target.value)}
            type="email"
            required
            className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Phone</span>
          <input
            value={state.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">Referred by</span>
          <input
            value={state.referral}
            onChange={(e) => update("referral", e.target.value)}
            placeholder="Optional — architect, designer, client"
            className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
          />
        </label>
      </div>
    </div>
  );
}

function FeasibilityOutput({
  read,
  state,
  onReset,
}: {
  read: FeasibilityRead;
  state: FormState;
  onReset: () => void;
}) {
  const scopeLabel = SCOPES.find((s) => s.value === state.scope)?.label ?? "Project";
  const regionLabel = REGIONS.find((r) => r.value === state.region)?.label ?? "";

  return (
    <div className="rounded-[30px] border border-black/10 bg-[var(--panel)] p-5 shadow-[0_24px_80px_rgba(43,27,17,0.08)] backdrop-blur dark:border-white/10 sm:p-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">
          Feasibility Read · Prepared for {state.name || "you"}
        </div>
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">
          Tier {read.tier} · {read.tierLabel}
        </div>
      </div>

      <h1 className="mt-6 text-balance text-3xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
        {scopeLabel}
        {regionLabel ? <span className="text-foreground/60"> · {regionLabel}</span> : null}
      </h1>

      <p className="mt-5 max-w-3xl text-pretty text-sm leading-6 text-foreground/70 sm:text-base sm:leading-7">
        {read.tierSummary}
      </p>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {read.scopeBrackets.map((b) => (
          <article
            key={b.phase}
            className="rounded-[24px] border border-black/10 bg-background/55 p-5 dark:border-white/10 dark:bg-white/5"
          >
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">{b.phase}</div>
            <div className="mt-3 text-xl leading-[1.1] tracking-[-0.02em] sm:text-2xl">{b.range}</div>
            <div className="mt-3 text-xs leading-5 text-foreground/60">{b.note}</div>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-[24px] border border-black/10 bg-background/55 p-5 dark:border-white/10 dark:bg-white/5">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">Preconstruction</div>
          <div className="mt-3 text-lg tracking-[-0.02em]">{read.preconDuration}</div>
          <p className="mt-3 text-xs leading-5 text-foreground/60">
            Where we lock the expensive decisions before the money moves.
          </p>
        </article>
        <article className="rounded-[24px] border border-black/10 bg-background/55 p-5 dark:border-white/10 dark:bg-white/5">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">Construction window</div>
          <div className="mt-3 text-lg tracking-[-0.02em]">{read.buildDuration}</div>
          <p className="mt-3 text-xs leading-5 text-foreground/60">
            Working estimate. Refined to a calendar after precon closes.
          </p>
        </article>
      </section>

      <section className="mt-10">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">Risk read</div>
        <ul className="mt-4 grid gap-3">
          {read.riskNotes.map((n, i) => (
            <li
              key={i}
              className="rounded-[18px] border border-black/8 bg-background/55 p-4 text-sm leading-6 text-foreground/75 dark:border-white/10 dark:bg-white/5"
            >
              {n}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-[28px] border border-black/10 bg-[#1a1512] p-6 text-white sm:p-8">
        <div className="text-xs tracking-[0.22em] uppercase text-white/58">Our recommendation</div>
        <p className="mt-4 max-w-3xl text-lg leading-7 text-white/85 sm:text-xl sm:leading-8">
          {read.recommendation}
        </p>

        <div className="mt-8 rounded-[22px] border border-white/12 bg-white/6 p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div className="text-xl leading-[1.1] tracking-[-0.02em] sm:text-2xl">{read.nextStep.title}</div>
            <div className="text-xs tracking-[0.22em] uppercase text-white/70">{read.nextStep.price}</div>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/75">{read.nextStep.detail}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:info@cielandstone.com?subject=${encodeURIComponent(`Feasibility Read follow-up — ${state.name}`)}`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black"
            >
              Confirm with the studio
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-medium text-white/90"
            >
              Print / save as PDF
            </button>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-medium text-white/70"
            >
              Start over
            </button>
          </div>
        </div>
      </section>

      <p className="mt-8 text-xs leading-5 text-foreground/55">
        This read is a framing, not a bid. Final numbers set after preconstruction closes. A written copy has been
        routed to the studio; expect a reply from info@cielandstone.com.
      </p>
    </div>
  );
}
