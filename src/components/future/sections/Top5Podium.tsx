"use client";

import { top5Boards } from "@/lib/data";
import { GlassPanel } from "../GlassPanel";
import { ScrollReveal } from "../ScrollReveal";
import { FutureSkeleton } from "../FutureSkeleton";
import { useMockFetch } from "@/lib/motion/useMockFetch";

export function Top5Podium() {
  const { data, loading } = useMockFetch(top5Boards, 650);

  return (
    <GlassPanel title="Top 5 — Killers, Ranked & Survival">
      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <FutureSkeleton key={i} rows={5} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {data.map((board, i) => (
            <ScrollReveal key={board.id} delay={i * 0.1}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-300">{board.title}</h3>
                <ol className="flex flex-col gap-1.5 text-sm">
                  {board.entries.map((entry) => (
                    <li key={entry.rank} className="flex items-center justify-between">
                      <span className={entry.rank === 1 ? "font-bold text-amber-300" : "text-white/90"}>
                        {entry.rank}. {entry.name}
                      </span>
                      <span className="text-violet-300/70">
                        {entry.value} {entry.unit}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </GlassPanel>
  );
}
