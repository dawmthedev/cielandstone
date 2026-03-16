"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import type { MeshStandardMaterial } from "three";
import type { Mesh } from "three";

import type { ProjectSystem } from "@/lib/data/projects";

const systemColors: Record<ProjectSystem, string> = {
  architectural: "#d7d3c8",
  structural: "#a7a29a",
  plumbing: "#b9a1b5",
  electrical: "#c2b48b",
  hvac: "#9fb4c4",
  site: "#8ea88f",
};

function SystemBlocks({ activeSystems, exploded }: { activeSystems: ProjectSystem[]; exploded: boolean }) {
  const allSystems = useMemo(
    () => ["architectural", "structural", "plumbing", "electrical", "hvac", "site"] as ProjectSystem[],
    [],
  );

  const positions = useMemo<Record<ProjectSystem, [number, number, number]>>(() => {
    if (!exploded) {
      return {
        architectural: [0, 0, 0],
        structural: [0, 0, 0],
        plumbing: [0, 0, 0],
        electrical: [0, 0, 0],
        hvac: [0, 0, 0],
        site: [0, 0, 0],
      };
    }

    const base: Record<ProjectSystem, [number, number, number]> = {
      architectural: [-0.7, 0.0, 0],
      structural: [0.7, 0.0, 0],
      plumbing: [-0.7, 0.55, 0],
      electrical: [0.7, 0.55, 0],
      hvac: [-0.7, -0.55, 0],
      site: [0.7, -0.55, 0],
    };

    const spread = 1.35;

    return Object.fromEntries(
      (Object.keys(base) as ProjectSystem[]).map((k) => [k, base[k].map((v) => v * spread) as [number, number, number]]),
    ) as Record<ProjectSystem, [number, number, number]>;
  }, [exploded]);

  const activeSet = useMemo(() => new Set(activeSystems), [activeSystems]);
  const matsRef = useRef<Record<ProjectSystem, MeshStandardMaterial | null>>({
    architectural: null,
    structural: null,
    plumbing: null,
    electrical: null,
    hvac: null,
    site: null,
  });
  const meshRef = useRef<Record<ProjectSystem, Mesh | null>>({
    architectural: null,
    structural: null,
    plumbing: null,
    electrical: null,
    hvac: null,
    site: null,
  });
  const scalesRef = useRef<Record<ProjectSystem, number>>({
    architectural: 1,
    structural: 1,
    plumbing: 1,
    electrical: 1,
    hvac: 1,
    site: 1,
  });

  useFrame((_, dt) => {
    const t = 1 - Math.pow(0.001, dt);
    for (const s of allSystems) {
      const m = matsRef.current[s];
      if (!m) continue;
      const targetOpacity = activeSet.has(s) ? 1 : 0;
      m.opacity = m.opacity + (targetOpacity - m.opacity) * t;

      const targetScale = activeSet.has(s) ? 1 : 0.98;
      scalesRef.current[s] = scalesRef.current[s] + (targetScale - scalesRef.current[s]) * t;

      const mesh = meshRef.current[s];
      if (mesh) {
        const sc = scalesRef.current[s];
        mesh.scale.setScalar(sc);
      }
    }
  });

  return (
    <group>
      {allSystems.map((s) => (
        <mesh
          key={s}
          ref={(r) => {
            meshRef.current[s] = r;
          }}
          position={positions[s]}
        >
          <boxGeometry args={[0.75, 0.38, 0.32]} />
          <meshStandardMaterial
            ref={(r) => {
              matsRef.current[s] = r;
            }}
            color={systemColors[s]}
            metalness={0.1}
            roughness={0.55}
            transparent
            opacity={activeSet.has(s) ? 1 : 0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function BIMViewerCanvas({
  modelUrl,
  activeSystems,
  exploded,
}: {
  modelUrl?: string;
  activeSystems: ProjectSystem[];
  exploded: boolean;
}) {
  return (
    <Canvas camera={{ position: [2.4, 1.7, 2.4], fov: 40 }} dpr={[1, 1.5]}>
      <color attach="background" args={["#0b0b0b"]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} />

      <Suspense fallback={null}>
        <Environment preset="city" />
        <SystemBlocks activeSystems={activeSystems} exploded={exploded} />
        {modelUrl ? null : null}
      </Suspense>

      <OrbitControls enablePan={false} maxPolarAngle={Math.PI * 0.48} minDistance={1.6} maxDistance={5.6} />
    </Canvas>
  );
}
