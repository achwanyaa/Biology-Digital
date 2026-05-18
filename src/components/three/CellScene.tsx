"use client";
// ─────────────────────────────────────────────
//  CellScene – R3F scene rendered in the canvas
// ─────────────────────────────────────────────
import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useDashboard } from "@/context/DashboardContext";
import NodeMesh from "./NodeMesh";
import ModelViewer from "./ModelViewer";
import Loader3D from "./Loader3D";

export default function CellScene() {
  const { activeEntity, activeComponent, setActiveComponentById } =
    useDashboard();
  const groupRef = useRef<THREE.Group>(null!);

  // Gentle idle rotation when nothing is selected
  useFrame((_, delta) => {
    if (groupRef.current && !activeComponent) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
      {/* ── Lighting & Environment ── */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[8, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-6, -4, -4]} intensity={0.6} color={activeEntity.color} />
      
      {/* Real spatial depth via Environment map */}
      <Environment preset="city" background={false} environmentIntensity={0.5} />

      {/* ── Camera controls (Bounded) ── */}
      <OrbitControls
        makeDefault
        enablePan={true}
        minDistance={4}
        maxDistance={25}
        maxPolarAngle={Math.PI / 1.5}
        dampingFactor={0.05}
        enableDamping
      />

      {/* ── Reference grid ── */}
      <Grid
        args={[30, 30]}
        position={[0, -3.5, 0]}
        cellSize={1}
        cellThickness={0.4}
        cellColor="#1e293b"
        sectionSize={4}
        sectionThickness={0.8}
        sectionColor="#334155"
        fadeDistance={25}
        fadeStrength={1.5}
        followCamera={false}
        infiniteGrid
      />

      {/* ── Click-away deselect ── */}
      <mesh
        position={[0, 0, -20]}
        visible={false}
        onClick={() => setActiveComponentById(null)}
      >
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial />
      </mesh>

      {/* ── Dynamic Model & Hotspots ── */}
      <group ref={groupRef}>
        <Suspense fallback={<Loader3D />}>
          <ModelViewer modelPath={activeEntity.modelPath} />
        </Suspense>

        {activeEntity.hotspots.map((node) => (
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
