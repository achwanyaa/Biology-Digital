"use client";
// ─────────────────────────────────────────────
//  ModelViewer – dynamically loads .glb assets
// ─────────────────────────────────────────────
import { useEffect, useState } from "react";
import { useLoader, ThreeEvent } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
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
    gltf = useLoader(GLTFLoader, modelPath, (loader) => {
      loader.setWithCredentials(true);
    });
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
      onClick={(event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        const { x, y, z } = event.point;
        console.log(
          `📍 Clicked Coordinate: [${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}]`
        );
      }}
    />
  );
}

