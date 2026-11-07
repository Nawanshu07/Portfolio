# Tidewell-Inspired Developer Portfolio Design System & Specification

## 1. Vision & Creative Direction

Inspired by **Tidewell**'s serene, high-craft editorial digital experience, this design system transforms Nawanshu's software developer portfolio into a luminous, atmospheric masterwork. It combines deep oceanic navy hues, warm organic cream typography, and glowing sunset coral highlights with fluted ribbed-glass textures, floating frosted glassmorphic navigation, and tactile micro-interactions.

The aesthetic communicates quiet confidence, deep technical mastery, and refined aesthetic restraint — proving that a software engineer can deliver systems that are both mathematically rigorous and visually unforgettable.

---

## 2. Color Palette & Design Tokens

Defined strictly according to the client-provided specifications:

| Token Name | Hex / Value | Role & Visual Expression |
|---|---|---|
| **Deep Navy Canvas** (`navy`) | `#14213D` | Primary brand canvas floor, backdrop base, midnight atmosphere |
| **Navy Deep / Vignette** (`navy-dark`) | `#0B1222` | Edge vignette stops, deep shadow wells, high-contrast code backgrounds |
| **Navy Card Glass** (`navy-card`) | `rgba(20, 33, 61, 0.72)` | Frosted glassmorphism panels with 24px backdrop blur |
| **Warm Aesthetic Cream** (`cream`) | `#F4EDE0` | Primary typographic ink, crisp high-contrast headings, icons |
| **Cream Muted** (`cream-muted`) | `rgba(244, 237, 224, 0.70)` | Secondary descriptive text, metadata labels, active states |
| **Cream Hairline** (`cream-line`) | `rgba(244, 237, 224, 0.14)` | Elegant 1px glass card borders and structural dividers |
| **Vibrant Sunset Coral** (`coral`) | `#FF6B5B` | Primary call-to-action pills, active indicator dots, glowing backlights |
| **Coral Glow** (`coral-glow`) | `rgba(255, 107, 91, 0.32)` | Atmospheric radial diffusion blooming behind fluted glass |
| **Coral Hover** (`coral-hover`) | `#F05847` | Interactive state for primary buttons and focus rings |
| **Coral Badge** (`coral-badge`) | `rgba(255, 107, 91, 0.20)` | Highlight tag background for discount/status badges |

---

## 3. Atmospheric Fluted Glass & Ribbed Backdrop

The signature visual element of the Tidewell hero is the **vertical fluted / ribbed glass texture** illuminated by a central glowing coral bloom:

- **Radial Glow**: An intense warm coral orb (`#FF6B5B` at 35% opacity) radiating from the horizontal center-right, dissolving gracefully into deep navy (`#14213D`) at the outer perimeter.
- **Fluted Ribs**: Vertical linear-gradient stripes spaced at `12px` to `16px` intervals with subtle transparency (`rgba(244, 237, 224, 0.035)` to `transparent`), creating the physical sensation of looking through architectural reeded glass.
- **Vignette & Noise**: Soft radial vignette masking at the edges to ensure zero eye strain and impeccable text legibility.

---

## 4. Typography Scale & Hierarchy

| Role | Font Family | Weight | Tracking | Usage |
|---|---|---|---|---|
| **Display Hero** | Inter / System Sans | 600 / 700 | -0.035em | "Software engineered to feel effortless." |
| **Section Headings** | Inter / EB Garamond | 600 | -0.025em | "Featured Projects", "Engineering Stack" |
| **Card Headings** | Inter | 600 | -0.015em | Project & system titles inside glass modules |
| **Body Running** | Inter | 400 | +0.010em | Hero subtitles, project bios, descriptions |
| **Pill & Nav Labels** | Inter | 500 / 600 | +0.015em | Top capsule links (`● Works`, `Stack`, `About`) |
| **Technical Mono** | JetBrains Mono | 500 | +0.040em | Live metrics, memory stats, commit hashes |

---

## 5. Hero Section Blueprint (Matching First Image)

### 5.1. Top Navigation Bar
- **Left**: Minimalist brand logo with Tidewell-style wave mark: `〰 Nawanshu`.
- **Center**: Centered floating capsule (`rounded-full px-5 py-2.5 backdrop-blur-xl bg-[#14213D]/65 border border-[#F4EDE0]/15`).
  - Active item: `● Works` with glowing Coral `#FF6B5B` dot.
  - Links: `Stack`, `Roadmap`, `About`, `Contact`.
- **Right**:
  - Frosted circle button with GitHub/Search icon.
  - Frosted circle button with menu toggle.

### 5.2. Hero Left Column
- **Hero Title**: Crisp, large-scale modern sans text:
  *"Software engineered to feel effortless."*
- **Hero Subtitle**: Warm cream copy:
  *"From low-level systems in C & C++ to responsive web applications and AI tools. Clean architecture, zero bloat, engineered from the metal up."*
- **Action Buttons**:
  - Primary: Vibrant Coral pill button: `Explore Work »` with smooth hover elevation.
  - Secondary: Ghost link in cream: `See the systems »` with subtle rightward arrow animation on hover.

### 5.3. Hero Right Column (Floating Frosted Glass Card)
Directly mirrors the Point Reyes reservation card:
- **Card Shell**: `backdrop-blur-2xl bg-[#14213D]/70 border border-[#F4EDE0]/18 rounded-3xl p-6 shadow-2xl`.
- **Top Location Bar**: `📍 New Delhi, India · Available for 2026 roles` with subtle glass pill styling.
- **Preview Item 1**:
  - Title: `Virtual Voice Assistant` · Rating: `★ 4.97 rating`
  - Specs: `Python · Speech AI` | `Realtime Audio` | `Zero Latency`
- **Preview Item 2**:
  - Title: `C++ Low-Level Systems` · Rating: `★ 4.94 rating`
  - Specs: `C++20 · DSP Engine` | `60 FPS` | `Hardware Control`
- **Highlight Badge**:
  - Vibrant Coral pill: `Available for Full-time & Internships` (mirrors `Save 20% midweek`).

### 5.4. Hero Bottom Micro-Feature Strip (5 Items)
A horizontal responsive shelf across the bottom with icons and labels:
- **Item 1 (Active)**: `⌂ Hand-crafted systems from the metal up` (features active Coral accent bar above it).
- **Item 2**: `⏱ Realtime response & low latency`.
- **Item 3**: `🔑 Clean code & verified safety`.
- **Item 4**: `🐾 Open source contributor & builder`.
- **Item 5**: `✓ Open for 2026 internships & full-time`.

---

## 6. Cohesive Site-Wide Integration

The entire portfolio adopts this Navy (`#14213D`), Cream (`#F4EDE0`), and Coral (`#FF6B5B`) language:
- **Featured Work**: Dark navy frosted cards with cream typography and coral link accents.
- **Skill Orbit / Stack**: Deep navy space backdrop with glowing coral orbital rings.
- **Roadmap / Timeline**: Subtle cream connecting lines with glowing coral milestone checkpoints.
- **Contact**: Clean frosted glass form with coral submission button and instant feedback.
