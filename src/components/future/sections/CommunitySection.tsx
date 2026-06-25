"use client";

import { communityLinks } from "@/lib/data";
import { GlassPanel } from "../GlassPanel";
import { FutureSkeleton, FutureEmpty } from "../FutureSkeleton";
import { useMockFetch } from "@/lib/motion/useMockFetch";

export function CommunitySection() {
  const { data, loading, isEmpty } = useMockFetch(communityLinks, 400);

  return (
    <GlassPanel title="Comunidade Viva">
      {loading && <FutureSkeleton rows={2} />}
      {isEmpty && <FutureEmpty message="Nenhum canal disponível." />}
      {!loading && !isEmpty && (
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5 transition-transform hover:-translate-y-1 hover:border-violet-400/40"
            >
              <span className="font-semibold text-white">{link.label}</span>
              <span className="flex items-center gap-2 text-sm text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                {link.members}
              </span>
            </a>
          ))}
        </div>
      )}
    </GlassPanel>
  );
}
