"use client";

import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const STAR_COUNT = 80;

function generateStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    left: (i * 137.508) % 100,    // deterministic — golden angle spread
    top: (i * 97.3) % 100,
    size: (i % 3) + 1,
    duration: ((i % 5) + 2),
    delay: (i % 7) * 0.6,
    opacity: 0.1 + (i % 5) * 0.09,
  }));
}

const STARS = generateStars();

export default function StarField() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-stars" aria-hidden="true">
      {STARS.map((s) => (
        <div
          key={s.id}
          className="bg-star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            opacity: s.opacity,
          }}
        />
      ))}

      {/* Nebula glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "30%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(34,211,238,0.04) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
