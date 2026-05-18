"use client";
// ─────────────────────────────────────────────
//  ModelViewer – dynamically loads .glb assets
// ─────────────────────────────────────────────
import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  modelPath: string;
}

export default function ModelViewer({ modelPath }: Props) {
  // We use standard React state to capture loading errors so we can render a fallback mesh.
  // The hook useGLTF will suspend the component until it resolves or throws.
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Reset error when the path changes
    setError(null);
  }, [modelPath]);

  // Handle the actual loading mechanism.
  let gltf: any = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    gltf = useGLTF(modelPath);
  } catch (err: any) {
    // If it's a Promise, it's Suspense. Rethrow it!
    if (err && typeof err.then === "function") {
      throw err;
    }
    if (!error) {
      console.warn(`[AssetLoader] Failed to load model from ${modelPath}`, err);
      setError(err);
    }
  }

  // Ensure materials properly clean up on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (gltf && gltf.scene) {
        gltf.scene.traverse((child: THREE.Object3D) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => mat.dispose());
            } else if (mesh.material) {
              mesh.material.dispose();
            }
          }
        });
      }
    };
  }, [gltf]);

  if (error || !gltf) {
    return (
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#475569" wireframe />
      </mesh>
    );
  }

  return (
    <primitive
      object={gltf.scene}
      scale={1}
      position={[0, 0, 0]}
      castShadow
      receiveShadow
    />
  );
}

// Preload common models to improve switching performance
useGLTF.preload("/models/neuron.glb");
useGLTF.preload("/models/muscle.glb");
useGLTF.preload("/models/plant.glb");
