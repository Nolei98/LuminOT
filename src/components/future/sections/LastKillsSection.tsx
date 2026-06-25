"use client";

import { lastKills } from "@/lib/data";
import { GlassPanel } from "../GlassPanel";
import { FutureSkeleton, FutureEmpty } from "../FutureSkeleton";
import { useMockFetch } from "@/lib/motion/useMockFetch";

export function LastKillsSection() {
  const { data, loading, isEmpty } = useMockFetch(lastKills, 550);

  return (
    <GlassPanel title="Last Kills — Feed em Tempo Real">
      {loading && <FutureSkeleton rows={5} />}
      {isEmpty && <FutureEmpty message="Nenhuma morte registrada recentemente." />}
      {!loading && !isEmpty && (
        <ul className="flex flex-col gap-2">
          {data.map((k) => (
            <li key={k.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm">
              <span className="text-white/90">
                <span className="font-semibold">{k.killer}</span> derrotou{" "}
                <span className="font-semibold">{k.victim}</span>{" "}
                <span className="text-violet-300/60">(lvl {k.level})</span>
              </span>
              <span className="text-violet-300/50">{k.timeAgo}</span>
            </li>
          ))}
        </ul>
      )}
    </GlassPanel>
  );
}
