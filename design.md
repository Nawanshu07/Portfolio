# Design Bomb Design System & Architecture Specification

## Overview

Inspired directly by **Design Bomb Festival** ([designbomb.it](https://www.designbomb.it/)), this website transforms Nawanshu's software developer portfolio into a high-voltage, neo-brutalist digital festival experience. It merges high-impact Italian creative direction, bold typography, vivid color blocking, playful stickers, floating navigation docks, and seamless interactive micro-animations.

The aesthetic communicates technical rigor and daring creativity — proving that a software engineer can build web experiences that rival Awwwards Studio of the Year and Framer showcase winners.

---

## 1. Color Palette & Tokens

| Token Name | Hex Code | Purpose & Application |
|---|---|---|
| **Dark Obsidian** (`bg-dark`) | `#141414` | Primary page floor, deep dark cards, high-contrast containers |
| **Electric Lime** (`accent-lime`) | `#ceff00` | Signature brand voltage, primary CTA buttons, active status, starbursts |
| **Hot Pink** (`accent-pink`) | `#ff3eba` | Secondary explosive accent, badge highlights, stickers, special tags |
| **Cobalt Blue** (`accent-blue`) | `#4a60ff` | Interactive links, tech category highlights, secondary buttons |
| **Forest Green** (`accent-green`) | `#31a362` | Live status pulse, success confirmation, verified badges |
| **Vintage Cream** (`surface-cream`)| `#f7f6eb` | Inverted hero cards, ticket badges, contrast marquee bands |
| **Card Charcoal** (`surface-card`) | `#1c1c1f` | Elevated content surfaces, feature card backgrounds |
| **Card Strong** (`surface-strong`) | `#26262b` | Inner wells, code blocks, active filter buttons |
| **Border Hairline** (`border-subtle`)| `rgba(255, 255, 255, 0.12)` | Clean 1px structural separators on dark canvas |
| **Border Brutalist** (`border-bold`)| `#141414` / `#ceff00` | Chunky high-contrast outlines for badges & sticker buttons |

---

## 2. Typography Hierarchy

| Style | Font Family | Weight | Case / Tracking | Application |
|---|---|---|---|---|
| **Display Mega** | Syne / Inter Display | 800 / 900 Italic | Uppercase, -0.04em | Hero headline ("NAWANSHU // DEV BOMB") |
| **Display Section** | Syne / Space Grotesk | 700 / 800 Italic | Uppercase, -0.03em | Section titles ("LINEUP", "PROGRAMMA", "WORKSHOP") |
| **Card Title** | Syne / Space Grotesk | 700 | Normal, -0.02em | Project & Workshop card names |
| **Mono Badge** | JetBrains Mono | 600 / 700 | Uppercase, +0.08em | Timestamps, coordinates, technical tags |
| **Body Running** | Inter | 400 / 500 | Normal, +0.01em | Project descriptions, bios, talk abstracts |
| **Pill Label** | Inter / JetBrains Mono | 700 | Uppercase, +0.05em | Navigation items, filter tabs, action buttons |

---

## 3. Core Component Layouts

### 3.1. Floating Top Header
- Fixed at top (`top-4 left-4 right-4 z-50 max-w-7xl mx-auto`).
- Glass-dock container with rounded-full geometry (`rounded-full px-5 py-3 bg-[#141414]/85 backdrop-blur-md border border-white/10`).
- Left: Brand icon + logo with animated starburst ("NAWANSHU ✦ DEV BOMB").
- Center: Live status indicator pill ("● OPEN FOR WORK & INTERNSHIPS '26").
- Right: High-contrast button in `#ceff00` with instant contact anchor.

### 3.2. Floating Bottom Navigation Dock (Design Bomb Signature)
- Fixed at screen bottom (`bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-50 w-auto`).
- Rounded pill shell with dark backdrop blur: `bg-[#141414]/90 backdrop-blur-xl border border-white/15 px-3 py-2 shadow-2xl`.
- Dynamic active pill indicators for:
  - `01. HOME`
  - `02. LINEUP` (Projects)
  - `03. PROGRAMMA` (Timeline & Schedule)
  - `04. WORKSHOP` (Skills & Labs)
  - `05. THE LAB` (About & Philosophy)
  - `06. GET TICKET / CONTACT` (Vibrant `#ceff00` pill)

### 3.3. Hero Section
- Giant rounded-3xl container (`bg-[#1c1c1f] border border-white/10 p-8 md:p-14`).
- Slanted festival headline: "A FESTIVAL FOR HARDCORE CODE & DIGITAL CRAFT".
- Interactive floating stickers:
  - Tilted sticker: `[💣 100% REVERSED ENGINEERED]`
  - Neon Lime pill: `[★ 2026 EDITION // BCA GRAD]`
  - Location badge: `[📍 NEW DELHI ✦ GLOBAL CLIENTS]`
- Dual high-voltage CTA buttons:
  - Primary: `#ceff00` solid pill with black bold text.
  - Secondary: High-contrast transparent pill with white border and hover inversion.

### 3.4. Dual Infinite Marquee Tickers
- Row 1: Running left with neon lime background (`#ceff00`) and black bold text:
  `✦ PYTHON APPS ✦ C++ & LOW LEVEL ✦ REACT & TYPESCRIPT ✦ SPEECH AI ✦ SYSTEM DESIGN ✦ MOTION UI ✦`
- Row 2: Running right with dark carbon background (`#141414`) and white bold text:
  `★ FULL PASS AVAILABLE ★ EXPLOSIVE PORTFOLIO ★ CLEAN ARCHITECTURE ★ OPEN SOURCE ★`

### 3.5. "Lineup" (Project Grid)
- Filterable by categories: `ALL`, `PYTHON APPS`, `WEB DEVELOPMENT`, `SYSTEMS & DSA`.
- Neo-brutalist card geometry with numbered badges (`01`, `02`, `03`), tech stacks, interactive hover reveals, and direct GitHub/Live link buttons.

### 3.6. "Programma" (Interactive 3-Day Festival Schedule)
- Modeled directly on Design Bomb's schedule:
  - **Day 01 / Foundations**: C, C++, Memory management, Object-Oriented Design.
  - **Day 02 / Active Builds**: Python Speech Assistant, Pygame Audio Engine, Netflix clone.
  - **Day 03 / Next Horizon**: Advanced Web Architecture, Open-Source, Distributed Systems.
- Interactive day filters + category filter pills (`Talks`, `Projects`, `Milestones`, `Code Labs`).
- Expandable accordion rows with time slots, location badges, and comprehensive breakdown.

### 3.7. "Workshop & Cameretta" (Skills & Interactive Tech Lab)
- Hands-on workshop cards with date tags, skill badges, and code playground demonstrations.

### 3.8. "Digital Box / Il Mercatino" (Developer Perks & Toolkit)
- Interactive card offering downloadable CV, GitHub config dotfiles, DSA algorithm cheat sheets, and project starter templates.

### 3.9. Pre-Footer & Contact ("Festival È Qui")
- Massive explosive pre-footer card with warm cream `#f7f6eb` or neon lime `#ceff00` background.
- Working contact form with validation, social links, and Italian festival copyright signature: `Proudly presented by Nawanshu ✦ 2026`.
