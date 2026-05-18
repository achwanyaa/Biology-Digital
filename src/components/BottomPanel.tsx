"use client";
// ─────────────────────────────────────────────
//  Bottom Panel – metrics micro-view bar
// ─────────────────────────────────────────────
import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { Activity, Layers, Cpu, FlaskConical } from "lucide-react";

const CATEGORY_META: Record<
  string,
  { label: string; metrics: { icon: React.ReactNode; key: string; value: string }[] }
> = {
  neuron: {
    label: "Neuron",
    metrics: [
      { icon: <Activity size={13} />, key: "Resting potential", value: "−70 mV" },
      { icon: <Cpu size={13} />, key: "Action potential", value: "~100 mV spike" },
      { icon: <Layers size={13} />, key: "Conduction speed", value: "0.5 – 120 m/s" },
      { icon: <FlaskConical size={13} />, key: "Na⁺ channels / µm²", value: "~100" },
    ],
  },
  animal: {
    label: "Skeletal Muscle",
    metrics: [
      { icon: <Activity size={13} />, key: "Peak force", value: "~0.3 N/cm²" },
      { icon: <Cpu size={13} />, key: "ATP turnover", value: "~100× rest" },
      { icon: <Layers size={13} />, key: "Fiber diameter", value: "10 – 100 µm" },
      { icon: <FlaskConical size={13} />, key: "Ca²⁺ trigger", value: "~1 µM free" },
    ],
  },
  plant: {
    label: "Plant Cell",
    metrics: [
      { icon: <Activity size={13} />, key: "Turgor pressure", value: "5 – 10 atm" },
      { icon: <Cpu size={13} />, key: "Photosynthesis rate", value: "5 – 20 µmol/m²/s" },
      { icon: <Layers size={13} />, key: "Cell wall strength", value: "1 – 10 GPa" },
      { icon: <FlaskConical size={13} />, key: "Vacuole pH", value: "~5.0" },
    ],
  },
};

export default function BottomPanel() {
  const { activeEntity, activeComponent } = useDashboard();
  const meta = CATEGORY_META[activeEntity.category];

  return (
    <div className="bottom-panel" aria-label="Metrics bar">
      <div className="bottom-panel-inner">
        {/* Left: label */}
        <div className="bottom-label-col">
          <span className="bottom-category">{meta.label}</span>
          <span className="bottom-selected">
            {activeComponent ? activeComponent.label : "No component selected"}
          </span>
        </div>

        {/* Right: metrics */}
        <div className="metrics-grid">
          {meta.metrics.map((m) => (
            <div key={m.key} className="metric-card">
              <span className="metric-icon">{m.icon}</span>
              <div className="metric-text">
                <span className="metric-key">{m.key}</span>
                <span className="metric-value">{m.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
