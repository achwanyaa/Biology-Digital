"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export default function Loader3D() {
  const groupRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 1.5;
      ringRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ringRef}>
        <torusGeometry args={[1, 0.05, 16, 32]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5} />
      </mesh>
      
      <Html center position={[0, -1.8, 0]}>
        <div style={{ color: "#94a3b8", fontSize: "0.85rem", fontFamily: "monospace", whiteSpace: "nowrap" }}>
          Loading 3D Asset...
        </div>
      </Html>
    </group>
  );
}
