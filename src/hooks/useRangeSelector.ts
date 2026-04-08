"use client";

import { useState, useCallback } from "react";
import {
  isWithinInterval,
  isSameDay,
  isWeekend,
  differenceInDays,
  startOfDay,
  min,
  max,
} from "date-fns";

export interface RangeState {
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
}

export interface RangeMeta {
  totalDays: number;
  weekendDays: number;
  weekdays: number;
}

export interface UseRangeSelectorReturn {
  range: RangeState;
  selectDate: (date: Date) => void;
  setHoverDate: (date: Date | null) => void;
  clearRange: () => void;
  isStart: (date: Date) => boolean;
  isEnd: (date: Date) => boolean;
  isInRange: (date: Date) => boolean;
  isHoverPreview: (date: Date) => boolean;
  rangeMeta: RangeMeta | null;
}

export function useRangeSelector(): UseRangeSelectorReturn {
  const [range, setRange] = useState<RangeState>({
    startDate: null,
    endDate: null,
    hoverDate: null,
  });

  const selectDate = useCallback((date: Date) => {
    const d = startOfDay(date);
    setRange((prev) => {
      // If nothing selected, or both already selected → start fresh
      if (!prev.startDate || (prev.startDate && prev.endDate)) {
        return { startDate: d, endDate: null, hoverDate: null };
      }
      // Start is set, pick end
      const start = prev.startDate;
      const earlier = startOfDay(min([start, d]));
      const later = startOfDay(max([start, d]));
      return { startDate: earlier, endDate: later, hoverDate: null };
    });
  }, []);

  const setHoverDate = useCallback((date: Date | null) => {
    setRange((prev) => ({ ...prev, hoverDate: date ? startOfDay(date) : null }));
  }, []);

  const clearRange = useCallback(() => {
    setRange({ startDate: null, endDate: null, hoverDate: null });
  }, []);

  /** Effective end for preview (hover or actual end) */
  const effectiveEnd = range.endDate ?? range.hoverDate;

  const isStart = useCallback(
    (date: Date) => !!range.startDate && isSameDay(date, range.startDate),
    [range.startDate]
  );

  const isEnd = useCallback(
    (date: Date) => !!range.endDate && isSameDay(date, range.endDate),
    [range.endDate]
  );

  const isInRange = useCallback(
    (date: Date) => {
      if (!range.startDate || !range.endDate) return false;
      const d = startOfDay(date);
      return (
        isWithinInterval(d, { start: range.startDate, end: range.endDate }) &&
        !isSameDay(d, range.startDate) &&
        !isSameDay(d, range.endDate)
      );
    },
    [range.startDate, range.endDate]
  );

  const isHoverPreview = useCallback(
    (date: Date) => {
      if (!range.startDate || range.endDate || !range.hoverDate) return false;
      const d = startOfDay(date);
      const start = range.startDate;
      const hover = range.hoverDate;
      if (isSameDay(d, start) || isSameDay(d, hover)) return false;
      const lo = min([start, hover]);
      const hi = max([start, hover]);
      return isWithinInterval(d, { start: lo, end: hi });
    },
    [range.startDate, range.endDate, range.hoverDate]
  );

  const rangeMeta: RangeMeta | null =
    range.startDate && effectiveEnd
      ? (() => {
          const start = range.startDate;
          const end = effectiveEnd;
          const lo = min([start, end]);
          const hi = max([start, end]);
          const total = differenceInDays(hi, lo) + 1;
          let weekends = 0;
          for (let i = 0; i < total; i++) {
            const d = new Date(lo);
            d.setDate(lo.getDate() + i);
            if (isWeekend(d)) weekends++;
          }
          return { totalDays: total, weekendDays: weekends, weekdays: total - weekends };
        })()
      : null;

  return {
    range,
    selectDate,
    setHoverDate,
    clearRange,
    isStart,
    isEnd,
    isInRange,
    isHoverPreview,
    rangeMeta,
  };
}
