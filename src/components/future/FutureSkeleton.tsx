export function FutureSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-2" role="status" aria-label="Carregando">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-10 animate-pulse rounded-lg border border-white/5 bg-white/5"
          style={{ width: `${92 - i * 6}%` }}
        />
      ))}
    </div>
  );
}

export function FutureEmpty({ message = "Nada para exibir agora." }: { message?: string }) {
  return <p className="text-sm text-violet-300/50">{message}</p>;
}
