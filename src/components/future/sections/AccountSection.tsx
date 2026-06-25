import { GlassPanel } from "../GlassPanel";

export function AccountSection() {
  return (
    <GlassPanel id="account" title="Entrar na Aventura">
      <form className="mx-auto flex max-w-sm flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm text-violet-100/80">
          Conta
          <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-violet-400" type="text" name="account" autoComplete="username" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-violet-100/80">
          Senha
          <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-violet-400" type="password" name="password" autoComplete="current-password" />
        </label>
        <button type="submit" className="mt-1 rounded-full bg-violet-500 px-4 py-2 font-semibold text-white hover:bg-violet-400">
          Entrar
        </button>
        <div className="flex justify-between text-xs text-violet-300/80">
          <a href="#" className="hover:text-white">Criar Conta</a>
          <a href="#" className="hover:text-white">Esqueci minha conta</a>
        </div>
      </form>
    </GlassPanel>
  );
}
