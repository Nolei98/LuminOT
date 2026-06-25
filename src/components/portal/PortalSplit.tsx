"use client";

import { useState } from "react";
import { useTransitionNavigate } from "@/components/transitions/transitionContext";
import { MistScene, FogLayer } from "./MistScene";
import type { TransitionTarget } from "@/components/transitions/transitionContext";

type Side = TransitionTarget | null;

const SIDES: Array<{
  target: TransitionTarget;
  title: string;
  subcopy: string;
  cta: string;
  ariaLabel: string;
  portal: string;
  glow: string;
  glowColor: string;
  textColor: string;
  subColor: string;
  ring: string;
  anchor: "left" | "right";
}> = [
  {
    target: "past",
    title: "O Passado",
    subcopy: "O servidor que você conhece",
    cta: "← Entrar no Passado",
    ariaLabel: "Entrar no Passado — o servidor que você conhece",
    portal: "/assets/portals/portal_bom_shadow.gif",
    glow: "rgba(210, 225, 255, 0.75)",
    glowColor: "rgba(200, 220, 255, 0.75)",
    textColor: "text-slate-100",
    subColor: "text-slate-200/80",
    ring: "focus-visible:ring-slate-300/60",
    anchor: "left",
  },
  {
    target: "future",
    title: "O Futuro",
    subcopy: "A nova era",
    cta: "Entrar no Futuro →",
    ariaLabel: "Entrar no Futuro — a nova era",
    portal: "/assets/portals/portal_mal_shadow.gif",
    glow: "rgba(90, 60, 210, 0.75)",
    glowColor: "rgba(80, 55, 200, 0.75)",
    textColor: "text-indigo-100",
    subColor: "text-indigo-200/80",
    ring: "focus-visible:ring-indigo-400/60",
    anchor: "right",
  },
];

export function PortalSplit() {
  const startTransition = useTransitionNavigate();
  const [hovered, setHovered] = useState<Side>(null);

  return (
    <main className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-black">
      {/* Cena base: bg, névoa de fundo, monolito */}
      <div className="absolute inset-0">
        <MistScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/40" />

      {/* Glows ambientes — z:5, atrás dos portais */}
      {SIDES.map((side) => {
        const isActive = hovered === side.target;
        const anchorLeft = side.anchor === "left" ? "33%" : "67%";
        return (
          <span
            key={`glow-${side.target}`}
            aria-hidden="true"
            className="motion-ambient pointer-events-none absolute z-[5] h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:h-[230px] sm:w-[230px] md:h-[300px] md:w-[300px] lg:h-[380px] lg:w-[380px] xl:h-[440px] xl:w-[440px] 2xl:h-[480px] 2xl:w-[480px]"
            style={{
              top: "48.5%",
              left: anchorLeft,
              background: `radial-gradient(circle, ${side.glow} 0%, transparent 68%)`,
              animationName: "ambient-pool-pulse",
              animationDuration: "4s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              opacity: isActive ? 1 : 0.65,
            }}
          />
        );
      })}

      {/* Portais + texto — z:10, clicáveis */}
      {SIDES.map((side) => {
        const isActive = hovered === side.target;
        const anchorLeft = side.anchor === "left" ? "33%" : "67%";
        const floatDuration = side.anchor === "left" ? "7s" : "7.5s";

        return (
          <button
            key={side.target}
            type="button"
            onClick={() => startTransition(side.target)}
            onMouseEnter={() => setHovered(side.target)}
            onMouseLeave={() => setHovered((s) => (s === side.target ? null : s))}
            onFocus={() => setHovered(side.target)}
            onBlur={() => setHovered((s) => (s === side.target ? null : s))}
            aria-label={side.ariaLabel}
            className={`group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center outline-none focus-visible:ring-4 ${side.ring}`}
            style={{ top: "48.5%", left: anchorLeft }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              disablePictureInPicture
              className="pointer-events-none w-[18vw] transition-[transform,filter] duration-300 group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
              style={{
                animation: `luminot-portal-float ${floatDuration} ease-in-out infinite, glow-pulse-portal 4s ease-in-out infinite`,
                ["--glow-color" as string]: side.glowColor,
              }}
            >
              <source src={side.portal.replace(".gif", ".webm")} type="video/webm" />
              <source src={side.portal.replace(".gif", ".mp4")} type="video/mp4" />
            </video>

            <div className="mt-2 flex flex-col items-center gap-0.5 px-2 text-center sm:mt-3 sm:gap-1 sm:px-3">
              <span className={`font-serif text-sm tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-xl md:text-2xl ${side.textColor}`}>
                {side.title}
              </span>
              <span
                className={`hidden text-xs drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] transition-opacity duration-300 sm:block md:text-sm ${side.subColor}`}
                style={{ opacity: isActive ? 1 : 0.65 }}
              >
                {side.subcopy}
              </span>
              <span
                className={`hidden text-sm drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] transition-opacity duration-300 sm:block ${side.textColor}`}
                style={{ opacity: isActive ? 1 : 0 }}
              >
                {side.cta}
              </span>
            </div>
          </button>
        );
      })}

      {/* Névoa de chão — z:20, sobre os portais, sem bloquear cliques */}
      <div className="luminot-scene pointer-events-none absolute inset-0 z-20" style={{ background: "transparent" }}>
        <FogLayer className="luminot-fog-ground" src="/luminot/fog-ground.png" direction="r" />
        <FogLayer className="luminot-fog-wisp" src="/luminot/fog-wisp.png" direction="l" />
      </div>
    </main>
  );
}
