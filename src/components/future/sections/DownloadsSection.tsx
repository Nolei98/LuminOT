"use client";

import { downloads } from "@/lib/data";
import { GlassPanel } from "../GlassPanel";
import { ScrollReveal } from "../ScrollReveal";
import { useDetectedOS } from "@/lib/motion/useDetectedOS";

export function DownloadsSection() {
  const detectedOS = useDetectedOS();

  return (
    <GlassPanel id="downloads" title="Baixe o Cliente">
      {detectedOS && (
        <p className="mb-4 text-sm text-violet-300/70">
          Detectamos seu sistema: <strong className="text-violet-200">{detectedOS}</strong>
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-3">
        {downloads.map((d, i) => {
          const isMatch = detectedOS ? d.os === detectedOS : d.recommended;
          return (
            <ScrollReveal key={d.id} delay={i * 0.1}>
              <a
                href={d.href}
                className={`flex h-full flex-col items-center gap-2 rounded-xl border p-5 text-center transition-transform hover:-translate-y-1 ${
                  isMatch
                    ? "border-violet-400/60 bg-violet-500/10 shadow-[0_0_30px_rgba(167,139,250,0.25)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {isMatch && (
                  <span className="rounded-full bg-violet-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                    Recomendado
                  </span>
                )}
                <span className="text-lg font-semibold text-white">{d.os}</span>
                <span className="text-sm text-violet-200/70">{d.sizeMb} MB</span>
              </a>
            </ScrollReveal>
          );
        })}
      </div>
    </GlassPanel>
  );
}
