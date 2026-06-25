"use client";

import { news } from "@/lib/data";
import { GlassPanel } from "../GlassPanel";
import { ScrollReveal } from "../ScrollReveal";
import { FutureSkeleton, FutureEmpty } from "../FutureSkeleton";
import { useMockFetch } from "@/lib/motion/useMockFetch";

export function NewsSection() {
  const { data, loading, isEmpty } = useMockFetch(news, 500);

  return (
    <GlassPanel id="news" title="Últimas Notícias">
      {loading && <FutureSkeleton rows={4} />}
      {isEmpty && <FutureEmpty message="Nenhuma notícia publicada ainda." />}
      {!loading && !isEmpty && (
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.08}>
              <article className="h-full rounded-xl border border-white/10 bg-white/5 p-4 transition-transform hover:-translate-y-1 hover:border-violet-400/40">
                <div className="mb-2 flex items-center gap-2 text-xs text-violet-300/70">
                  <span className="rounded-full bg-violet-500/20 px-2 py-0.5 font-medium uppercase">{item.category}</span>
                  <time dateTime={item.date}>{new Date(item.date).toLocaleDateString("pt-BR")}</time>
                </div>
                <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-violet-100/70">{item.excerpt}</p>
                <a href={item.href} className="mt-2 inline-block text-sm font-medium text-violet-300 hover:text-violet-200">
                  Ler mais →
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>
      )}
    </GlassPanel>
  );
}
