"use client";

import React, { useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import DateCell from "@/components/DateCell";
import type { MonthTheme } from "@/lib/monthColors";
import type { UseRangeSelectorReturn } from "@/hooks/useRangeSelector";

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarGridProps {
  currentDate: Date;
  theme: MonthTheme;
  rangeSelector: UseRangeSelectorReturn;
  onDateClick: (date: Date) => void;
}

export default function CalendarGrid({
  currentDate,
  theme,
  rangeSelector,
  onDateClick,
}: CalendarGridProps) {
  const { isStart, isEnd, isInRange, isHoverPreview, setHoverDate } =
    rangeSelector;

  /** Build the 6-week grid (42 cells) */
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [currentDate]);

  return (
    <div className="p-3 md:p-4 select-none">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_HEADERS.map((d) => (
          <div
            key={d}
            className="day-header text-center py-1"
            aria-label={d}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div
        className="grid grid-cols-7 gap-1"
        onMouseLeave={() => setHoverDate(null)}
        role="grid"
        aria-label="Calendar dates"
      >
        {calendarDays.map((day) => (
          <DateCell
            key={day.toISOString()}
            date={day}
            isCurrentMonth={isSameMonth(day, currentDate)}
            isStart={isStart(day)}
            isEnd={isEnd(day)}
            isInRange={isInRange(day)}
            isHoverPreview={isHoverPreview(day)}
            theme={theme}
            onClick={onDateClick}
            onMouseEnter={setHoverDate}
            onMouseLeave={() => setHoverDate(null)}
          />
        ))}
      </div>
    </div>
  );
}
