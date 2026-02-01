# Architecture Research

**Domain:** Static Artist Portfolio Website
**Researched:** 2026-01-31
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   Hero   │  │ Gallery  │  │  Modal   │  │ Contact  │    │
│  │Component │  │Component │  │Component │  │Component │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       │             │              │             │          │
├───────┴─────────────┴──────────────┴─────────────┴──────────┤
│                   APPLICATION LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │          Event Delegation Handler                    │    │
│  │  (Single listener on document)                       │    │
│  └──────────────────┬──────────────────────────────────┘    │
│                     │                                        │
│  ┌──────────────────┼─────────────────────────────────┐     │
│  │  Data Manager    │   Renderer        │   Utils     │     │
│  │  - load JSON     │   - create DOM    │   - helpers │     │
│  │  - parse data    │   - update DOM    │   - format  │     │
│  └──────────────────┴───────────────────┴─────────────┘     │
├─────────────────────────────────────────────────────────────┤
│                      DATA LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ works.json   │  │exhibitions.  │  │Third-party   │      │
│  │              │  │   json       │  │APIs (EmailJS)│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Hero Component** | Display full-screen landing with artist name, navigation | Static HTML + CSS Grid/Flexbox, minimal JS for menu toggle |
| **Gallery Renderer** | Load JSON, render irregular grid layout, handle hover effects | ES6 module with `fetch()`, template literals for DOM creation |
| **Modal Controller** | Open/close lightbox, display work details, keyboard navigation | Class-based or revealing module pattern with event delegation |
| **Contact Form Handler** | Validate input, submit to EmailJS/Formspree, display feedback | Form validation + third-party API integration |
| **Newsletter Popup** | Show after delay/scroll, capture emails, persist dismissal state | localStorage for state, Google Sheets API integration |
| **Data Manager** | Fetch and cache JSON data, provide access to components | Singleton pattern, caches data to avoid repeated fetches |
| **Event Delegator** | Single document listener routing events to appropriate handlers | Central event bus using `event.target.closest()` for component matching |

## Recommended Project Structure

```
portfolio-site/
├── index.html                 # Main HTML file
├── css/
│   ├── reset.css              # CSS reset/normalize
│   ├── variables.css          # CSS custom properties (colors, spacing, fonts)
│   ├── base.css               # Base typography and global styles
│   ├── layout.css             # Grid systems, page layout
│   ├── components/            # Component-specific styles
│   │   ├── hero.css
│   │   ├── gallery.css
│   │   ├── modal.css
│   │   ├── contact.css
│   │   └── newsletter.css
│   └── utilities.css          # Utility classes (margins, display, etc.)
├── js/
│   ├── main.js                # Entry point, initializes app
│   ├── config.js              # Configuration constants (API keys, paths)
│   ├── modules/
│   │   ├── dataManager.js     # JSON loading and caching
│   │   ├── galleryRenderer.js # Gallery DOM generation
│   │   ├── modalController.js # Modal open/close logic
│   │   ├── contactForm.js     # Form validation and submission
│   │   ├── newsletter.js      # Newsletter popup logic
│   │   └── eventDelegator.js  # Central event delegation
│   └── utils/
│       ├── helpers.js         # Generic helper functions
│       └── validators.js      # Input validation utilities
├── data/
│   ├── works.json             # Artwork data
│   └── exhibitions.json       # Exhibition data
├── assets/
│   ├── images/
│   │   ├── hero/              # Hero section images
│   │   ├── works/             # Artwork images
│   │   │   ├── thumbnails/    # Optimized thumbnails for gallery
│   │   │   └── full/          # Full-resolution images for modal
│   │   └── exhibitions/       # Exhibition images
│   └── fonts/                 # Custom web fonts
└── README.md
```

### Structure Rationale

- **CSS organization by layers**: Start with reset, then base styles, then components. This follows the natural cascade and makes it easy to understand specificity. Variables file enables easy theming.

- **Component-based CSS files**: Each component (hero, gallery, modal) has its own CSS file. This makes styles easy to find and prevents conflicts. Load them in order in HTML.

- **JS modules folder**: Separates concerns - each module handles one responsibility. Uses ES6 modules for clean imports/exports.

- **Data folder separate from assets**: JSON files are data, not static assets. Keeping them separate makes it clear what's content vs. presentation.

- **Thumbnail/full image separation**: Critical for performance. Gallery loads small thumbnails, modal loads full images only when needed.

- **Utilities separate from helpers**: Utilities are CSS classes, helpers are JS functions. Keeps the distinction clear.

## Architectural Patterns

### Pattern 1: Revealing Module Pattern with ES6

**What:** Encapsulates private implementation details while exposing a clean public API using ES6 modules.

**When to use:** For components that need internal state or private functions (data manager, modal controller).

**Trade-offs:**
- Pros: Encapsulation, clear API, testable
- Cons: Slightly more boilerplate than simple functions

**Example:**
```javascript
// js/modules/dataManager.js
let cache = {}; // Private variable

async function fetchJSON(url) { // Private function
  const response = await fetch(url);
  return response.json();
}

export async function getWorks() { // Public API
  if (!cache.works) {
    cache.works = await fetchJSON('./data/works.json');
  }
  return cache.works;
}

export async function getExhibitions() { // Public API
  if (!cache.exhibitions) {
    cache.exhibitions = await fetchJSON('./data/exhibitions.json');
  }
  return cache.exhibitions;
}
```

### Pattern 2: Event Delegation for Component Communication

**What:** Single event listener on document that routes events to appropriate handlers based on element selectors, avoiding multiple listeners and supporting dynamically added elements.

**When to use:** When you have multiple interactive components (gallery items, modal close buttons, form inputs, navigation links).

**Trade-offs:**
- Pros: Performance (one listener vs. many), works with dynamic content, easy to manage
- Cons: All events bubble up, need careful selector matching

**Example:**
```javascript
// js/modules/eventDelegator.js
export function initEventDelegation() {
  document.addEventListener('click', (e) => {
    // Gallery item click
    if (e.target.closest('.gallery__item')) {
      const item = e.target.closest('.gallery__item');
      const workId = item.dataset.workId;
      openModal(workId);
    }

    // Modal close
    if (e.target.closest('.modal__close') || e.target.closest('.modal__backdrop')) {
      closeModal();
    }

    // Navigation
    if (e.target.closest('[data-nav]')) {
      const section = e.target.dataset.nav;
      scrollToSection(section);
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.querySelector('.modal--open')) {
      closeModal();
    }
  });
}
```

### Pattern 3: Template Literal DOM Generation

**What:** Use template literals to generate HTML strings, then insert with `innerHTML`. More readable than `createElement()` chains.

**When to use:** When rendering data-driven components (galleries, lists).

**Trade-offs:**
- Pros: Readable, maintainable, easy to see HTML structure
- Cons: Be careful with user input (XSS risk), slightly less performant than DocumentFragment for large lists

**Example:**
```javascript
// js/modules/galleryRenderer.js
import { getWorks } from './dataManager.js';

export async function renderGallery(containerId) {
  const works = await getWorks();
  const container = document.getElementById(containerId);

  const html = works.map(work => `
    <article class="gallery__item" data-work-id="${work.id}">
      <img
        src="./assets/images/works/thumbnails/${work.image}"
        alt="${escapeHtml(work.title)}"
        class="gallery__image"
        loading="lazy"
      >
      <div class="gallery__overlay">
        <h3 class="gallery__title">${escapeHtml(work.title)}</h3>
        <p class="gallery__year">${work.year}</p>
      </div>
    </article>
  `).join('');

  container.innerHTML = html;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

### Pattern 4: Hybrid BEM + Utility Classes CSS

**What:** Use BEM (Block Element Modifier) for component structure, utility classes for common styling (spacing, typography, display).

**When to use:** Always. BEM provides semantic structure, utilities provide reusability.

**Trade-offs:**
- Pros: Readable HTML, scalable, avoids specificity wars
- Cons: Can lead to longer class names, requires discipline

**Example:**
```css
/* css/components/gallery.css - BEM */
.gallery {
  display: grid;
  gap: 1rem;
}

.gallery__item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.gallery__item--featured {
  grid-column: span 2;
  grid-row: span 2;
}

.gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery__item:hover .gallery__image {
  transform: scale(1.05);
}

.gallery__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery__item:hover .gallery__overlay {
  opacity: 1;
}
```

```css
/* css/utilities.css - Utility classes */
.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.text-center { text-align: center; }
.hidden { display: none; }
```

## Data Flow

### Page Load Flow

```
1. Browser loads index.html
        ↓
2. CSS files load (blocking) → Page styled
        ↓
3. main.js loads (deferred/module)
        ↓
4. initEventDelegation() → Sets up event listeners
        ↓
5. renderGallery() → fetch('./data/works.json')
        ↓
6. dataManager caches JSON → galleryRenderer creates DOM
        ↓
7. Page fully interactive
```

### User Interaction Flow

```
User clicks gallery item
        ↓
Event bubbles to document listener
        ↓
eventDelegator checks e.target.closest('.gallery__item')
        ↓
Extracts work ID from data-workId
        ↓
modalController.open(workId)
        ↓
Finds work in cached data
        ↓
Generates modal HTML with work details
        ↓
Adds .modal--open class
        ↓
CSS transition shows modal
```

### Form Submission Flow

```
User submits contact form
        ↓
Event delegation catches form submit
        ↓
e.preventDefault() → Stop default submission
        ↓
validators.js checks all fields
        ↓
If valid → contactForm.submit()
        ↓
fetch() to EmailJS/Formspree API
        ↓
Display success/error message
        ↓
Clear form or keep data based on result
```

### Key Data Flows

1. **JSON to DOM**: Data Manager fetches → caches → provides to Renderer → Renderer generates HTML → inserts into DOM
2. **User Event to Action**: Click → Event Delegator → Component Handler → State Change → DOM Update
3. **Form to API**: User input → Validation → API call → Response → User feedback

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| **0-100 concurrent users** | Current architecture is perfect. No adjustments needed. Single HTML file, client-side rendering, static hosting (GitHub Pages). |
| **100-1k concurrent users** | Add image optimization: use WebP with JPG fallback, implement responsive images with `srcset`, add lazy loading to all images (already in pattern). Consider CDN for assets. |
| **1k-10k concurrent users** | Move to CDN (Cloudflare, Netlify). Generate multiple HTML files at build time if gallery grows large (one page per category). Consider static site generator like Eleventy for build-time rendering. |
| **10k+ concurrent users** | Implement service worker for offline support and asset caching. Pre-generate critical CSS. Consider splitting JS into smaller modules loaded on-demand. Move JSON to API endpoint with caching headers. |

### Scaling Priorities

1. **First bottleneck: Image loading**
   - Problem: Large images slow initial page load
   - Solution: Optimize images (WebP, appropriate dimensions), lazy loading, thumbnail/full separation
   - When: Immediately, during initial build

2. **Second bottleneck: JSON file size**
   - Problem: If gallery grows to 100+ items, JSON becomes large
   - Solution: Paginate gallery, load more on scroll, or split into multiple JSON files by category
   - When: When works.json exceeds ~50 items or ~500KB

3. **Third bottleneck: Client-side rendering**
   - Problem: User sees blank page until JS executes and renders gallery
   - Solution: Server-side rendering or static site generation at build time
   - When: If SEO becomes critical or users report slow initial render

## Anti-Patterns

### Anti-Pattern 1: jQuery for Simple DOM Manipulation

**What people do:** Add jQuery library for simple tasks like `$('.class').hide()` or `$('.class').on('click', ...)`.

**Why it's wrong:** jQuery adds 30KB+ of unnecessary JavaScript when vanilla JS has equivalent APIs. Modern browsers have excellent DOM APIs (`querySelector`, `classList`, `addEventListener`).

**Do this instead:** Use vanilla JS: `document.querySelector('.class').style.display = 'none'` or `element.classList.add('hidden')`.

### Anti-Pattern 2: Individual Event Listeners on Every Gallery Item

**What people do:**
```javascript
document.querySelectorAll('.gallery__item').forEach(item => {
  item.addEventListener('click', handleClick);
});
```

**Why it's wrong:** If you have 50 gallery items, you create 50 event listeners. Performance impact, doesn't work with dynamically added items.

**Do this instead:** Use event delegation with a single listener on the parent:
```javascript
document.querySelector('.gallery').addEventListener('click', (e) => {
  const item = e.target.closest('.gallery__item');
  if (item) handleClick(item);
});
```

### Anti-Pattern 3: Inline Styles in JavaScript

**What people do:**
```javascript
element.style.display = 'block';
element.style.opacity = '1';
element.style.transform = 'scale(1)';
```

**Why it's wrong:** Mixes presentation with behavior, harder to maintain, can't use CSS transitions properly, high specificity.

**Do this instead:** Use CSS classes:
```javascript
element.classList.add('modal--open');
```
```css
.modal--open {
  display: block;
  opacity: 1;
  transform: scale(1);
}
```

### Anti-Pattern 4: Loading Full-Resolution Images in Gallery Grid

**What people do:** Use the same high-resolution images for both gallery thumbnails and modal view.

**Why it's wrong:** Gallery loads 50 images at 2MB each = 100MB page load. Terrible performance, especially on mobile.

**Do this instead:** Create two versions of each image:
- Thumbnails: 400-600px wide, optimized (~50-100KB each)
- Full images: Original resolution for modal view only
Load thumbnails in gallery, load full image only when modal opens.

### Anti-Pattern 5: Storing API Keys in Frontend JavaScript

**What people do:** Put EmailJS or other API keys directly in JS files committed to GitHub.

**Why it's wrong:** Anyone can view source code and steal your API keys. Keys get committed to git history forever.

**Do this instead:**
- For static sites: Use services with domain restrictions (EmailJS allows restricting to specific domains)
- Environment variables during build (if using a build tool)
- For sensitive operations: Use serverless functions (Netlify Functions, Vercel Functions) that keep keys on server

### Anti-Pattern 6: One Giant CSS File with No Organization

**What people do:** Put all styles in `style.css` with no structure or organization.

**Why it's wrong:** Hard to find styles, specificity conflicts, can't reuse components, difficult to maintain.

**Do this instead:** Split CSS into logical files (reset, variables, base, components, utilities) and load in correct order. Use BEM naming for clear component boundaries.

### Anti-Pattern 7: Not Caching JSON Data

**What people do:** Fetch the same JSON file multiple times throughout the session.

**Why it's wrong:** Unnecessary network requests, slower user experience, wastes bandwidth.

**Do this instead:** Implement a data manager that caches fetched JSON in memory:
```javascript
let cache = {};
export async function getWorks() {
  if (!cache.works) {
    cache.works = await fetchJSON('./data/works.json');
  }
  return cache.works;
}
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **EmailJS/Formspree** | REST API via `fetch()` with POST request | Use domain restrictions in service settings. Handle rate limits gracefully. Show user feedback on success/error. |
| **Google Sheets API** | POST to Apps Script web app endpoint | Create a Google Apps Script to handle form submissions. Returns JSON response. Consider CORS requirements. |
| **GitHub Pages** | Static hosting via git push to gh-pages branch | No server-side code. All logic must be client-side. Configure custom domain via CNAME file. |
| **Image CDN (optional)** | Load images via CDN URL instead of relative path | Consider Cloudinary or ImageKit for automatic optimization. Replace paths at build time or use URL rewriting. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **main.js ↔ modules** | ES6 imports | main.js imports and initializes all modules. Modules export public functions. |
| **galleryRenderer ↔ dataManager** | Function calls | Renderer imports `getWorks()` from dataManager. Async/await for promises. |
| **modalController ↔ dataManager** | Function calls | Modal imports `getWorks()` to find work by ID. Uses cached data. |
| **All components ↔ eventDelegator** | Event delegation | Components don't communicate directly. User actions trigger events that delegator routes. |
| **CSS components ↔ HTML** | BEM class names | CSS selects elements via predictable class names. No ID selectors except for unique page landmarks. |
| **JS ↔ DOM** | `data-*` attributes | Store component state and IDs in data attributes. Use `dataset` API to read. Never store complex data in DOM. |

## Build Order Recommendations

Based on component dependencies and risk factors, recommended build order:

### Phase 1: Foundation (No Dependencies)
1. **HTML structure** - Create semantic HTML skeleton for all sections
2. **CSS reset + variables** - Establish design system (colors, spacing, typography)
3. **Base styles** - Typography, global styles
4. **Static hero section** - Complete hero with static content and responsive layout

**Why this order:** Foundation must be solid. HTML structure informs CSS organization. Design system prevents inconsistency later.

### Phase 2: Data Layer (Depends on Phase 1)
5. **JSON files** - Create works.json and exhibitions.json with real or sample data
6. **dataManager module** - Implement fetch, caching, error handling
7. **Test data loading** - Ensure JSON loads correctly before building renderers

**Why this order:** Data layer is prerequisite for any data-driven features. Test thoroughly before building on top.

### Phase 3: Core Gallery (Depends on Phase 2)
8. **Gallery CSS** - Grid layout, item styles, hover effects
9. **galleryRenderer module** - Fetch data, generate DOM, insert into page
10. **Event delegation setup** - Basic click handling infrastructure
11. **Gallery interactivity** - Hover effects, click detection

**Why this order:** Gallery is the most complex component. Building it early validates architecture decisions.

### Phase 4: Modal (Depends on Phase 3)
12. **Modal CSS** - Layout, animations, responsive behavior
13. **modalController module** - Open/close logic, data display, keyboard navigation
14. **Wire to gallery** - Connect gallery clicks to modal open

**Why this order:** Modal depends on gallery structure and data layer. Builds on event delegation.

### Phase 5: Forms (Depends on Phase 1, independent of Phases 3-4)
15. **Contact form HTML/CSS** - Form layout, validation styling
16. **validators module** - Input validation functions
17. **contactForm module** - Form submission, API integration, user feedback
18. **Newsletter popup** - Popup logic, localStorage, dismissal

**Why this order:** Forms are relatively independent. Can be built in parallel with gallery/modal if needed.

### Phase 6: Polish (Depends on all previous)
19. **Responsive refinements** - Mobile layouts, touch interactions
20. **Performance optimization** - Image optimization, lazy loading, code splitting
21. **Accessibility audit** - Keyboard navigation, ARIA labels, focus management
22. **Cross-browser testing** - Test in major browsers, fix issues

**Why this order:** Polish requires complete features. Optimization requires knowing what to optimize.

### Critical Path Dependencies

```
HTML structure → CSS base → JSON data → Gallery → Modal
                                     ↘
                           Contact form (parallel) → Newsletter popup
```

- **Don't build modal before gallery** - Modal needs gallery items to click
- **Don't build renderers before data layer** - Will cause refactoring
- **Don't optimize before building** - Premature optimization wastes time
- **Do build forms in parallel** - They're independent of gallery/modal

## Sources

### Architecture Patterns
- [The Complete Guide to Frontend Architecture Patterns in 2026](https://dev.to/sizan_mahmud0_e7c3fd0cb68/the-complete-guide-to-frontend-architecture-patterns-in-2026-3ioo)
- [Islands Architecture - Patterns.dev](https://www.patterns.dev/vanilla/islands-architecture/)
- [Modern State Management in Vanilla JavaScript: 2026 Patterns and Beyond](https://medium.com/@orami98/modern-state-management-in-vanilla-javascript-2026-patterns-and-beyond-ce00425f7ac5)

### Modular JavaScript
- [The Vanilla Javascript Component Pattern - DEV Community](https://dev.to/megazear7/the-vanilla-javascript-component-pattern-37la)
- [Module Pattern - Patterns.dev](https://www.patterns.dev/vanilla/module-pattern/)
- [Mastering Modules and Modular Design Patterns in Vanilla JavaScript](https://procodebase.com/article/mastering-modules-and-modular-design-patterns-in-vanilla-javascript)
- [JavaScript modules - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

### Project Structure
- [Folder Structure for Static Websites](https://www.rahulyadavdev.in/articles/folder-structure-for-static-websites)
- [How to Structure Files and Folder in your Project? - GeeksforGeeks](https://www.geeksforgeeks.org/javascript/file-and-folder-organization-best-practices-for-web-development/)
- [Dealing with files - MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files)

### CSS Architecture
- [CSS Cascade Layers Vs. BEM Vs. Utility Classes - Smashing Magazine](https://www.smashingmagazine.com/2025/06/css-cascade-layers-bem-utility-classes-specificity-control/)
- [Building a Scalable CSS Architecture With BEM and Utility Classes - CSS-Tricks](https://css-tricks.com/building-a-scalable-css-architecture-with-bem-and-utility-classes/)
- [BEM — Block Element Modifier](https://getbem.com/introduction/)

### Gallery & Modal Implementation
- [Vanilla JS + CSS - Modal Popup Tutorial - Jason Watmore](https://jasonwatmore.com/post/2023/01/04/vanilla-js-css-modal-popup-dialog-tutorial-with-example)
- [Building a Production-Ready Modal Component with Vanilla JavaScript](https://medium.com/@francesco.saviano87/building-a-production-ready-modal-component-with-vanilla-javascript-a-complete-guide-4c125d20ddc9)
- [How to Create a JavaScript Modal Image Gallery - Owlcation](https://owlcation.com/stem/javascript_gallery)

### Event Delegation
- [Vanilla JS event delegation across components - Go Make Things](https://gomakethings.com/vanilla-js-event-delegation-across-components/)
- [Why event delegation is a better way to listen for events in vanilla JS](https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/)
- [Event delegation - JavaScript.info](https://javascript.info/event-delegation)

### JSON Rendering
- [Capture and Display Your JSON Data with Vanilla JavaScript](https://medium.com/geekculture/capture-and-display-your-json-data-with-vanilla-javascript-4675f81cfb54)
- [json-gallery: HTML image gallery managed with JSON](https://github.com/codenameyau/json-gallery)

---
*Architecture research for: Static Artist Portfolio Website*
*Researched: 2026-01-31*
