import React from "react";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
      <div className="h-8 w-40 animate-pulse rounded bg-foreground/10" />
      <div className="mt-6 h-14 w-[min(720px,90%)] animate-pulse rounded bg-foreground/10" />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="aspect-[16/10] animate-pulse rounded-2xl bg-foreground/10" />
        <div className="aspect-[16/10] animate-pulse rounded-2xl bg-foreground/10" />
      </div>
    </main>
  );
}
