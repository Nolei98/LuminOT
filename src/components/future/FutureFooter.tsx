import { gameName } from "@/lib/data";

export function FutureFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#05030f] py-6 text-center text-xs text-violet-300/50">
      <p>
        © {new Date().getFullYear()} {gameName}. Servidor independente — não afiliado à CipSoft GmbH.
      </p>
    </footer>
  );
}
