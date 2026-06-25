"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import type { Mesh } from "three";

function CrestMesh() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={0.55} position={[0, 1.9, -3]}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.8} roughness={0.35} metalness={0.15} flatShading />
      </mesh>
    </Float>
  );
}

export default function Hero3DCanvas({ onContextLost }: { onContextLost?: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onContextLost?.();
        });
      }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.6} color="#c4b5fd" />
      <pointLight position={[-4, -2, -2]} intensity={1} color="#f5d27a" />
      <CrestMesh />
      <Sparkles count={150} scale={7} size={2} speed={0.4} color="#a78bfa" />
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.45} luminanceSmoothing={0.3} />
      </EffectComposer>
    </Canvas>
  );
}
