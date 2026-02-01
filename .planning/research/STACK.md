# Technology Stack Research

**Domain:** Static Artist Portfolio Website
**Researched:** 2026-01-31
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| HTML5 | Latest | Page structure | Native semantic markup, no dependencies, perfect for static sites. Universal browser support. |
| CSS3 | Latest | Styling & layout | Native CSS Grid and Flexbox eliminate need for layout libraries. CSS custom properties for theming. Modern features like `aspect-ratio` simplify responsive design. |
| Vanilla JavaScript | ES6+ (ES2015+) | Interactivity | Native ES6 modules work in all modern browsers (95%+ support). No build step needed. Web APIs provide everything needed for galleries, forms, and animations. |

**Rationale for "No Frameworks":** The vanilla-first movement in 2026 emphasizes surgical, performance-focused development. For artist portfolios with ~10-20 pages and simple interactivity, frameworks add 100KB+ overhead with zero benefit. Native browser APIs are now mature enough to handle all requirements.

### Image Optimization

| Tool/Technology | Version | Purpose | Why Recommended |
|-----------------|---------|---------|-----------------|
| WebP | Latest | Modern image format | 25-35% smaller than JPEG with same quality. 97%+ browser support. Chrome, Firefox, Safari, Edge all support. |
| AVIF | Latest | Next-gen image format | 50% smaller than JPEG, better than WebP. Support in all major browsers as of 2025. Use as primary with WebP fallback. |
| `<picture>` element | HTML5 | Format fallback | Native HTML element for serving AVIF → WebP → JPEG cascade. Zero JavaScript required. |
| `loading="lazy"` | HTML5 | Native lazy loading | Built-in browser lazy loading. 95%+ support (Chrome, Firefox, Edge, Safari 15.4+). Zero dependencies. |
| `srcset` & `sizes` | HTML5 | Responsive images | Browser chooses optimal image size based on viewport. Critical for mobile performance. |

**Image Workflow:**
1. Keep originals in PNG/JPEG
2. Convert to AVIF + WebP using Squoosh or ImageOptim
3. Use `<picture>` with AVIF first, WebP second, JPEG fallback
4. Add `loading="lazy"` to all non-hero images
5. Use `fetchpriority="high"` on hero/LCP images

### Gallery & Lightbox

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| GLightbox | 3.x | Image lightbox | Pure vanilla JS, 11KB gzipped. No jQuery. Supports zoom, swipe, keyboard nav. MIT license. Active maintenance (2.4k GitHub stars). |

**Alternatives Considered:**
- **lightGallery.js**: Good but heavier (~50KB). Overkill for simple portfolio.
- **fsLightbox**: Commercial license required for some uses.
- **LiteLight**: Minimal (3KB) but lacks zoom/gestures features.

**Why GLightbox:** Best balance of features vs size. Touch/mobile support critical for art portfolios. Responsive images support built-in.

### Layout & Grid

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| CSS Grid | CSS3 | Gallery layouts | Native browser support. Perfect for irregular "wall gallery" layouts. No JavaScript needed for layout. |
| Masonry Grid | 1.4KB | Optional: Dynamic masonry | If dynamic masonry needed, this is the lightest option. Pure CSS Grid + minimal JS. Works without React/frameworks. |

**Important Note on Masonry:** Native CSS masonry (`grid-template-rows: masonry`) is still experimental in 2026 (Firefox + Safari Tech Preview only). For production, use:
1. **CSS Grid with manual placement** (recommended for ~20 images)
2. **Masonry Grid library (1.4KB)** if dynamic/CMS-driven

**Why NOT classic Masonry.js:** Last updated 2017, 24KB, outdated. Modern alternatives are 95% smaller.

### Form Handling

| Service | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| Formspree | API v1 | Contact form backend | Free tier: 50 submissions/month. No credit card. AJAX support. Spam protection (reCAPTCHA). Direct email delivery. Industry standard for static sites. |
| EmailJS | 3.x | Alternative form service | Free tier: 200 emails/month (better than Formspree). 2 templates, 50KB limit. Requires SMTP config. |

**Recommendation:** Use **Formspree** for simplicity. Use **EmailJS** if you need >50 submissions/month and have SMTP access.

**Why NOT server-side:** GitHub Pages is static-only. No Node.js, no PHP. Must use third-party API.

### Data Management

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| JSON files | Native | Content storage | Static site requirement. Easy to edit, version control, no database. Perfect for ~50-100 artworks. |
| Google Sheets API | v4 | Newsletter collection | Free tier unlimited. OAuth 2.0 auth. Can append rows via JavaScript. Alternative to paid form services. |

**Google Sheets Integration:**
- **For development:** Use API key + OAuth (Google Identity Services)
- **For production:** Consider security implications of client-side API keys
- **Alternative:** Use Formspree's Google Sheets integration (no code needed)

**Caution:** Google Sheets API requires client ID and credentials. For newsletter popup, Formspree → Google Sheets integration is simpler and more secure than direct API calls from browser.

### Development Tools

| Tool | Version | Purpose | Why Recommended |
|------|---------|---------|-----------------|
| npm scripts | npm 10.x | Task automation | Lightweight build tasks (image optimization, minification). No webpack/vite needed. |
| browser-sync | 3.x | Dev server | Live reload. Simple static server. Auto-refreshes on file changes. |
| html-minifier | 4.x | HTML optimization | Minify HTML for production. npm script integration. |
| uglify-js | 3.x | JS minification | Compress vanilla JS for production. ES6+ support. |

**Development Workflow:**
```bash
npm run dev    # browser-sync for local development
npm run build  # minify HTML/JS for production
npm run deploy # push to GitHub Pages
```

**Why NOT bundlers:** No JSX, no TypeScript, no SASS in requirements. Bundlers (webpack, vite, parcel) add complexity with zero benefit. Vanilla approach ships faster.

## Installation

### Initial Setup
```bash
# Initialize project
cd portfolio-site
npm init -y

# Dev server
npm install --save-dev browser-sync

# Build tools (optional, for production)
npm install --save-dev html-minifier uglify-js
```

### Image Optimization (Manual)
```bash
# Option 1: Squoosh (web-based, no install)
# Visit https://squoosh.app/
# Upload images, choose AVIF + WebP, download

# Option 2: ImageOptim (macOS only)
# Download from https://imageoptim.com/
# Drag and drop images

# Option 3: Sharp (Node.js, for automation)
npm install --save-dev sharp
```

### Gallery Library
```html
<!-- GLightbox via CDN (recommended for no-build approach) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
<script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>

<!-- Or via npm -->
npm install glightbox
```

### Form Services
```html
<!-- Formspree: No installation, just HTML form -->
<form action="https://formspree.io/f/{your-form-id}" method="POST">
  <!-- form fields -->
</form>

<!-- EmailJS: Include SDK -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Alternative |
|----------|-------------|-------------|---------------------|
| **Image Format** | AVIF + WebP | JPEG only | AVIF is 50% smaller than JPEG. WebP has 97% browser support. No reason to skip in 2026. |
| **Lazy Loading** | Native `loading="lazy"` | JavaScript library | Native support is 95%+. Libraries add 5-10KB for same functionality. |
| **Lightbox** | GLightbox | Photoswipe | Photoswipe is 50KB+. Good for complex galleries but overkill here. |
| **Form Backend** | Formspree | Netlify Forms | Netlify Forms requires Netlify hosting. GitHub Pages is requirement. |
| **Layout** | CSS Grid | Bootstrap | Bootstrap is 150KB+ for grid system already native in CSS. 2026 = no Bootstrap needed. |
| **Task Runner** | npm scripts | Gulp/Grunt | Gulp/Grunt are legacy (2014-2016 era). npm scripts handle simple tasks fine. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **jQuery** | 30KB for DOM manipulation now native in JavaScript. Last major update 2021. Not maintained for modern needs. | Vanilla JavaScript (`querySelector`, `addEventListener`, `fetch`) |
| **Bootstrap** | 150KB+ framework. CSS Grid and Flexbox are native. Pre-built components not needed. | CSS Grid, Flexbox, custom CSS |
| **Masonry.js** | Last updated 2017. 24KB. Outdated architecture. | CSS Grid (manual) or Masonry Grid (1.4KB) |
| **Intersection Observer polyfill** | Native lazy loading exists. Polyfill only needed for <5% of users (IE11, old Safari). | `loading="lazy"` attribute |
| **Webpack/Parcel/Vite** | Build complexity for zero benefit. No JSX, no TypeScript, no frameworks = no bundler needed. | npm scripts for simple tasks |
| **React/Vue/Svelte** | 40KB+ framework overhead. State management not needed. SEO complications. Build step required. | Vanilla JavaScript with Web Components (if needed) |

## Stack Patterns by Variant

### If using newsletter popup with Google Sheets API:
- **Client-side only:** Requires OAuth + API key (security concerns)
- **Recommended:** Use Formspree → Google Sheets integration (Formspree paid plan $10/month)
- **Alternative:** Use EmailJS free tier (200 emails/month) + Zapier/Make.com to push to Sheets

### If artwork count exceeds 100 items:
- Consider **11ty (Eleventy)** static site generator
- Pulls from Google Sheets at build time
- Still ships static HTML (no runtime framework)
- Auto-rebuilds when sheet updates

### If dynamic masonry layout required:
- Use **Masonry Grid library (1.4KB)**
- Or wait for native CSS masonry (Safari/Firefox only in 2026)
- Or use **CSS Grid with fixed rows** (simpler, no JS)

### If mobile performance is critical:
- Use **sharp** (Node.js) to generate multiple image sizes (480px, 768px, 1200px, 1920px)
- Serve via `srcset` with sizes attribute
- Implement AVIF for 50% size reduction
- Critical CSS inlined in `<head>`

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| GLightbox 3.x | ES6+ browsers | Requires Chrome 60+, Firefox 60+, Safari 12+, Edge 79+ |
| browser-sync 3.x | Node.js 14+ | Development only, not shipped to production |
| Formspree API | All browsers | Submits via native `fetch()` API (ES6) |
| EmailJS 3.x | All browsers | Submits via native `fetch()` API (ES6) |

**Browser Support Target:** Chrome 90+, Firefox 90+, Safari 15+, Edge 90+ (all released 2021+). Covers 95%+ of users in 2026.

**Graceful Degradation:**
- `loading="lazy"` → ignored by old browsers, images load normally
- AVIF/WebP → fallback to JPEG via `<picture>` element
- CSS Grid → fallback to flexbox (if supporting IE11, which is NOT recommended)

## Hosting & Deployment

| Service | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| GitHub Pages | Latest | Static hosting | Free. 1GB repo, 100GB bandwidth/month. Custom domain + HTTPS (Let's Encrypt) included. Perfect for static sites. |
| Git | Latest | Version control | Required for GitHub Pages. Standard for web development. |

**GitHub Pages Features:**
- **Free HTTPS:** Let's Encrypt certificate auto-generated
- **Custom domain:** CNAME file + DNS configuration
- **CI/CD:** GitHub Actions can run build scripts (optional)
- **Bandwidth:** 100GB/month free (sufficient for portfolio)

**Deployment Workflow:**
```bash
# Simple: Push to gh-pages branch
git add .
git commit -m "Update portfolio"
git push origin gh-pages

# Advanced: GitHub Actions for build step
# (if using image optimization or minification)
```

## Sources

### High Confidence (Official Documentation)
- [MDN - Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading) - Native lazy loading specification
- [Google Sheets API - JavaScript quickstart](https://developers.google.com/workspace/sheets/api/quickstart/js) - Official Google API docs
- [GitHub - GLightbox](https://github.com/biati-digital/glightbox) - Official GLightbox repository
- [Can I Use - Loading lazy attribute](https://caniuse.com/loading-lazy-attr) - Browser support data
- [GitHub Pages HTTPS Documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https) - Official GitHub docs

### Medium Confidence (Industry Sources, 2026)
- [Why Developers Are Ditching Frameworks for Vanilla JavaScript](https://thenewstack.io/why-developers-are-ditching-frameworks-for-vanilla-javascript/) - Industry trends
- [How to Optimize Website Images: The Complete 2026 Guide](https://requestmetrics.com/web-performance/high-performance-images/) - Image optimization best practices
- [CSS Grid-Lanes: Masonry Layouts Just Got Stupid Simple](https://pixicstudio.medium.com/css-grid-lanes-masonry-layouts-just-got-stupid-simple-52341b9e6279) - Modern masonry approaches
- [Image Optimization in 2025: WebP/AVIF, srcset, and Preload](https://aibudwp.com/image-optimization-in-2025-webp-avif-srcset-and-preload/) - Format recommendations
- [Formspree vs Static Forms: Which Is Better in 2026?](https://www.staticforms.dev/blog/formspree-vs-static-forms-comparison) - Form service comparison

### Community Resources
- [EmailJS Pricing](https://www.emailjs.com/pricing/) - Free tier limits
- [Squoosh](https://squoosh.app/) - Google Chrome Labs image optimizer
- [GLightbox Demo](https://biati-digital.github.io/glightbox/) - Live examples
- [Masonry Grid: A 1.4 kB Library That Actually Works](https://dev.to/dangreen/masonry-grid-a-14-kb-library-that-actually-works-341n) - Modern masonry solution

---

**Stack research for:** Static Artist Portfolio (Maria Fernanda)
**Researched:** 2026-01-31
**Confidence:** HIGH - All core recommendations verified via official documentation or multiple 2026 sources
**Key decision:** Vanilla JS approach is appropriate for this project's scale and aligns with 2026 industry best practices for static sites.
