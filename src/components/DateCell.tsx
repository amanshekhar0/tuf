"use client";

import React, { memo, useState } from "react";
import { isSameDay, isToday, getDate } from "date-fns";
import { getHeatLevel, getStreakMessage } from "@/lib/mockHeatmap";
import type { MonthTheme } from "@/lib/monthColors";

interface DateCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isHoverPreview: boolean;
  hasNote: boolean;
  theme: MonthTheme;
  onClick: (date: Date) => void;
  onMouseEnter: (date: Date) => void;
  onMouseLeave: () => void;
}

const DateCell = memo(function DateCell({
  date,
  isCurrentMonth,
  isStart,
  isEnd,
  isInRange,
  isHoverPreview,
  hasNote,
  theme,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: DateCellProps) {
  const [showTuf, setShowTuf] = useState(false);
  const dayNum = getDate(date);
  const todayFlag = isToday(date);
  const isTuf31 = dayNum === 31 && isCurrentMonth;

  const heatLevel = isCurrentMonth ? getHeatLevel(date) : 0;
  const streakMsg = getStreakMessage(heatLevel);

  // Build class list
  let cellClass = "date-cell flex items-center justify-center relative ";
  let inlineStyle: React.CSSProperties = {};

  if (isStart || isEnd) {
    cellClass += "selected-start ";
    inlineStyle = {
      background: theme.accent,
      color: "#020617",
      borderColor: theme.accent,
      boxShadow: `0 0 20px ${theme.glowColor}, 0 0 60px ${theme.glowColor}`,
    };
  } else if (isInRange) {
    cellClass += "in-range ";
    inlineStyle = {
      background: `${theme.accent}20`,
      borderColor: `${theme.accent}40`,
      color: theme.accent,
    };
  } else if (isHoverPreview) {
    cellClass += "hover-preview ";
    inlineStyle = {
      background: `${theme.accent}18`,
      borderColor: `${theme.accent}30`,
    };
  } else if (isCurrentMonth) {
    cellClass += `heat-${heatLevel} `;
  }

  if (!isCurrentMonth) {
    cellClass += "other-month ";
  }

  if (todayFlag && !isStart && !isEnd) {
    cellClass += "today ";
    inlineStyle = {
      ...inlineStyle,
      borderColor: `${theme.accent}99`,
    };
  }

  return (
    <div
      className={cellClass.trim()}
      style={{
        ...inlineStyle,
        aspectRatio: "1",
        minHeight: 38,
        maxHeight: 52,
        fontSize: "0.8rem",
        willChange: "transform",
        transform: "translateZ(0)",
        cursor: isCurrentMonth ? "pointer" : "default",
      }}
      onClick={() => isCurrentMonth && onClick(date)}
      onMouseEnter={() => isCurrentMonth && onMouseEnter(date)}
      onMouseLeave={onMouseLeave}
      title={isCurrentMonth ? `${date.toDateString()} — ${streakMsg}` : undefined}
      role={isCurrentMonth ? "button" : undefined}
      aria-pressed={isStart || isEnd}
      aria-label={isCurrentMonth ? `Select ${date.toDateString()}` : undefined}
    >
      {/* Pulse ring for selected dates */}
      {(isStart || isEnd) && <div className="pulse-ring" style={{ borderColor: theme.accent }} />}

      {/* Today dot */}
      {todayFlag && !isStart && !isEnd && (
        <div className="today-dot" style={{ background: theme.accent }} />
      )}

      {/* Note indicator — small pencil dot */}
      {hasNote && isCurrentMonth && !isStart && !isEnd && (
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 3,
            fontSize: 7,
            lineHeight: 1,
            opacity: 0.9,
            pointerEvents: "none",
          }}
          title="Has notes"
          aria-label="Date has notes"
        >
          ✏️
        </div>
      )}

      {/* Note indicator on selected start/end — white dot instead */}
      {hasNote && isCurrentMonth && (isStart || isEnd) && (
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 3,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#020617",
            opacity: 0.7,
            pointerEvents: "none",
          }}
          aria-label="Date has notes"
        />
      )}

      {/* TUF Easter Egg — day 31 */}
      {isTuf31 && (
        <div
          className="absolute top-0.5 right-0.5 z-30 text-[8px] cursor-help select-none"
          onMouseEnter={() => setShowTuf(true)}
          onMouseLeave={() => setShowTuf(false)}
          aria-label="TakeUForward Easter Egg"
        >
          🔥
          {showTuf && (
            <div className="tuf-tooltip">Keep Grinding! - Striver</div>
          )}
        </div>
      )}

      {/* Day number */}
      <span
        style={{
          fontFamily: "var(--font-code)",
          fontWeight: isStart || isEnd ? 700 : 500,
          lineHeight: 1,
          letterSpacing: "0.02em",
        }}
      >
        {dayNum}
      </span>
    </div>
  );
});

export default DateCell;
