"use client";

import { useCallback, useRef } from "react";

export function useMechanicalClick() {
  const ctxRef = useRef<AudioContext | null>(null);

  const play = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      if (!ctxRef.current) {
        ctxRef.current = new AudioContext();
      }
      const ctx = ctxRef.current;

      // Short burst of brown(ish) noise for a mechkey click feel
      const bufferSize = ctx.sampleRate * 0.04; // 40ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise low-pass filter
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // amplitude
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // High-pass to give it a "click" character
      const hpf = ctx.createBiquadFilter();
      hpf.type = "highpass";
      hpf.frequency.value = 400;

      // Quick volume envelope
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      source.connect(hpf);
      hpf.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch {
      // AudioContext not available (SSR) — silent fallback
    }
  }, []);

  return { play };
}
