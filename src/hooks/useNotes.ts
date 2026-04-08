"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";

const GLOBAL_KEY_PREFIX = "chronos_notes_";
const GLOBAL_MONTHLY_KEY = "chronos_global_month_";

export interface UseNotesReturn {
  note: string;
  setNote: (value: string) => void;
  isGlobal: boolean;
  noteKey: string;
  clearNote: () => void;
  exportMarkdown: (
    selectedStart: Date | null,
    selectedEnd: Date | null
  ) => string;
}

export function useNotes(
  selectedDate: Date | null,
  currentMonth: Date
): UseNotesReturn {
  const globalMonthKey =
    GLOBAL_MONTHLY_KEY + format(currentMonth, "yyyy-MM");

  const dateKey = selectedDate
    ? GLOBAL_KEY_PREFIX + format(selectedDate, "yyyy-MM-dd")
    : null;

  const noteKey = dateKey ?? globalMonthKey;
  const isGlobal = !dateKey;

  const [note, setNoteState] = useState<string>("");

  // Load from localStorage when key changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(noteKey) ?? "";
    setNoteState(stored);
  }, [noteKey]);

  const setNote = useCallback(
    (value: string) => {
      setNoteState(value);
      if (typeof window !== "undefined") {
        localStorage.setItem(noteKey, value);
      }
    },
    [noteKey]
  );

  const clearNote = useCallback(() => {
    setNoteState("");
    if (typeof window !== "undefined") {
      localStorage.removeItem(noteKey);
    }
  }, [noteKey]);

  const exportMarkdown = useCallback(
    (selectedStart: Date | null, selectedEnd: Date | null): string => {
      const header = selectedStart
        ? `## 📅 ${format(selectedStart, "MMM d, yyyy")}${selectedEnd ? ` → ${format(selectedEnd, "MMM d, yyyy")}` : ""}`
        : `## 📅 ${format(currentMonth, "MMMM yyyy")} — Monthly Goals`;
      return `${header}\n\n${note || "_No notes yet_"}`;
    },
    [note, currentMonth]
  );

  return { note, setNote, isGlobal, noteKey, clearNote, exportMarkdown };
}
