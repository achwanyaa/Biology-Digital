"use client";
// ─────────────────────────────────────────────
//  Left Sidebar – entity navigation
// ─────────────────────────────────────────────
import React from "react";
import { CELL_ENTITIES } from "@/data/cellData";
import { useDashboard } from "@/context/DashboardContext";
import { Dna, Zap, Leaf } from "lucide-react";

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  neuron: <Zap size={15} />,
  animal: <Dna size={15} />,
  plant: <Leaf size={15} />,
};

const CATEGORY_BADGE: Record<string, string> = {
  neuron: "badge-neuron",
  animal: "badge-animal",
  plant: "badge-plant",
};

export default function LeftSidebar() {
  const { activeEntity, setActiveEntityById } = useDashboard();

  return (
    <aside className="sidebar-panel" aria-label="Cell entity navigation">
      <div className="panel-header">
        <span className="panel-label">Entities</span>
        <span className="panel-count">{CELL_ENTITIES.length}</span>
      </div>

      <nav className="entity-list">
        {CELL_ENTITIES.map((entity) => {
          const isActive = entity.id === activeEntity.id;
          return (
            <button
              key={entity.id}
              id={`entity-btn-${entity.id}`}
              aria-pressed={isActive}
              onClick={() => setActiveEntityById(entity.id)}
              className={`entity-item ${isActive ? "entity-item--active" : ""}`}
            >
              <span
                className="entity-swatch"
                style={{ backgroundColor: entity.color }}
              />
              <span className="entity-text">
                <span className="entity-name">{entity.label}</span>
                <span className={`entity-badge ${CATEGORY_BADGE[entity.category]}`}>
                  {CATEGORY_ICON[entity.category]}
                  {entity.category}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-footer-text">
          Select an entity to load its 3-D model.
        </p>
      </div>
    </aside>
  );
}
