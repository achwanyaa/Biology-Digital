// Minor compat shim for GLTFExporter in Node (harmless in browsers).
if (typeof globalThis.self === 'undefined') globalThis.self = globalThis;

import * as THREE from 'three';
import { GLTFExporter } from 'three-stdlib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/models');
fs.mkdirSync(OUT_DIR, { recursive: true });

/* ------------------------------------------------------------------ */
/* 1. Neuron — soma sphere with radiating dendrite cylinders          */
/* ------------------------------------------------------------------ */
function createNeuron() {
  const group = new THREE.Group();
  group.name = 'Neuron';

  const material = new THREE.MeshStandardMaterial({
    color: 0x6a5acd,        // muted purple/blue
    roughness: 0.55,
    metalness: 0.1,
  });

  const soma = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
  soma.name = 'Soma';
  group.add(soma);

  const NUM_DENDRITES = 9;
  const UP = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < NUM_DENDRITES; i++) {
    const length = 1.0 + Math.random() * 1.6;

    // Tapered cylinder for a more dendrite-y feel.
    const dendrite = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.07, length, 10),
      material
    );
    dendrite.name = `Dendrite_${i}`;

    // Random direction on the unit sphere.
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const dir = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.sin(phi) * Math.sin(theta),
      Math.cos(phi)
    );

    // Place so one end sits at the soma surface, then orient along dir.
    dendrite.position.copy(dir.clone().multiplyScalar(length / 2 + 0.4));
    dendrite.quaternion.setFromUnitVectors(UP, dir);

    group.add(dendrite);
  }

  return group;
}

/* ------------------------------------------------------------------ */
/* 2. Muscle — horizontal stack of pill-shaped cylinders              */
/* ------------------------------------------------------------------ */
function createMuscle() {
  const group = new THREE.Group();
  group.name = 'Muscle';

  const material = new THREE.MeshStandardMaterial({
    color: 0xb83a4b,        // deep red/pink
    roughness: 0.7,
    metalness: 0.05,
  });

  const NUM_FIBERS    = 7;
  const FIBER_LENGTH  = 3.0;
  const FIBER_RADIUS  = 0.18;
  const SPACING       = 0.42;

  for (let i = 0; i < NUM_FIBERS; i++) {
    const fiber = new THREE.Group();
    fiber.name = `Fiber_${i}`;

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(FIBER_RADIUS, FIBER_RADIUS, FIBER_LENGTH, 18),
      material
    );
    body.rotation.z = Math.PI / 2;   // lay it down on the X axis
    fiber.add(body);

    const capL = new THREE.Mesh(new THREE.SphereGeometry(FIBER_RADIUS, 18, 18), material);
    capL.position.x = -FIBER_LENGTH / 2;
    fiber.add(capL);

    const capR = new THREE.Mesh(new THREE.SphereGeometry(FIBER_RADIUS, 18, 18), material);
    capR.position.x = FIBER_LENGTH / 2;
    fiber.add(capR);

    // Stack vertically, with a tiny horizontal jitter so it doesn't look CNC-perfect.
    fiber.position.y = (i - (NUM_FIBERS - 1) / 2) * SPACING;
    fiber.position.x = (Math.random() - 0.5) * 0.12;

    group.add(fiber);
  }

  return group;
}

/* ------------------------------------------------------------------ */
/* 3. Plant cell — rectangular wall containing internal spheres       */
/* ------------------------------------------------------------------ */
function createPlant() {
  const group = new THREE.Group();
  group.name = 'PlantCell';

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x7ba05b,        // muted green
    roughness: 0.85,
    metalness: 0.0,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
  });

  const organelleMaterial = new THREE.MeshStandardMaterial({
    color: 0x4f7942,
    roughness: 0.5,
    metalness: 0.05,
  });

  const nucleusMaterial = new THREE.MeshStandardMaterial({
    color: 0x355e3b,
    roughness: 0.4,
    metalness: 0.1,
  });

  const wall = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.6, 1.6), wallMaterial);
  wall.name = 'CellWall';
  group.add(wall);

  // Central nucleus.
  const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), nucleusMaterial);
  nucleus.name = 'Nucleus';
  group.add(nucleus);

  // A handful of chloroplasts at fixed-ish positions.
  const positions = [
    [-0.7,  0.35,  0.25],
    [ 0.75,-0.30, -0.35],
    [ 0.30, 0.45,  0.50],
    [-0.40,-0.45, -0.30],
    [ 0.55, 0.20, -0.55],
  ];

  positions.forEach(([x, y, z], i) => {
    const r = 0.14 + Math.random() * 0.07;
    const chl = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 18), organelleMaterial);
    chl.position.set(x, y, z);
    chl.name = `Chloroplast_${i}`;
    group.add(chl);
  });

  return group;
}

/* ------------------------------------------------------------------ */
/* Export helper                                                      */
/* ------------------------------------------------------------------ */
function exportToGLB(object3D, filename) {
  return new Promise((resolve, reject) => {
    const scene = new THREE.Scene();
    scene.add(object3D);

    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (result) => {
        // result is an ArrayBuffer when binary: true
        const buffer = Buffer.from(result);
        const outPath = path.join(OUT_DIR, filename);
        fs.writeFileSync(outPath, buffer);
        console.log(`✓ ${filename}  (${buffer.length.toLocaleString()} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });
}

/* ------------------------------------------------------------------ */
/* Run                                                                */
/* ------------------------------------------------------------------ */
async function main() {
  console.log(`Writing models to ${OUT_DIR}`);
  await exportToGLB(createNeuron(), 'neuron.glb');
  await exportToGLB(createMuscle(), 'muscle.glb');
  await exportToGLB(createPlant(),  'plant.glb');
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
