# Zain Portfolio — Agent Guide

## Repo layout

- Workspace root contains only `.git/` and `ZAIN Portfolio/` (the real project root).
- **All commands must run from `ZAIN Portfolio/`.**

## Stack

React 18 + Vite 5 + TypeScript 5.6 (strict) + Tailwind 3.4.  
Animations: GSAP 3.15 (ScrollTrigger) + Framer Motion 12.  
Video: HLS.js 1.6 — Hero.tsx and Contact.tsx reference the same Mux stream URL.  
No router — the app uses `element.scrollIntoView()` for anchor-based nav.

App entry: `src/main.tsx` → `App.tsx`. A `LoadingScreen` component gates the entire app; no content renders until it calls `onComplete`.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server (HMR) |
| `npm run build` | Typecheck (`tsc -b`) + production build |
| `npm run lint` | ESLint 9 flat config on all files |
| `npm run preview` | Preview production build locally |

No test, format, or CI tooling exists.

## Quirks

- `react-router-dom` v7 is in `dependencies` but **unused** in any source file.
- No Prettier or `.editorconfig` — only ESLint for code quality.
- Navbar "Say hi" link uses placeholder `hello@michaelsmith.com`. Real contact email `zaniaqkram@gmail.com` appears in Hero.tsx and Contact.tsx.
- `zain.md` is unrelated Apple iPhone design guidance — not project documentation.
- `.agents/` contains AI skill definitions (brand, frontend design, themes), not project docs.
- `src/index.css` defines `hsl()` CSS custom properties for theming and utility classes (`accent-gradient`, `accent-gradient-text`, `halftone`) used across components.
