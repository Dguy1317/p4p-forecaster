# Play for Purpose — Fundraising Forecaster

## Overview

A single-page interactive calculator that lets Irish sports clubs (GAA, Rugby, Soccer) estimate their potential fundraising through the Play for Purpose platform. The page serves as a lead generation tool — clubs see their forecast first, then are prompted to leave contact details.

## Tech Stack

- **Framework:** React 18 + TypeScript (Vite)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Form handling:** Stubbed for now (console log + success state). Will connect to email later.

## Branding

Matches the P4P pitch deck aesthetic:
- **Background:** Dark navy (#0B1026)
- **Headings/accents:** Gold/amber (#E8A838)
- **Card borders:** Colored accents (yellow, pink, coral, cyan) per the deck style
- **Fonts:** Gabarito (headings), Inter (body)
- **Logo:** Play for Purpose shield logo (provided as JPEG, will be used in header)

## Page Flow

### 1. Header
- P4P logo (left)
- Tagline "Impact Through Sport"

### 2. Hero Section
- Headline: "What Could Your Club Generate This Season?"
- Subtext: Brief explanation of the performance-based model
- Dark navy background with subtle gradient/glow effects matching pitch deck

### 3. Sport Selector
- Three clickable cards: GAA, Rugby, Soccer
- Each card has a sport icon and brief descriptor
- Selecting a sport sets default values and reveals the calculator
- Visual feedback on selected card (gold border highlight)

### 4. Calculator

#### Simple Mode (default)
| Input | Type | Default | Range |
|-------|------|---------|-------|
| Number of players | Slider + number | 30 | 10–500 |
| Sponsors per player | Slider + number | 3 | 1–10 |
| Games per season | Slider + number | 15 | 5–40 |

Uses a fixed **€5 average per sponsor per game** in simple mode.

#### Advanced Mode (toggle)
Reveals additional performance-based inputs. All pre-filled with sport-specific defaults so the result matches simple mode unless the user tweaks values.

**GAA defaults:**
| Input | Default | Range |
|-------|---------|-------|
| Avg points per game | 15 | 1–40 |
| Amount per point (€) | 0.50 | 0.10–2.00 |
| Cap per sponsor per game (€) | 5.00 | 1.00–10.00 |

**Rugby defaults:**
| Input | Default | Range |
|-------|---------|-------|
| Avg points per game | 20 | 1–50 |
| Amount per point (€) | 0.50 | 0.10–2.00 |
| Cap per sponsor per game (€) | 5.00 | 1.00–10.00 |

**Soccer defaults:**
| Input | Default | Range |
|-------|---------|-------|
| Avg goals per game | 2 | 0–10 |
| Amount per goal (€) | 3.00 | 1.00–5.00 |
| Cap per sponsor per game (€) | 5.00 | 1.00–10.00 |

### 5. Formula

```
perSponsorPerGame = min(avgScore × ratePerUnit, capPerGame)
seasonTotal = players × sponsorsPerPlayer × perSponsorPerGame × gamesPerSeason
```

In simple mode, `perSponsorPerGame` is always €5.

### 6. Results Display

- **Primary figure:** Large animated euro amount (e.g., "€33,750") in gold, updating live as inputs change
- **Breakdown cards:**
  - Per game: `players × sponsors × €5`
  - Per month: `seasonTotal / 10` (approx season months)
  - Per player contribution: `seasonTotal / players`
- **Comparison strip:** Shows how the number scales at 2x and 3x their player count (contextual "clubs like yours" benchmarks)

### 7. CTA Section

- Headline: "Want to Make This Happen?"
- Subtext: "We'll walk you through exactly how this works for your club"
- Form fields:
  - Club name (required)
  - Contact name (required)
  - Email (required)
  - Phone (optional)
- Submit button: "Get Started" — styled gold/amber
- On submit: Shows success message ("Thanks! We'll be in touch within 24 hours.")
- Submission is stubbed (console.log) — will be wired to email later

### 8. Footer

- P4P logo
- Link to playforpurpose.co
- "A smarter way for sports clubs to generate funding"

## Sport-Specific Defaults

When a sport is selected, the calculator pre-fills with realistic defaults:

| Setting | GAA | Rugby | Soccer |
|---------|-----|-------|--------|
| Default players | 30 | 30 | 25 |
| Default sponsors/player | 3 | 3 | 3 |
| Default games | 15 | 15 | 18 |
| Scoring metric | Points | Points | Goals |
| Default avg score/game | 15 | 20 | 2 |
| Rate per unit | €0.50 | €0.50 | €3.00 |
| Cap per game | €5.00 | €5.00 | €5.00 |

## Non-Goals (for beta)

- No backend or database
- No user accounts or authentication
- No email sending (form is stubbed)
- No analytics tracking (can add later)
- No multi-language support
- No SEO optimization beyond basics

## Deployment

- GitHub repo → Vercel auto-deploy on push to main
- Custom domain can be added later if needed
