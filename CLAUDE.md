# CLAUDE.md — AI Assistant Guide for respmartin.github.io

This file provides context, conventions, and workflows for AI assistants (Claude and others) working on this repository.

---

## Project Overview

**Personal professional portfolio website** for Rebecca Espigares Martin, Sr. Staff Verification Engineer at Synopsys Inc. Deployed at [remartin.me](https://remartin.me) via GitHub Pages.

- **Type:** Static site (Jekyll + Tailwind CSS)
- **Purpose:** Professional portfolio, resume, and academic publications showcase
- **Live site:** https://remartin.me

---

## Technology Stack

| Layer | Tool | Version |
|-------|------|---------|
| Static site generator | Jekyll | 4.3 |
| CSS framework | Tailwind CSS | 3.4.17 |
| Markdown processor | kramdown | latest |
| Ruby gems | Bundler | see Gemfile |
| Node packages | npm | see package.json |
| Hosting | GitHub Pages | — |
| CI/CD | GitHub Actions | — |

**Frontend libraries (loaded via CDN or vendor):**
- Bootstrap Icons 1.11.3 (icons only, no Bootstrap JS)
- AOS (Animate On Scroll)
- GLightbox (lightbox gallery)
- Swiper (carousel/slider)
- Isotope Layout (masonry)
- PureCounter (animated counters)

---

## Repository Structure

```
respmartin.github.io/
├── .github/
│   └── workflows/
│       ├── jekyll.yml           # Primary CI/CD — builds and deploys to GitHub Pages
│       └── jekyll-docker.yml    # Docker-based validation CI
├── _includes/
│   ├── header.html              # Site navigation bar (fixed, with mobile toggle)
│   └── footer.html              # Site footer with social links
├── _layouts/
│   └── default.html             # Master page layout; includes header, footer, JS
├── assets/
│   ├── css/
│   │   ├── tailwind.css         # Tailwind CSS source (INPUT — edit this)
│   │   └── style.css            # Compiled Tailwind output (DO NOT edit manually)
│   ├── img/                     # Site images and testimonial photos
│   ├── js/
│   │   └── main.js              # Scroll reveal, mobile nav, back-to-top logic
│   └── vendor/                  # Third-party JS/CSS libraries
├── index.html                   # Home / hero page
├── about.html                   # Biography and testimonials
├── resume.html                  # Career timeline, skills, education
├── publications.html            # Academic publications list
├── _config.yml                  # Jekyll site config (title, author, email, etc.)
├── tailwind.config.js           # Tailwind customization (colors, fonts, animations)
├── package.json                 # npm scripts for Tailwind build/watch
├── Gemfile                      # Ruby gem dependencies
├── CNAME                        # Custom domain: remartin.me
└── README.md                    # Minimal project README
```

---

## Development Workflow

### Prerequisites

- Ruby (3.1+) with Bundler
- Node.js (20+) with npm

### Local Setup

```bash
# Install Ruby dependencies
bundle install

# Install Node dependencies
npm ci

# Build Tailwind CSS once
npm run build:css

# Serve the site locally with live reload
bundle exec jekyll serve --livereload
```

Site will be available at `http://localhost:4000`.

### CSS Development

Tailwind CSS must be compiled before Jekyll can use the styles.

```bash
# Build once (minified output)
npm run build:css

# Watch for changes during development
npm run watch:css
```

**Always run `npm run build:css` before committing CSS changes.** The compiled `assets/css/style.css` is committed to the repository and must reflect the latest source.

> **Important:** Only edit `assets/css/tailwind.css`. Never manually edit `assets/css/style.css` — it is overwritten by the build.

### Typical Edit Cycle

1. Edit page HTML files (`index.html`, `about.html`, `resume.html`, `publications.html`)
2. Edit templates in `_layouts/` and `_includes/` as needed
3. If CSS changes are needed, edit `assets/css/tailwind.css` and run `npm run build:css`
4. Verify with `bundle exec jekyll serve --livereload`
5. Commit all changes including the compiled `assets/css/style.css`

---

## Branching & Deployment

| Branch | Purpose |
|--------|---------|
| `new_design` | **Production branch** — all CI/CD deploys from here |
| `master` | Legacy / archived |
| `claude/*` | AI assistant development branches |

**CI/CD is triggered on:** push to `new_design`, push to `claude/*` branches, pull requests, and manual dispatch.

**Deployment pipeline** (`.github/workflows/jekyll.yml`):
1. Install Node.js → run `npm ci` → `npm run build:css`
2. Install Ruby → `bundle install`
3. Build with `bundle exec jekyll build`
4. Deploy to GitHub Pages

---

## Design System

### Color Palette (Real Madrid inspired)

Defined in `tailwind.config.js` and used throughout as Tailwind utility classes:

| Token | Hex | Usage |
|-------|-----|-------|
| `gold` | `#F1BE48` | Primary accent, CTAs, highlights |
| `gold-light` | `#F9D57A` | Hover states, lighter accents |
| `gold-dark` | `#C8960E` | Active/pressed states |
| `purple` / `royal` | `#6B3FA0` | Secondary accent |
| `purple-light` | `#9B6FD0` | Hover, labels |
| `bg` | `#FAFAF7` | Page background |
| `bg2` | `#F4F4F1` | Alternate section background |

### Custom CSS Classes (defined in `tailwind.css`)

| Class | Description |
|-------|-------------|
| `.mesh-bg` | Radial gradient overlay (gold + purple ambient light) |
| `.glass` | Frosted glass card (semi-transparent white, blur, border) |
| `.text-gold-gradient` | Gold-to-dark-gold gradient text |
| `.section-label` | Small-caps section header label in purple |
| `.nav-link` | Navigation link with animated gold underline on hover |

### Custom Animations (in `tailwind.config.js`)

| Name | Duration | Effect |
|------|----------|--------|
| `float-slow` | 7s | Slow floating (16px vertical) — decorative orbs |
| `float-fast` | 5s | Faster floating (10px vertical) — decorative orbs |
| `bounce2` | 2s | Bouncing with transform |

### Typography

- **Primary font:** Plus Jakarta Sans (Google Fonts)
- Loaded in `_layouts/default.html` via Google Fonts CDN

### Responsive Layout

- Mobile-first approach using Tailwind's breakpoint prefixes (`sm:`, `md:`, `lg:`)
- Max-width containers: `max-w-4xl` (content), `max-w-7xl` (full width sections)
- Mobile navigation: overlay menu toggled by hamburger button in `_includes/header.html`

---

## Page Structure & Front Matter

All pages follow this pattern:

```html
---
layout: default
title: Page Title
description: Short SEO-friendly description
---

<!-- Page HTML content here -->
```

The `default` layout (`_layouts/default.html`) provides:
- `<head>` with meta tags, fonts, CSS links
- Header include (`_includes/header.html`)
- `{{ content }}` slot
- Footer include (`_includes/footer.html`)
- JS includes (vendor libs + `main.js`)
- Inline scripts for scroll reveal and mobile nav

---

## JavaScript Conventions (`assets/js/main.js`)

Helper utilities:
- `select(el, all)` — querySelector / querySelectorAll wrapper
- `on(type, el, listener, all)` — addEventListener wrapper
- `onscroll(el, listener)` — scroll event wrapper

Key behaviors:
- **Scroll reveal:** Uses `IntersectionObserver` to add `.visible` class to elements with `data-reveal` attribute
- **Mobile nav:** Toggles `.open` class on `#mobile-menu`; overlay closes on link click
- **Back-to-top:** `#back-to-top` button appears after 300px scroll
- **Header effect:** Adds `.scrolled` class to header on scroll (triggers backdrop blur, shadow)

---

## Jekyll Configuration (`_config.yml`)

```yaml
title: Rebecca Espigares Martin
author: Rebecca Espigares Martin
email: (contact email)
description: Personal website and portfolio
markdown: kramdown
exclude: [node_modules, Gemfile, Gemfile.lock, package.json, ...]
```

Modify site-wide metadata here. The `exclude` list prevents non-site files from being copied to `_site/`.

---

## Content Guidelines

### Adding a New Page

1. Create `pagename.html` at the root with YAML front matter
2. Add a navigation link in `_includes/header.html`
3. Follow the existing section/card markup patterns

### Updating Resume or Publications

- **resume.html** — Edit timeline entries directly in HTML; follow the existing `<div>` card structure
- **publications.html** — Add new publication entries following the existing card format (title, abstract, venue, year, authors, links)

### Images

- Store in `assets/img/`
- Testimonial photos go in `assets/img/testimonials/`
- Use descriptive filenames; optimize images before committing

---

## Common Commands Reference

```bash
# Local development
bundle exec jekyll serve --livereload

# CSS rebuild (required after editing tailwind.css)
npm run build:css

# CSS watch mode (during active CSS development)
npm run watch:css

# Full production build (same as CI)
npm run build:css && bundle exec jekyll build

# Check for broken links / build errors
bundle exec jekyll build --verbose
```

---

## Notes for AI Assistants

- **Do not edit `assets/css/style.css` directly** — it is auto-generated from `tailwind.css`
- **Always commit compiled CSS** (`assets/css/style.css`) alongside source changes
- **Production branch is `new_design`** — work on `claude/*` branches and open PRs targeting `new_design`
- **No JavaScript build step** — `main.js` and vendor files are used as-is (no bundler/webpack)
- **Jekyll Liquid templating** is minimal here; most logic is plain HTML with Tailwind classes
- **The site has no database or backend** — all content is static HTML, no CMS
- **Custom domain:** `remartin.me` is set in `CNAME` and configured in GitHub Pages settings — do not modify `CNAME`
