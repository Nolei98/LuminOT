"use client";

import { highscores } from "@/lib/data";
import { GlassPanel } from "../GlassPanel";
import { FutureSkeleton, FutureEmpty } from "../FutureSkeleton";
import { useMockFetch } from "@/lib/motion/useMockFetch";

export function HighscoresSection() {
  const { data, loading, isEmpty } = useMockFetch(highscores, 600);

  return (
    <GlassPanel id="highscores" title="Highscores">
      {loading && <FutureSkeleton rows={5} />}
      {isEmpty && <FutureEmpty message="Sem dados de highscores." />}
      {!loading && !isEmpty && (
        <ol className="flex flex-col gap-2">
          {data.map((h) => (
            <li key={h.rank} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm">
              <span className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/20 text-xs font-bold text-violet-200">{h.rank}</span>
                <span className="text-white">{h.name}</span>
                <span className="text-violet-300/60">{h.vocation}</span>
              </span>
              <span className="font-semibold text-violet-200">{h.level}</span>
            </li>
          ))}
        </ol>
      )}
    </GlassPanel>
  );
}
