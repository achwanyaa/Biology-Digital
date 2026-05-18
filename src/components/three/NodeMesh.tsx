"use client";
// ─────────────────────────────────────────────
//  ComponentNode mesh – interactive 3-D sphere
// ─────────────────────────────────────────────
import { useRef, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Text, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { HotspotNode } from "@/types/biology";

interface Props {
  node: HotspotNode;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export default function NodeMesh({ node, isActive, onSelect }: Props) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  const baseColor = new THREE.Color(node.color);
  const hoverColor = baseColor.clone().lerp(new THREE.Color("#ffffff"), 0.35);
  const activeColor = baseColor.clone().lerp(new THREE.Color("#ffffff"), 0.6);

  const displayColor = isActive
    ? activeColor
    : hovered
    ? hoverColor
    : baseColor;

  const scale = isActive ? 1.35 : hovered ? 1.15 : 1;

  return (
    <group
      position={node.position as [number, number, number]}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      {/* Main sphere */}
      <Sphere ref={meshRef} args={[0.3, 32, 32]} scale={scale}>
        <meshStandardMaterial
          color={displayColor}
          roughness={0.35}
          metalness={0.1}
          emissive={isActive ? displayColor : "#000000"}
          emissiveIntensity={isActive ? 0.25 : 0}
        />
      </Sphere>

      {/* Active ring */}
      {isActive && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.45, 0.02, 8, 48]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.6}
          />
        </mesh>
      )}

      {/* Label */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.18}
        color={hovered || isActive ? "#f8fafc" : "#94a3b8"}
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {node.label}
      </Text>
    </group>
  );
}
