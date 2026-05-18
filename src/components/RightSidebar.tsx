"use client";
// ─────────────────────────────────────────────
//  Right Sidebar – context-aware data panel
// ─────────────────────────────────────────────
import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { Info, ChevronRight, X } from "lucide-react";

export default function RightSidebar() {
  const { activeEntity, activeComponent, setActiveComponentById } =
    useDashboard();

  return (
    <aside className="sidebar-panel" aria-label="Component details panel">
      <div className="panel-header">
        <span className="panel-label">Details</span>
        {activeComponent && (
          <button
            id="clear-component-btn"
            onClick={() => setActiveComponentById(null)}
            className="panel-clear-btn"
            aria-label="Clear selection"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* ── Entity overview (shown when no component selected) ── */}
      {!activeComponent && (
        <div className="detail-empty">
          <div
            className="entity-dot"
            style={{ backgroundColor: activeEntity.color }}
          />
          <h2 className="detail-entity-title">{activeEntity.label}</h2>
          <p className="detail-entity-desc">{activeEntity.description}</p>

          <div className="detail-components-list">
            <p className="detail-sub-label">Components</p>
            {activeEntity.hotspots.map((c) => (
              <div key={c.id} className="detail-component-chip">
                <span
                  className="chip-swatch"
                  style={{ backgroundColor: c.color }}
                />
                <span className="chip-label">{c.label}</span>
                <ChevronRight size={12} className="chip-arrow" />
              </div>
            ))}
          </div>

          <div className="info-hint">
            <Info size={12} />
            <span>Click a node in the canvas to inspect it.</span>
          </div>
        </div>
      )}

      {/* ── Component detail (shown when a node is selected) ── */}
      {activeComponent && (
        <div className="detail-content">
          <div className="detail-header">
            <span
              className="component-swatch-lg"
              style={{ backgroundColor: activeComponent.color }}
            />
            <h2 className="detail-component-title">{activeComponent.label}</h2>
          </div>

          <p className="detail-definition">{activeComponent.definition}</p>

          <div className="detail-stats">
            <p className="detail-sub-label">Key Data</p>
            {activeComponent.details.map((d) => (
              <div key={d.key} className="stat-row">
                <span className="stat-key">{d.key}</span>
                <span className="stat-value">{d.value}</span>
              </div>
            ))}
          </div>

          <div className="detail-entity-chip">
            <span
              className="chip-swatch"
              style={{ backgroundColor: activeEntity.color }}
            />
            <span className="chip-label">{activeEntity.label}</span>
          </div>
        </div>
      )}
    </aside>
  );
}
