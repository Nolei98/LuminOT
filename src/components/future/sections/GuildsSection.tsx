"use client";

import { guilds } from "@/lib/data";
import { GlassPanel } from "../GlassPanel";
import { ScrollReveal } from "../ScrollReveal";
import { FutureSkeleton, FutureEmpty } from "../FutureSkeleton";
import { useMockFetch } from "@/lib/motion/useMockFetch";

export function GuildsSection() {
  const { data, loading, isEmpty } = useMockFetch(guilds, 500);

  return (
    <GlassPanel id="guilds" title="Galeria de Guilds">
      {loading && <FutureSkeleton rows={4} />}
      {isEmpty && <FutureEmpty message="Nenhuma guild fundada ainda." />}
      {!loading && !isEmpty && (
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((g, i) => (
            <ScrollReveal key={g.id} delay={i * 0.08}>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-transform hover:-translate-y-1">
                <span
                  className="h-10 w-10 shrink-0 rounded-lg shadow-[0_0_20px_rgba(167,139,250,0.4)]"
                  style={{ backgroundColor: g.crestColor }}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-white">{g.name}</p>
                  <p className="text-sm text-violet-300/70">
                    {g.members} membros · fundada em {new Date(g.founded).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </GlassPanel>
  );
}
