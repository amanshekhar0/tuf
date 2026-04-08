import ChronosWall from "@/components/ChronosWall";
import StarField from "@/components/StarField";

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* Animated background */}
      <StarField />

      {/* Top bar */}
      <header
        className="relative z-10 flex items-center justify-between px-6 py-3 border-b"
        style={{
          borderColor: "rgba(99,102,241,0.2)",
          background: "rgba(2,6,23,0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded flex items-center justify-center text-xs font-mono font-bold"
            style={{
              background: "linear-gradient(135deg, #6366f1, #22d3ee)",
              color: "#020617",
            }}
          >
            TUF
          </div>
          <span
            className="font-mono font-bold text-sm tracking-tight gradient-text"
          >
            Striver Chronos-Wall
          </span>
          <span
            className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded"
            style={{
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#6366f1",
            }}
          >
            2026
          </span>
        </div>

        <div
          className="hidden sm:flex items-center gap-4 text-[11px] font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          <span>Click a date to select</span>
          <span style={{ color: "rgba(99,102,241,0.5)" }}>·</span>
          <span>Click again for range</span>
          <span style={{ color: "rgba(99,102,241,0.5)" }}>·</span>
          <span>Hover to preview</span>
        </div>
      </header>

      {/* Main calendar */}
      <ChronosWall />

      {/* Footer */}
      <footer
        className="relative z-10 text-center pb-6 pt-2"
        style={{ color: "var(--text-faint)", fontSize: "0.65rem" }}
      >
        <span className="font-mono tracking-widest uppercase">
          Built for TakeUForward · Striver Chronos-Wall · 2026
        </span>
      </footer>
    </main>
  );
}
