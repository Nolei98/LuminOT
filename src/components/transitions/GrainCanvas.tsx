"use client";

import { useEffect, useRef } from "react";

export function GrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 220;
    canvas.height = 140;
    let frame = 0;
    let raf = 0;

    const draw = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = imageData.data;
      for (let i = 0; i < buffer.length; i += 4) {
        const shade = Math.random() * 255;
        buffer[i] = shade;
        buffer[i + 1] = shade * 0.85;
        buffer[i + 2] = shade * 0.55;
        buffer[i + 3] = Math.random() * 40;
      }
      ctx.putImageData(imageData, 0, 0);
      frame++;
      if (frame < 90) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full mix-blend-overlay"
      style={{ imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  );
}
