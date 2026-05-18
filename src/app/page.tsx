import LeftSidebar from "@/components/LeftSidebar";
import CanvasContainer from "@/components/CanvasContainer";
import RightSidebar from "@/components/RightSidebar";
import BottomPanel from "@/components/BottomPanel";

export default function Home() {
  return (
    <main className="dashboard-root">
      {/* ── Top bar ── */}
      <header className="top-bar">
        <div className="top-bar-brand">
          <span className="brand-dot" />
          <span className="brand-name">BiologyDigital</span>
          <span className="brand-sub">3D Cell Explorer</span>
        </div>
        <div className="top-bar-meta">
          <span className="top-bar-tag">v0.1.0</span>
          <span className="top-bar-tag">Next.js 16 · R3F</span>
        </div>
      </header>

      {/* ── Main three-column workspace ── */}
      <div className="workspace">
        <LeftSidebar />
        <CanvasContainer />
        <RightSidebar />
      </div>

      {/* ── Bottom metrics bar ── */}
      <BottomPanel />
    </main>
  );
}
