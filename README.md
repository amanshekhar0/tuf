# 🗓️ Striver Chronos-Wall

> **A futuristic 3D interactive wall calendar built for the TakeUForward Frontend Engineering Challenge.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?style=flat-square&logo=framer)

---

## 📸 Preview

The calendar combines a physical wall aesthetic with a developer-productivity toolset — think GitHub contribution heatmaps meets a physical desk calendar, redesigned for 2026.

**Key visual highlights:**
- 3D-perspective canvas with `rotateY(5deg)` wall tilt
- Per-month hero images (Unsplash) with a live hue-rotate CSS animation
- CRT scanline overlay on the hero panel
- GitHub-style coding streak heatmap on every date cell
- Twinkling starfield background

---

## ✨ Features

### 🎨 Visual Architecture
| Feature | Details |
|---|---|
| **3D Wall Canvas** | `perspective: 1500px` + `rotateY(5deg)` — disabled on mobile for UX |
| **Metallic Spiral Spine** | 18 gradient rings with inner hole detail at the top of the calendar |
| **Living Hero Viewport** | Unsplash photo per month with `hue-rotate` cycling over 20s + scanline CRT overlay |
| **12 Month Themes** | Each month switches accent color, hero image, and glow automatically |
| **GitHub Heatmap Grid** | Deterministic pseudo-random "coding streak" colors (5 levels) on every date |
| **Framer Motion Page Flip** | `rotateX(-180deg)` 3D transition on month navigation |
| **Starfield Background** | 80 deterministic twinkling stars + nebula radial gradients |

### ⚡ Interactions
| Feature | Details |
|---|---|
| **Day Range Selector** | Click → start date; hover → liquid preview; click again → end date |
| **Sonar Pulse Animation** | Selected start/end dates animate with an outward "ping" ring |
| **Floating Range Badge** | Shows `N Days · N Weekdays · N Weekends` via `date-fns` math |
| **Cross-Month Ranges** | Range state persists across month navigation |
| **Today Indicator** | Dot marker on today's date |
| **TUF 🔥 Easter Egg** | Day 31 shows a fire emoji; hover reveals: *"Keep Grinding! - Striver"* |

### 📝 Intelligent Notes Sidecar
| Feature | Details |
|---|---|
| **Typewriter Placeholder** | Cycles through developer-themed prompts with character-by-character animation |
| **Real-time Markdown** | Renders `**bold**`, `*italic*`, `` `code` ``, `- lists`, `# headings` live |
| **Per-Date Notes** | Selecting a date loads/saves notes specific to that date |
| **Global Monthly Goals** | No date selected → shows general month-level notes |
| **localStorage Persistence** | All notes survive page refresh — no backend required |
| **Copy as Markdown** | One-click export of the selected range + notes as a formatted `.md` snippet |
| **Edit / Preview Toggle** | Switch between raw editor and rendered markdown view |

### 📱 Responsive Design
| Breakpoint | Behavior |
|---|---|
| **Desktop (≥768px)** | Side-by-side calendar + notes panel; full 3D wall tilt |
| **Mobile (<768px)** | 3D tilt removed; hero becomes a compact header strip; grid stacks vertically |
| **Mobile Notes** | Replaced by an "Open Notes" button that slides up a **bottom-sheet drawer** with spring physics |

### 🔧 Technical Details
| Area | Choices |
|---|---|
| **Performance** | `React.memo` on `DateCell` prevents re-renders during hover; `translateZ(0)` GPU-accelerates cells |
| **Date Math** | `date-fns` for all interval logic, weekend detection, grid building |
| **Audio** | `AudioContext` generates a brown-noise mechanical click on date selection |
| **State** | All client-side — `useState`, `useCallback`, `useMemo`; zero backend |
| **Fonts** | `JetBrains Mono` for date numbers; `Inter` for UI labels (via `next/font`) |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.2 | React framework (App Router) |
| [React](https://react.dev/) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility styling |
| [Framer Motion](https://www.framer.com/motion/) | 12 | 3D animations & spring physics |
| [date-fns](https://date-fns.org/) | 4 | Date math & calendar logic |
| [Lucide React](https://lucide.dev/) | latest | Icon library |
| localStorage | native | Note persistence (no backend) |
| Web Audio API | native | Mechanical click sound synthesis |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts (JetBrains Mono + Inter) + SEO metadata
│   ├── page.tsx            # Entry page — StarField + header + ChronosWall
│   └── globals.css         # Full design token system, animations, heatmap levels
│
├── components/
│   ├── ChronosWall.tsx     # Root orchestrator — 3D canvas, month navigation, state wiring
│   ├── CalendarSpine.tsx   # Metallic spiral binding rendered as gradient div rings
│   ├── HeroViewport.tsx    # Hero image panel with hue-rotate + scanlines + month label
│   ├── CalendarGrid.tsx    # 6-week calendar grid with memoized day computation
│   ├── DateCell.tsx        # Individual date tile (React.memo) — heatmap, pulse, Easter egg
│   ├── NotesSidecar.tsx    # Notes panel — typewriter, markdown, localStorage, copy-MD
│   └── StarField.tsx       # Deterministic twinkling star background
│
├── hooks/
│   ├── useRangeSelector.ts # Range state — start, end, hover, metadata (days/weekdays)
│   ├── useNotes.ts         # Per-date + global monthly note persistence via localStorage
│   └── useMechanicalClick.ts # AudioContext brown-noise click sound synthesis
│
└── lib/
    ├── monthColors.ts      # 12-month theme map (accent color + hero image URL)
    ├── mockHeatmap.ts      # Deterministic pseudo-random coding streak data (0–5)
    └── markdownRenderer.ts # Custom inline markdown → HTML converter
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/amanshekhar0/tuf.git
cd tuf

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

---

## 🎮 How to Use

1. **Navigate months** — Use the `‹` and `›` arrows; the hero image, accent color, and heatmap all update with a 3D page-flip animation.
2. **Select a date range** — Click any date to set the **start**; hover to preview the range; click another date to set the **end**.
3. **View range metadata** — A floating badge appears showing the total days, weekdays, and weekend days in your range.
4. **Take notes** — Click anywhere in the right panel (or "Open Notes" on mobile) to write. Notes auto-save to `localStorage` per selected date.
5. **Markdown notes** — Use `**bold**`, `*italic*`, `` `code` ``, `- list items`, and `# headings`.
6. **Preview markdown** — Click the preview icon (📖) to toggle between editor and rendered view.
7. **Copy as Markdown** — Click **Copy MD** to copy the selected range + notes to clipboard as a formatted snippet.
8. **Discover the Easter egg** — Navigate to any month with a day 31 and hover over it 🔥

---

## 🎨 Design Decisions

- **No backend** — All state is managed client-side with `useState` and `localStorage`. This means zero latency and works offline.
- **Deterministic heatmap** — Rather than random data that changes on every render, the heatmap uses a seeded pseudo-random function keyed on `(year, month, day)`. This avoids hydration mismatches in Next.js SSR and gives each date a stable personal "coding history."
- **`React.memo` on `DateCell`** — With 42 cells re-evaluating hover state on every mouse move, memoization is essential. Each cell only re-renders when its own `isStart / isEnd / isInRange / isHoverPreview` props change.
- **`next/font` instead of CSS `@import`** — Tailwind 4 + Turbopack does not support `@import url()` in CSS files. Fonts are loaded via `next/font/google` in `layout.tsx` for optimal performance and zero layout shift.
- **Framer Motion `AnimatePresence`** — Used for the month flip (3D `rotateX`), the range badge appearing/disappearing, and the mobile bottom-sheet slide-up, giving the app a cohesive, physical feel.

---

## 📋 Submission Checklist

- [x] Wall calendar aesthetic with hero image + date grid
- [x] Day range selector with visual states (start, end, in-range, hover-preview)
- [x] Integrated notes section with markdown support
- [x] Fully responsive — desktop side-by-side + mobile bottom-sheet
- [x] 3D perspective canvas + Framer Motion page flip
- [x] GitHub heatmap coding streak visualization
- [x] Per-month theme sync (accent color + hero image)
- [x] TUF Easter egg on day 31
- [x] Mechanical click sound (AudioContext)
- [x] localStorage persistence — no backend
- [x] Copy selection + notes as Markdown
- [x] Zero TypeScript errors
- [x] Professional README

---

