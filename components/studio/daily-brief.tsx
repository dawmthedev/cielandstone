"use client";

import React, { useMemo, useState } from "react";

type BriefInputs = {
  date: string;
  newLeads: string;
  pipelineValue: string;
  socialPosts: string;
  competitors: string;
  feedback: string;
  wins: string;
  obstacles: string;
};

const TODAY = new Date().toISOString().slice(0, 10);

const INITIAL: BriefInputs = {
  date: TODAY,
  newLeads: "",
  pipelineValue: "",
  socialPosts: "",
  competitors: "",
  feedback: "",
  wins: "",
  obstacles: "",
};

function cleanLines(input: string): string[] {
  return input
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function firstLine(s: string) {
  return s.split(/[\n.]/)[0]?.trim() ?? "";
}

function buildBrief(v: BriefInputs) {
  const comps = cleanLines(v.competitors);
  const posts = cleanLines(v.socialPosts);
  const feedback = v.feedback.trim();
  const wins = v.wins.trim();
  const obstacles = v.obstacles.trim();
  const leadCount = parseInt(v.newLeads || "0", 10);
  const pipeline = v.pipelineValue.trim();

  // 1. Brand integrity check
  const brandGap =
    feedback.toLowerCase().includes("photo") || feedback.toLowerCase().includes("image")
      ? "Photography quality — a $5M Palisades owner judges the grid before the copy. Book a half-day shoot on the next completed project and retire any phone-shot hero images."
      : feedback.toLowerCase().includes("price") || feedback.toLowerCase().includes("cost")
      ? "Proof of discipline — the site leads with restraint but doesn't show how that translates to a disciplined budget/schedule. Publish a 'preconstruction one-pager' case study."
      : posts.length === 0
      ? "Social presence — zero posts shipped yesterday signals the studio isn't operating. Instagram + Houzz grids are the first touchpoint for architects and designers."
      : leadCount === 0
      ? "Lead capture path — if no one converted, the bottleneck is either the proof layer (portfolio, endorsements) or the CTA itself. The hero should ask for a Feasibility Read, not a generic contact form."
      : "Architect/designer endorsements — the weakest brand asset is third-party signal. Ask three current design partners for one-sentence attributions this week.";

  // 2. Competitive scan
  const competitorInsight =
    comps.length === 0
      ? "You didn't name competitors today. This is a cheap daily habit: 3 IGs + 3 sites every morning, 10 minutes. Without it, you can't see which way the market is drifting."
      : `Scan ${comps.join(", ")}: look specifically for what they shipped in the last 7 days — a press feature, a new hire, a reveal carousel, a named architect collab. Where they are over-rotating on beachfront new-build, your opening is the neglected wellness-suite + ADU niche for existing high-end owners who don't want to move.`;

  // 3. Offer audit
  const offerFix =
    pipeline && pipeline.replace(/[^\d]/g, "").length >= 7
      ? "Your pipeline has mass — the leak is at the top, not the bottom. The Feasibility Read ($9.5k, credited to precon) is your highest-leverage offer: it converts tire-kickers into paying clients and filters out $500k-budget-but-$50k-mindset leads before they consume design hours."
      : "Pipeline is thin — productize an entry offer immediately. The Feasibility Read is live on /feasibility. It's the right instrument: paid, short, defensible, and pre-qualifies every call you take for the next 90 days.";

  // 4. Monetization leaks
  const leaks = [
    "Design fees not cleanly separated from build — any GC can bundle; a design-build studio prices the design work explicitly so clients feel the craftsmanship before construction.",
    "No published referral structure with architects/designers — 10–15% of precon fee, documented, is table stakes. Without it, designers route clients to whomever answers first.",
    "No post-handoff maintenance contract — a $3M home generates $8–15k/yr in quiet recurring revenue and keeps the client door open for renovation work in year 3–5.",
    "Change orders priced reactively — publish a change-order policy in the proposal (rate, turnaround, minimum fee). Prevents margin erosion and signals operational seriousness.",
  ];

  // 5. Social plan for today
  const socialPlan = (() => {
    if (posts.length === 0 || posts.join(" ").toLowerCase().includes("before") === false) {
      return {
        post: "Process detail carousel — a single construction detail (book-matched stone wall, flush drywall return at a window head, unlacquered brass reveal) shot at eye level with ambient light. 6 slides: tight detail → pulled back → the drawing that specified it → the sample selection → the install → the finished view. Saves from designers are the KPI, not likes.",
        caption:
          "The reveal is 3/8\". It's not where most people look. It's where everyone feels the difference. — A quiet moment from a current residence.",
        hook: "The reveal is 3/8\". It's not where most people look.",
      };
    }
    return {
      post: "Before/after quiet-luxury carousel — the work, not the mess. Frame the same compositional angle before and after; use natural light; no labels. First slide is the 'after' cropped to suggestion, not the payoff.",
      caption:
        "Fewer moves, each of them resolved. A measured renovation in [neighborhood], shot this week.",
      hook: "Fewer moves, each of them resolved.",
    };
  })();

  // 6. The one thing
  const oneThing = (() => {
    if (leadCount === 0 && comps.length > 0) {
      return {
        task: "Ship the /feasibility page link as a pinned IG story + DM to the last 5 warm architects you've met. 30 minutes.",
        metric: "Measurable outcome: ≥ 2 Feasibility Read intakes by end of day, or ≥ 1 studio DM reply with a real project.",
      };
    }
    if (feedback && feedback.length > 30) {
      return {
        task: `Convert the feedback ("${firstLine(feedback).slice(0, 60)}…") into a single published artifact — a 3-paragraph process note on the site, or a pinned IG post. 30 minutes.`,
        metric: "Measurable outcome: piece published + linked in the next 3 outbound replies.",
      };
    }
    if (wins.length > 0) {
      return {
        task: "Turn yesterday's win into proof — request a one-sentence attribution from the client/architect/designer involved and publish it on the home page trust strip. 30 minutes.",
        metric: "Measurable outcome: one new named endorsement shipped on cielandstone.com today.",
      };
    }
    if (obstacles.length > 0) {
      return {
        task: `Kill the obstacle ("${firstLine(obstacles).slice(0, 60)}…") in one move — write the email, make the ask, or remove the deliverable from this week. 30 minutes.`,
        metric: "Measurable outcome: obstacle resolved or formally deferred with a named owner and date.",
      };
    }
    return {
      task: "Send 3 warm-outreach DMs to architects you've worked near (not with). Each opens with one specific observation about their last project + an offer to credit them on a Feasibility Read for a mutual client. 30 minutes.",
      metric: "Measurable outcome: ≥ 1 reply that opens a real conversation.",
    };
  })();

  return {
    date: v.date,
    brandGap,
    competitorInsight,
    offerFix,
    leaks,
    socialPlan,
    oneThing,
  };
}

export function DailyBrief() {
  const [v, setV] = useState<BriefInputs>(INITIAL);
  const [generated, setGenerated] = useState<ReturnType<typeof buildBrief> | null>(null);

  function update<K extends keyof BriefInputs>(k: K, value: BriefInputs[K]) {
    setV((s) => ({ ...s, [k]: value }));
  }

  const canGenerate = useMemo(() => v.date.length > 0, [v.date]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="rounded-[28px] border border-black/10 bg-[var(--panel)] p-5 backdrop-blur dark:border-white/10 sm:p-7">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Yesterday&apos;s inputs</div>
        <h2 className="mt-4 text-balance text-2xl leading-[1.05] tracking-[-0.03em] sm:text-3xl">
          Feed the studio. Get one page back.
        </h2>
        <p className="mt-4 text-sm leading-6 text-foreground/65">
          Brutal honesty in, brutal honesty out. This runs the 6-part analysis every morning so the day starts with a
          single highest-leverage action.
        </p>

        <div className="mt-6 grid gap-4">
          <Field label="Date">
            <input
              type="date"
              value={v.date}
              onChange={(e) => update("date", e.target.value)}
              className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="New leads / consults booked">
              <input
                value={v.newLeads}
                onChange={(e) => update("newLeads", e.target.value)}
                placeholder="e.g. 2"
                inputMode="numeric"
                className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
              />
            </Field>
            <Field label="Active pipeline value">
              <input
                value={v.pipelineValue}
                onChange={(e) => update("pipelineValue", e.target.value)}
                placeholder="e.g. $4.2M"
                className="h-12 rounded-xl border border-black/10 bg-background px-4 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
              />
            </Field>
          </div>
          <Field label="Social shipped + engagement (one per line)">
            <textarea
              value={v.socialPosts}
              onChange={(e) => update("socialPosts", e.target.value)}
              rows={3}
              placeholder="IG carousel — kitchen reveal — 812 saves / 14 DMs"
              className="resize-none rounded-xl border border-black/10 bg-background px-4 py-3 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
            />
          </Field>
          <Field label="Top 3 SoCal competitors (names + handles)">
            <textarea
              value={v.competitors}
              onChange={(e) => update("competitors", e.target.value)}
              rows={3}
              placeholder="One per line or comma separated"
              className="resize-none rounded-xl border border-black/10 bg-background px-4 py-3 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
            />
          </Field>
          <Field label="One real piece of feedback (client / lost bid / DM)">
            <textarea
              value={v.feedback}
              onChange={(e) => update("feedback", e.target.value)}
              rows={3}
              placeholder="Paste it verbatim."
              className="resize-none rounded-xl border border-black/10 bg-background px-4 py-3 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Biggest win yesterday">
              <textarea
                value={v.wins}
                onChange={(e) => update("wins", e.target.value)}
                rows={2}
                placeholder="One line."
                className="resize-none rounded-xl border border-black/10 bg-background px-4 py-3 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
              />
            </Field>
            <Field label="Biggest obstacle">
              <textarea
                value={v.obstacles}
                onChange={(e) => update("obstacles", e.target.value)}
                rows={2}
                placeholder="One line."
                className="resize-none rounded-xl border border-black/10 bg-background px-4 py-3 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-white/5"
              />
            </Field>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => {
                setV(INITIAL);
                setGenerated(null);
              }}
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/12 px-6 text-sm font-medium text-foreground/85 dark:border-white/12"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setGenerated(buildBrief(v))}
              disabled={!canGenerate}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent-strong)] px-6 text-sm font-medium text-[var(--accent-contrast)] disabled:opacity-40"
            >
              Run the brief
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-black/10 bg-background/55 p-5 dark:border-white/10 dark:bg-white/5 sm:p-8">
        {!generated ? (
          <EmptyBrief />
        ) : (
          <BriefOutput brief={generated} />
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs tracking-[0.22em] uppercase text-foreground/60">{label}</span>
      {children}
    </label>
  );
}

function EmptyBrief() {
  return (
    <div className="grid h-full place-items-center py-24 text-center">
      <div className="max-w-sm">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">Brief · Pending</div>
        <h3 className="mt-4 text-balance text-xl leading-[1.1] tracking-[-0.02em]">
          Fill in yesterday&apos;s inputs. The one-page brief appears here — gap, competitor insight, offer fix, today&apos;s post, today&apos;s one action.
        </h3>
      </div>
    </div>
  );
}

function BriefOutput({ brief }: { brief: ReturnType<typeof buildBrief> }) {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">Daily brief · {brief.date}</div>
        <button
          type="button"
          onClick={() => window.print()}
          className="text-xs tracking-[0.2em] uppercase text-foreground/55 underline underline-offset-4 hover:text-foreground/80"
        >
          Print / save PDF
        </button>
      </div>

      <Section num="01" title="Brand integrity check">
        <p>{brief.brandGap}</p>
      </Section>

      <Section num="02" title="Competitive scan">
        <p>{brief.competitorInsight}</p>
      </Section>

      <Section num="03" title="Offer audit">
        <p>{brief.offerFix}</p>
      </Section>

      <Section num="04" title="Monetization leaks">
        <ul className="grid gap-2">
          {brief.leaks.map((l, i) => (
            <li key={i} className="text-sm leading-6 text-foreground/75">
              — {l}
            </li>
          ))}
        </ul>
      </Section>

      <Section num="05" title="Today&apos;s post">
        <div className="grid gap-3">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">Concept</div>
            <p className="mt-2">{brief.socialPlan.post}</p>
          </div>
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">First-frame hook</div>
            <p className="mt-2 italic">&ldquo;{brief.socialPlan.hook}&rdquo;</p>
          </div>
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">Caption</div>
            <p className="mt-2">{brief.socialPlan.caption}</p>
          </div>
        </div>
      </Section>

      <Section num="06" title="The one thing" accent>
        <p className="text-base leading-7">{brief.oneThing.task}</p>
        <p className="mt-3 text-sm leading-6 text-foreground/70">{brief.oneThing.metric}</p>
      </Section>
    </div>
  );
}

function Section({
  num,
  title,
  accent,
  children,
}: {
  num: string;
  title: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <article
      className={[
        "rounded-[22px] border p-5",
        accent
          ? "border-[var(--accent-strong)]/30 bg-[var(--accent-strong)]/8"
          : "border-black/10 bg-[var(--panel)] dark:border-white/10",
      ].join(" ")}
    >
      <div className="flex items-baseline gap-3">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/50">{num}</div>
        <div className="text-sm tracking-[-0.01em]">{title}</div>
      </div>
      <div className="mt-3 text-sm leading-6 text-foreground/80">{children}</div>
    </article>
  );
}
