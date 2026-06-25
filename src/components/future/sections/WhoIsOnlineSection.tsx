"use client";

import { onlineCharacters } from "@/lib/data";
import { GlassPanel } from "../GlassPanel";
import { FutureSkeleton, FutureEmpty } from "../FutureSkeleton";
import { useMockFetch } from "@/lib/motion/useMockFetch";

export function WhoIsOnlineSection() {
  const { data, loading, isEmpty } = useMockFetch(onlineCharacters, 450);

  return (
    <GlassPanel title={`Quem está Online (${loading ? "…" : data.length})`}>
      {loading && <FutureSkeleton rows={5} />}
      {isEmpty && <FutureEmpty message="Nenhum jogador online agora." />}
      {!loading && !isEmpty && (
        <ul className="flex flex-col gap-2">
          {data.map((c) => (
            <li key={c.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm">
              <span className="flex items-center gap-2 text-white">
                <span
                  className={`h-2 w-2 rounded-full ${c.status === "online" ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-amber-400"}`}
                />
                {c.name}
                <span className="text-violet-300/60">· {c.vocation}</span>
              </span>
              <span className="font-semibold text-violet-200">{c.level}</span>
            </li>
          ))}
        </ul>
      )}
    </GlassPanel>
  );
}
