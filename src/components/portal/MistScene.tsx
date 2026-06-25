"use client";

import { useEffect, useRef } from "react";

export function MistScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const r = scene.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const handlePointerLeave = () => {
      tx = 0;
      ty = 0;
    };

    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      scene.style.setProperty("--mx", cx.toFixed(3));
      scene.style.setProperty("--my", cy.toFixed(3));
      raf = requestAnimationFrame(loop);
    };

    const onVisible = () => { if (document.visibilityState === "visible") raf = requestAnimationFrame(loop); else cancelAnimationFrame(raf); };

    scene.addEventListener("pointermove", handlePointerMove);
    scene.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", onVisible);
    raf = requestAnimationFrame(loop);

    return () => {
      scene.removeEventListener("pointermove", handlePointerMove);
      scene.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", onVisible);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={sceneRef} className="luminot-scene h-full w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="luminot-layer luminot-layer-bg" src="/luminot/00-background-original.jpg" alt="" />
      <FogLayer className="luminot-fog-sky" src="/luminot/fog-sky.png" direction="r" />
      <FogLayer className="luminot-fog-far" src="/luminot/fog-far.png" direction="r" />
      <FogLayer className="luminot-fog-mid" src="/luminot/fog-mid.png" direction="l" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="luminot-layer luminot-layer-monolith" src="/luminot/01-monolito-central.png" alt="" />
    </div>
  );
}

export function FogLayer({ className, src, direction }: { className: string; src: string; direction: "l" | "r" }) {
  return (
    <div className={`luminot-fog ${className}`}>
      <div className={`luminot-fog-track luminot-fog-track-${direction}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" />
      </div>
    </div>
  );
}
