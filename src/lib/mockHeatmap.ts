import { format } from "date-fns";

/** Generates deterministic mock "coding streak" heat values (0-5) for any given date */
function pseudoRandom(year: number, month: number, day: number): number {
  const seed = year * 10000 + month * 100 + day;
  const x = Math.sin(seed + 1) * 10000;
  return Math.abs(x - Math.floor(x));
}

export function getHeatLevel(date: Date): 0 | 1 | 2 | 3 | 4 | 5 {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const rand = pseudoRandom(y, m, d);

  // Weighted distribution: more zeros, occasional high streaks
  if (rand < 0.3) return 0;
  if (rand < 0.5) return 1;
  if (rand < 0.7) return 2;
  if (rand < 0.83) return 3;
  if (rand < 0.93) return 4;
  return 5;
}

export function getHeatClass(level: 0 | 1 | 2 | 3 | 4 | 5): string {
  return `heat-${level}`;
}

const STREAK_MESSAGES = [
  "No activity",
  "Just starting",
  "Building momentum",
  "On fire!",
  "Beast mode!",
  "LEGENDARY! 🔥",
];

export function getStreakMessage(level: number): string {
  return STREAK_MESSAGES[level] ?? "No activity";
}

/** Precomputes all heat values for a full month grid */
export function buildMonthHeatmap(
  year: number,
  month: number
): Record<string, 0 | 1 | 2 | 3 | 4 | 5> {
  const map: Record<string, 0 | 1 | 2 | 3 | 4 | 5> = {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    map[format(date, "yyyy-MM-dd")] = getHeatLevel(date);
  }
  return map;
}
