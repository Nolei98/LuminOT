import { ruleSections } from "@/lib/data";
import { GlassPanel } from "../GlassPanel";

export function RulesSection() {
  return (
    <GlassPanel id="rules" title="Regras do Servidor">
      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <nav className="hidden md:sticky md:top-24 md:block md:self-start">
          <p className="mb-2 text-xs uppercase tracking-wide text-violet-400/70">Índice</p>
          <ul className="flex flex-col gap-1.5 text-sm text-violet-200/80">
            {ruleSections.map((r) => (
              <li key={r.id}>
                <a href={`#${r.id}`} className="hover:text-white">
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-5">
          {ruleSections.map((r, i) => (
            <div key={r.id} id={r.id}>
              <h3 className="mb-1 font-semibold text-white">
                {i + 1}. {r.title}
              </h3>
              <p className="text-sm text-violet-100/70">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}
