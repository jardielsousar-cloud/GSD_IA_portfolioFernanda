# Domain Pitfalls: Static Artist Portfolio

**Domain:** Static Artist Portfolio Website
**Researched:** 2026-01-31
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Image Loading Without Dimensions (Cumulative Layout Shift)

**What goes wrong:**
Lazy-loaded images without explicit width/height attributes cause severe Cumulative Layout Shift (CLS). The browser reserves no space for images, so when they finally load, the entire page layout jumps, disrupting the viewing experience and harming Core Web Vitals scores.

**Why it happens:**
During the responsive design era, developers removed width/height attributes to make images fluid. Modern browsers can calculate aspect ratios from these attributes while still allowing responsive sizing, but many developers still omit them out of habit.

**Consequences:**
- Poor SEO rankings (Google penalizes high CLS scores)
- Frustrated users who lose their place while scrolling
- Lower engagement as visitors abandon the site
- Missed opportunities with potential clients/galleries

**Prevention:**
Always include width and height attributes on images:
```html
<img src="artwork.jpg" width="1200" height="800" alt="Artwork title" loading="lazy">
```

For responsive images, use CSS:
```css
img {
  width: 100%;
  height: auto;
}
```

The browser will automatically calculate aspect ratio from the HTML attributes, reserving the correct space before the image loads.

**Warning signs:**
- Images taking more than 3 seconds to appear
- Visible "jumping" when scrolling through galleries
- PageSpeed Insights reports CLS > 0.1
- Users report difficulty clicking on elements

**Phase to address:**
Phase 1: Foundation - Implement dimension attributes from the start, before building galleries.

---

### Pitfall 2: Over-Compressing Art Images

**What goes wrong:**
Applying aggressive compression to art/photography images destroys fine details, introduces visible artifacts, and fails to represent the artist's work accurately. At very low quality levels, AVIF produces a "watercolor effect" that smooths textures inappropriately.

**Why it happens:**
Developers prioritize load speed metrics over image quality, applying the same compression settings used for generic web content to high-quality artwork that requires careful preservation of detail, color depth, and texture.

**Consequences:**
- Artist's work misrepresented online
- Lost commissions because images don't show true quality
- Damage to professional reputation
- Visitors can't evaluate artwork properly

**Prevention:**
- Use AVIF format for 50% smaller file sizes without quality loss (better than WebP for photography portfolios)
- Set quality levels at 85-90% for art images (not 70-80% like typical web images)
- AVIF supports 10-12 bit color depth, preserving gradients and color accuracy better than JPEG
- Test compression on detailed artwork with gradients before applying site-wide
- Consider serving original-quality images in a lightbox/modal view

**Warning signs:**
- Color banding visible in gradients
- Loss of texture detail in brushstrokes or fine work
- Blurry edges on high-contrast areas
- Artist complains images don't match originals

**Phase to address:**
Phase 2: Gallery System - Establish image processing pipeline with quality preservation as priority.

---

### Pitfall 3: Instant Newsletter Popup on Page Load

**What goes wrong:**
Displaying newsletter popup the moment a visitor arrives (0 seconds) immediately spikes bounce rate. Users haven't seen any content yet and have no reason to subscribe. This is the fastest way to annoy visitors and lose potential followers.

**Why it happens:**
Developers implement popups with default settings or follow generic conversion advice without considering user experience. The assumption that "more visibility = more signups" ignores the importance of timing and context.

**Consequences:**
- Visitors immediately hit back button (high bounce rate)
- Brand appears desperate/spammy
- Google penalizes "intrusive interstitials" on mobile
- Lost SEO rankings
- Missed genuine subscribers who would have signed up after viewing work

**Prevention:**
Use intelligent triggers instead of instant popups:
- Time delay: 30-60 seconds minimum (gives time to view work)
- Scroll trigger: After 50-60% of page scrolled (shows engagement)
- Exit-intent: When mouse moves toward browser close button (last chance)
- Page-specific: Only show on certain pages, not homepage/first visit

For mobile: Ensure popup is dismissible with large touch target and doesn't cover critical content.

**Warning signs:**
- Bounce rate > 60% on homepage
- Newsletter signups < 0.5% of visitors
- High immediate exits (< 5 seconds on site)
- Complaints from users about annoying popups

**Phase to address:**
Phase 4: Lead Capture - Implement popup with user-centric timing from day one.

---

### Pitfall 4: Not Avoiding Lazy Loading on Above-the-Fold Images

**What goes wrong:**
Applying `loading="lazy"` to images in the viewport (above the fold) delays their loading unnecessarily. The browser has to discover the image, check if it's in viewport, then start loading it - creating a multi-second delay for content that users expect to see immediately.

**Consequences:**
- Poor Largest Contentful Paint (LCP) scores
- Blank space where hero images should be
- Visitors see loading spinners on initial view
- SEO penalties for Core Web Vitals
- Unprofessional first impression

**Prevention:**
- Never use `loading="lazy"` on the first 2-3 images visitors will see
- For critical images (hero, portfolio preview), use `fetchpriority="high"`
- Only apply lazy loading to images below the fold (after first scroll)

```html
<!-- Hero image - loads immediately -->
<img src="hero.jpg" width="1920" height="1080" alt="Featured artwork" fetchpriority="high">

<!-- Gallery images below fold - lazy load -->
<img src="artwork-5.jpg" width="800" height="600" alt="Artwork 5" loading="lazy">
```

**Warning signs:**
- LCP scores > 2.5 seconds
- Hero image appears after page content
- Flash of unstyled content on load
- PageSpeed Insights flags slow image loading

**Phase to address:**
Phase 1: Foundation - Configure loading strategy correctly from the start.

---

### Pitfall 5: Serving Full Desktop Images to Mobile

**What goes wrong:**
Serving the same 3000x2000px images to mobile devices that desktop users see wastes bandwidth, takes 10+ seconds to load on cellular connections, and creates terrible mobile UX. Mobile visitors account for 50-70% of art portfolio traffic.

**Why it happens:**
Static sites don't automatically generate responsive image sizes. Developers upload one size and assume CSS scaling is sufficient, but the browser still downloads the full-resolution file even if displaying it at 400px wide.

**Consequences:**
- Mobile users abandon site during loading (3+ second load = 50% bounce)
- Wasted cellular data makes site unusable on slow connections
- Poor mobile Core Web Vitals hurt SEO
- Google penalizes mobile performance
- Lost opportunities with mobile-first art collectors and galleries

**Prevention:**
Use responsive images with srcset:
```html
<img
  srcset="artwork-400.avif 400w,
          artwork-800.avif 800w,
          artwork-1200.avif 1200w,
          artwork-1920.avif 1920w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
  src="artwork-1200.avif"
  width="1200" height="800"
  alt="Artwork title"
  loading="lazy">
```

Pre-generate image sizes during build/upload:
- 400px: Mobile portrait
- 800px: Mobile landscape, tablet portrait
- 1200px: Tablet landscape, desktop
- 1920px: Large desktop, high-DPI displays

**Warning signs:**
- Mobile PageSpeed score < 50
- Load times > 5 seconds on mobile
- High mobile bounce rate (> 70%)
- Large "Properly size images" opportunities in PageSpeed Insights

**Phase to address:**
Phase 2: Gallery System - Implement responsive image pipeline from the start.

---

### Pitfall 6: Missing Touch Targets and Gesture Support

**What goes wrong:**
Gallery navigation designed for mouse cursors (small arrows, hover effects) fails on touch devices. Buttons smaller than 44x44px are impossible to tap accurately. Missing swipe gestures means mobile users must use tiny navigation buttons.

**Why it happens:**
Desktop-first development approach where mobile is treated as an afterthought. Vanilla JS doesn't provide gesture handling, so developers skip it or implement it incorrectly.

**Consequences:**
- Frustrating mobile gallery experience
- Users can't navigate artwork easily
- Tap targets miss frequently
- No intuitive swipe between images
- Visitors leave before seeing full portfolio

**Prevention:**
- Minimum 44x44px touch targets (Apple guideline, WCAG standard)
- Implement touch events: `touchstart`, `touchmove`, `touchend`
- Support swipe gestures for gallery navigation
- Enlarge navigation elements on mobile (larger arrows, more spacing)
- Remove hover-only features (use tap instead)

```javascript
let touchStartX = 0;
let touchEndX = 0;

gallery.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

gallery.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) nextImage(); // Swipe left
  if (touchEndX > touchStartX + 50) prevImage(); // Swipe right
}
```

**Warning signs:**
- High bounce rate on mobile (> 70%)
- Users reporting difficulty navigating galleries
- Analytics show very low pages-per-session on mobile
- Touch targets fail accessibility audits

**Phase to address:**
Phase 2: Gallery System - Build mobile-first gallery with touch support from day one.

---

### Pitfall 7: EmailJS Exposed Client-Side Credentials

**What goes wrong:**
EmailJS requires API keys and template IDs embedded in client-side JavaScript. Anyone with basic developer tools can view these credentials, clone the site's email functionality, and spam the artist's inbox or use the account for malicious purposes.

**Why it happens:**
Static sites can't hide server-side logic, so developers expose EmailJS credentials directly in JavaScript files. The convenience of "just working" without a backend leads to accepting the security risk without considering alternatives.

**Consequences:**
- Spam/abuse of email service
- EmailJS account suspended for abuse from third parties
- Contact form becomes unreliable
- Wasted time dealing with spam
- Loss of legitimate leads mixed in with spam

**Prevention:**
1. **Rate limiting (client-side)**: Implement basic protection to slow automated abuse
   ```javascript
   const lastSubmit = localStorage.getItem('lastContactSubmit');
   if (lastSubmit && Date.now() - lastSubmit < 60000) {
     alert('Please wait before submitting again');
     return;
   }
   ```

2. **Honeypot field**: Hidden field that bots fill but humans don't
   ```html
   <input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
   ```

3. **Domain whitelist**: Configure EmailJS to only accept requests from your domain (in EmailJS dashboard)

4. **Monitor usage**: Set up EmailJS alerts for unusual activity

5. **Consider alternatives**: For high-stakes projects, use serverless function (Netlify Functions, Vercel Functions) to hide credentials

**Warning signs:**
- Sudden spike in form submissions
- EmailJS usage limits exceeded
- Spam emails appearing in inbox
- EmailJS account suspended

**Phase to address:**
Phase 4: Lead Capture - Implement security measures before launching contact form.

---

### Pitfall 8: GitHub Pages 1GB Size Limit with High-Res Images

**What goes wrong:**
Artist portfolios with 50-100 high-resolution images easily exceed GitHub Pages' 1GB repository size limit. Adding more artwork over time eventually hits the limit, requiring emergency migration or deleting images.

**Why it happens:**
Artists want to showcase work at high quality, uploading original 5-10MB images without optimization. Git tracks every version of every file, so even deleted images count toward the limit.

**Consequences:**
- Cannot add new artwork to portfolio
- Forced emergency migration to new hosting
- Git repository becomes slow/unusable
- Deployment failures
- Portfolio appears stagnant (can't update)

**Prevention:**
1. **Never commit original images to Git**:
   - Store originals outside repository
   - Only commit optimized versions to Git
   - Use build process to generate/optimize images

2. **Use Git LFS (Large File Storage)** for images:
   ```bash
   git lfs track "*.jpg" "*.png" "*.avif"
   ```

3. **External image hosting**:
   - Cloudinary (free tier: 25GB storage, 25GB bandwidth)
   - Imgur (for portfolio pieces)
   - GitHub Releases (doesn't count toward repo limit)

4. **Aggressive optimization**:
   - Target 200-400KB per artwork image
   - Use AVIF format (50% smaller than JPEG)
   - Generate responsive image sizes

5. **Monitor repository size**:
   ```bash
   git count-objects -vH
   ```

**Warning signs:**
- Repository approaching 800MB
- Push operations taking minutes
- Git operations becoming slow
- Warnings about repository size

**Phase to address:**
Phase 1: Foundation - Set up image optimization and external hosting before adding artwork.

---

### Pitfall 9: Broken Links After Site Reorganization

**What goes wrong:**
After reorganizing portfolio sections or renaming artwork files, old links (from social media, press features, bookmarks) return 404 errors. Static sites don't have automatic redirect handling like CMS platforms, so every broken link stays broken.

**Consequences:**
- Lost traffic from external links
- SEO penalties for 404 errors
- Poor professional image
- Missed opportunities from press/features
- Frustrated visitors who bookmarked specific artwork

**Prevention:**
1. **Plan URL structure carefully before launch**:
   - Use semantic, stable URLs: `/gallery/landscapes/sunset-vista`
   - Avoid dates or version numbers in URLs
   - Keep URLs short but descriptive

2. **Document all URL changes**: Keep a redirect map when reorganizing
   ```
   /old-portfolio/image1.html -> /gallery/series-a/image1
   /works/2024/piece5 -> /gallery/series-b/piece5
   ```

3. **Implement redirects** (GitHub Pages doesn't support .htaccess):
   - Use meta refresh redirects:
     ```html
     <!-- old-page.html -->
     <meta http-equiv="refresh" content="0; url=/new-page">
     ```
   - Or JavaScript redirect:
     ```javascript
     window.location.replace('/new-page');
     ```

4. **Monthly link checks**: Use free tools:
   - W3C Link Checker
   - Broken Link Checker browser extensions
   - Google Search Console (crawl errors report)

5. **Test before deploying reorganizations**: Check all internal links

**Warning signs:**
- Google Search Console showing 404 errors
- Visitors reporting broken links
- Traffic drop after site update
- Reduced search rankings

**Phase to address:**
Phase 1: Foundation - Establish stable URL structure. Phase 5: Polish - Add redirect handling before any reorganization.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skipping image dimension attributes | Faster HTML writing | Severe CLS, poor UX, SEO penalties | Never - adds <1min per image |
| Using only JPEG instead of AVIF | Familiar format, universal support | 2-3x larger files, slower load times, bandwidth costs | Only for ultra-legacy browser support (< 1% users) |
| Single image size for all devices | One file to manage | Massive mobile performance hit, high bounce rate | Never for image-heavy portfolios |
| Inline JavaScript in HTML | Faster initial development | Unmaintainable, no caching, security risks | Only for tiny scripts (<10 lines) |
| No touch gesture support | Desktop works fine | 50-70% of visitors (mobile) have poor UX | Never - takes ~50 lines of code |
| Committing large original images | Simple workflow | Hit 1GB limit, slow Git, forced migration | Never - set up optimization first |
| Client-side EmailJS with no protection | Works immediately | Spam abuse, account suspension | MVP only - add protection before public launch |
| Hardcoding content in HTML | No build process needed | Updates require editing every page | Small sites (< 10 pages) only |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| EmailJS | Exposing credentials in public JavaScript without rate limiting or honeypot | Implement client-side rate limiting, honeypot field, domain whitelist in EmailJS dashboard, monitor for abuse |
| Google Sheets API | Storing write credentials in client-side code allowing anyone to modify/delete portfolio data | Use read-only API key for public access, or use Google Forms for submissions (more secure) |
| Google Analytics | Blocking by ad blockers, tracking failure, no privacy notice | Accept that 25-40% won't track, add privacy policy, consider privacy-friendly alternatives (Plausible, Fathom) |
| Social media embeds | Heavy scripts slow page load, privacy concerns, layout shift on load | Use lazy loading for embeds, load only when scrolled into view, consider static screenshots with links instead |
| Font loading (Google Fonts) | Flash of unstyled text (FOUT), layout shift, privacy concerns | Use `font-display: swap`, preload critical fonts, consider self-hosting fonts for performance and privacy |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Loading all gallery images on page load | Slow initial load, white screen | Implement lazy loading, virtual scrolling for large galleries | > 20 images in gallery |
| No image optimization | Mobile load times > 10 seconds | Use AVIF format, generate responsive sizes, compress to 200-400KB target | > 10 high-res images |
| Synchronous JavaScript blocking render | Blank page while JS loads | Use async/defer attributes, load scripts at end of body | > 50KB of JavaScript |
| No caching headers (GitHub Pages default) | Repeat visitors re-download everything | Not configurable on GitHub Pages; consider Netlify/Vercel for cache control | N/A - affects all traffic |
| Large hero video background | 30+ second load on mobile, data overage | Use optimized video (< 2MB), poster image, disable on mobile | Video > 5MB |
| Unoptimized CSS (unused rules) | Render-blocking CSS, slow First Contentful Paint | Critical CSS inline, defer non-critical, remove unused rules | > 100KB CSS file |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing EmailJS credentials in public repos | Email service abuse, spam, account suspension | Never commit credentials to Git, use environment variables or serverless functions |
| No HTTPS enforcement | Man-in-the-middle attacks on contact form, loss of SEO rankings | GitHub Pages enforces HTTPS automatically - verify custom domain has HTTPS |
| Storing contact submissions in public Google Sheets | Personal data exposed publicly, GDPR violation | Make Google Sheet private, use OAuth for access, or use private form service |
| No honeypot/captcha on forms | Spam floods inbox, EmailJS limits exceeded | Add honeypot field, client-side rate limiting, consider hCaptcha for serious issues |
| Copyright information missing | Artwork theft, no legal recourse | Add copyright notice to footer, watermark preview images, include usage terms page |
| No Content Security Policy | XSS vulnerabilities if user content ever added | Add CSP meta tag limiting script sources (GitHub Pages doesn't support headers) |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Auto-playing background music | Immediate annoyance, visitor leaves, accessibility issues | Never auto-play audio - provide user-controlled player if needed |
| Requiring signup to view portfolio | Lost 90%+ of visitors who just want to see work | Portfolio publicly viewable, newsletter signup optional and well-timed |
| Image galleries with no captions | Context missing, artwork feels generic, missed storytelling | Add title, year, medium, optional description for each piece |
| No "back to gallery" link from image detail | Users stuck, have to use browser back button | Prominent "back" or "close" button, breadcrumb navigation |
| Hover-only interactions on mobile | Features invisible/unusable to 50-70% of visitors | Replace hover with tap, or provide visible controls always |
| Low contrast text on images | Readability issues, accessibility failures | Use semi-transparent overlays, ensure 4.5:1 contrast ratio minimum |
| Endless scrolling gallery with no pagination | Users can't bookmark position, hard to find specific work | Paginate galleries, provide grid/list toggle, add search/filter |
| Autoplaying gallery slideshow | User loses control, moves too fast/slow, misses pieces | User-controlled navigation, optional autoplay with clear stop button |
| Opening artwork in same tab | Lose place in gallery, have to navigate back | Open in modal/lightbox, or new tab for detailed view |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Image loading:** Gallery looks good on desktop - verify mobile performance, lazy loading implemented correctly, dimensions set on all images
- [ ] **Contact form:** Form submits successfully - verify EmailJS rate limits won't be hit, spam protection in place, error handling works, confirmation message shows
- [ ] **Gallery navigation:** Keyboard navigation works - verify left/right arrows navigate, escape closes, tab focus visible
- [ ] **Responsive design:** Site adapts to mobile - verify touch targets 44x44px minimum, swipe gestures work, no horizontal scrolling
- [ ] **Link testing:** Internal links work - verify external links (social media, press) work, no 404s, links open in appropriate target
- [ ] **Performance:** PageSpeed looks green - verify real-world mobile performance (test on 3G), Core Web Vitals pass, images optimized
- [ ] **SEO basics:** Meta tags present - verify Open Graph tags for social sharing, alt text on all images, sitemap.xml exists
- [ ] **Accessibility:** Passes automated checks - verify keyboard navigation works, color contrast sufficient, screen reader compatible
- [ ] **Browser testing:** Works in Chrome - verify Safari (iOS), Firefox, Edge, check for vanilla JS compatibility issues
- [ ] **Error states:** Success case works - verify form errors display properly, broken image fallbacks, offline behavior graceful
- [ ] **Copyright/legal:** Images display correctly - verify copyright notice present, terms of use page exists, privacy policy (if collecting emails)
- [ ] **Analytics:** Google Analytics installed - verify tracking works, ad blockers don't break site, events firing correctly

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Exceeded 1GB GitHub Pages limit | HIGH | 1. Audit repo size (`git count-objects -vH`), 2. Remove large files from history (BFG Repo-Cleaner), 3. Migrate images to external hosting (Cloudinary), 4. Push cleaned repo, 5. Update all image URLs |
| High CLS score hurting SEO | LOW | 1. Add width/height to all images, 2. Remove lazy loading from above-fold images, 3. Test with PageSpeed Insights, 4. Monitor Search Console for improvement |
| EmailJS account suspended for abuse | MEDIUM | 1. Contact EmailJS support, 2. Implement honeypot and rate limiting, 3. Set up domain whitelist, 4. Consider migration to serverless function |
| Mobile bounce rate > 70% | MEDIUM | 1. Generate responsive image sizes, 2. Implement touch gestures, 3. Enlarge touch targets, 4. Test on real devices, 5. Monitor improvement |
| Broken links from site reorganization | LOW | 1. Document all URL changes, 2. Create redirect pages with meta refresh, 3. Update external links where possible, 4. Monitor 404s in Search Console |
| Over-compressed images losing detail | LOW | 1. Retrieve original images, 2. Re-optimize with higher quality (85-90%), 3. Use AVIF instead of JPEG, 4. Replace files, 5. Verify with artist |
| Newsletter popup causing high bounce | LOW | 1. Change trigger to 30+ second delay or scroll-based, 2. Add easy close button, 3. Test exit-intent instead, 4. Monitor bounce rate improvement |
| No swipe gestures on mobile gallery | LOW | 1. Implement touch event listeners (touchstart/touchend), 2. Add swipe detection logic, 3. Test on actual touch devices, 4. Add visual indicators |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| CLS from images without dimensions | Phase 1: Foundation | Run PageSpeed Insights, verify CLS < 0.1, check all images have width/height attributes |
| Over-compressed art images | Phase 2: Gallery System | Compare compressed vs original side-by-side with artist approval, verify AVIF quality 85-90% |
| Serving full desktop images to mobile | Phase 2: Gallery System | Test mobile load time < 3 seconds on 3G, verify srcset working, check PageSpeed image warnings |
| Missing touch targets/gestures | Phase 2: Gallery System | Test on real mobile device, verify swipe works, measure touch targets > 44x44px, test keyboard nav |
| Instant newsletter popup | Phase 4: Lead Capture | Monitor bounce rate < 50%, verify 30+ second delay or scroll trigger, test mobile dismissal |
| EmailJS credential exposure | Phase 4: Lead Capture | Verify rate limiting works, test honeypot catches bots, check domain whitelist active, monitor usage |
| GitHub Pages 1GB limit | Phase 1: Foundation | Check repo size < 500MB, verify images stored externally or optimized, test Git LFS if needed |
| Broken links | Phase 5: Polish | Run broken link checker monthly, verify redirects work, test all external links, check Search Console |
| Lazy loading above-fold images | Phase 1: Foundation | Verify LCP < 2.5s, check hero image has fetchpriority="high", confirm no lazy load on first 3 images |

## Sources

### Official Documentation
- [Optimize Cumulative Layout Shift | web.dev](https://web.dev/articles/optimize-cls) - Image dimension best practices, CLS prevention techniques
- [GitHub Pages Limits | GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) - Official size limits, bandwidth restrictions, deployment constraints

### Artist Portfolio Best Practices
- [6 Art Portfolio Mistakes You Must Avoid | Milan Art Institute](https://www.milanartinstitute.com/blog/art-portfolio-mistakes) - Quality over quantity, image quality importance
- [5 Portfolio Blunders That Make You Look Like an Amateur | Artwork Archive](https://www.artworkarchive.com/blog/5-portfolio-blunders-that-make-you-look-like-an-amateur) - Broken links, credibility issues, professional presentation

### Image Optimization
- [How to Optimize Website Images: The Complete 2026 Guide | Request Metrics](https://requestmetrics.com/web-performance/high-performance-images/) - LCP optimization, Core Web Vitals impact, modern formats
- [JPG Vs. PNG Vs. WEBP Vs. AVIF: Best Web Image Format for 2026 | The CSS Agency](https://www.thecssagency.com/blog/best-web-image-format) - AVIF compression efficiency, quality preservation for art
- [AVIF vs WebP: Which Image Format Reigns Supreme in 2026? | Elementor](https://elementor.com/blog/webp-vs-avif/) - Bit depth advantages, gradient handling, portfolio recommendations
- [Cumulative Layout Shift Explained: 2026 Optimization Guide | OnDigitals](https://ondigitals.com/cumulative-layout-shift/) - Lazy loading pitfalls, dimension attributes

### Mobile UX
- [6 Tips To Improve Your Responsive Image Galleries | GO-Globe](https://www.go-globe.com/6-tips-to-improve-your-responsive-image-galleries/) - Touch interactions, mobile optimization, aspect ratio issues
- [How to Optimize Image Galleries for Mobile | Envira Gallery](https://enviragallery.com/how-to-optimize-image-galleries-for-mobile-using-envira-gallery/) - Responsive vs mobile-optimized differences

### Newsletter Popups
- [9 Proven Popup Best Practices for 2026 Conversions | Hello Bar](https://www.hellobar.com/blog/popup-best-practices-strategies-2026/) - Timing strategies, mobile penalties, exit-intent
- [10 Popup Mistakes That Are Killing Your Conversions | OptiMonk](https://www.optimonk.com/popup-mistakes/) - Instant popup issues, bounce rate impact

### Static Site Integration
- [EmailJS: Tutorial with Code Snippets [2026] | Mailtrap](https://mailtrap.io/blog/emailjs/) - Security vulnerabilities, configuration issues
- [EmailJS Down? Status and reported issues | SaaSHub](https://www.saashub.com/emailjs-status) - Service reliability, deployment problems

### Vanilla JavaScript
- [Why Developers Are Ditching Frameworks for Vanilla JavaScript | The New Stack](https://thenewstack.io/why-developers-are-ditching-frameworks-for-vanilla-javascript/) - Modern vanilla JS advantages, surgical approach
- [How to Solve JavaScript Cross-Browser Compatibility Issues | BrowserStack](https://www.browserstack.com/guide/resolve-javascript-cross-browser-compatibility-issues) - Browser engine differences, testing requirements

### Maintenance & SEO
- [How To Find And Fix Broken Links? 2026 Guide | Elementor](https://elementor.com/blog/broken-links/) - SEO impact, maintenance frequency
- [SEO for Static Websites: The 2026 Guide | Simply Static](https://simplystatic.com/tutorials/seo-for-static-websites/) - Static vs dynamic SEO, crawlability

---
*Pitfalls research for: Static Artist Portfolio Website*
*Researched: 2026-01-31*
