"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Float32BufferAttribute, Points as ThreePoints, AdditiveBlending } from "three";

const COUNT = 500;

export function WarpParticles() {
  const pointsRef = useRef<ThreePoints>(null);
  const speedsRef = useRef<Float32Array>(new Float32Array(COUNT));

  // Geometria criada vazia (determinística) — preenchida com valores aleatórios
  // depois do mount, em src/components/transitions/WarpParticles.tsx, pois Math.random()
  // não pode rodar durante a fase de render.
  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(new Float32Array(COUNT * 3), 3));
    return geo;
  }, []);

  // three.js BufferGeometry is an imperative GPU resource, not React state — mutating
  // its typed arrays in place is the standard way to update it. eslint's React
  // immutability rule doesn't model this, so it's disabled for this effect.
  /* eslint-disable react-hooks/immutability */
  useEffect(() => {
    const positions = geometry.attributes.position.array as Float32Array;
    const speeds = speedsRef.current;
    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = -Math.random() * 12;
      speeds[i] = 6 + Math.random() * 10;
    }
    geometry.attributes.position.needsUpdate = true;
    return () => geometry.dispose();
  }, [geometry]);
  /* eslint-enable react-hooks/immutability */

  useFrame((_, delta) => {
    const positions = pointsRef.current?.geometry.attributes.position;
    if (!positions) return;
    const array = positions.array as Float32Array;
    const speeds = speedsRef.current;
    for (let i = 0; i < COUNT; i++) {
      array[i * 3 + 2] += speeds[i] * delta * 2.4;
      if (array[i * 3 + 2] > 2) {
        array[i * 3 + 2] = -12;
      }
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color="#c4b5fd" size={0.05} transparent opacity={0.9} blending={AdditiveBlending} depthWrite={false} />
    </points>
  );
}
