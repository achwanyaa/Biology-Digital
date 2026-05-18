"use client";
// ─────────────────────────────────────────────
//  CanvasContainer – lazy-loaded R3F canvas
// ─────────────────────────────────────────────
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { useDashboard } from "@/context/DashboardContext";

// CellScene uses useFrame so must be client-only
const CellScene = dynamic(() => import("./three/CellScene"), { ssr: false });

export default function CanvasContainer() {
  const { activeEntity } = useDashboard();

  return (
    <div className="canvas-wrapper" aria-label="3D cell viewer">
      {/* Entity name overlay */}
      <div className="canvas-overlay-label">
        <span
          className="canvas-entity-dot"
          style={{ backgroundColor: activeEntity.color }}
        />
        <span className="canvas-entity-name">{activeEntity.label}</span>
      </div>

      <Canvas
        camera={{ position: [0, 2, 8], fov: 55 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CellScene />
        </Suspense>
      </Canvas>

      <Loader
        containerStyles={{ background: "#0f172a" }}
        barStyles={{ background: "#6366f1" }}
        dataStyles={{ color: "#94a3b8" }}
        dataInterpolation={(p) => `Loading scene… ${p.toFixed(0)}%`}
      />

      {/* Interaction hint */}
      <p className="canvas-hint">
        Drag to orbit · Scroll to zoom · Click a node to inspect
      </p>
    </div>
  );
}
