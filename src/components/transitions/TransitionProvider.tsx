"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { TransitionContext, type TransitionTarget } from "./transitionContext";
import { BlackHoleCanvas } from "./BlackHoleCanvas";
import { useMuted } from "@/lib/audio/useMuted";
import { playBlackHoleSound } from "@/lib/audio/transitionSounds";
import { duckAmbientMusic } from "@/lib/audio/useAmbientMusic";
import { MuteToggle } from "@/components/portal/MuteToggle";

const CLASSIC_SITE_URL = process.env.NEXT_PUBLIC_CLASSIC_SITE_URL ?? "https://luminot.com.br/";
const FUTURE_ROUTE = "/novo";

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { muted } = useMuted();
  const [phase, setPhase] = useState<"idle" | "past" | "future">("idle");
  const navigateFnRef = useRef<(() => void) | null>(null);

  const startTransition = useCallback(
    (target: TransitionTarget) => {
      if (phase !== "idle") return;

      const navigate = () => {
        if (target === "past") {
          window.location.href = CLASSIC_SITE_URL;
        } else {
          router.push(FUTURE_ROUTE);
        }
      };

      if (target === "future") router.prefetch(FUTURE_ROUTE);

      if (!muted) {
        playBlackHoleSound(target);
        duckAmbientMusic(1.8);
      }

      navigateFnRef.current = navigate;
      setPhase(target);
    },
    [phase, router, muted]
  );

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}
      <MuteToggle />

      {/* Black hole transition — mounts on click, unmounts after navigation */}
      {phase !== "idle" && (
        <BlackHoleCanvas
          target={phase}
          onNavigate={() => navigateFnRef.current?.()}
          onComplete={() => setPhase("idle")}
        />
      )}
    </TransitionContext.Provider>
  );
}
