// ─────────────────────────────────────────────
//  Shared types for the Biology Digital dashboard
// ─────────────────────────────────────────────

export interface CellEntity {
  id: string;
  label: string;
  description: string;
  category: "animal" | "plant" | "neuron";
  color: string; // hex color used for UI accents
  modelPath: string; // path to the .glb/.gltf asset
  hotspots: HotspotNode[];
}

export interface HotspotNode {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
  definition: string;
  details: ComponentDetail[];
}

export interface ComponentDetail {
  key: string;
  value: string;
}

export interface MetricEntry {
  label: string;
  value: string | number;
  unit?: string;
}
