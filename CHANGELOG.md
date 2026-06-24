# Changelog — Web Fixxies v2

All notable changes to the webfixxies-v2 project are recorded here.

---

## [2026-06-24] — Professionalisation & Colour Refresh

### Added
- **Logo integration**: Real brand logo (`public/logo.png`) added to:
  - Navbar (replaces abstract SVG bolt icon)
  - Hero section (inside badge pill above headline)
  - Mobile menu overlay
  - Footer in ContactSection
- **Git backup branch**: `backup/purple-theme` created to preserve the original purple-themed codebase before this pass.
- **CHANGELOG.md**: This file.

### Changed

#### Colour Palette (`src/index.css`)
- Overhauled root CSS variables from neon-purple/magenta to a professional **charcoal-black × indigo** scheme:
  - `--bg-deepest`: `#04000d` → `#07080a`
  - `--bg-deep`: `#080016` → `#0d0f12`
  - `--bg-mid`: `#0d001f` → `#121519`
  - `--bg-card`: `#1a0035` → `#1e2330`
  - Primary accent (`--violet`): `#7c3aed` → `#4f46e5` (indigo)
  - Bright accent (`--violet-bright`): `#8b5cf6` → `#6366f1`
  - Glow accent (`--violet-glow`): `#a78bfa` → `#818cf8`
  - Removed neon magenta (`#c026d3`, `#e879f9`) — replaced with steel-blue indigo tones
  - Text primary: `#f5f0ff` → `#f1f5f9` (cooler, neutral white)
  - Text muted: `#7c6a99` → `#64748b` (slate)
- Updated `.glow-border`, `.btn-primary`, `.btn-outline`, `.section-tag`, `.glass`, all glow/shadow variables

#### App.tsx
- **Removed `ScanLine` component** — the purple upside-down sweeping line across the page is gone
- **Removed `pulse-grid` animation** from `GridBackground` (was causing unnecessary repaints on a fixed element)
- **Lenis scroll duration** reduced from `1.4` → `1.1` for snappier, more professional feel
- `CursorGlow` colour updated to indigo
- `GridBackground` colour updated to indigo

#### Hero3D.tsx
- 3D crystal colours shifted from purple/magenta to indigo/steel-blue
- Orbit rings colours updated to match new palette
- Canvas DPR cap reduced from `[1, 2]` → `[1, 1.5]` for improved performance on high-DPI screens
- Hero badge pill now uses actual logo instead of dot
- Section tag: `"Next-Gen Web Engineering"` → `"Premium Web Development Studio"`
- Hero body copy rewritten to be professional and direct
- HUD labels:
  - `MATRIX.ACTIVE` → `INFRASTRUCTURE.LIVE`
  - `W.F.PROTOCOL` → `WF.STUDIO`
  - `SYS.ONLINE` → `SERVICES.LIVE`
- Scroll indicator arrow: garbled character → plain `↓`

#### AboutSection.tsx
- Section heading `THE MATRIX` → `THE TEAM` (public-facing header) / `THE STUDIO` (final version)
- Background watermark text `THE MATRIX` → `THE STUDIO`
- Team member copy rewritten for professional tone
- `PROFICIENCY` label → `EXPERTISE`
- All colours updated to indigo palette
- Background gradient updated to charcoal tones

#### MissionSection.tsx
- Logo in laptop mockup premium screen now uses `logo.png`
- All body copy rewritten:
  - Problem cards: removed colloquial phrasing, tightened language
  - Mission statement card: clearer and more direct
- Laptop scan line replaced with a horizontal shimmer bar (non-directional, non-intrusive)
- Status bar label `SYS.ACTIVE` → `ACTIVE`
- Colour palette updated throughout to indigo

#### PricingSection.tsx
- H2: `"THE PRICING CONTINUUM"` → `"Service Tiers"`
- Tier name `"Core 3D Web Framework"` → `"Core Web Experience"`
- Tier name `"Enterprise Experiential Platform"` → `"Enterprise Web Platform"`
- Feature: `"Fully Secure Project Delivery under Parent-Authorized Fiduciary Compliance"` → `"Fully Secure Delivery with Formal Project Agreements"`
- Footer note: replaced "parent-fiduciary compliance" with `"professionally structured project agreements"`
- Badge: `"INTERNATIONAL OUTREACH READY"` → `"INTERNATIONAL READY"`
- CTA button: `"Inquire →"` → `"Enquire →"`
- All colours updated to indigo palette

#### ContactSection.tsx
- H2: `"Strategic Investment & Project Consultation"` → `"Start a Conversation"`
- Legal disclaimer rewritten — removed "parent-fiduciary" language
- Stat card `"< 24h"` → `"< 24 hrs"` (cleaner formatting)
- Footer logo now uses `logo.png` beside wordmark
- Footer copyright: `© 2025` → `© 2026`
- Hover accent colour updated from purple to indigo

#### ParticleField.tsx
- Colour array updated from purple/magenta shades to indigo/slate shades
- Particle density reduced (cap `80` → `65`, density divisor `14000` → `16000`)
- Connection line colour: `rgba(124, 58, 237,…)` → `rgba(99, 102, 241,…)`
- Connection line max alpha reduced from `0.055` → `0.045` (subtler)

### Removed
- `ScanLine` component (the full-page purple horizontal sweep line)
- `pulse-grid` CSS animation from `GridBackground`
- All references to `"Matrix"` visible to end users
- Neon magenta (`#c026d3`, `#e879f9`) from all components
- `scan-y` / `.scan-line` CSS keyframes (no longer used)
- Odd HUD text: `MATRIX.ACTIVE`, `W.F.PROTOCOL`

### Performance
- Lenis scroll easing: `1.4` → `1.1`
- Canvas DPR cap: `[1, 2]` → `[1, 1.5]`
- Particle count reduced by ~19%
- GridBackground no longer runs a recurring CSS animation

---

*Changes applied by Antigravity AI on 2026-06-24.*
