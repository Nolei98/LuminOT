import { gameName } from "@/lib/data";

const NAV = [
  { label: "Notícias", href: "#news" },
  { label: "Downloads", href: "#downloads" },
  { label: "Rankings", href: "#highscores" },
  { label: "Guilds", href: "#guilds" },
  { label: "Loja", href: "#shop" },
  { label: "Regras", href: "#rules" },
];

export function FutureHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05030f]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <span className="font-semibold text-white">{gameName}</span>
        <nav className="hidden gap-5 text-sm text-violet-200/80 md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#downloads" className="rounded-full bg-violet-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-violet-400">
          Jogar
        </a>
      </div>
    </header>
  );
}
