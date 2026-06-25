"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useRef } from "react";
import { Vector2, type PerspectiveCamera } from "three";
import { WarpParticles } from "./WarpParticles";

function DollyCamera() {
  const elapsed = useRef(0);
  useFrame((state, delta) => {
    elapsed.current += delta;
    const camera = state.camera as PerspectiveCamera;
    const t = Math.min(elapsed.current / 1.3, 1);
    camera.fov = 50 + t * 45;
    camera.updateProjectionMatrix();
  });
  return null;
}

function AnimatedEffects() {
  const bloomRef = useRef<{ intensity: number } | null>(null);
  const aberrationRef = useRef<{ offset: Vector2 } | null>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    const t = Math.min(elapsed.current / 1.3, 1);
    if (bloomRef.current) bloomRef.current.intensity = 0.6 + t * 2.4;
    if (aberrationRef.current) aberrationRef.current.offset.set(0.0008 + t * 0.004, 0.0008 + t * 0.004);
  });

  return (
    <EffectComposer>
      <Bloom ref={bloomRef} intensity={0.6} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
      <ChromaticAberration ref={aberrationRef} blendFunction={BlendFunction.NORMAL} offset={new Vector2(0.0008, 0.0008)} />
    </EffectComposer>
  );
}

export function WarpScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: false }}>
      <color attach="background" args={["#05030f"]} />
      <ambientLight intensity={0.4} />
      <DollyCamera />
      <WarpParticles />
      <AnimatedEffects />
    </Canvas>
  );
}
