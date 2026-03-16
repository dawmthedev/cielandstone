import Image from "next/image";
import React from "react";

export function MediaRail({ media }: { media: string[] }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="flex items-end justify-between gap-8">
        <div>
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Media</div>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Renders, drawings, references
          </h2>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {media.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="relative overflow-hidden rounded-2xl border border-black/10 bg-muted dark:border-white/10"
          >
            <div className="relative aspect-[16/10]">
              <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
