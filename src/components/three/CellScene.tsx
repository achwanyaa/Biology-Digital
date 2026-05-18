"use client";
// ─────────────────────────────────────────────
//  CellScene – R3F scene rendered in the canvas
// ─────────────────────────────────────────────
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useDashboard } from "@/context/DashboardContext";
import NodeMesh from "./NodeMesh";

export default function CellScene() {
  const { activeEntity, activeComponent, setActiveComponentById } =
    useDashboard();
  const groupRef = useRef<THREE.Group>(null!);

  // Gentle idle rotation when nothing is selected
  useFrame((_, delta) => {
    if (groupRef.current && !activeComponent) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <>
      {/* ── Lighting ── */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[-4, -4, -4]} intensity={0.4} color="#818cf8" />
      <Environment preset="city" background={false} />

      {/* ── Camera controls ── */}
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={3}
        maxDistance={14}
        dampingFactor={0.08}
        enableDamping
      />

      {/* ── Reference grid ── */}
      <Grid
        args={[20, 20]}
        position={[0, -2.2, 0]}
        cellSize={1}
        cellThickness={0.4}
        cellColor="#1e293b"
        sectionSize={4}
        sectionThickness={0.8}
        sectionColor="#334155"
        fadeDistance={18}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid
      />

      {/* ── Click-away deselect ── */}
      <mesh
        position={[0, 0, -10]}
        visible={false}
        onClick={() => setActiveComponentById(null)}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial />
      </mesh>

      {/* ── Component nodes ── */}
      <group ref={groupRef}>
        {activeEntity.components.map((node) => (
          <NodeMesh
            key={node.id}
            node={node}
            isActive={activeComponent?.id === node.id}
            onSelect={setActiveComponentById}
          />
        ))}
      </group>
    </>
  );
}
