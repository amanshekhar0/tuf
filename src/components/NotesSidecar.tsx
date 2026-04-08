"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Terminal,
  Trash2,
  Copy,
  CheckCheck,
  BookOpen,
  FileText,
  StickyNote,
} from "lucide-react";
import { useNotes } from "@/hooks/useNotes";
import { renderMarkdown } from "@/lib/markdownRenderer";
import type { MonthTheme } from "@/lib/monthColors";

interface NotesSidecarProps {
  selectedStart: Date | null;
  selectedEnd: Date | null;
  currentMonth: Date;
  theme: MonthTheme;
  onCopyMarkdown?: (text: string) => void;
}

const TYPEWRITER_TEXTS = [
  "Plan your next DSA Sprint...",
  "# Graph Theory Week\n- BFS, DFS done ✓\n- Dijkstra next",
  "**Goals**: Solve 5 problems/day",
  "`O(n log n)` — time to grind!",
];

export default function NotesSidecar({
  selectedStart,
  selectedEnd,
  currentMonth,
  theme,
  onCopyMarkdown,
}: NotesSidecarProps) {
  const { note, setNote, isGlobal, clearNote, exportMarkdown } = useNotes(
    selectedStart,
    currentMonth
  );

  const [previewMode, setPreviewMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [phIndex, setPhIndex] = useState(0);
  const [phChar, setPhChar] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Typewriter placeholder animation
  useEffect(() => {
    const target = TYPEWRITER_TEXTS[phIndex % TYPEWRITER_TEXTS.length];
    if (phChar < target.length) {
      const t = setTimeout(() => {
        setPlaceholder(target.slice(0, phChar + 1));
        setPhChar((c) => c + 1);
      }, 55);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setPhChar(0);
        setPlaceholder("");
        setPhIndex((i) => i + 1);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [phChar, phIndex]);

  const handleCopy = () => {
    const md = exportMarkdown(selectedStart, selectedEnd);
    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      onCopyMarkdown?.(md);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const noteLabel = isGlobal
    ? `${format(currentMonth, "MMMM yyyy")} — Global Goals`
    : selectedEnd
    ? `${format(selectedStart!, "MMM d")} → ${format(selectedEnd, "MMM d, yyyy")}`
    : `${format(selectedStart!, "MMMM d, yyyy")}`;

  return (
    <div className="notes-sidecar flex flex-col h-full" style={{ minHeight: 340 }}>
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: "var(--border-indigo)" }}
      >
        <Terminal size={14} style={{ color: theme.accent }} />
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: theme.accent }}
        >
          {isGlobal ? "Monthly Goals" : "Date Notes"}
        </span>
        <div className="flex-1" />

        {/* Preview toggle */}
        <button
          id="notes-preview-toggle"
          onClick={() => setPreviewMode((p) => !p)}
          title={previewMode ? "Edit mode" : "Preview rendered markdown"}
          className="nav-btn p-1"
          aria-pressed={previewMode}
        >
          {previewMode ? (
            <FileText size={12} style={{ color: theme.accent }} />
          ) : (
            <BookOpen size={12} style={{ color: theme.accent }} />
          )}
        </button>

        {/* Clear */}
        <button
          id="notes-clear-btn"
          onClick={clearNote}
          title="Clear note"
          className="nav-btn p-1"
        >
          <Trash2 size={12} style={{ color: "#f87171" }} />
        </button>
      </div>

      {/* Note key badge */}
      <div className="px-4 pt-2 pb-1">
        <div
          className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded w-fit"
          style={{
            background: `${theme.accent}14`,
            border: `1px solid ${theme.accent}30`,
            color: theme.accent,
          }}
        >
          <StickyNote size={10} />
          <span className="truncate max-w-[180px]">{noteLabel}</span>
        </div>
      </div>

      {/* Editor / Preview area */}
      <div className="flex-1 px-4 py-2 overflow-y-auto" style={{ minHeight: 160 }}>
        <AnimatePresence mode="wait">
          {previewMode ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="markdown-preview"
              dangerouslySetInnerHTML={{
                __html: note
                  ? renderMarkdown(note)
                  : `<p style="color:var(--text-faint); font-style:italic">Nothing to preview yet…</p>`,
              }}
            />
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <textarea
                id="notes-textarea"
                ref={textareaRef}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={placeholder || "Start typing…"}
                className="w-full h-full min-h-[150px]"
                style={{
                  background: "transparent",
                  resize: "none",
                  outline: "none",
                  fontFamily: "var(--font-code)",
                  fontSize: "0.82rem",
                  color: "var(--text-primary)",
                  lineHeight: 1.7,
                  caretColor: theme.accent,
                  border: "none",
                  padding: 0,
                }}
                spellCheck={false}
                aria-label="Notes editor"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Markdown hint */}
      {!previewMode && (
        <div
          className="px-4 pb-2 text-[10px] font-mono"
          style={{ color: "var(--text-faint)" }}
        >
          **bold** · *italic* · `code` · - list · # heading
        </div>
      )}

      {/* Footer: Copy to clipboard */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-t"
        style={{ borderColor: "var(--border-indigo)" }}
      >
        <div
          className="text-[10px] font-mono"
          style={{ color: "var(--text-faint)" }}
        >
          {note.length} chars · localStorage
        </div>
        <div className="flex-1" />
        <button
          id="notes-copy-btn"
          onClick={handleCopy}
          className="copy-btn flex items-center gap-1.5"
          aria-label="Copy notes as markdown"
        >
          {copied ? (
            <>
              <CheckCheck size={11} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={11} />
              Copy MD
            </>
          )}
        </button>
      </div>
    </div>
  );
}
