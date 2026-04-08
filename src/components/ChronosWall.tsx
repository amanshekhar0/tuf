"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addMonths, subMonths } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  X,
  StickyNote,
  Zap,
  RotateCcw,
} from "lucide-react";
import CalendarSpine from "@/components/CalendarSpine";
import HeroViewport from "@/components/HeroViewport";
import CalendarGrid from "@/components/CalendarGrid";
import NotesSidecar from "@/components/NotesSidecar";
import { useRangeSelector } from "@/hooks/useRangeSelector";
import { useMechanicalClick } from "@/hooks/useMechanicalClick";
import { getMonthTheme } from "@/lib/monthColors";

export default function ChronosWall() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [flipDir, setFlipDir] = useState<1 | -1>(1);
  const [showNotesMobile, setShowNotesMobile] = useState(false);

  const theme = getMonthTheme(currentDate.getMonth());
  const rangeSelector = useRangeSelector();
  const { play: clickSound } = useMechanicalClick();

  const { range, selectDate, clearRange, rangeMeta } = rangeSelector;

  const handleDateClick = useCallback(
    (date: Date) => {
      clickSound();
      selectDate(date);
    },
    [selectDate, clickSound]
  );

  const goNextMonth = useCallback(() => {
    setFlipDir(1);
    setCurrentDate((d) => addMonths(d, 1));
  }, []);

  const goPrevMonth = useCallback(() => {
    setFlipDir(-1);
    setCurrentDate((d) => subMonths(d, 1));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  // Range badge floating
  const showBadge =
    !!rangeMeta && (range.startDate || range.endDate || range.hoverDate);

  return (
    <div
      className="chronos-perspective w-full flex items-center justify-center min-h-screen px-4 py-8"
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* 3D Wall Container */}
      <div
        className="chronos-wall w-full max-w-5xl"
        style={{
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 60px ${theme.glowColor}`,
          border: `1px solid ${theme.accent}33`,
        }}
      >
        {/* ── Metallic Spine ── */}
        <CalendarSpine />

        {/* ── Main Body ── */}
        <div
          className="flex flex-col md:flex-row"
          style={{ background: "var(--bg-surface)" }}
        >
          {/* ── Left Panel: Hero + Calendar ── */}
          <div className="flex-1 flex flex-col" style={{ minWidth: 0 }}>
            {/* Hero Image */}
            <AnimatePresence mode="wait" custom={flipDir}>
              <motion.div
                key={format(currentDate, "yyyy-MM")}
                custom={flipDir}
                initial={{ rotateX: flipDir * -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: flipDir * 90, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
              >
                <HeroViewport currentDate={currentDate} theme={theme} />
              </motion.div>
            </AnimatePresence>

            {/* ── Month Navigation ── */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: `${theme.accent}22` }}
            >
              <button
                id="prev-month-btn"
                onClick={goPrevMonth}
                className="nav-btn"
                aria-label="Previous month"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-3">
                <motion.div
                  key={format(currentDate, "yyyy-MM")}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <span
                    className="font-mono font-bold tracking-tight"
                    style={{ color: theme.accent, fontSize: "1.05rem" }}
                  >
                    {format(currentDate, "MMMM yyyy")}
                  </span>
                </motion.div>

                <button
                  id="today-btn"
                  onClick={goToToday}
                  className="month-chip cursor-pointer hover:opacity-80 transition-opacity"
                  title="Jump to today"
                  aria-label="Go to today"
                >
                  Today
                </button>
              </div>

              <button
                id="next-month-btn"
                onClick={goNextMonth}
                className="nav-btn"
                aria-label="Next month"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* ── Range Badge ── */}
            <AnimatePresence>
              {showBadge && rangeMeta && (
                <motion.div
                  key="range-badge"
                  initial={{ opacity: 0, y: -8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="mx-4 mt-2 flex items-center justify-between"
                >
                  <div className="range-badge flex items-center gap-2 px-3 py-1.5">
                    <Zap size={10} />
                    <span>
                      {rangeMeta.totalDays} Day
                      {rangeMeta.totalDays !== 1 ? "s" : ""}
                    </span>
                    <span style={{ opacity: 0.5 }}>·</span>
                    <span>
                      {rangeMeta.weekdays} Weekday
                      {rangeMeta.weekdays !== 1 ? "s" : ""}
                    </span>
                    <span style={{ opacity: 0.5 }}>·</span>
                    <span>
                      {rangeMeta.weekendDays} Weekend
                      {rangeMeta.weekendDays !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <button
                    id="clear-range-btn"
                    onClick={clearRange}
                    className="nav-btn p-1 ml-2"
                    aria-label="Clear date range"
                    title="Clear selection"
                  >
                    <RotateCcw size={12} style={{ color: "#f87171" }} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Calendar Grid ── */}
            <AnimatePresence mode="wait" custom={flipDir}>
              <motion.div
                key={format(currentDate, "yyyy-MM") + "-grid"}
                custom={flipDir}
                initial={{ opacity: 0, x: flipDir * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: flipDir * -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <CalendarGrid
                  currentDate={currentDate}
                  theme={theme}
                  rangeSelector={rangeSelector}
                  onDateClick={handleDateClick}
                />
              </motion.div>
            </AnimatePresence>

            {/* ── Heat map legend ── */}
            <div
              className="flex items-center gap-2 px-4 pb-3 pt-1"
              style={{ borderTop: `1px solid ${theme.accent}15` }}
            >
              <span
                className="text-[10px] font-mono"
                style={{ color: "var(--text-faint)" }}
              >
                Coding Streak:
              </span>
              {[0, 1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`heat-${level} rounded-sm`}
                  style={{ width: 12, height: 12, border: "1px solid rgba(255,255,255,0.05)" }}
                  title={`Level ${level}`}
                />
              ))}
              <span
                className="text-[10px] font-mono ml-1"
                style={{ color: "var(--text-faint)" }}
              >
                Low → High
              </span>
            </div>

            {/* ── Mobile: Open Notes button ── */}
            <div className="md:hidden px-4 pb-4">
              <button
                id="mobile-notes-btn"
                onClick={() => setShowNotesMobile(true)}
                className="w-full nav-btn py-2 gap-2 justify-center text-xs font-mono tracking-wider"
                style={{
                  borderColor: `${theme.accent}44`,
                  color: theme.accent,
                }}
              >
                <StickyNote size={14} />
                Open Notes
              </button>
            </div>
          </div>

          {/* ── Right Panel: Notes Sidecar (Desktop) ── */}
          <div
            className="hidden md:flex flex-col border-l"
            style={{
              width: 280,
              flexShrink: 0,
              borderColor: `${theme.accent}22`,
            }}
          >
            <NotesSidecar
              selectedStart={range.startDate}
              selectedEnd={range.endDate}
              currentMonth={currentDate}
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile: Bottom Sheet Notes ── */}
      <AnimatePresence>
        {showNotesMobile && (
          <>
            <motion.div
              className="bottom-sheet-overlay md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotesMobile(false)}
            />
            <motion.div
              className="bottom-sheet md:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Handle */}
              <div className="flex items-center justify-center pt-3 pb-1">
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ background: "var(--text-faint)" }}
                />
              </div>
              <button
                id="mobile-close-notes"
                onClick={() => setShowNotesMobile(false)}
                className="absolute top-3 right-4 p-1 rounded-lg"
                style={{ color: "var(--text-muted)" }}
                aria-label="Close notes"
              >
                <X size={18} />
              </button>
              <NotesSidecar
                selectedStart={range.startDate}
                selectedEnd={range.endDate}
                currentMonth={currentDate}
                theme={theme}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
