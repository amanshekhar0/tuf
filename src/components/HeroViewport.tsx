"use client";

import React from "react";
import { format } from "date-fns";
import type { MonthTheme } from "@/lib/monthColors";

interface HeroViewportProps {
  currentDate: Date;
  theme: MonthTheme;
}

export default function HeroViewport({ currentDate, theme }: HeroViewportProps) {
  const monthName = format(currentDate, "MMMM");
  const year = format(currentDate, "yyyy");

  return (
    <div className="hero-viewport relative w-full overflow-hidden" style={{ height: 220 }}>
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={theme.heroImage}
        alt={`${monthName} ${year} theme`}
        className="hero-image absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="hero-overlay" />

      {/* Scanline overlay via CSS (::after pseudo-element in globals.css) */}

      {/* Month label — bottom left */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 p-4 flex items-end justify-between"
        style={{
          background:
            "linear-gradient(to top, rgba(2,6,23,0.95) 0%, transparent 100%)",
        }}
      >
        <div>
          <div
            className="text-xs font-mono uppercase tracking-[0.2em] mb-1"
            style={{ color: theme.accent, opacity: 0.85 }}
          >
            {theme.label}
          </div>
          <div
            className="font-mono font-bold leading-none"
            style={{
              fontSize: "2.2rem",
              color: "#e2e8f0",
              textShadow: `0 0 20px ${theme.glowColor}`,
            }}
          >
            {monthName}
          </div>
        </div>

        <div className="text-right">
          <div
            className="font-mono text-5xl font-bold leading-none tabular-nums"
            style={{
              color: theme.accent,
              textShadow: `0 0 30px ${theme.glowColor}`,
              opacity: 0.9,
            }}
          >
            {year}
          </div>
        </div>
      </div>

      {/* Top-right: glassmorphic chip */}
      <div
        className="absolute top-3 right-3 z-10 px-2 py-1 text-[10px] font-mono tracking-widest uppercase"
        style={{
          background: "rgba(2,6,23,0.6)",
          border: `1px solid ${theme.accent}44`,
          borderRadius: 6,
          color: theme.accent,
          backdropFilter: "blur(8px)",
        }}
      >
        Chronos-Wall
      </div>
    </div>
  );
}
