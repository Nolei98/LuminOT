import { shopPackages } from "@/lib/data";
import { GlassPanel } from "../GlassPanel";
import { ScrollReveal } from "../ScrollReveal";

export function ShopSection() {
  return (
    <GlassPanel id="shop" title="Loja Premium">
      <div className="grid gap-4 md:grid-cols-3">
        {shopPackages.map((pkg, i) => (
          <ScrollReveal key={pkg.id} delay={i * 0.1}>
            <div
              className={`flex h-full flex-col items-center gap-2 rounded-xl border p-6 text-center transition-transform hover:-translate-y-2 ${
                pkg.highlight ? "border-violet-400/60 bg-violet-500/15 shadow-[0_0_40px_rgba(167,139,250,0.3)]" : "border-white/10 bg-white/5"
              }`}
            >
              {pkg.highlight && <span className="rounded-full bg-violet-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">Mais popular</span>}
              <span className="text-lg font-semibold text-white">{pkg.name}</span>
              <span className="text-3xl font-bold text-violet-200">{pkg.coins}</span>
              <span className="text-xs text-violet-300/60">coins</span>
              <span className="mt-1 text-sm text-violet-100/80">R$ {pkg.priceBRL.toFixed(2)}</span>
              <button className="mt-2 w-full rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-400">
                Comprar
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </GlassPanel>
  );
}
