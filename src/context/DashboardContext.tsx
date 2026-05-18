"use client";
// ─────────────────────────────────────────────
//  Global dashboard state via React Context
// ─────────────────────────────────────────────
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { CellEntity, ComponentNode } from "@/types/biology";
import { CELL_ENTITIES } from "@/data/cellData";

interface DashboardState {
  activeEntity: CellEntity;
  activeComponent: ComponentNode | null;
  setActiveEntityById: (id: string) => void;
  setActiveComponentById: (id: string | null) => void;
}

const DashboardContext = createContext<DashboardState | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeEntity, setActiveEntity] = useState<CellEntity>(
    CELL_ENTITIES[0]
  );
  const [activeComponent, setActiveComponent] =
    useState<ComponentNode | null>(null);

  const setActiveEntityById = useCallback((id: string) => {
    const entity = CELL_ENTITIES.find((e) => e.id === id);
    if (entity) {
      setActiveEntity(entity);
      setActiveComponent(null); // reset selection on entity switch
    }
  }, []);

  const setActiveComponentById = useCallback(
    (id: string | null) => {
      if (id === null) {
        setActiveComponent(null);
        return;
      }
      const node = activeEntity.components.find((c) => c.id === id) ?? null;
      setActiveComponent(node);
    },
    [activeEntity]
  );

  return (
    <DashboardContext.Provider
      value={{
        activeEntity,
        activeComponent,
        setActiveEntityById,
        setActiveComponentById,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardState {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
