# Project Research Summary

**Project:** Static Artist Portfolio Website (Maria Fernanda)
**Domain:** Artist Portfolio / Visual Arts
**Researched:** 2026-01-31
**Confidence:** HIGH

## Executive Summary

Maria Fernanda's artist portfolio should be built as a vanilla HTML/CSS/JavaScript static site optimized for visual impact and performance. The research overwhelmingly supports a "framework-free" approach in 2026: modern browser APIs provide all necessary functionality without the 100KB+ overhead of React/Vue, and the vanilla-first movement emphasizes surgical, performance-focused development. For a portfolio with 10-20 pages and simple interactivity (galleries, contact forms, lightbox), frameworks add zero benefit.

The recommended approach prioritizes image optimization and mobile performance above all else. 66% of art portfolio traffic is mobile, and pages taking more than 3 seconds to load lose 40% of visitors. Use AVIF format (50% smaller than JPEG), implement responsive images with srcset, and apply lazy loading strategically (never on above-the-fold images). The stack is minimal: HTML5 semantic markup, CSS Grid for layouts, vanilla ES6+ JavaScript with event delegation, and GLightbox (11KB) for the image viewer. Third-party services handle backend needs: Formspree for contact forms, GitHub Pages for hosting (free, 1GB limit, HTTPS included).

The critical risks are image-related: Cumulative Layout Shift from missing dimensions, over-compression destroying artwork detail, and serving full desktop images to mobile devices. Secondary risks include EmailJS credential exposure, instant newsletter popups causing high bounce rates, and hitting GitHub Pages' 1GB size limit with unoptimized images. All are preventable with proper image workflow (dimensions, AVIF at 85-90% quality, responsive sizes), security measures (rate limiting, honeypot, domain whitelist), and smart UX timing (30+ second popup delays).

## Key Findings

### Recommended Stack

The vanilla-first approach is validated by 2026 industry trends and aligns perfectly with static portfolio requirements. No build step is necessary: ES6 modules work in all modern browsers (95%+ support), native CSS Grid handles complex gallery layouts, and Web APIs provide everything needed for galleries, forms, and animations.

**Core technologies:**
- **HTML5 + CSS3 (native)**: Semantic markup, CSS Grid/Flexbox for layouts, custom properties for theming — No dependencies, universal browser support, perfect for static sites
- **Vanilla JavaScript (ES6+)**: Native modules, fetch API, event delegation — 95%+ browser support, no build step, surgical approach, zero framework overhead
- **AVIF + WebP images**: Next-gen formats with 50% smaller file sizes than JPEG — 97%+ browser support, critical for mobile performance, with JPEG fallback via `<picture>` element
- **GLightbox 3.x**: Vanilla JS lightbox (11KB gzipped) — No jQuery dependency, supports zoom/swipe/keyboard navigation, best balance of features vs size
- **Formspree API**: Contact form backend (free tier 50 submissions/month) — No credit card required, AJAX support, spam protection, industry standard for static sites
- **GitHub Pages**: Static hosting (free, 1GB repo limit, 100GB bandwidth/month) — HTTPS included, custom domain support, perfect for static portfolios

**Key decision rationale:** Avoid jQuery (30KB legacy), Bootstrap (150KB unnecessary), Masonry.js (outdated 2017), and any framework (React/Vue/Svelte). These add 40-150KB+ overhead with no benefit for a static portfolio. Modern vanilla JavaScript handles all requirements efficiently.

### Expected Features

Research across 20+ artist portfolio best practices and gallery requirements reveals clear expectations from three target audiences: collectors, galleries/curators, and students.

**Must have (table stakes):**
- Mobile responsive design — 66% of traffic, non-negotiable foundation for all features
- Fast loading speed (<2 seconds) — 40% bounce rate if >3 seconds, critical for first impressions
- Gallery page with high-quality images — Core purpose, deal-breaker if blurry or low-res
- Artist bio (third person, 2-3 paragraphs) — Required by galleries and curators for credibility
- Artist statement (100-200 words) — Expected by curators, fundamental for exhibition applications
- CV/Resume page — Non-negotiable for galleries, must include exhibitions, awards, education
- Contact form — Critical conversion point for all audiences, email alone insufficient
- Basic lightbox/image viewer — Expected behavior for portfolio viewing, must include zoom
- Professional minimalist design — First impression, galleries judge site quality immediately

**Should have (competitive):**
- Image zoom with deep detail viewing — Differentiates serious portfolios, collectors value examining brushwork/texture
- Exhibition history with installation photos — Visual record proves exhibition experience to galleries
- Artwork detail pages — Individual pages with dimensions, medium, availability signal professionalism
- Newsletter subscription — Builds direct audience for announcements, 40% of portfolios now include
- Series/collection organization — Shows conceptual depth to curators, helps envision exhibition coherence

**Defer (v2+):**
- E-commerce integration — Only if direct sales model, may conflict with gallery representation
- Video integration — Not essential for traditional 2D artists, resource-intensive
- Blog/news section — Requires ongoing content creation capacity, not expected by audiences
- Multi-language support — Only add if international audience data shows need

**Anti-features to avoid:**
- Auto-playing background music (startles visitors, causes immediate exits)
- Instant newsletter popup on page load (spikes bounce rate, Google penalizes mobile)
- Including every artwork ever created (dilutes quality perception)
- Complex or "artistic" navigation (galleries can't find basic info, high abandonment)
- Publicly pricing all works (gallery contracts often prohibit, high-end collectors prefer private inquiry)

### Architecture Approach

Standard static portfolio architecture uses a three-layer approach: presentation (UI components), application (data management and event routing), and data (JSON files and third-party APIs). The revealing module pattern with ES6 imports provides clean encapsulation, event delegation handles user interactions efficiently, and template literals generate DOM elements readably.

**Major components:**
1. **Data Manager Module** — Fetches and caches JSON data (works.json, exhibitions.json) using singleton pattern, provides access to other modules via async functions
2. **Gallery Renderer** — Loads data from manager, generates grid HTML with template literals, inserts into DOM with lazy loading for images below fold
3. **Modal Controller** — Opens/closes lightbox on gallery clicks, displays artwork details, handles keyboard navigation (escape to close, arrows to navigate)
4. **Contact Form Handler** — Validates input, submits to Formspree/EmailJS API, displays user feedback, implements rate limiting and honeypot for spam prevention
5. **Event Delegator** — Single document listener that routes all click/keyboard events to appropriate handlers using `event.target.closest()` selector matching

**Key patterns:**
- **Event delegation**: One listener on document instead of many on elements, supports dynamic content, better performance
- **Hybrid BEM + utility CSS**: BEM for component structure, utilities for common styling, avoids specificity wars
- **Responsive images with srcset**: Generate 400px, 800px, 1200px, 1920px versions, browser chooses optimal size based on viewport
- **Thumbnail/full separation**: Gallery loads small thumbnails (~50-100KB), modal loads full images only when opened
- **JSON caching**: Fetch once, cache in memory, avoid repeated network requests

**Project structure:** CSS organized by layers (reset → variables → base → components → utilities), JS modules by responsibility (one module per concern), data separate from assets, thumbnail/full image folders separate for performance.

### Critical Pitfalls

1. **Image Loading Without Dimensions (CLS)** — Missing width/height attributes on lazy-loaded images cause severe Cumulative Layout Shift, harming SEO and UX. Always include dimensions: `<img src="art.jpg" width="1200" height="800" loading="lazy">`. Address in Phase 1 (Foundation) before building galleries.

2. **Over-Compressing Art Images** — Aggressive compression destroys fine details and introduces artifacts, misrepresenting artwork to collectors/galleries. Use AVIF at 85-90% quality (not 70-80% like generic web images), prioritize quality preservation. Address in Phase 2 (Gallery System) with proper image pipeline.

3. **Serving Full Desktop Images to Mobile** — Same 3000x2000px images on mobile waste bandwidth, take 10+ seconds on cellular, create terrible UX for 66% of visitors. Generate responsive sizes (400/800/1200/1920px) and use srcset. Address in Phase 2 (Gallery System) from the start.

4. **Instant Newsletter Popup on Page Load** — Showing popup at 0 seconds spikes bounce rate, annoys visitors who haven't seen content yet, gets penalized by Google. Use 30-60 second delay, scroll trigger (50%+ scrolled), or exit-intent. Address in Phase 4 (Lead Capture) with user-centric timing.

5. **Missing Touch Targets and Gestures** — Small buttons (<44x44px) impossible to tap, no swipe gestures means mobile users struggle. Implement touchstart/touchend events for swipe, enlarge mobile controls, test on real devices. Address in Phase 2 (Gallery System) with mobile-first development.

6. **EmailJS Exposed Credentials** — Client-side API keys visible in source allow anyone to abuse email service, leading to spam and account suspension. Implement rate limiting (localStorage last submit check), honeypot field, domain whitelist in EmailJS dashboard. Address in Phase 4 (Lead Capture) before launching contact form.

7. **GitHub Pages 1GB Size Limit** — Unoptimized high-res images quickly exceed limit, preventing updates. Never commit originals, use AVIF optimization (target 200-400KB per image), consider Git LFS or external hosting (Cloudinary). Address in Phase 1 (Foundation) with proper image workflow.

8. **Lazy Loading Above-the-Fold Images** — Applying `loading="lazy"` to hero/initial images delays loading unnecessarily, harming LCP scores. Use `fetchpriority="high"` on hero images, never lazy load first 2-3 visible images. Address in Phase 1 (Foundation) with correct loading strategy.

## Implications for Roadmap

Based on research, suggested phase structure follows dependency order and risk mitigation priorities:

### Phase 1: Foundation & Image Infrastructure
**Rationale:** Image handling is the #1 critical path and biggest risk area. All downstream features depend on proper image infrastructure. Must establish image optimization workflow, dimension attributes, and loading strategy before building galleries.

**Delivers:** HTML structure, CSS design system, image optimization pipeline, responsive image generation workflow, GitHub Pages deployment setup

**Addresses (from FEATURES.md):** Mobile responsive design, fast loading speed, professional minimalist design foundation

**Avoids (from PITFALLS.md):** CLS from missing dimensions, lazy loading above fold, GitHub Pages 1GB limit, over-compression destroying artwork

**Components:** Design system (CSS variables, reset, base styles), image processing workflow (AVIF conversion at 85-90% quality, responsive size generation: 400/800/1200/1920px), deployment configuration

**Research flag:** Standard patterns — CSS Grid layout and image optimization are well-documented (skip `/gsd:research-phase`)

### Phase 2: Gallery System & Data Layer
**Rationale:** Gallery is the core product value and most complex component. Building it early validates architecture decisions. Data layer must precede rendering to avoid refactoring.

**Delivers:** JSON data files (works.json, exhibitions.json), data manager module with caching, gallery renderer with grid layout, basic image viewer

**Addresses (from FEATURES.md):** Gallery page with high-quality images, basic lightbox viewer, series/collection organization (if needed)

**Avoids (from PITFALLS.md):** Serving full images to mobile (uses srcset), missing touch gestures (implements swipe), individual event listeners per item (uses delegation)

**Uses (from STACK.md):** Vanilla ES6 modules, GLightbox 11KB library, CSS Grid for irregular layouts, event delegation pattern

**Implements (from ARCHITECTURE.md):** Data Manager (fetch + cache), Gallery Renderer (template literals for DOM), Event Delegator (single document listener)

**Research flag:** Needs lightweight research — GLightbox integration patterns, swipe gesture implementation (consider `/gsd:research-phase` if team unfamiliar)

### Phase 3: Content Pages & Information Architecture
**Rationale:** Bio, statement, and CV are table stakes for galleries/curators but relatively independent. Can be built in parallel with Phase 2 if needed, or sequentially after core gallery validates architecture.

**Delivers:** Artist bio page (third person, 2-3 paragraphs), artist statement (100-200 words), CV/resume page (reverse chronological, PDF download), exhibitions page with images

**Addresses (from FEATURES.md):** Artist bio, artist statement, CV/resume (all must-haves), exhibition history with images (differentiator)

**Components:** Static HTML pages with consistent styling, responsive layouts, PDF generation/download functionality for CV

**Research flag:** Standard patterns — Static content pages are straightforward (skip `/gsd:research-phase`)

### Phase 4: Lead Capture & Forms
**Rationale:** Forms are critical conversion points but relatively independent of gallery system. Newsletter and contact can be built together since they share form validation patterns.

**Delivers:** Contact form with Formspree integration, newsletter popup with smart timing, form validation, spam protection (honeypot + rate limiting)

**Addresses (from FEATURES.md):** Contact form (must-have), newsletter subscription (differentiator)

**Avoids (from PITFALLS.md):** Instant newsletter popup (uses 30+ second delay or scroll trigger), EmailJS credential exposure (implements rate limiting + honeypot + domain whitelist)

**Uses (from STACK.md):** Formspree API for contact form, EmailJS for newsletter (if higher volume needed), localStorage for rate limiting

**Implements (from ARCHITECTURE.md):** Contact Form Handler (validation + API integration), Newsletter Popup (timing + dismissal logic)

**Research flag:** Needs specific research — Formspree integration details, EmailJS security configuration (consider `/gsd:research-phase` for security hardening)

### Phase 5: Enhancement & Polish
**Rationale:** Performance optimization, accessibility, and cross-browser testing require complete features. Polish phase ensures production-ready quality.

**Delivers:** Performance audit (Core Web Vitals), accessibility improvements (keyboard nav, ARIA, screen reader), cross-browser testing, SEO optimization (meta tags, sitemap, Open Graph)

**Addresses (from FEATURES.md):** Fast loading speed optimization, professional presentation refinement

**Avoids (from PITFALLS.md):** Broken links (implements link checker), missing keyboard navigation, poor mobile performance

**Components:** Performance optimization (critical CSS inline, code splitting if needed), accessibility audit (WCAG 2.1 AA), SEO implementation (structured data, social sharing tags)

**Research flag:** Standard patterns — Performance and accessibility audits use well-known tools (skip `/gsd:research-phase`)

### Phase 6: Advanced Features (Optional/Future)
**Rationale:** Defer features that aren't table stakes or differentiators. Add based on user feedback and actual needs after launch.

**Delivers:** Deep zoom for artwork details (10,000% zoom), video integration (process/studio), e-commerce integration (if sales model permits), blog/news section

**Addresses (from FEATURES.md):** Image zoom (differentiator), video integration, e-commerce (all deferred to v2+)

**Research flag:** Needs research — Each feature requires specific integration research when prioritized

### Phase Ordering Rationale

- **Foundation before features:** Image infrastructure and design system must be solid before building on top. Refactoring image handling later is costly and error-prone.
- **Gallery before content pages:** Gallery is the most complex component and validates architecture early. Content pages are simpler and can follow proven patterns.
- **Data layer before rendering:** Data Manager must exist before Gallery Renderer. Building renderers first leads to refactoring when data access patterns change.
- **Forms can be parallel or sequential:** Contact/newsletter forms are independent of gallery system, can be built in parallel if resources allow.
- **Polish after features:** Can't optimize what doesn't exist. Performance and accessibility require complete features to audit.

**Critical path:** Foundation → Gallery → Everything else builds on these two phases.

### Research Flags

**Phases likely needing deeper research during planning:**
- **Phase 2 (Gallery System):** GLightbox integration specifics, touch gesture implementation patterns, masonry layout decisions (CSS Grid manual vs library)
- **Phase 4 (Lead Capture):** Formspree vs EmailJS trade-offs, security hardening for client-side form services, Google Sheets API integration if newsletter requires it

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Foundation):** CSS Grid layouts and image optimization are mature, well-documented practices with official MDN resources
- **Phase 3 (Content Pages):** Static HTML/CSS content pages are straightforward, no novel patterns needed
- **Phase 5 (Polish):** Performance tools (PageSpeed Insights, Lighthouse) and accessibility audits (WAVE, axe) have established workflows

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core recommendations verified via official documentation (MDN, GitHub Docs), 2026 browser support data, and industry best practices. Vanilla JS approach validated by multiple sources. |
| Features | HIGH | Based on 20+ artist portfolio examples, gallery/curator requirement articles, and museum submission guidelines. Table stakes vs differentiators clearly distinguished across sources. |
| Architecture | HIGH | Patterns drawn from official MDN docs (ES6 modules, event delegation), established vanilla JS patterns (revealing module, BEM), and proven static site practices. |
| Pitfalls | HIGH | Critical pitfalls verified via official Google Web.dev docs (CLS, LCP), GitHub official limits, and multiple portfolio mistake analyses. Each pitfall has documented real-world impact. |

**Overall confidence:** HIGH

All major decisions are supported by official documentation or converging evidence from multiple 2026 sources. The vanilla-first approach is explicitly validated by industry trend articles. Image optimization recommendations come from official Chrome/Google sources. Gallery/curator requirements are consistent across professional art world sources.

### Gaps to Address

- **Newsletter popup optimal timing:** Research suggests 30-60 seconds or scroll-based triggers, but specific metrics vary by source. Test and measure bounce rate impact after launch to optimize timing for Maria Fernanda's specific audience.

- **AVIF quality threshold for art:** General web content uses 70-80% quality, but art portfolios need 85-90%. Exact threshold should be validated by comparing compressed vs original images side-by-side with Maria Fernanda's approval during Phase 2.

- **GitHub Pages vs alternative hosting:** Research assumes GitHub Pages, but if approaching 1GB limit becomes an issue, migration to Netlify or Vercel provides better image optimization and CDN features. Monitor repo size during development.

- **Masonry vs CSS Grid for gallery:** Native CSS masonry is experimental (2026 Firefox/Safari Tech Preview only). Decision between manual CSS Grid placement vs Masonry Grid library (1.4KB) depends on artwork count and layout flexibility needs — defer decision to Phase 2 based on actual content.

- **Formspree vs EmailJS for forms:** Both validated, but choice depends on volume needs (Formspree 50/month free vs EmailJS 200/month free) and security preferences. Decide during Phase 4 based on expected traffic.

## Sources

### Primary (HIGH confidence)

**Official Documentation:**
- [MDN Web Docs: Lazy loading, ES6 modules, event delegation](https://developer.mozilla.org) — Browser APIs, vanilla JavaScript patterns, image loading specifications
- [GitHub Pages Documentation: Limits, HTTPS, deployment](https://docs.github.com/en/pages) — Official size limits (1GB), bandwidth (100GB/month), custom domain setup
- [web.dev: Optimize CLS, LCP, Core Web Vitals](https://web.dev) — Google's official guidance on image dimensions, lazy loading, performance metrics
- [Can I Use: Browser support data](https://caniuse.com) — AVIF (97%+ support), loading="lazy" (95%+ support), ES6 modules verified
- [GLightbox GitHub Repository](https://github.com/biati-digital/glightbox) — Official library docs, 2.4k stars, MIT license, active maintenance

**Industry Best Practices (2026):**
- [Formspree vs Static Forms Comparison 2026](https://www.staticforms.dev/blog/formspree-vs-static-forms-comparison) — Form service trade-offs for static sites
- [Artist Portfolio Tips: Stand Out and Attract Clients - ArtConnect Magazine](https://www.magazine.artconnect.com/resources/make-portfolio-stand-out) — Gallery/curator requirements, professional expectations
- [Visual Artist CV Conventions - College Art Association](https://www.collegeart.org/standards-and-guidelines/guidelines/visual-art-cv) — Official CV format standards for visual artists

### Secondary (MEDIUM confidence)

**Architecture & Patterns:**
- [The Vanilla Javascript Component Pattern - DEV Community](https://dev.to/megazear7/the-vanilla-javascript-component-pattern-37la) — Revealing module pattern with ES6
- [Event delegation - JavaScript.info](https://javascript.info/event-delegation) — Performance benefits, implementation patterns
- [CSS Cascade Layers Vs. BEM - Smashing Magazine](https://www.smashingmagazine.com/2025/06/css-cascade-layers-bem-utility-classes-specificity-control/) — BEM + utility class hybrid approach

**Image Optimization:**
- [How to Optimize Website Images: Complete 2026 Guide - Request Metrics](https://requestmetrics.com/web-performance/high-performance-images/) — AVIF vs WebP, responsive images, LCP optimization
- [AVIF vs WebP: Which Reigns Supreme in 2026? - Elementor](https://elementor.com/blog/webp-vs-avif/) — Bit depth advantages, gradient handling, portfolio use cases
- [Squoosh - Google Chrome Labs](https://squoosh.app/) — Free image optimization tool, AVIF conversion

**Common Pitfalls:**
- [6 Art Portfolio Mistakes You Must Avoid - Milan Art Institute](https://www.milanartinstitute.com/blog/art-portfolio-mistakes) — Quality over quantity, image quality importance
- [9 Proven Popup Best Practices 2026 - Hello Bar](https://www.hellobar.com/blog/popup-best-practices-strategies-2026/) — Timing strategies, mobile penalties, exit-intent triggers
- [EmailJS Tutorial with Security Notes 2026 - Mailtrap](https://mailtrap.io/blog/emailjs/) — Client-side security vulnerabilities, protection strategies

**Portfolio Features:**
- [19 Best Art Portfolio Examples 2026 - Hostinger](https://www.hostinger.com/tutorials/art-portfolio-website-examples) — Current trends, table stakes features
- [All Pages You Need for Professional Artist Website - Contemporary Art Issue](https://www.contemporaryartissue.com/all-pages-you-need-for-a-professional-artists-website/) — Must-have vs optional pages

### Tertiary (LOW confidence, needs validation)

- [Why Developers Are Ditching Frameworks for Vanilla JS - The New Stack](https://thenewstack.io/why-developers-are-ditching-frameworks-for-vanilla-javascript/) — 2026 trend article, anecdotal evidence
- [Masonry Grid: 1.4KB Library - DEV Community](https://dev.to/dangreen/masonry-grid-a-14-kb-library-that-actually-works-341n) — Community-recommended library, single source
- [Touch Gesture Implementation Patterns](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events) — MDN docs but implementation patterns may need testing

---
*Research completed: 2026-01-31*
*Ready for roadmap: yes*
