# MØE — Mo-Zrt Portfolio (React + TypeScript)

Personal portfolio for MØE aka Mo-Zrt.

## Stack
- **React 18** + **TypeScript**
- **Vite 5** — dev server & build
- **Tailwind CSS 3** — utility classes + design tokens
- **GSAP 3.12** + **ScrollTrigger** — all animations
- **Lenis** — smooth scroll
- **Google Fonts** — Bebas Neue, DM Mono, Instrument Serif

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for production

```bash
npm run build
npm run preview
```

Output goes to `dist/` — drop it on Vercel, Netlify, or GitHub Pages.

## Project structure

```
src/
├── components/
│   ├── Cursor.tsx        # Lagged cursor dot + ring
│   ├── Nav.tsx           # Fixed nav with page-wipe transition
│   ├── Hero.tsx          # Char-split title + parallax Ø
│   ├── Marquee.tsx       # Velocity-reactive scroll ticker
│   ├── Identity.tsx      # Stats grid with countup
│   ├── Disciplines.tsx   # 3D tilt cards (Music, BJJ, Brand)
│   └── Sections.tsx      # Statement, Brand, Contact, Footer
├── hooks/
│   ├── useLenis.ts       # Smooth scroll singleton
│   └── useGSAPReveal.ts  # Reusable scroll-reveal hook
├── types/
│   └── index.ts          # Shared TypeScript interfaces
├── styles/
│   └── globals.css       # All custom CSS + Tailwind base
├── App.tsx               # Root layout
└── main.tsx              # Entry point
```

## Customising

| What | Where |
|---|---|
| Email address | `src/components/Sections.tsx` → `Contact` → `href` |
| Social links | `src/components/Sections.tsx` → `SOCIALS` array |
| Brand copy | Each component's data array at the top of the file |
| Colors | `src/styles/globals.css` → `:root` variables |
| Tailwind tokens | `tailwind.config.js` |

## Adding new features
Every section is its own component — add pages via React Router,
add a blog via a `src/pages/` directory, or drop in a new section
component and register it in `App.tsx`. The `useGSAPReveal` hook
is ready to use on any new element.
