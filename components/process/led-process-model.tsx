"use client";

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils/cn";
import { easeOutExpo } from "@/lib/utils/motion";

type Step = {
  key: string;
  title: string;
  summary: string;
  details: string[];
};

export function LedProcessModel({ steps }: { steps: Step[] }) {
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);

  const beamStops = useMemo(() => {
    return [
      "from-cyan-300/35 via-sky-400/35 to-violet-400/35",
      "from-emerald-300/35 via-cyan-400/35 to-sky-400/35",
      "from-violet-300/35 via-fuchsia-400/35 to-rose-400/35",
    ];
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
      <header className="max-w-3xl">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Process</div>
        <h1 className="mt-4 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl">
          A clear path from discovery to build.
        </h1>
        <p className="mt-6 text-pretty text-base leading-7 text-foreground/65 sm:text-lg">
          We move deliberately: discover the brief, plan the work, refine the design, and carry the project forward
          with a calm, transparent cadence.
        </p>
      </header>

      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-muted p-6 dark:border-white/10 dark:bg-black">
            <div className="absolute inset-0 opacity-90">
              <div className="absolute -left-40 top-10 h-72 w-[42rem] rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="absolute -right-40 bottom-10 h-72 w-[42rem] rounded-full bg-violet-400/10 blur-3xl" />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="text-xs tracking-[0.22em] uppercase text-foreground/60 dark:text-white/60">
                  Client Journey
                </div>
                <div className="text-xs tracking-[0.22em] uppercase text-foreground/50 dark:text-white/50">
                  {active + 1}/{steps.length}
                </div>
              </div>

              <div className="mt-6">
                <div className="relative h-24 overflow-hidden rounded-2xl border border-black/10 bg-background/60 backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <motion.div
                    key={active}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: easeOutExpo }}
                    className="absolute inset-0"
                  >
                    <div
                      className={cn(
                        "absolute left-4 top-1/2 h-[2px] w-[calc(100%-2rem)] -translate-y-1/2 rounded-full bg-gradient-to-r",
                        beamStops[active % beamStops.length],
                      )}
                    />
                    <motion.div
                      animate={reduce ? undefined : { x: ["-12%", "112%"] }}
                      transition={
                        reduce
                          ? undefined
                          : {
                              duration: 2.6,
                              repeat: Infinity,
                              ease: "linear",
                            }
                      }
                      className="absolute left-0 top-1/2 h-10 w-24 -translate-y-1/2 rounded-full bg-white/10 blur-xl"
                    />
                  </motion.div>

                  <div className="absolute inset-0 flex items-center justify-between px-6">
                    {steps.map((s, idx) => {
                      const isActive = idx === active;
                      const isDone = idx < active;
                      return (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => setActive(idx)}
                          className={cn(
                            "relative grid place-items-center rounded-full border text-[11px] tracking-[0.22em] uppercase transition-colors",
                            isActive
                              ? "h-10 w-10 border-white/20 bg-white/10 text-white"
                              : "h-8 w-8 border-white/10 bg-white/0 text-white/60 hover:text-white/85",
                            isDone && !isActive ? "text-white/75" : "",
                          )}
                          aria-label={s.title}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-black/10 bg-background/70 p-7 backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <motion.div
                    key={steps[active]?.key}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: easeOutExpo }}
                  >
                    <div className="text-xs tracking-[0.22em] uppercase text-foreground/60 dark:text-white/60">
                      {steps[active]?.title}
                    </div>
                    <div className="mt-4 text-balance text-2xl font-medium tracking-[-0.03em] text-foreground dark:text-white">
                      {steps[active]?.summary}
                    </div>
                    <ul className="mt-6 grid gap-3 text-sm leading-6 text-foreground/70 dark:text-white/70">
                      {steps[active]?.details.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-3xl border border-black/10 bg-background p-8 dark:border-white/10 dark:bg-black">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">What you can expect</div>
            <div className="mt-6 grid gap-6">
              {[
                { t: "Discovery", b: "We begin with the property, the goals, and the realities that shape the brief." },
                {
                  t: "Planning",
                  b: "Cost, scope, and sequence are clarified before decisions begin to compound.",
                },
                {
                  t: "Build",
                  b: "The project moves forward with clearer documentation and fewer avoidable surprises.",
                },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border border-black/10 bg-muted p-6 dark:border-white/10 dark:bg-white/5">
                  <div className="text-sm font-medium tracking-[-0.02em] text-foreground dark:text-white">{x.t}</div>
                  <div className="mt-3 text-sm leading-6 text-foreground/65 dark:text-white/65">{x.b}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
