"use client";

import Image from "next/image";
import { useMuted } from "@/lib/audio/useMuted";
import { useAmbientMusic } from "@/lib/audio/useAmbientMusic";

export function MuteToggle() {
  const { muted, toggleMuted } = useMuted();

  useAmbientMusic("/assets/whisper.mp3", muted);

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-pressed={!muted}
      aria-label={muted ? "Ativar som das transições" : "Silenciar som das transições"}
      className="fixed top-4 right-4 z-[110] opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <Image
        src={muted ? "/assets/audio-off.png" : "/assets/audio-on.png"}
        alt=""
        width={48}
        height={48}
        aria-hidden="true"
        className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
      />
    </button>
  );
}
