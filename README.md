# 🎨 Posterfy

**Free, browser-based event poster maker.** Choose from 9 event types and 5 templates, customize colors, fonts, patterns, and stickers, then export as PNG, JPEG, or PDF — all without signing up. Everything runs client-side. No servers, no accounts, no limits. Your data never leaves your device.

---

## Table of Contents

- [Motivation](#motivation)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Technical Highlights](#technical-highlights)
- [Getting Started](#getting-started)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [License](#license)

---

## Motivation

Most poster-making tools require accounts, push you toward paid tiers, or upload your data to remote servers. Posterfy was built to prove that a fully functional design tool can run entirely in the browser — zero backend, zero cost, zero compromise on privacy. If you have a browser, you have a poster maker.

---

## Features

**Event Types (9 presets)**
- Custom (Blank), Wedding, Conference/CCA, Concert/Music, Birthday Party, Workshop/Class, Charity/Fundraiser, Sports Event, Corporate/Meetup
- Each preset pre-fills the form with tailored sample data, placeholders, colors, and fonts

**Templates**
- Modern, Elegant, Neon, Minimal, Festival
- Live preview updates as you type

**Customization**
- 12 one-click color palettes (Sunset, Ocean, Forest, Party, Neon Night, etc.)
- 8 background patterns (Dots, Grid, Diagonal, Waves, Zigzag, etc.)
- 5 Google Fonts (Inter, Playfair Display, Bebas Neue, Dancing Script, Oswald)
- Text effects: Shadow, Outline, Glow
- Upload background images and logos (stays in browser memory)
- 16 drag-and-drop stickers
- QR code generation from any URL

**Export**
- PNG, JPEG, PDF — all generated client-side
- Copy poster to clipboard
- Batch export all social media sizes as a ZIP
- Social media presets: Instagram Post/Story, Facebook Event, Twitter/X, A4, Letter

**Sharing & Persistence**
- Shareable URL links (design encoded in URL params)
- Export/import templates as JSON files
- Auto-save drafts to LocalStorage
- Undo/Redo with Ctrl+Z / Ctrl+Y (full history stack)

**Accessibility & Mobile**
- Contrast checker warns about low text-to-background ratios
- Fully responsive — mobile tab navigation (Edit/Preview)
- Touch-friendly inputs (16px font, 38px min tap targets)
- PWA with offline support — installable on phone/desktop

**User Guide**
- Built-in accordion-style guide covering all features

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│                                                  │
│  ┌──────────┐   ┌──────────────┐   ┌──────────┐ │
│  │  React   │──▶│ html2canvas  │──▶│ PNG/JPEG │ │
│  │  App     │   │ jsPDF        │──▶│ PDF      │ │
│  │  (Vite)  │   │ JSZip        │──▶│ ZIP      │ │
│  └────┬─────┘   └──────────────┘   └──────────┘ │
│       │                                          │
│  ┌────▼─────┐   ┌──────────────┐                 │
│  │  State   │──▶│ LocalStorage │  (auto-save)    │
│  │ History  │   └──────────────┘                 │
│  └────┬─────┘                                    │
│       │         ┌──────────────┐                 │
│       └────────▶│ URL Params   │  (share links)  │
│                 └──────────────┘                 │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  Service Worker (offline cache / PWA)    │    │
│  └──────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘

No servers. No APIs. No network requests (except Google Fonts).
```

---

## Project Structure

```
event-poster-maker/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service worker for offline support
├── src/
│   ├── components/
│   │   ├── ContrastWarnings   # Accessibility contrast checker
│   │   ├── EventForm          # Main form with event-type-aware fields
│   │   ├── ExportBar          # PNG/JPEG/PDF/clipboard/batch export
│   │   ├── PaletteSelector    # One-click color palettes
│   │   ├── PatternSelector    # Background pattern picker
│   │   ├── PosterPreview      # Live poster renderer with 5 templates
│   │   ├── ShareBar           # Share link, export/import JSON
│   │   ├── SocialSizeSelector # Social media size presets
│   │   ├── StickerPanel       # Drag-and-drop sticker library
│   │   ├── TemplateSelector   # Template picker
│   │   └── UserGuide          # Built-in help modal
│   ├── data/
│   │   ├── eventTypes.js      # 9 event type presets with defaults
│   │   └── palettes.js        # Color palettes, patterns, stickers, sizes
│   ├── utils/
│   │   ├── contrast.js        # WCAG contrast ratio calculations
│   │   ├── format.js          # Date/time formatting
│   │   ├── history.js         # Undo/redo state manager
│   │   ├── share.js           # URL encoding/decoding for sharing
│   │   └── storage.js         # LocalStorage persistence
│   ├── App.jsx                # Root component, state management
│   ├── App.css                # Layout, responsive breakpoints
│   ├── index.css              # Global styles, CSS variables
│   └── main.jsx               # Entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## Technical Highlights

- **Zero-backend architecture** — everything runs in the browser via client-side APIs
- **html2canvas** renders the poster DOM to a canvas for pixel-perfect export
- **jsPDF** generates PDFs from canvas data
- **JSZip** bundles multiple social-media-sized exports into a single ZIP download
- **qrcode** generates QR codes from URLs entirely in JavaScript
- **Undo/Redo** implemented as an immutable history stack with `structuredClone`
- **Auto-save** debounced to LocalStorage (1s delay) — survives page refreshes
- **Stateless sharing** — entire poster config encoded in URL query params
- **Contrast checker** uses WCAG relative luminance formula to flag low-visibility text
- **PWA** with service worker caching for full offline functionality
- **Responsive design** — CSS-only mobile layout with tab navigation, no JS layout libraries

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/posterfy.git
cd posterfy

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open `http://localhost:5173` in your browser. That's it.

To deploy, push the `dist/` folder to GitHub Pages, Netlify, or any static host.

---

## Screenshots

> Add screenshots here after deploying.
>
> Suggested screenshots:
> - Hero shot of the full app (desktop)
> - Event type dropdown in action
> - Different templates side by side
> - Mobile view (Edit tab + Preview tab)
> - Export/share toolbar
> - User guide modal

---

## Roadmap

- [ ] Drag-and-drop element repositioning (move title, date, venue freely)
- [ ] Layer panel with reorder controls
- [ ] Per-element font size, bold, italic controls
- [ ] Element opacity and rotation sliders
- [ ] Snap-to-grid and alignment guides
- [ ] Multi-page posters (front/back of a flyer)
- [ ] Animated poster export as GIF
- [ ] Community template gallery via GitHub PRs
- [ ] "Remix this poster" links
- [ ] Print-ready PDF with bleed and crop marks
- [ ] More event type presets

---

## License

MIT — do whatever you want with it.
