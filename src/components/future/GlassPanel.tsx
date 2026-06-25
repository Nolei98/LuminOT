export function GlassPanel({
  id,
  title,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35),0_0_50px_rgba(124,58,237,0.1)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
      <h2 className="relative mb-4 text-xl font-semibold text-violet-100">{title}</h2>
      <div className="relative">{children}</div>
    </section>
  );
}
