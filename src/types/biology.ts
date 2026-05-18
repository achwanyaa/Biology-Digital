// ─────────────────────────────────────────────
//  Shared types for the Biology Digital dashboard
// ─────────────────────────────────────────────

export interface CellEntity {
  id: string;
  label: string;
  description: string;
  category: "animal" | "plant" | "neuron";
  color: string; // hex color used for 3-D mesh
  components: ComponentNode[];
}

export interface ComponentNode {
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
