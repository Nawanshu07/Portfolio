# Progress Log

## 2026-11-23

- Audited the repository. The earlier site remains recoverable in Git history but is intentionally not being restored; the project is now a clean-slate rebuild.
- Consolidated agent guidance and created `docs/INFO.md` as the content source of truth.
- Completed TASK-001: an original single-page React + TypeScript + Vite portfolio with hero, project work, current direction, contact, responsive layouts, keyboard navigation, focus states, and reduced-motion handling.

## Verification

- Documentation reconciled with the working tree and Git status.
- `npm run build`: passed (TypeScript and Vite production build).
- Local browser review: passed; primary layout and all expected navigation/content landmarks rendered successfully.

## Modified files

- `AGENTS.md`, `GEMINI.md`, `DESIGN.md`
- `docs/PROJECT.md`, `docs/INFO.md`, `docs/TASKS.md`, `docs/PROGRESS.md`, `docs/DECISIONS.md`
- `package.json`, `package-lock.json`, `index.html`, `tsconfig.json`, `vite.config.ts`
- `src/main.tsx`, `src/App.tsx`, `src/index.css`

## 2026-11-23 — Confirmed content reconciliation (TASK-002A)

- Read all eight requested guidance files completely and inspected the app and Git status before edits. Preserved the pre-existing modified, deleted, and untracked work; no restore, deletion, or Git commit performed.
- Aligned location, introduction, availability, project summaries, skills, and learning focus with `docs/INFO.md`. Removed unsupported working-style and first-principles claims.
- Added visible repository links, the supplied Netflix demo URL, and an email action. Added the LinkedIn profile supplied during this session to `docs/INFO.md` and the contact area, omitting share-tracking parameters.
- Corrected the project-description selector so descriptions render as sentence-case body text. Added wrapping link groups and minimum 44px link heights for the new actions.
- Kept the existing original visual system and abstract project artwork.

### Verification performed for this pass

- `npm run build`: passed (TypeScript and Vite production build).
- Node/React static-render assertions: passed for three project articles, external destinations backed by `docs/INFO.md`, valid in-page anchor targets, Alwar, email, Netflix demo, LinkedIn, and absence of removed claims or an unconfirmed resume link.
- The first assertion run failed because PowerShell converted a literal middle-dot character in the test input to `?`; reran successfully using a Unicode escape. No app defect was indicated by that failure.
- HTTP request to the existing local preview at `http://localhost:5173`: returned 200. The existing server was reused and left running.
- `git diff --check`: passed; Git reported line-ending conversion warnings only. Final Git status retained the pre-existing changed/deleted/untracked paths.
- Browser review attempted through CUA: unavailable (`The browser access host is unavailable`). This pass does not verify visual layout at 360px/tablet/desktop, keyboard interaction, reduced-motion behavior, external site availability, or mail-client handoff.

### Modified files in this pass

- `src/App.tsx`, `src/index.css`
- `docs/INFO.md`, `docs/TASKS.md`, `docs/PROGRESS.md`

### Remaining work

- TASK-002: resume link (user will supply later) and project roles/outcomes.
- TASK-003: approved project screenshots or original artwork.
- TASK-004: hosting choice, deployment, and contact interaction verification.
- Browser QA of this content update when browser access is available.

## 2026-11-23 — Original project covers (TASK-003)

Replaced the three CSS illustrations with locally bundled, lazy-loaded WebP covers. The built-in ImageGen brief called for square studio still lifes on charcoal with warm side lighting and one lime accent. The subjects were a satin-aluminum microphone with a lime cable, a vinyl record partly inside its paper sleeve, and a curled amber filmstrip on lime paper. They illustrate the project themes. Each image link uses the project name for assistive technology. Hover zoom is limited to devices with hover and users who allow motion.

Changed files: `src/App.tsx`, `src/index.css`, `src/assets/projects/microphone.webp`, `src/assets/projects/record.webp`, `src/assets/projects/filmstrip.webp`, `docs/TASKS.md`, and `docs/PROGRESS.md`.

`npm run build` passed. Decoded all three 960 × 960 WebP assets, matched them byte-for-byte to both the build outputs and local preview responses, and checked their filenames in the production bundle. Visually reviewed center crops at the two card aspect ratios. Full in-browser layout and interaction checks remain pending because the browser access host was unavailable.

TASK-002 still needs the resume and project roles/outcomes. TASK-004 covers hosting and the contact flow.

## 2026-11-23 — Design takes priority

Updated `docs/TASKS.md` and `docs/PROGRESS.md` to put the full-page design pass and local preview ahead of outstanding content and deployment work. Checked the board order. This planning update changes documentation only. Interface verification belongs to TASK-005.

## 2026-11-23 — Editorial portfolio redesign

Rebuilt the page around the current design specification. The hero pairs a serif introduction with an original CSS line study. The work section leads with Virtual Voice Assistant, followed by two smaller projects. About and contact use confirmed content, fine rules and the same typography. The mobile layout stacks each project in reading order.

Changed files were `src/App.tsx`, `src/index.css` and `docs/PROGRESS.md`. The user removed the task board.

The production build passed. Chromium checks at 360, 768 and 1440 pixels covered horizontal overflow, skip-link focus and activation, section navigation, image decoding, the email destination and reduced-motion settings. Reviewed screenshots at all three widths, then adjusted the mobile hero artwork and work heading. Confirmed all artwork rings fit the final mobile panel and rebuilt successfully.

Resume and project outcomes are pending owner input. Hosting and external contact handoff are outside this design pass.

## 2026-11-23 — Reference-led visual redesign

Reviewed the live Dennis Snellenberg homepage and its desktop rendering. Reworked the portfolio around a cool-gray photographic opening, oversized sans-serif name, cobalt controls, monochrome project photography and a charcoal contact section. Drew a matching slash mark, favicon, globe, arrows and envelope. The project index supports touch, mouse and vertical keyboard navigation. Desktop scroll motion respects the reduced-motion preference.

The original hero was generated with built-in ImageGen. The brief called for a photoreal unbranded vintage CRT computer and keyboard on the right of a seamless gray studio, blue phosphor lines on the screen and open space at left for the name. Optimized the result to a 55 kB WebP.

Changed files: `src/App.tsx`, `src/index.css`, `src/assets/studio-computer.webp`, `public/portfolio-mark.svg`, `index.html`, `docs/PROGRESS.md`.

Verification: production build passed. Chromium checks at 360, 768, 1024 and 1440 pixels covered horizontal overflow, keyboard skip navigation, section links, project selection by click and arrow/Home/End keys, all project images, the Netflix demo link, the email destination and favicon delivery. Reviewed screenshots of the hero at all four widths and the desktop page. Confirmed desktop scroll-driven image movement, its reduced-motion opt-out and page bounds at 320px. The local preview is available for design review. Resume, project outcomes and deployment remain pending.

## 2026-11-23 — Multipage navigation and motion

Added /work, /about, /contact and individual pages for all three featured projects. The home page retains its project tabs and section anchors. Its navigation and project links now open the corresponding pages. The Work gallery links to each project, with repository, demo where supplied, and next-project navigation on detail pages.

The original cobalt curtain shows the destination name on navigation. Normal browser links handle the document change. Page headings reveal on entry, project images respond to hover or keyboard focus, and selected sections rise slightly on scroll in supporting browsers. Reduced motion bypasses these effects.

The production build passed and emitted seven HTML entries. Served dist with Python's static server and checked every route directly in Chromium, including page titles, headings, active navigation and mobile width. Checked project reload, browser Back and Forward, tab selection, contact and demo targets, skip-link focus, visible exit/arrival motion and reduced motion. Reviewed desktop gallery, transition and mobile detail screenshots. Additional dev-preview checks covered repeat clicks, switching reduced motion mid-transition, modifier clicks, tablet width, the old work fragment and keyboard navigation. The automated history check waited for the restored heading because cached browser navigation can skip a new load event. Modifier-click verification checked that the transition handler leaves the native event uncanceled.

Changed files: src/App.tsx, src/PageTransition.tsx, src/pages.ts, src/main.tsx, src/index.css, vite.config.ts, docs/DECISIONS.md and docs/PROGRESS.md. Browser testing covered Chromium. Publication and owner-supplied resume/project outcomes remain pending.

## 2026-11-23 — Button hover and opening motion

Explore work, the About action and the circular email link share a magnetic hover. Their faces follow the mouse within a small range and ease back on leave. The anchors keep their original hit areas. A curved color fill also indicates keyboard focus. Touch inputs use the native links.

Direct arrivals and reloads hold the title for 330 ms before an 850 ms reveal. Internal navigation uses a 420 ms exit, a 70 ms hold and a 650 ms reveal. Heading entrances are timed to the uncovering curtain. Reduced motion skips movement and keeps the focus treatment.

Changed files: src/MagneticLink.tsx, src/App.tsx, src/PageTransition.tsx, src/index.css and docs/PROGRESS.md. The production build passed. Chromium checks covered three hover targets, motion in response to off-center pointer placement, stable anchor bounds, rapid re-entry and release, keyboard focus and activation, cold and internal navigation timing, reload, enabling reduced motion during arrival, and navigation by touch at 360px. Reviewed screenshots of each hovered control. Testing used Chromium desktop and mobile emulation.

## 2026-11-23 — Stronger magnetic pull

Used the local button_animation.mp4 recording to tune the three action buttons. The face follows the pointer farther, the label or icon travels slightly farther inside it, and release produces a damped rebound. The moving face accepts clicks beyond the original anchor bounds.

Changed src/MagneticLink.tsx, src/index.css and docs/PROGRESS.md. The production build passed. At a 1280px viewport, Chromium measured 42px of horizontal travel near the edge of both pill buttons and 28px on the circular email button. Release overshot center by 5–6px and settled. Rapid re-entry, clicking the displaced face, reduced motion and touch-emulated navigation at 360px passed.

## 2026-11-23 — Curved reveal into Contact

On the homepage, the light About section ends in a shallow arc over the charcoal Contact section. Scrolling flattens and lifts the edge as the contact content comes into view. Contact occupies at least a full viewport and shares its background with the footer. With reduced motion, the static curve scrolls with the document. The standalone Contact page retains its existing layout.

Changed src/App.tsx, src/index.css and docs/PROGRESS.md. The production build passed. Checked the midpoint, final screen and reverse scroll in Chromium at 1440×900, 768×1024 and 360×800. Screenshot sampling measured a 51px bow on desktop at the sampled midpoint and confirmed charcoal along both full-height edges of every final screen. Verified email hit testing, keyboard focus order, reduced motion, viewport width and the standalone route. Other browser engines were not tested.

## 2026-11-23 — Remove the route-switch hitch

The supplied recording showed Contact becoming visible again during the transition to Work. Internal links now push the destination URL and render its content under the covered curtain in the current document. The reveal starts immediately. Direct entry and reload retain the existing opening timing.

Changed src/App.tsx, src/PageTransition.tsx and docs/PROGRESS.md. The production build passed. Chromium frame sampling of About to Contact to Work confirmed both content swaps occurred under the curtain, with one document request for the entire sequence. Verified Back, Forward, direct reload, main focus after navigation and reduced motion. Other browser engines were not tested.

## 2026-11-23 — Typography and navbar visibility fix

Loaded Inter (variable weight, 100–900) and JetBrains Mono (400, 500) via Google Fonts with preconnect. Set Inter as the primary typeface for all body/heading text; added `--mono` custom property for JetBrains Mono. Enabled antialiased font rendering (`-webkit-font-smoothing`, `-moz-osx-font-smoothing`, `text-rendering: optimizeLegibility`).

Navbar links now use `font-weight: 500` and `font-size: clamp(.95rem, 1.1vw, 1.1rem)` with tighter letter-spacing so they read clearly against the hero photo. Heading weight bumped from 450 to 500. Eyebrow labels, the project count, footer text, and the curtain mark all use JetBrains Mono for a monospaced metadata feel. Small-screen nav links stay at `.92rem` minimum.

Changed files: `index.html`, `src/index.css`, `docs/PROGRESS.md`. Visual browser QA not performed (Chrome DevTools unavailable). Dev server confirmed running at localhost:5173.

## 2026-11-23 — Name marquee and icon visibility

Added a scroll-reactive marquee at the bottom of the hero. "Nawanshu —" repeats in a continuous loop at `clamp(4.5rem, 14vw, 17rem)` white text, drifting right-to-left at idle. When the user scrolls down the marquee reverses to left-to-right; scrolling up or stopping returns it to the default direction. Speed blends smoothly with a 0.94 decay factor. Two copies of the content wrap seamlessly; the rAF loop measures track width once and re-measures on resize. Reduced motion skips the animation entirely.

The visible h1 is replaced by a `.sr-only` heading for accessibility; the marquee carries `aria-hidden="true"`. The hero-inner now sits at `z-index: 1` above the marquee at `z-index: 0`, keeping buttons and links clickable.

Increased SVG icon strokeWidth from 1.5 to 2 for all non-mark icons, improving visibility against the gray hero background and throughout the site.

Changed files: `src/App.tsx`, `src/index.css`, `docs/PROGRESS.md`. Production build passed. Visual browser QA pending.

## 2026-11-23 — Hero Marquee Elevation and Location Badge Redesign

- **Elevated Name Marquee**: Removed negative bottom offset (`bottom: -0.22em`) and cramped line-height (`0.85`), which had clipped the lower half of the name off-screen. Positioned `.name-marquee` cleanly at `bottom: clamp(1rem, 3svh, 2.8rem)` with `line-height: 1` and pure white `#ffffff` color, ensuring the full height of all letterforms is 100% visible across viewports.
- **Hero Controls Repositioned**: Elevated `.hero-foot` using `bottom: calc(clamp(4.5rem, 13vw, 15rem) + clamp(1.8rem, 3.5vw, 3.5rem))` so the action controls sit cleanly above the giant scrolling text with zero visual collision or overlap.
- **Dennis Snellenberg Style Location Capsule**: Implemented a dark pill badge (`.location-badge`) with two-line location text ("Located in Alwar") and a circular globe badge (`.badge-globe`), echoing the reference site's signature floating capsule.
- **Mobile Responsiveness**: Adjusted marquee scaling (`clamp(3.2rem, 13vw, 5rem)`) and responsive offsets for screens under 48rem.
- **Verification**: `npm run build` passed with 0 errors. Dev server running at `http://localhost:5173/`.

## 2026-11-23 — Marquee Scroll Velocity Calibration

- **Dampened Scroll Sensitivity**: Reduced the scroll delta multiplier from `0.35` down to `0.05` to prevent aggressive speed spikes when scrolling.
- **Clamped Maximum Velocity**: Added velocity bounds (`Math.max(-3.5, Math.min(3.5, ...))`) so even fast trackpad flicks or mouse-wheel spins keep the letters readable without flying wildly.
- **Smoother Friction Decay**: Tuned base drift to a gentle `-0.9px/frame` and adjusted friction decay to `0.92`, restoring natural, calm momentum.
- **Verification**: `npm run build` passed. Checked in local preview.

## 2026-11-23 — Full-Width Dennis Snellenberg Project List Redesign

- **Replaced Tabbed Artwork Panel**: Removed the image previews and tabbed thumbnail panels from the home page.
- **Implemented Editorial Project Table**: Created a full-width divider-line project list matching the reference design:
  - Small uppercase `RECENT WORK` header in monospaced metadata style.
  - Full-bleed divider rules (`border-top` and `border-bottom`).
  - Massive project headlines (`clamp(2.4rem, 5.8vw, 6.2rem)`) on the left with subtle hover slide (`translateX`).
  - Category / role metadata (`Interaction & Automation`, `Software & Application`, `Design & Development`) right-aligned on the right.
- **Scoped Home Display**: Limited home page to top 3 featured projects, with a magnetic "More work" button linking to `/work`.
- **Prepared Work Page**: Configured the `/work` view using the same clean full-width list, ready for 5-6 projects to be added.
- **Verification**: `npm run build` passed with zero errors. Hot-reload verified in local development server.

## 2026-11-23 — Home Footer Call-To-Action to /contact

- **Replaced Email Action with "Get in touch"**: Replaced the mailto icon button with a circular magnetic button displaying "Get in touch" ([src/App.tsx](file:///a:/Portfolio/src/App.tsx#L145-L165)).
- **Integrated Page Transition**: Pinned the link directly to `/contact` so clicking triggers the smooth page transition to the standalone Contact route where the form will be added.
- **Scaled Circular Button Geometry**: Styled `.touch-button` with `width: clamp(7.5rem, 11vw, 11.5rem)` and circular aspect ratio with centered text ([src/index.css](file:///a:/Portfolio/src/index.css#L114-L126)).
- **Verification**: `npm run build` passed with zero errors. Hot-reloaded in local development server.

## 2026-11-23 — Magnetic Pull Calibration

- **Softened Attraction Ratio**: Lowered the cursor offset follow multiplier from `0.62` down to `0.40` in [src/MagneticLink.tsx](file:///a:/Portfolio/src/MagneticLink.tsx#L17-L20) for a more controlled, subtle magnetic attraction.
- **Tightened Travel Limit**: Reduced the maximum physical displacement limit from `42px` (`size * 0.32`) to `26px` (`size * 0.22`), preventing the button from pulling too far off-center.
- **Inner Content Parallax**: Scaled the internal text parallax translation to `0.12` ([src/index.css](file:///a:/Portfolio/src/index.css#L150-L153)).
- **Verification**: `npm run build` passed with zero errors. Live hot-reloaded in browser preview.

## 2026-11-23 — Dennis Snellenberg Contact Page Form

- **Created Dedicated ContactPage**: Added `ContactPage` ([src/App.tsx](file:///a:/Portfolio/src/App.tsx#L224-L345)) replicating Dennis Snellenberg's contact interface at `/contact`:
  - **Left Column**: Prominent heading `Let’s start a project together.`, structured `Contact Details` (`nawanshusharma05@gmail.com`, `Alwar, India`), and `Socials` (GitHub, LinkedIn).
  - **Right Column (Form)**: Numbered horizontal divider fields:
    - `01` `What’s your name?` (`John Doe *`)
    - `02` `What’s your email?` (`john@doe.com *`)
    - `03` `Your message` (`Hello Nawanshu, can you help me with ... *`)
    - (Omitted organization and services fields as requested).
  - **Circular Magnetic Submit Button**: Added `<MagneticLink as="button" type="submit" variant="submit-button">Send it!</MagneticLink>` with liquid fill hover effect and magnetic pointer physics.
  - **Success / Mailto Dispatch**: Form handles submission by opening the user's mail client directly with subject and pre-filled message, and displays a clean confirmation state.
- **Verification**: `npm run build` passed with zero errors. Hot-reloaded in local development server.

## 2026-11-23 — Floating Circular Hamburger Menu & Curved Side Drawer

- **Floating Circular Menu Button**:
  - Implemented a floating cobalt button ([src/NavigationDrawer.tsx](file:///a:/Portfolio/src/NavigationDrawer.tsx)) pinned at `top: clamp(1.2rem, 2.5vw, 2.2rem); right: clamp(1.2rem, 2.5vw, 2.2rem); z-index: 250`.
  - On the home page, the button scales in smoothly once scrolled past the hero (`scrollY > 220px`).
  - On interior pages (e.g. `/contact`, `/work`), the button is visible immediately, matching the Dennis Snellenberg reference.
  - **Center-Origin Radius Expansion**: Button animates using `transform-origin: center center` and `cubic-bezier(0.34, 1.56, 0.64, 1)` spring easing, smoothly expanding its circular radius from 0 to full size upon appearance, decoupled from scroll position.
  - Features an animated two-line hamburger icon (`=`) that smoothly morphs into a close icon (`×`) when active.
  - Separated `.floating-menu-wrap` (handling position and magnetic translation) from `.floating-menu-btn` (handling center radius scale) for clean interaction physics.
- **Organic Curved Wave Side Drawer**:
  - Attached a leading dynamic SVG path (`.menu-curve-svg`) with `viewBox="-100 0 200 100"` to the left edge of the `#1c1d20` drawer.
  - During the entrance animation (680ms cubic ease), the bezier control point bows outward into the screen (`cx` reaching deep negative coordinates) before relaxing flush with the viewport edge upon settling.
  - Styled drawer contents matching Dennis Snellenberg design:
    - Uppercase monospace `NAVIGATION` header with fine rule.
    - Large nav links: `Home`, `Work`, `About`, `Contact` with an active route dot indicator (`•`) and horizontal hover translation.
    - `SOCIALS` section at the bottom linking to GitHub, LinkedIn, and Email from `docs/INFO.md`.
  - Tinted blur backdrop overlay, Escape key listener, and body scroll lock when open.
- **Fixed Contact Form & Submit Button**:
  - Updated [src/MagneticLink.tsx](file:///a:/Portfolio/src/MagneticLink.tsx) to support both `<a>` and `<button as="button">` with `type="submit"`.
  - Fixed button geometry in [src/index.css](file:///a:/Portfolio/src/index.css) (`width`, `height`, `aspect-ratio: 1`, `border-radius: 50%`, `flex-shrink: 0`, and button resets).
  - Fine-tuned magnetic pull ratio from `0.40` to `0.25` with a travel limit of `18px` for subtle, balanced attraction.
- **Verification**:
  - `npm run build`: passed with zero TypeScript and build errors (7 HTML route bundles emitted).
  - HTTP check returned 200 for `/` and `/contact`.
  - Hot reload active in running Vite dev server.
- **Modified files**:
  - `src/NavigationDrawer.tsx` (new)
  - `src/MagneticLink.tsx`
  - `src/App.tsx`
  - `src/index.css`
  - `docs/PROGRESS.md`

## 2026-11-23 — Initial Mount Sidebar Flash Bugfix

- **Root Cause**: The drawer animation `useEffect` in [src/NavigationDrawer.tsx](file:///a:/Portfolio/src/NavigationDrawer.tsx#L75-L145) executed when `isOpen = false` on mount (including React 18 `<StrictMode>` remounting), running the exit animation where `translateX = 0%` at the first frame.
- **Fix**:
  - Replaced the simple mount ref with `hasOpenedRef` state tracking in [src/NavigationDrawer.tsx](file:///a:/Portfolio/src/NavigationDrawer.tsx#L76-L84): if `!isOpen && !hasOpenedRef.current`, the animation effect returns immediately and never initializes.
  - Added `isAnimating` state and `.is-animating` class so the drawer stays active during transitions and safely sleeps when closed.
  - Added `visibility: hidden; pointer-events: none;` on `.menu-drawer` when not active in [src/index.css](file:///a:/Portfolio/src/index.css#L520-L536), making it physically impossible for the closed drawer to render or flash on screen during load or hydration.
- **Verification**: `npm run build` passed with zero errors. All changes kept locally as requested.

## 2026-11-23 — Symmetric Drawer Closing Animation

- **Unified Dynamics**: Updated the closing animation in [src/NavigationDrawer.tsx](file:///a:/Portfolio/src/NavigationDrawer.tsx#L100-L150) so it matches the opening behavior:
  - Both open and close now share the same 650ms duration and smooth `easeInOutCubic` translation (`translateX = eased * 100%`).
  - Both open and close dynamically compute the same organic wave curve (`cx = 100 - Math.sin(progress * Math.PI) * 180`), bowing out toward the viewport at the middle of the transition and flattening back flush.
- **Verification**: `npm run build` passed with zero errors. Hot reload verified on local development server. Not pushed to remote.




## 2026-11-23 — Mobile navigation and layout

Made the floating menu the primary phone navigation, including short touch landscape screens. Kept the curved animation and made rapid direction changes continue from the current drawer position. The open menu locks background interaction, contains keyboard focus and scrolls on short screens. The route curtain covers the floating control during navigation. Fixed intrinsic project image sizing and stacked the contact call to action on narrow phones.

Changed src/NavigationDrawer.tsx, src/App.tsx, src/index.css and docs/PROGRESS.md. Production build passed. Chromium checks at 320×640, 390×844, 844×390, 768×1024 and 1280×800 covered viewport width on all seven routes, homepage contact button bounds, focus cycling, Escape, drawer links, scrollable socials and mobile rapid taps. Tested normal and reduced motion. Physical iOS and Android devices were not tested.

## 2026-11-23 — Homepage hero and navigation legibility

Moved the desktop links onto a solid header. Promoted the introduction to the main headline, grouped it with the work link and location, and gave the existing CRT artwork and moving name separate space. The mobile layout stacks the introduction and image and uses the hamburger for navigation.

Changed src/App.tsx, src/index.css and docs/PROGRESS.md. The production build passed. Chromium viewport checks covered 1919×955, 1024×768, 768×1024, 360×800 and 320×640, including horizontal overflow, headline and image separation, desktop link targets and mobile menu opening and closing. Physical phone verification remains open.

## 2026-11-23 — Unframed homepage artwork

Replaced the framed computer photograph with an original transparent image of an exploded cobalt keyboard switch. Removed the looping name, its animation and the charcoal strip. Changed src/App.tsx, src/index.css and docs/PROGRESS.md and added src/assets/keyboard-switch.webp.

The production build passed. Edge checks at 360×800, 768×1024 and 1919×955 verified image decoding, separation from the headline and controls, absence of the marquee and viewport-width layout.

## 2026-11-23 — Full-width workspace hero

Replaced the keyboard switch with a continuous blue-hour workspace scene, locally bundled as a 44 kB WebP. The desktop photo fills the hero behind the text. At phone widths, the image fades in beneath the introduction and crops toward the laptop and lamp. The work link leads the actions, with Alwar beside it as a plain location label.

Built-in ImageGen prompt

> Create a wide 2:1 editorial photograph for a full-bleed software developer portfolio hero. A quiet modern workstation at blue hour, lit by soft indigo daylight through a tall window. Put an open graphite laptop on a dark walnut desk in the rightmost third, in three-quarter view, with a dim editor showing tiny abstract strokes. Include a single small warm desk lamp toward the far right. Keep the center-left and left 48 percent very dark, nearly featureless deep slate wall for large white website text. Artistically composed with muted blue, charcoal and a touch of amber, natural shadows, realistic materials, and subtle analog grain. The laptop and lamp should read clearly in a square crop of the right side. Entire scene is continuous edge to edge. No people, legible text, logos, retro computer or floating objects.

Changed src/App.tsx, src/index.css and docs/PROGRESS.md. Added src/assets/blue-hour-workspace.webp. The user removed the task board, so this entry records the update.

The production build and Git whitespace check passed. Chromium checks at 320×640, 390×844, 768×1024, 1024×768, 1440×900 and 1919×955 verified image decoding, full-width layout, absence of the marquee and Explore work hit testing. Reviewed screenshots at 390, 1024, 1440 and 1919 pixels. Also verified Explore work, browser Back and About with standard motion and the phone menu and Contact with touch emulation and reduced motion. Physical phone testing remains open.

## 2026-11-23 — Typography-led portfolio

Replaced the homepage photograph with oversized cobalt type, a warm paper background and the original quote “We come and go. The web remembers.” Removed the project images and their imports. Project pages now lead with the category, summary and links in a responsive text layout. The original asset files remain in the workspace.

Changed src/App.tsx, src/index.css, src/pages.ts, docs/INFO.md and docs/PROGRESS.md. The task board had been removed by the user.

The production build and Git whitespace check passed. Chromium checks against the production output loaded all seven routes at 320 and 1440 pixels and confirmed that they display and request no artwork. Checked the homepage from 320 to 1919 pixels for overflow, heading fit with Inter and Arial, and reduced motion. Reviewed desktop and phone screenshots and verified keyboard activation of Explore work, the Netflix project links, next-project navigation, browser Back and the touch menu. Physical phone testing remains open.

## 2026-11-23 — White hero and outlined buttons

Changed the hero background to pure white. Added a 1px solid black border to the moving faces of the action buttons on light sections.

Changed src/index.css and docs/PROGRESS.md. The production build and Git whitespace check passed. Chromium checks at 390px and 1440px confirmed the white hero, black borders on all three light-section buttons, the existing dark-section button style, and keyboard focus and activation of Explore work.

## 2026-11-23 — Homepage quote

Updated the hero and the content source to “The best way to predict the future is to invent it.” The final phrase uses the existing cobalt accent.

Changed src/App.tsx, docs/INFO.md and docs/PROGRESS.md. The production build and Git whitespace check passed. Chromium verified the exact copy, cobalt emphasis and fit at 320, 390, 768 and 1440 pixels.

## 2026-11-23 — Contact form email delivery

Prepared the production contact form to send through the Vercel function at /api/contact. The function validates the submission, sends from the configured Gmail account to nawanshusharma05@gmail.com, and sets Reply-To to the visitor. The form retains the draft if delivery fails. Plain Vite development uses the existing email draft flow. Set VITE_CONTACT_API=1 for local testing with a server that exposes the function.

Changed api/contact.js, src/App.tsx, src/MagneticLink.tsx, tsconfig.json, package.json, package-lock.json and docs/PROGRESS.md.

The production build passed. Node checks covered request method and format, validation, missing credentials, and mocked SMTP success and failure. Chromium with a mocked API verified the production form payload, pending state, failure, retry, success and reset. Git whitespace checks passed.

Live delivery requires the sender address in Vercel as GMAIL_SENDER and the sender account's app password as GMAIL_APP_PASSWORD, followed by deployment and a test submission. No live email was sent.

## 2026-11-23 — Contact form deployed and verified

Built and staged the portfolio on the existing Vercel production project. The staged contact endpoint returned HTTP 405 for GET and HTTP 200 for a test submission. The owner confirmed receipt in the destination Gmail inbox. Promoted the deployment and checked that the domain serves the contact page with HTTP 200 and the contact endpoint rejects GET with HTTP 405.

Ran npm run build, node --check api/contact.js and git diff --check. Vercel linked the project locally and added .vercel to .gitignore. The commit includes the deployed UI and form changes, dependency and TypeScript updates, .gitignore and the documentation. The two unused, untracked hero images remain local.

## 2026-11-23 — Project hover cursor

Added a circular cobalt View cursor to the project lists on Home and Work. It tracks mouse movement over the project links and yields to the native cursor outside the list and with reduced motion. Touch and keyboard access use the project links directly.

Changed src/App.tsx, src/index.css and docs/PROGRESS.md. The production build and Git whitespace check passed. Chromium verified tracking and click-through hit testing on both pages, hiding on exit, keyboard navigation, reduced motion and touch navigation. Deployment remains pending.

## 2026-11-23 — Magnetic project actions and scrollbar

Converted Repository and Live demo into outlined magnetic links with larger arrows. External destinations still open in a new tab. Hid the document scrollbar while preserving page scrolling.

Changed src/App.tsx, src/MagneticLink.tsx, src/index.css and docs/PROGRESS.md. The production build and Git whitespace check passed. Chromium verified all three project detail pages at 320px and 1440px, button size, keyboard focus, new-tab attributes and viewport fit. Also checked wheel scrolling and magnetic movement and release. Deployment remains pending.

## 2026-11-23 — Homepage contact buttons and phone details

Added outlined magnetic email and phone buttons to the homepage contact section with the curved cobalt fill rising from the bottom. The buttons use mailto and tel. Added the supplied phone number to the Contact page and content source.

Changed src/App.tsx, src/MagneticLink.tsx, src/index.css, docs/INFO.md and docs/PROGRESS.md. The production build and Git whitespace check passed. Chromium checked both destinations, keyboard focus, reduced motion and viewport fit at 320px, 390px and 1440px. A desktop check verified the animated fill and release and that the site leaves native link events to the browser. Mail and dialer apps were not opened during the test. Deployment remains pending.

## 2026-11-23 — Responsive hero and touch controls

At 390 × 844 the original hero ended at 623px. The revised hero fills the space below the header, balances the quote across lines, and keeps Explore work visible. Short landscape screens use two columns and allow scrolling when content needs more room. Narrow project rows show a direction arrow. Contact links have larger tap areas, name and email support autofill, and form fields have visible keyboard focus.

Changed `src/index.css`, `src/App.tsx`, `docs/TASKS.md`, and `docs/PROGRESS.md`.

Ran `npm run build` and checked the production output in Edge at 320×568, 360×740, 390×844, 430×932, 600×960, 768×1024, 820×1180, 568×320, 844×390, 1024×768, and 1440×900. All seven routes fit the viewport width. Reviewed portrait, landscape, and Work screenshots. Tested touch navigation from the hero through a project and the menu to Contact with standard and reduced motion, contact field entry and focus, and contact link target heights. The changes are local. Physical-device testing remains open.

## 2026-11-23 — Hero placement and contact spacing

Centered the name, quote, and introduction as a group in the portrait hero. At 390×844 the name starts 248px from the top and Explore work ends at 726px. The homepage contact buttons stack on mobile. On the Contact page, email and phone have individual labeled rows above location and social links. The message form has a distinct background, heading, and individually outlined fields.

Changed `src/App.tsx`, `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`.

The production build passed. Checked responsive bounds on all seven routes at 11 phone, tablet, and desktop viewport sizes. Reviewed phone screenshots of the hero and both contact areas. Verified email and phone destinations, touch navigation with both motion preferences, and form submission, success, and reset with a mocked endpoint. Physical-device testing and deployment remain pending.

## 2026-11-23 — Pale peach background

Applied a shared pale peach color (`#f7f2e8`) to the light page backgrounds, homepage header and hero, light button faces, and curved edge above Contact. Changed `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`.

The production build passed. Edge checks at 390px and 1440px verified the new canvas on Home, Work, About, and a project page, plus the charcoal Contact page background. Reviewed the mobile hero screenshot. The change is local.

## 2026-11-24 — Xwhispers

Added Xwhispers as the newest project on Home and Work. Its detail page at `/work/xwhispers` links to the live chat app. Repository buttons now appear only for projects with a supplied repository URL.

Changed `src/pages.ts`, `src/App.tsx`, `docs/INFO.md`, `docs/TASKS.md`, and `docs/PROGRESS.md`.

`npm run build` passed. Edge checks at 390px and 1440px verified the listings, detail navigation, live link destination, direct reload, viewport fit, and next-project repository link. The supplied demo URL returned HTTP 200 and its HTML title was “Smalltalk.”

## 2026-11-24 — Homepage contact button motion

The Get in touch button slides right into its original alignment as the contact section enters the viewport and retraces its path on upward scroll. It uses the section’s existing CSS scroll timeline. Reduced-motion users and browsers without scroll timeline support see the button in its resting position.

Changed `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge checks at 390px, 768px, and 1440px measured 24px, 31px, and 56px of travel, respectively. Verified reverse scrolling, viewport fit, reduced motion, and keyboard navigation to Contact. The change is local.

## 2026-11-24 — Hero and project list details

The orange stroke under the homepage quote draws in as the page opens. Project titles on Home and Work rise slightly as their rows enter view and follow the scroll back down in reverse. A short cobalt stroke marks the row under the mouse or keyboard focus. With reduced motion the quote and titles are static and the focus stroke appears immediately.

Changed `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge at 320px, 390px, and 1440px verified the quote stroke, forward and reverse title movement, viewport width, and reduced motion. Touch emulation and desktop keyboard checks opened Xwhispers. Desktop hover and keyboard focus checks verified the accent. Changes are local.

## 2026-11-24 — Project rows and button feedback

Removed the cobalt hover and focus stroke from the project lists. Project titles shift slightly on hover or keyboard focus while row padding stays fixed. The Explore work, project action, and Back to top arrows move a few pixels in their pointing direction. Magnetic buttons compress on touch and release on lift or cancellation. Reduced motion keeps these details static.

Changed `src/index.css`, `src/MagneticLink.tsx`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge tests at 1440px verified arrow hover, release and keyboard focus, stable project-row padding, removal of the accent line, focus visibility, and project navigation. At 390px, touch emulation verified the pressed scale, cancellation, reduced motion, and navigation to Work. Changes are local.

## 2026-11-24 — Selecting Home on the homepage

Reproduced a second document request when selecting Home in the drawer. The navigation handler now recognizes links to the current portfolio page, lets the drawer unlock the background, focuses the main content, and returns to the top. Repeated clicks keep the current history entry.

Changed `src/PageTransition.tsx`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge tests at 1440px and 390px covered keyboard and touch drawer selection, repeated clicks on the header logo, scroll position, focus, history length, and Back and Forward through Work. Each run recorded a single document request, including the initial load. Also checked reduced motion at 390px. The fix is local.

## 2026-11-24 — Blue page transition

Page links raise the blank blue curtain over 580 ms. Once it covers the viewport, the destination renders underneath. After 80 ms the title fades and lifts into place over 300 ms, holds for 320 ms, then travels upward with the curtain over 720 ms. Reduced motion switches pages immediately.

Changed `src/PageTransition.tsx`, `src/App.tsx`, `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge frame sampling at 1440px (Work via the header) and 390px (About via the touch menu) verified the blank rise, title appearance on the covered screen, reading pause, and shared upward exit. Also checked Back, reduced motion, and navigation within one document. Changes are local.

## 2026-11-24 — Curved transition edges

Contact and the blue page panel now share the same SVG arc and responsive depth. The upper edge bows upward during entry and the lower edge bows downward during departure. Both sit outside the viewport while the title is held.

Changed `src/SectionCurve.tsx`, `src/PageTransition.tsx`, `src/App.tsx`, `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge screenshot sampling measured matching entry and exit curves of 38px at a 390px viewport and 83px at 1440px. Verified full blue coverage at all four corners during the title hold, the hidden title during entry, and immediate reduced-motion navigation. Changes are local.

## 2026-11-24 — Navbar hover

Work, About, and Contact share the existing magnetic pointer tracking. Their labels and dots move up to 4px horizontally and 2px vertically while the anchors stay fixed. Moving away eases them back to center.

Changed `src/App.tsx`, `src/MagneticLink.tsx`, `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge at 1440px verified both movement directions, return to center, stable anchor bounds, reduced motion, and keyboard navigation. Touch-emulated menu navigation passed at 390px. Changes are local.

Increased the navbar pull slightly, with limits of 5px horizontally and 2.5px vertically. Changed `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. At 1440px, Edge measured horizontal offsets of 3.1–4.8px near the link edges and verified stable click targets, return to center, and reduced motion. The adjustment is local.

## 2026-11-24 — Social and contact link underlines

Underlines expand from the center of each text label on hover and keyboard focus, then retract on release. Applied this to the social links on Home, in the drawer, and on Contact, including the drawer Email link and the Contact page’s email and phone values.

Changed `src/App.tsx`, `src/NavigationDrawer.tsx`, `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge verified intermediate and final underline widths, center alignment, and retraction on all nine links, plus keyboard focus, immediate reduced-motion feedback, the forced-colors underline, and viewport fit at 320px. Changes are local.

## 2026-11-24 — Navbar name and mark

The navbar home link now reads Nawanshu. On hover the three slashes roll up and return from below, while the name slides right and returns from the left. The two parts move within clipped areas inside the same home link.

Changed `src/App.tsx`, `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge verified both directions, final alignment, return to rest and stable link bounds across two desktop hover cycles. Checked reduced motion, keyboard activation, and touch navigation home at 320px. Changes are local.

Refined the mark so each slash starts 100 ms after the previous one, from left to right. Each exits upward and returns from below. Changed `src/App.tsx`, `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge frame sampling verified separate departures and arrivals, final alignment and reset. Also checked the name slide, reduced motion, and navigation home. The change is local.

## 2026-11-24 — Interior menu visibility

On interior desktop pages, the floating menu button appears after the navbar links scroll fully out of view and hides when they return. The header now uses the standard right gutter. Compact layouts keep the menu available at the top.

Changed `src/NavigationDrawer.tsx`, `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge checked Work, About, and Contact at the top, with the navbar partially visible, after scrolling it offscreen, and on return. Also checked opening and closing the drawer, compact navigation, resizing back to desktop, and the existing homepage scroll threshold. Changes are local.

## 2026-11-25 — Diagonal slash motion

The three navbar slashes now move up and right along their angle and enter from below left, preserving their stagger. Changed `src/App.tsx`, `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge verified the final diagonal translation and reduced-motion behavior. The change is local.

## 2026-11-25 — Slower button fills

Increased the button fill transition to 0.7 seconds across button styles. Changed `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge verified the timing and completed fill on four button variants and confirmed reduced motion remains immediate. Changes are local.

## 2026-11-25 — Contact form styling

Refined the message panel with a blue top edge, stronger heading, monospaced labels, larger dark inputs, and blue focus feedback. Changed `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Reviewed Edge screenshots at 390px and 1440px and verified field entry, viewport width, and mocked successful submission and reset. No live message was sent. Changes are local.

## 2026-11-25 — Contact social arrows

The GitHub and LinkedIn arrows travel up and right on hover or keyboard focus and return from below left. Changed `src/App.tsx`, `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge verified the final arrow alignment on both links and reduced-motion behavior. Changes are local.

## 2026-11-25 — Interface review

Reviewed the local site and animation code against the Web Interface Guidelines. The production build passed. Edge checks at 320, 390, 768, and 1440 pixels covered Home, Work, About, Contact, and Xwhispers with reduced motion. Home overflowed by 2, 8, and 19 pixels at the first three widths. A typed contact draft was lost after navigating to Work and using Back. The configured page transition takes about two seconds and ignores additional in-site navigation while the cover is moving. No physical-device or other-engine testing was performed.

Changed `docs/TASKS.md` and `docs/PROGRESS.md` for this review. The identified issues remain open.

## 2026-11-25 — Mobile homepage refinement

Constrained the portrait hero grid and scaled its name to fit narrow screens. Gave the mobile Recent work label a cobalt accent and the project arrows outlined circular treatments with more room in each row. Desktop styles remain outside these mobile rules.

Changed `src/index.css`, `docs/TASKS.md`, and `docs/PROGRESS.md`. The production build passed. Edge checked Home, Work, About, Contact, and Xwhispers at 320×640, 390×844, 430×932, 768×1024, 844×390, and 1440×900 with no horizontal overflow. Reviewed the 390px homepage screenshot and tested touch navigation to a project and Contact plus message entry. Physical-device checks and the contact draft issue remain open. Changes are local.
