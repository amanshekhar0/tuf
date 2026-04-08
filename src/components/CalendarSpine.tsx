"use client";

import React from "react";

interface CalendarSpineProps {
  className?: string;
}

const RING_COUNT = 18;

export default function CalendarSpine({ className = "" }: CalendarSpineProps) {
  return (
    <div
      className={`calendar-spine relative flex items-center justify-around px-6 py-2 ${className}`}
      aria-hidden="true"
      style={{ borderRadius: "12px 12px 0 0" }}
    >
      {/* Left cap */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#0d1120] to-transparent rounded-tl-xl" />
      {/* Right cap */}
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#0d1120] to-transparent rounded-tr-xl" />

      {/* Spiral rings */}
      {Array.from({ length: RING_COUNT }).map((_, i) => (
        <div
          key={i}
          className="spine-ring relative"
          style={{
            width: 22,
            height: 28,
            borderRadius: "50%",
            flexShrink: 0,
            // Subtle stagger to simulate real spiral binding perspective
            transform: `scaleX(${0.9 + (i % 3) * 0.04}) translateY(${i % 2 === 0 ? 0 : 1}px)`,
          }}
        >
          {/* Inner hole */}
          <div
            style={{
              position: "absolute",
              inset: "25% 30%",
              background: "#020617",
              borderRadius: "50%",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
