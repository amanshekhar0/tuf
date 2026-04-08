/** Per-month accent colors — drives selection, badges, and glow */
export interface MonthTheme {
  accent: string;
  accentRgb: string;
  glowColor: string;
  label: string;
  heroImage: string;
}

export const MONTH_THEMES: MonthTheme[] = [
  // Jan
  {
    accent: "#60a5fa",
    accentRgb: "96,165,250",
    glowColor: "rgba(96,165,250,0.35)",
    label: "Winter Blue",
    heroImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200",
  },
  // Feb
  {
    accent: "#f472b6",
    accentRgb: "244,114,182",
    glowColor: "rgba(244,114,182,0.35)",
    label: "Rose",
    heroImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200",
  },
  // Mar
  {
    accent: "#34d399",
    accentRgb: "52,211,153",
    glowColor: "rgba(52,211,153,0.35)",
    label: "Spring Emerald",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200",
  },
  // Apr
  {
    accent: "#86efac",
    accentRgb: "134,239,172",
    glowColor: "rgba(134,239,172,0.35)",
    label: "Fresh Green",
    heroImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
  },
  // May
  {
    accent: "#fde68a",
    accentRgb: "253,230,138",
    glowColor: "rgba(253,230,138,0.35)",
    label: "Golden",
    heroImage:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&q=80&w=1200",
  },
  // Jun
  {
    accent: "#fb923c",
    accentRgb: "251,146,60",
    glowColor: "rgba(251,146,60,0.35)",
    label: "Summer Amber",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
  },
  // Jul
  {
    accent: "#f87171",
    accentRgb: "248,113,113",
    glowColor: "rgba(248,113,113,0.35)",
    label: "Coral",
    heroImage:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200",
  },
  // Aug
  {
    accent: "#c084fc",
    accentRgb: "192,132,252",
    glowColor: "rgba(192,132,252,0.35)",
    label: "Violet",
    heroImage:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=1200",
  },
  // Sep
  {
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    glowColor: "rgba(245,158,11,0.35)",
    label: "Harvest Gold",
    heroImage:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200",
  },
  // Oct
  {
    accent: "#22d3ee",
    accentRgb: "34,211,238",
    glowColor: "rgba(34,211,238,0.35)",
    label: "Neo Cyan",
    heroImage:
      "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200",
  },
  // Nov
  {
    accent: "#6366f1",
    accentRgb: "99,102,241",
    glowColor: "rgba(99,102,241,0.35)",
    label: "Electric Indigo",
    heroImage:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1200",
  },
  // Dec
  {
    accent: "#a78bfa",
    accentRgb: "167,139,250",
    glowColor: "rgba(167,139,250,0.35)",
    label: "Amethyst",
    heroImage:
      "https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&q=80&w=1200",
  },
];

export function getMonthTheme(monthIndex: number): MonthTheme {
  return MONTH_THEMES[monthIndex] ?? MONTH_THEMES[9];
}
