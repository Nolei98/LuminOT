"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { gameName } from "@/lib/data";

const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-violet-950/30" />,
});

export function HeroSection() {
  const [webglFailed, setWebglFailed] = useState(false);

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#05030f]">
      <div className="absolute inset-0">
        {webglFailed ? (
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_45%,rgba(167,139,250,0.35),transparent_55%)]" />
        ) : (
          <Hero3DCanvas onContextLost={() => setWebglFailed(true)} />
        )}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,#05030f_85%)]" />
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        <Image
          src="/icon-game.svg"
          alt={`Brasão de ${gameName}`}
          width={64}
          height={64}
          priority
          className="drop-shadow-[0_0_24px_rgba(167,139,250,0.6)]"
        />
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300/70">A nova era</p>
        <h1 className="text-5xl font-bold text-white drop-shadow-[0_0_30px_rgba(167,139,250,0.5)] md:text-7xl">
          {gameName}
        </h1>
        <p className="max-w-md text-violet-200/80">
          O mesmo mundo que você ama, reimaginado em uma jornada imersiva.
        </p>
        <div className="mt-2 flex gap-3">
          <a href="#downloads" className="rounded-full bg-violet-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(167,139,250,0.5)] transition-transform hover:scale-105">
            Jogar agora
          </a>
          <Link href="/" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white/80 transition-colors hover:bg-white/10">
            ← Portal
          </Link>
        </div>
      </div>
    </section>
  );
}
