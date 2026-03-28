# Fundraising Forecaster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page fundraising forecaster for Play for Purpose that lets GAA, Rugby, and Soccer clubs estimate their season revenue.

**Architecture:** Single-page React app with no backend. All calculation is client-side. State is managed with React hooks — one central `useForecaster` hook owns all calculator state and derived values. Page is composed of section components rendered top-to-bottom.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, deployed to Vercel.

---

## File Structure

```
src/
  main.tsx                    — React entry point
  App.tsx                     — Root component, composes all sections
  index.css                   — Tailwind directives + custom font imports + global styles
  hooks/
    useForecaster.ts          — All calculator state, sport defaults, derived results
  components/
    Header.tsx                — Logo + tagline
    Hero.tsx                  — Headline + subtext
    SportSelector.tsx         — 3 sport cards, emits selected sport
    Calculator.tsx            — Slider inputs, simple/advanced toggle
    SliderInput.tsx           — Reusable slider + number input pair
    Results.tsx               — Live forecast figure + breakdown cards + comparison
    ContactForm.tsx           — CTA section with stubbed form
    Footer.tsx                — Logo + link + tagline
  data/
    sportDefaults.ts          — Sport-specific default values and config
  utils/
    forecast.ts               — Pure calculation functions
public/
  logo.jpeg                   — P4P logo (copy from project root)
index.html                    — Vite HTML entry with font links
tailwind.config.js            — P4P brand colors + fonts
vite.config.ts                — Vite config
package.json
tsconfig.json
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.js`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `postcss.config.js`
- Copy: `Play for Purpose Logo.jpeg` → `public/logo.jpeg`

- [ ] **Step 1: Scaffold Vite + React + TypeScript project**

```bash
cd "/Users/dylanrogers/Claude Code Projects/P4P"
npm create vite@latest . -- --template react-ts
```

Select "Ignore files and continue" if prompted about existing files.

- [ ] **Step 2: Install Tailwind CSS and dependencies**

```bash
npm install
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Tailwind with P4P brand tokens**

Replace `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1026",
          light: "#131A3A",
          card: "#0F1530",
        },
        gold: {
          DEFAULT: "#E8A838",
          light: "#F0C060",
          dark: "#C48A20",
        },
        accent: {
          yellow: "#E8A838",
          pink: "#E84878",
          coral: "#E87848",
          cyan: "#48C8E8",
        },
      },
      fontFamily: {
        heading: ["Gabarito", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Set up index.css with Tailwind directives and fonts**

Replace `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-navy: #0B1026;
  --color-navy-light: #131A3A;
  --color-navy-card: #0F1530;
  --color-gold: #E8A838;
  --color-gold-light: #F0C060;
  --color-gold-dark: #C48A20;
  --color-accent-yellow: #E8A838;
  --color-accent-pink: #E84878;
  --color-accent-coral: #E87848;
  --color-accent-cyan: #48C8E8;
  --font-heading: "Gabarito", sans-serif;
  --font-body: "Inter", sans-serif;
}

body {
  background-color: var(--color-navy);
  color: white;
  font-family: var(--font-body);
}
```

- [ ] **Step 5: Configure Vite with Tailwind plugin**

Replace `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 6: Add Google Fonts to index.html**

In `index.html`, add inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Update the `<title>` to: `Play for Purpose — Fundraising Forecaster`

- [ ] **Step 7: Copy logo to public directory**

```bash
cp "Play for Purpose Logo.jpeg" public/logo.jpeg
```

- [ ] **Step 8: Set up minimal App.tsx**

Replace `src/App.tsx`:

```tsx
function App() {
  return (
    <div className="min-h-screen bg-navy text-white font-body">
      <h1 className="text-4xl font-heading text-gold text-center pt-20">
        Play for Purpose
      </h1>
      <p className="text-center mt-4 text-white/70">Forecaster coming soon</p>
    </div>
  );
}

export default App;
```

Replace `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 9: Verify the dev server runs**

```bash
npm run dev
```

Expected: App renders at localhost:5173 with dark navy background, gold "Play for Purpose" heading, white subtext. Fonts load correctly (Gabarito heading, Inter body).

- [ ] **Step 10: Delete boilerplate files**

```bash
rm -f src/App.css src/assets/react.svg public/vite.svg
```

- [ ] **Step 11: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + Tailwind with P4P branding"
```

---

## Task 2: Sport Defaults Data + Forecast Utils

**Files:**
- Create: `src/data/sportDefaults.ts`, `src/utils/forecast.ts`

- [ ] **Step 1: Create sport defaults data**

Create `src/data/sportDefaults.ts`:

```ts
export type Sport = "gaa" | "rugby" | "soccer";

export interface SportConfig {
  label: string;
  icon: string;
  description: string;
  scoringMetric: string;
  defaults: {
    players: number;
    sponsorsPerPlayer: number;
    gamesPerSeason: number;
    avgScorePerGame: number;
    ratePerUnit: number;
    capPerGame: number;
  };
  ranges: {
    players: { min: number; max: number };
    sponsorsPerPlayer: { min: number; max: number };
    gamesPerSeason: { min: number; max: number };
    avgScorePerGame: { min: number; max: number };
    ratePerUnit: { min: number; max: number; step: number };
    capPerGame: { min: number; max: number; step: number };
  };
}

export const sportConfigs: Record<Sport, SportConfig> = {
  gaa: {
    label: "GAA",
    icon: "🏐",
    description: "Sponsor per point scored",
    scoringMetric: "points",
    defaults: {
      players: 30,
      sponsorsPerPlayer: 3,
      gamesPerSeason: 15,
      avgScorePerGame: 15,
      ratePerUnit: 0.5,
      capPerGame: 5,
    },
    ranges: {
      players: { min: 10, max: 500 },
      sponsorsPerPlayer: { min: 1, max: 10 },
      gamesPerSeason: { min: 5, max: 40 },
      avgScorePerGame: { min: 1, max: 40 },
      ratePerUnit: { min: 0.1, max: 2.0, step: 0.1 },
      capPerGame: { min: 1, max: 10, step: 0.5 },
    },
  },
  rugby: {
    label: "Rugby",
    icon: "🏉",
    description: "Sponsor per point and per match",
    scoringMetric: "points",
    defaults: {
      players: 30,
      sponsorsPerPlayer: 3,
      gamesPerSeason: 15,
      avgScorePerGame: 20,
      ratePerUnit: 0.5,
      capPerGame: 5,
    },
    ranges: {
      players: { min: 10, max: 500 },
      sponsorsPerPlayer: { min: 1, max: 10 },
      gamesPerSeason: { min: 5, max: 40 },
      avgScorePerGame: { min: 1, max: 50 },
      ratePerUnit: { min: 0.1, max: 2.0, step: 0.1 },
      capPerGame: { min: 1, max: 10, step: 0.5 },
    },
  },
  soccer: {
    label: "Soccer",
    icon: "⚽",
    description: "Sponsor per goal scored",
    scoringMetric: "goals",
    defaults: {
      players: 25,
      sponsorsPerPlayer: 3,
      gamesPerSeason: 18,
      avgScorePerGame: 2,
      ratePerUnit: 3,
      capPerGame: 5,
    },
    ranges: {
      players: { min: 10, max: 500 },
      sponsorsPerPlayer: { min: 1, max: 10 },
      gamesPerSeason: { min: 5, max: 40 },
      avgScorePerGame: { min: 0, max: 10 },
      ratePerUnit: { min: 1, max: 5, step: 0.5 },
      capPerGame: { min: 1, max: 10, step: 0.5 },
    },
  },
};
```

- [ ] **Step 2: Create forecast utility functions**

Create `src/utils/forecast.ts`:

```ts
export interface ForecastInput {
  players: number;
  sponsorsPerPlayer: number;
  gamesPerSeason: number;
  avgScorePerGame: number;
  ratePerUnit: number;
  capPerGame: number;
  isAdvanced: boolean;
}

export interface ForecastResult {
  seasonTotal: number;
  perGame: number;
  perMonth: number;
  perPlayer: number;
  perSponsorPerGame: number;
  atDoubleScale: number;
  atTripleScale: number;
}

const SIMPLE_MODE_RATE = 5;
const SEASON_MONTHS = 10;

export function calculateForecast(input: ForecastInput): ForecastResult {
  const perSponsorPerGame = input.isAdvanced
    ? Math.min(input.avgScorePerGame * input.ratePerUnit, input.capPerGame)
    : SIMPLE_MODE_RATE;

  const seasonTotal =
    input.players *
    input.sponsorsPerPlayer *
    perSponsorPerGame *
    input.gamesPerSeason;

  const perGame = input.players * input.sponsorsPerPlayer * perSponsorPerGame;
  const perMonth = seasonTotal / SEASON_MONTHS;
  const perPlayer = input.players > 0 ? seasonTotal / input.players : 0;

  const atDoubleScale =
    input.players * 2 *
    input.sponsorsPerPlayer *
    perSponsorPerGame *
    input.gamesPerSeason;

  const atTripleScale =
    input.players * 3 *
    input.sponsorsPerPlayer *
    perSponsorPerGame *
    input.gamesPerSeason;

  return {
    seasonTotal,
    perGame,
    perMonth,
    perPlayer,
    perSponsorPerGame,
    atDoubleScale,
    atTripleScale,
  };
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/sportDefaults.ts src/utils/forecast.ts
git commit -m "feat: add sport config data and forecast calculation utils"
```

---

## Task 3: useForecaster Hook

**Files:**
- Create: `src/hooks/useForecaster.ts`

- [ ] **Step 1: Create the useForecaster hook**

Create `src/hooks/useForecaster.ts`:

```ts
import { useState, useMemo, useCallback } from "react";
import { Sport, sportConfigs } from "../data/sportDefaults";
import { calculateForecast, ForecastResult } from "../utils/forecast";

export interface ForecasterState {
  sport: Sport | null;
  players: number;
  sponsorsPerPlayer: number;
  gamesPerSeason: number;
  avgScorePerGame: number;
  ratePerUnit: number;
  capPerGame: number;
  isAdvanced: boolean;
}

export function useForecaster() {
  const [state, setState] = useState<ForecasterState>({
    sport: null,
    players: 30,
    sponsorsPerPlayer: 3,
    gamesPerSeason: 15,
    avgScorePerGame: 15,
    ratePerUnit: 0.5,
    capPerGame: 5,
    isAdvanced: false,
  });

  const selectSport = useCallback((sport: Sport) => {
    const config = sportConfigs[sport];
    setState({
      sport,
      ...config.defaults,
      isAdvanced: false,
    });
  }, []);

  const updateField = useCallback(
    <K extends keyof ForecasterState>(field: K, value: ForecasterState[K]) => {
      setState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const toggleAdvanced = useCallback(() => {
    setState((prev) => ({ ...prev, isAdvanced: !prev.isAdvanced }));
  }, []);

  const result: ForecastResult | null = useMemo(() => {
    if (!state.sport) return null;
    return calculateForecast({
      players: state.players,
      sponsorsPerPlayer: state.sponsorsPerPlayer,
      gamesPerSeason: state.gamesPerSeason,
      avgScorePerGame: state.avgScorePerGame,
      ratePerUnit: state.ratePerUnit,
      capPerGame: state.capPerGame,
      isAdvanced: state.isAdvanced,
    });
  }, [state]);

  const sportConfig = state.sport ? sportConfigs[state.sport] : null;

  return {
    state,
    result,
    sportConfig,
    selectSport,
    updateField,
    toggleAdvanced,
  };
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useForecaster.ts
git commit -m "feat: add useForecaster hook with sport selection and calculation"
```

---

## Task 4: Header + Hero + Footer Components

**Files:**
- Create: `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/components/Footer.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Header component**

Create `src/components/Header.tsx`:

```tsx
export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <img src="/logo.jpeg" alt="Play for Purpose" className="h-10 w-10 rounded" />
        <span className="font-heading font-bold text-lg text-white">
          Play for Purpose
        </span>
      </div>
      <span className="text-white/50 text-sm font-body hidden sm:block">
        Impact Through Sport
      </span>
    </header>
  );
}
```

- [ ] **Step 2: Create Hero component**

Create `src/components/Hero.tsx`:

```tsx
export function Hero() {
  return (
    <section className="text-center px-6 py-16 max-w-4xl mx-auto">
      <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gold leading-tight">
        What Could Your Club Generate This Season?
      </h1>
      <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
        Sponsors contribute a small amount per point or goal, capped at around
        €5 per game. Small contributions add up across every match — all season
        long.
      </p>
    </section>
  );
}
```

- [ ] **Step 3: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="Play for Purpose" className="h-8 w-8 rounded" />
          <span className="font-heading font-semibold text-white">
            Play for Purpose
          </span>
        </div>
        <p className="text-white/40 text-sm text-center">
          A smarter way for sports clubs to generate funding
        </p>
        <a
          href="https://www.playforpurpose.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:text-gold-light text-sm transition-colors"
        >
          playforpurpose.co
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Wire components into App.tsx**

Replace `src/App.tsx`:

```tsx
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-navy text-white font-body">
      <Header />
      <main>
        <Hero />
        {/* SportSelector, Calculator, Results, ContactForm will go here */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

- [ ] **Step 5: Verify dev server renders correctly**

```bash
npm run dev
```

Expected: Header with logo + tagline, gold hero headline, footer with link. All on dark navy background.

- [ ] **Step 6: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/Header.tsx src/components/Hero.tsx src/components/Footer.tsx src/App.tsx
git commit -m "feat: add Header, Hero, and Footer components with P4P branding"
```

---

## Task 5: Sport Selector Component

**Files:**
- Create: `src/components/SportSelector.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create SportSelector component**

Create `src/components/SportSelector.tsx`:

```tsx
import { Sport, sportConfigs } from "../data/sportDefaults";

interface SportSelectorProps {
  selected: Sport | null;
  onSelect: (sport: Sport) => void;
}

const sports: Sport[] = ["gaa", "rugby", "soccer"];

export function SportSelector({ selected, onSelect }: SportSelectorProps) {
  return (
    <section className="px-6 max-w-4xl mx-auto">
      <h2 className="font-heading text-2xl font-bold text-center text-white mb-8">
        Select Your Sport
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sports.map((sport) => {
          const config = sportConfigs[sport];
          const isSelected = selected === sport;
          return (
            <button
              key={sport}
              onClick={() => onSelect(sport)}
              className={`
                rounded-xl p-6 text-center transition-all duration-200
                border-2 cursor-pointer
                ${
                  isSelected
                    ? "border-gold bg-navy-light shadow-lg shadow-gold/10"
                    : "border-white/10 bg-navy-card hover:border-white/30"
                }
              `}
            >
              <span className="text-4xl block mb-3">{config.icon}</span>
              <h3 className="font-heading font-bold text-xl text-white">
                {config.label}
              </h3>
              <p className="text-white/50 text-sm mt-1">{config.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire SportSelector into App.tsx**

Replace `src/App.tsx`:

```tsx
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SportSelector } from "./components/SportSelector";
import { Footer } from "./components/Footer";
import { useForecaster } from "./hooks/useForecaster";

function App() {
  const { state, selectSport } = useForecaster();

  return (
    <div className="min-h-screen bg-navy text-white font-body">
      <Header />
      <main>
        <Hero />
        <SportSelector selected={state.sport} onSelect={selectSport} />
        {/* Calculator, Results, ContactForm will go here */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify sport selection works in browser**

```bash
npm run dev
```

Expected: Three sport cards render. Clicking one highlights it with a gold border. Clicking another switches the selection.

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/SportSelector.tsx src/App.tsx
git commit -m "feat: add sport selector with GAA, Rugby, Soccer cards"
```

---

## Task 6: SliderInput + Calculator Components

**Files:**
- Create: `src/components/SliderInput.tsx`, `src/components/Calculator.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create SliderInput component**

Create `src/components/SliderInput.tsx`:

```tsx
interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  onChange: (value: number) => void;
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  prefix,
  onChange,
}: SliderInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-white/80 text-sm font-medium">{label}</label>
        <div className="flex items-center gap-1">
          {prefix && <span className="text-gold text-sm">{prefix}</span>}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!isNaN(v) && v >= min && v <= max) onChange(v);
            }}
            className="w-20 bg-navy border border-white/20 rounded px-2 py-1 text-right text-gold font-semibold text-sm focus:outline-none focus:border-gold"
          />
        </div>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-gold h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
```

- [ ] **Step 2: Create Calculator component**

Create `src/components/Calculator.tsx`:

```tsx
import { SportConfig } from "../data/sportDefaults";
import { ForecasterState } from "../hooks/useForecaster";
import { SliderInput } from "./SliderInput";

interface CalculatorProps {
  state: ForecasterState;
  sportConfig: SportConfig;
  onUpdate: <K extends keyof ForecasterState>(
    field: K,
    value: ForecasterState[K]
  ) => void;
  onToggleAdvanced: () => void;
}

export function Calculator({
  state,
  sportConfig,
  onUpdate,
  onToggleAdvanced,
}: CalculatorProps) {
  const { ranges } = sportConfig;

  return (
    <section className="px-6 max-w-2xl mx-auto mt-12">
      <div className="bg-navy-card border border-white/10 rounded-2xl p-8 space-y-6">
        <h2 className="font-heading text-xl font-bold text-white">
          Your Club Details
        </h2>

        <SliderInput
          label="Number of Players"
          value={state.players}
          min={ranges.players.min}
          max={ranges.players.max}
          onChange={(v) => onUpdate("players", v)}
        />

        <SliderInput
          label="Sponsors per Player"
          value={state.sponsorsPerPlayer}
          min={ranges.sponsorsPerPlayer.min}
          max={ranges.sponsorsPerPlayer.max}
          onChange={(v) => onUpdate("sponsorsPerPlayer", v)}
        />

        <SliderInput
          label="Games per Season"
          value={state.gamesPerSeason}
          min={ranges.gamesPerSeason.min}
          max={ranges.gamesPerSeason.max}
          onChange={(v) => onUpdate("gamesPerSeason", v)}
        />

        <div className="border-t border-white/10 pt-4">
          <button
            onClick={onToggleAdvanced}
            className="text-gold/70 hover:text-gold text-sm font-medium transition-colors cursor-pointer"
          >
            {state.isAdvanced ? "← Simple Mode" : "Advanced Mode →"}
          </button>
        </div>

        {state.isAdvanced && (
          <div className="space-y-6 pt-2">
            <p className="text-white/40 text-xs">
              Adjust performance-based scoring. Defaults match a typical{" "}
              {sportConfig.label} season.
            </p>

            <SliderInput
              label={`Avg ${sportConfig.scoringMetric} per game`}
              value={state.avgScorePerGame}
              min={ranges.avgScorePerGame.min}
              max={ranges.avgScorePerGame.max}
              onChange={(v) => onUpdate("avgScorePerGame", v)}
            />

            <SliderInput
              label={`Amount per ${sportConfig.scoringMetric === "points" ? "point" : "goal"}`}
              value={state.ratePerUnit}
              min={ranges.ratePerUnit.min}
              max={ranges.ratePerUnit.max}
              step={ranges.ratePerUnit.step}
              prefix="€"
              onChange={(v) => onUpdate("ratePerUnit", v)}
            />

            <SliderInput
              label="Cap per sponsor per game"
              value={state.capPerGame}
              min={ranges.capPerGame.min}
              max={ranges.capPerGame.max}
              step={ranges.capPerGame.step}
              prefix="€"
              onChange={(v) => onUpdate("capPerGame", v)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire Calculator into App.tsx**

Replace `src/App.tsx`:

```tsx
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SportSelector } from "./components/SportSelector";
import { Calculator } from "./components/Calculator";
import { Footer } from "./components/Footer";
import { useForecaster } from "./hooks/useForecaster";

function App() {
  const { state, sportConfig, selectSport, updateField, toggleAdvanced } =
    useForecaster();

  return (
    <div className="min-h-screen bg-navy text-white font-body">
      <Header />
      <main>
        <Hero />
        <SportSelector selected={state.sport} onSelect={selectSport} />
        {state.sport && sportConfig && (
          <Calculator
            state={state}
            sportConfig={sportConfig}
            onUpdate={updateField}
            onToggleAdvanced={toggleAdvanced}
          />
        )}
        {/* Results, ContactForm will go here */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

- [ ] **Step 4: Verify calculator renders and sliders work**

```bash
npm run dev
```

Expected: After selecting a sport, calculator appears with 3 sliders. Toggling "Advanced Mode" reveals 3 more sliders with sport-specific labels. Switching sports resets all values.

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/SliderInput.tsx src/components/Calculator.tsx src/App.tsx
git commit -m "feat: add calculator with slider inputs and simple/advanced mode toggle"
```

---

## Task 7: Results Display Component

**Files:**
- Create: `src/components/Results.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Results component**

Create `src/components/Results.tsx`:

```tsx
import { ForecastResult } from "../utils/forecast";

interface ResultsProps {
  result: ForecastResult;
  players: number;
}

function formatEuro(value: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function Results({ result, players }: ResultsProps) {
  return (
    <section className="px-6 max-w-4xl mx-auto mt-12">
      {/* Primary Figure */}
      <div className="text-center py-10">
        <p className="text-white/50 text-sm uppercase tracking-widest mb-2">
          Estimated Season Total
        </p>
        <p className="font-heading text-5xl md:text-7xl font-bold text-gold">
          {formatEuro(result.seasonTotal)}
        </p>
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-navy-card border border-accent-yellow/30 rounded-xl p-6 text-center">
          <p className="text-white/50 text-sm mb-1">Per Game</p>
          <p className="font-heading text-2xl font-bold text-white">
            {formatEuro(result.perGame)}
          </p>
        </div>
        <div className="bg-navy-card border border-accent-pink/30 rounded-xl p-6 text-center">
          <p className="text-white/50 text-sm mb-1">Per Month</p>
          <p className="font-heading text-2xl font-bold text-white">
            {formatEuro(result.perMonth)}
          </p>
        </div>
        <div className="bg-navy-card border border-accent-coral/30 rounded-xl p-6 text-center">
          <p className="text-white/50 text-sm mb-1">Per Player Contribution</p>
          <p className="font-heading text-2xl font-bold text-white">
            {formatEuro(result.perPlayer)}
          </p>
        </div>
      </div>

      {/* Comparison Strip */}
      <div className="mt-8 bg-navy-card border border-white/10 rounded-xl p-6">
        <p className="text-white/50 text-sm text-center mb-4">
          See how it scales with more players
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gold font-heading text-xl font-bold">
              {formatEuro(result.seasonTotal)}
            </p>
            <p className="text-white/40 text-xs mt-1">{players} players</p>
          </div>
          <div>
            <p className="text-gold font-heading text-xl font-bold">
              {formatEuro(result.atDoubleScale)}
            </p>
            <p className="text-white/40 text-xs mt-1">{players * 2} players</p>
          </div>
          <div>
            <p className="text-gold font-heading text-xl font-bold">
              {formatEuro(result.atTripleScale)}
            </p>
            <p className="text-white/40 text-xs mt-1">{players * 3} players</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire Results into App.tsx**

Replace `src/App.tsx`:

```tsx
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SportSelector } from "./components/SportSelector";
import { Calculator } from "./components/Calculator";
import { Results } from "./components/Results";
import { Footer } from "./components/Footer";
import { useForecaster } from "./hooks/useForecaster";

function App() {
  const {
    state,
    result,
    sportConfig,
    selectSport,
    updateField,
    toggleAdvanced,
  } = useForecaster();

  return (
    <div className="min-h-screen bg-navy text-white font-body">
      <Header />
      <main>
        <Hero />
        <SportSelector selected={state.sport} onSelect={selectSport} />
        {state.sport && sportConfig && (
          <Calculator
            state={state}
            sportConfig={sportConfig}
            onUpdate={updateField}
            onToggleAdvanced={toggleAdvanced}
          />
        )}
        {result && <Results result={result} players={state.players} />}
        {/* ContactForm will go here */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify results display and update live**

```bash
npm run dev
```

Expected: After selecting a sport, the result section shows below the calculator. Moving sliders updates the euro figures in real-time. Breakdown cards show per game, per month, per player. Comparison strip shows 1x, 2x, 3x scaling. GAA with defaults (30 players, 3 sponsors, 15 games) should show €6,750.

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Results.tsx src/App.tsx
git commit -m "feat: add live results display with breakdown cards and scaling comparison"
```

---

## Task 8: Contact Form Component

**Files:**
- Create: `src/components/ContactForm.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create ContactForm component**

Create `src/components/ContactForm.tsx`:

```tsx
import { useState, FormEvent } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    clubName: "",
    contactName: "",
    email: "",
    phone: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Stubbed — will wire to email service later
    console.log("Form submitted:", form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="px-6 max-w-2xl mx-auto mt-16 text-center py-12">
        <div className="bg-navy-card border border-gold/30 rounded-2xl p-10">
          <p className="text-4xl mb-4">✓</p>
          <h2 className="font-heading text-2xl font-bold text-gold">
            Thanks! We'll be in touch within 24 hours.
          </h2>
          <p className="text-white/60 mt-3">
            We'll walk you through exactly how this works for your club.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 max-w-2xl mx-auto mt-16">
      <div className="bg-navy-card border border-white/10 rounded-2xl p-8">
        <h2 className="font-heading text-2xl font-bold text-gold text-center">
          Want to Make This Happen?
        </h2>
        <p className="text-white/60 text-center mt-2 mb-8">
          We'll walk you through exactly how this works for your club
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-1">
              Club Name *
            </label>
            <input
              type="text"
              required
              value={form.clubName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, clubName: e.target.value }))
              }
              className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="e.g. St. Mary's GAA"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-1">
              Contact Name *
            </label>
            <input
              type="text"
              required
              value={form.contactName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, contactName: e.target.value }))
              }
              className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-1">Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="you@club.ie"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-1">
              Phone (optional)
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="083 123 4567"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-gold hover:bg-gold-light text-navy font-heading font-bold py-3 rounded-lg transition-colors text-lg cursor-pointer"
          >
            Get Started
          </button>
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire ContactForm into App.tsx**

Replace `src/App.tsx`:

```tsx
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SportSelector } from "./components/SportSelector";
import { Calculator } from "./components/Calculator";
import { Results } from "./components/Results";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { useForecaster } from "./hooks/useForecaster";

function App() {
  const {
    state,
    result,
    sportConfig,
    selectSport,
    updateField,
    toggleAdvanced,
  } = useForecaster();

  return (
    <div className="min-h-screen bg-navy text-white font-body">
      <Header />
      <main>
        <Hero />
        <SportSelector selected={state.sport} onSelect={selectSport} />
        {state.sport && sportConfig && (
          <Calculator
            state={state}
            sportConfig={sportConfig}
            onUpdate={updateField}
            onToggleAdvanced={toggleAdvanced}
          />
        )}
        {result && <Results result={result} players={state.players} />}
        {result && <ContactForm />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify form renders and submits**

```bash
npm run dev
```

Expected: Contact form appears below results. All fields work. Submitting with required fields filled shows success message. Console shows form data. Submitting with empty required fields triggers browser validation.

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ContactForm.tsx src/App.tsx
git commit -m "feat: add contact form with stubbed submission"
```

---

## Task 9: Final Polish + Deploy

**Files:**
- Modify: Various (minor tweaks)

- [ ] **Step 1: Add smooth scroll and section spacing to App.tsx**

No changes needed — the layout already flows vertically. Verify the full page scrolls smoothly with all sections visible.

- [ ] **Step 2: Add .gitignore entries if missing**

Verify `.gitignore` includes:

```
node_modules
dist
.env
```

- [ ] **Step 3: Full end-to-end test in browser**

```bash
npm run dev
```

Test the complete flow:
1. Page loads with header, hero, sport selector, footer
2. Select GAA → calculator appears with defaults (30 players, 3 sponsors, 15 games)
3. Result shows €6,750 (30 × 3 × €5 × 15)
4. Move players slider to 150 → result updates to €33,750
5. Toggle Advanced → extra sliders appear
6. Change avg points to 20 → per-sponsor becomes min(20 × 0.50, 5) = €5 → no change
7. Change avg points to 8 → per-sponsor becomes min(8 × 0.50, 5) = €4 → result drops
8. Switch to Soccer → all values reset to soccer defaults
9. Fill contact form → submit → success message appears
10. Verify mobile responsiveness (resize browser to ~375px width)

- [ ] **Step 4: Build for production**

```bash
npm run build
```

Expected: Build succeeds. `dist/` directory created.

- [ ] **Step 5: Commit and push**

```bash
git add -A
git commit -m "feat: complete fundraising forecaster beta"
git push origin main
```

- [ ] **Step 6: Deploy to Vercel**

User action: Connect the GitHub repo `Dguy1317/p4p-forecaster` to Vercel:
1. Go to vercel.com/new
2. Import the `p4p-forecaster` repo
3. Framework preset: Vite
4. Deploy

Expected: Site is live at a Vercel URL.
