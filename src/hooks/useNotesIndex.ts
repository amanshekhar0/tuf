"use client";

import { useState, useEffect, useCallback } from "react";

const NOTE_PREFIX = "chronos_notes_";

/** Scans localStorage and returns the set of date strings (yyyy-MM-dd) that have non-empty notes */
function scanNotedDates(): Set<string> {
  if (typeof window === "undefined") return new Set();
  const result = new Set<string>();
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(NOTE_PREFIX)) {
      const value = localStorage.getItem(key);
      if (value && value.trim().length > 0) {
        // key = "chronos_notes_2026-04-12" → dateStr = "2026-04-12"
        result.add(key.slice(NOTE_PREFIX.length));
      }
    }
  }
  return result;
}

export function useNotesIndex() {
  const [notedDates, setNotedDates] = useState<Set<string>>(new Set());

  // Initial scan on mount
  useEffect(() => {
    setNotedDates(scanNotedDates());
  }, []);

  /** Call this whenever a note is saved or cleared to refresh the index */
  const refresh = useCallback(() => {
    setNotedDates(scanNotedDates());
  }, []);

  return { notedDates, refresh };
}
