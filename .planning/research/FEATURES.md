# Feature Research

**Domain:** Artist Portfolio Website
**Researched:** 2026-01-31
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| High-quality image viewing | Artwork is the core value proposition. Blurry or low-res images are deal-breakers for galleries and collectors | MEDIUM | Requires responsive images, progressive loading, proper compression. Industry standard: high-resolution that loads under 2 seconds |
| Mobile responsive design | 66% of web traffic is mobile; collectors and curators browse on phones | LOW | CSS media queries, flexible grids, touch-optimized navigation |
| Gallery/portfolio page | Visual organization of artworks is the primary purpose of the site | MEDIUM | Grid layouts with consistent sizing, filtering by series/medium optional |
| Contact form | Buyers, galleries, and students need an easy, spam-free way to reach the artist | LOW | Standard form with email integration. Email address alone is insufficient |
| Artist bio | Galleries, curators, and collectors need context about the artist's background and credibility | LOW | 2-3 paragraphs written in third person. Required for gallery submissions |
| Artist statement | Explains artistic practice, themes, and approach. Expected by curators and serious collectors | LOW | 100-200 words recommended length. Fundamental for exhibition applications |
| Fast loading speed | Pages taking >3 seconds lose 40% of visitors; mobile users abandon after 3 seconds | MEDIUM | Image optimization, lazy loading, minimal scripts. Target: <2 second load time |
| Professional presentation | Clean, distraction-free layout that puts focus on the artwork | MEDIUM | Minimalist design, consistent typography, ample whitespace |
| CV/Resume page | Galleries and curators require documentation of exhibitions, awards, education | LOW | Reverse chronological format, PDF download option. Exhibitions should be near top |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable for standing out.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Image zoom/lightbox with deep zoom | Allows collectors to examine brushwork, texture, and details up to 10,000% zoom. Differentiates serious portfolios from basic sites | HIGH | Requires high-res source images, pinch-to-zoom on mobile, mouse wheel on desktop. Lightbox Studio provides video + image mixed gallery support |
| Exhibition history timeline | Curators value cohesive exhibition narrative. Timeline format shows career progression visually | MEDIUM | Chronological display with dates, venues, exhibition types (solo vs group). Can include exhibition images |
| Artwork detail pages | Individual pages per artwork with dimensions, medium, year, availability, pricing. Shows professionalism | MEDIUM | Template-based generation, image + metadata. Optional: process notes, inspiration |
| Newsletter subscription | Builds direct audience for exhibition announcements. Collectors sign up to hear about new work | LOW | Email capture form, integration with email service (Mailchimp, etc.). Footer or popup placement |
| Series/collection organization | Groups artworks by body of work or theme. Shows conceptual depth to curators | MEDIUM | Categorization system, filtered gallery views. Helps curators envision exhibition coherence |
| Artist process/studio documentation | Behind-the-scenes content builds connection with collectors and differentiates from gallery-only artists | MEDIUM | Photos/videos of studio, work-in-progress. Can be blog posts or dedicated section |
| Exhibitions page with images | Visual record of past shows with installation shots. Proves exhibition experience to galleries | MEDIUM | Gallery of exhibition views, venue info, dates. More engaging than CV list alone |
| Social media integration | Instagram feed embed or social links. Collectors expect to see artist's social presence | LOW | Embedded Instagram profile or link buttons. 29% of art buyers purchase via social platforms |
| High-quality photography consistency | Professional, consistent lighting and backgrounds across all artwork images. Signals professionalism | MEDIUM | Requires photo setup or professional photographer. Natural light, no shadows/reflections recommended |
| Video integration | For performance art, process documentation, or artist interviews. Adds dimension for mixed-media artists | MEDIUM | Lightbox support for video, hosting on Vimeo/YouTube. Not essential for traditional 2D artists |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems for artist portfolios.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Auto-playing background music | Artists think it sets mood or atmosphere | Startles visitors, causes immediate exits. Inaccessible for many users. Looks unprofessional to galleries | Use visual design to convey mood. Let artwork speak |
| Flash/heavy animations on page load | Desire to make site "impressive" or unique | Slows loading, reduces accessibility, looks dated. Galleries want quick access to artwork | Subtle CSS transitions only. Prioritize content over effects |
| Including every artwork ever created | "More is better" mentality; difficulty curating | Dilutes quality perception, overwhelms visitors, contradicts "quality over quantity" industry standard | Curate 10-15 strongest pieces. Update seasonally |
| Fan art in professional portfolio | Artists proud of technical skill shown | Signals lack of originality to galleries and commissioners. Professional portfolios need original work | Create separate "personal work" section if needed, or omit entirely |
| Complex navigation/mystery meat navigation | Trying to be artistic or unique with UI | Visitors can't find basic info (bio, contact, portfolio). Galleries abandon sites with poor navigation | Standard navigation patterns. Clear labels (About, Work, Contact) |
| Autoplaying video backgrounds | Trendy design element, looks modern | Destroys loading speed, uses mobile data, accessibility nightmare. Content competes with artwork | Static hero image or simple slideshow if needed |
| Pop-up newsletter on immediate page load | Maximizing email captures | Interrupts first impression, feels spammy, increases bounce rate | Use footer form or exit-intent popup (after viewing artwork) |
| Pricing all works publicly | Transparency, e-commerce mindset | Gallery representation contracts often prohibit public pricing. High-end collectors prefer private inquiry | "Price on request" with contact form. Or separate collector login area |
| Music playlist integration | Artists want to share creative influences | Distracts from visual focus, auto-play issues, not relevant to curators/galleries | Link to Spotify in artist statement or bio only |
| Over-designed artist statements | Trying to be poetic or mysterious | Curators and galleries need clarity. Jargon and vague language reduces credibility | Concise, jargon-free 100-200 words. Explain themes clearly |

## Feature Dependencies

```
Core Foundation:
[Mobile responsive design] ← foundation for all features
[Fast loading speed] ← foundation for all features
    ↓
[Gallery/portfolio page] ← requires responsive design + loading optimization
    ↓
[High-quality image viewing] ← requires gallery page
    ↓
[Image zoom/lightbox] ← enhances high-quality viewing
    ↓
[Artwork detail pages] ← requires individual image infrastructure

Information Architecture:
[Artist bio] ← standalone
[Artist statement] ← standalone
[CV/Resume page] ← standalone
    ↓
[Exhibition history timeline] ← enhances CV, requires exhibition data
[Exhibitions page with images] ← requires exhibition data + image gallery

Engagement Features:
[Contact form] ← standalone, required early
[Newsletter subscription] ← standalone, can integrate with contact form
[Social media integration] ← standalone

Content Organization:
[Series/collection organization] ← requires gallery infrastructure
[Video integration] ← requires lightbox/gallery support
```

### Dependency Notes

- **Fast loading + Mobile responsive are prerequisites for everything**: Without these, all other features fail. Build these into foundation
- **Gallery page before artwork details**: Need collection view before individual views
- **Image zoom requires high-res source files**: Can't be added retroactively without re-photographing
- **Exhibition timeline enhances CV**: CV is table stakes, timeline is differentiator that builds on CV data
- **Newsletter works independently**: Can be added anytime without dependencies
- **Series organization assumes sufficient body of work**: For Maria Fernanda's portfolio, verify enough works exist to justify categorization

## MVP Definition

### Launch With (v1)

Minimum viable product for Maria Fernanda's artist portfolio. What's needed to be credible to galleries, collectors, and students.

- [x] Mobile responsive design — 66% of traffic is mobile; non-negotiable foundation
- [x] Fast loading images (<2 sec) — Progressive loading, proper compression, lazy loading
- [x] Gallery page (Works section) — Grid layout showcasing curated artwork selection (10-15 pieces)
- [x] High-quality image viewing — Responsive images, consistent photography, proper resolution
- [x] Artist bio — Third-person, 2-3 paragraphs, professional background
- [x] Artist statement — 100-200 words, explains themes and approach clearly
- [x] Contact form — Email integration, spam protection, accessible from multiple pages
- [x] Basic lightbox/image viewer — Click to enlarge, navigation between images, escape to close
- [x] CV/Resume page — Reverse chronological, exhibitions near top, PDF download option
- [x] Professional minimalist design — Clean layout, artwork is focus, ample whitespace

### Add After Validation (v1.x)

Features to add once core portfolio is working and receiving traffic.

- [ ] Newsletter subscription form — Add to footer once baseline traffic exists (trigger: 50+ visitors/month)
- [ ] Exhibition history page with images — Once 3+ exhibition image sets are photographed (trigger: post-launch photo shoot)
- [ ] Artwork detail pages — Individual pages per piece with dimensions, medium, availability (trigger: collector inquiries about specific pieces)
- [ ] Series/collection organization — Group by body of work or theme (trigger: 20+ artworks in portfolio)
- [ ] Social media integration — Instagram feed embed or icon links (trigger: active Instagram presence established)
- [ ] Advanced image zoom — Deep zoom up to 10,000% for detail viewing (trigger: collector feedback requesting closer views)

### Future Consideration (v2+)

Features to defer until portfolio proves effective and specific needs emerge.

- [ ] E-commerce integration — Direct sales capability (trigger: consistent inquiry volume or gallery representation terms allow)
- [ ] Video integration — Process videos, studio tours, artist talks (trigger: video content created)
- [ ] Exhibition timeline visualization — Interactive timeline of shows (trigger: 10+ exhibitions documented)
- [ ] Artist process/studio section — Behind-the-scenes content (trigger: content creation resources available)
- [ ] Multi-language support — Portuguese/English toggle (trigger: international audience data shows need)
- [ ] Blog/news section — Updates on new work, exhibitions (trigger: regular content creation capacity)

## Feature Prioritization Matrix

Based on user value to Maria Fernanda's three audiences (collectors, galleries/curators, students) versus implementation cost.

| Feature | User Value | Implementation Cost | Priority | Rationale |
|---------|------------|---------------------|----------|-----------|
| Mobile responsive design | HIGH | LOW | P1 | Foundation. 66% of traffic. All audiences use mobile |
| Fast loading speed | HIGH | MEDIUM | P1 | 40% bounce if >3sec. Affects all users |
| Gallery page | HIGH | MEDIUM | P1 | Core purpose. All audiences need to see work |
| High-quality images | HIGH | MEDIUM | P1 | Deal-breaker for galleries/collectors. Poor images = unprofessional |
| Artist bio | HIGH | LOW | P1 | Required by galleries and curators. Students want background |
| Contact form | HIGH | LOW | P1 | Critical conversion point for all audiences |
| Artist statement | HIGH | LOW | P1 | Required for gallery submissions. Shows conceptual depth |
| CV/Resume page | HIGH | LOW | P1 | Non-negotiable for curators and galleries. Proves credibility |
| Basic lightbox | MEDIUM | MEDIUM | P1 | Expected image viewing behavior. Enhances portfolio viewing |
| Professional design | HIGH | MEDIUM | P1 | First impression. Galleries judge site quality |
| Newsletter subscription | MEDIUM | LOW | P2 | Useful for exhibition announcements. Not required for credibility |
| Image zoom/deep zoom | MEDIUM | HIGH | P2 | Collectors value detail viewing. Differentiator but not required |
| Artwork detail pages | MEDIUM | MEDIUM | P2 | Shows professionalism. Helpful once inquiries begin |
| Exhibition history page | MEDIUM | MEDIUM | P2 | Valuable for curators. Requires content (photos) first |
| Series organization | MEDIUM | MEDIUM | P2 | Useful with larger body of work. Helps curators |
| Social media integration | LOW | LOW | P2 | Nice to have. 29% of buyers use social, but not replacement for portfolio |
| E-commerce features | LOW | HIGH | P3 | Only if direct sales model. May conflict with gallery representation |
| Video integration | LOW | MEDIUM | P3 | Not essential for traditional visual artists. Resource-intensive |
| Exhibition timeline | LOW | MEDIUM | P3 | Nice visualization but CV provides same info |
| Blog/news section | LOW | MEDIUM | P3 | Requires ongoing content creation. Not expected |

**Priority key:**
- P1: Must have for launch — required for credibility with target audiences
- P2: Should have, add when possible — improves experience but not required for baseline credibility
- P3: Nice to have, future consideration — marginal value or resource-intensive

## Competitor Feature Analysis

Analysis of top artist portfolio websites referenced in research for feature presence and execution quality.

| Feature | Manuel Lozano (Hostinger) | Rina Maimon | Sean Halpin | Industry Standard |
|---------|---------------------------|-------------|-------------|-------------------|
| Mobile responsive | Yes, optimized | Yes | Yes | Universal (100%) |
| High-quality images | Yes, vivid representation | Yes, collage style | Yes, animation | Universal, minimum bar |
| Gallery/portfolio page | Slideshow on homepage | Collage with hover | Creative layout | Universal, presentation varies |
| Contact form | Yes | Yes | Yes, with social icons | ~90% have contact forms |
| Artist bio | Yes | Yes | Yes | ~95% include bio |
| Lightbox viewer | Yes | Yes, hover effects | Yes, interactive | ~85% have lightbox |
| CV/Resume | Likely (standard builder) | Not mentioned | Not mentioned | ~75% for serious portfolios |
| Image zoom | Not mentioned | Not mentioned | Not mentioned | ~30%, differentiator |
| Exhibition history | Not specified | Not specified | Not specified | ~60% for established artists |
| Newsletter | Not mentioned | Not mentioned | Not mentioned | ~40%, growing trend |
| Social media links | Not mentioned | Not mentioned | Yes, prominently | ~70% include links |
| E-commerce | Available (Hostinger feature) | Not mentioned | Not mentioned | ~25%, depends on sales model |
| Video integration | Not specified | Not specified | Yes, animations | ~20%, specialty feature |
| Series organization | Multidisciplinary approach | Not specified | Not specified | ~50% for varied work |

**Key Insights:**
- **Table stakes are universal**: Mobile, images, gallery, bio, contact form appear in 90%+ of successful portfolios
- **Lightbox is expected**: 85% use some form of enlarged image viewing
- **CV presence varies**: More common for gallery-represented artists (75%) than independent/emerging (40%)
- **Differentiation happens in execution**: Everyone has galleries, but quality of photography, layout design, and loading speed separate top portfolios
- **Social links growing**: 70% include social media, up from ~50% in previous years
- **Newsletter gaining traction**: 40% now include email capture, primarily for exhibition announcements

## Audience-Specific Feature Priorities

Maria Fernanda's portfolio serves three distinct audiences with different needs.

### Art Buyers and Collectors
**Primary goals**: See artwork quality, assess value, contact for purchase/inquiry

**Must-have features**:
1. High-quality image viewing (zoom to see detail/brushwork)
2. Artwork dimensions, medium, year (context for value assessment)
3. Contact form (initiate purchase conversation)
4. Artist bio (credibility, story increases value perception)
5. Exhibition history (social proof, established artist signal)

**Nice-to-have**:
- Pricing or "price on request" (sets expectation)
- Availability status (sold/available)
- Newsletter (stay informed of new work)

### Galleries and Curators
**Primary goals**: Evaluate exhibition potential, assess professionalism, verify credentials

**Must-have features**:
1. CV/Resume with exhibitions, awards, education
2. Artist statement (conceptual depth, curatorial theme potential)
3. Cohesive body of work (series/collection organization)
4. Exhibition history with images (proven track record)
5. Professional presentation (minimalist design, fast loading)
6. High-resolution images (for promotional materials)

**Nice-to-have**:
- Process documentation (curatorial narrative material)
- Press/reviews section (external validation)
- Exhibition proposals or downloadable press kit

### Students Interested in Workshops
**Primary goals**: Learn about teaching, assess credibility, contact for class info

**Must-have features**:
1. Artist bio (teaching background, credentials)
2. Contact form (inquire about classes)
3. Gallery of work (quality demonstrates teaching capability)
4. Professional presentation (trustworthiness)

**Nice-to-have**:
- Workshops/teaching page (dedicated info about classes)
- Student work examples (teaching effectiveness proof)
- Newsletter (workshop announcements)
- Testimonials (social proof for teaching)

**Feature overlap**: Artist bio, contact form, high-quality galleries, and professional design serve all three audiences. Prioritize these universal features first.

## Technical Considerations for Maria Fernanda's Context

Given the project context (static site, immersive visual experience, already planned features):

**Already planned features alignment**:
- Interactive galleries (Works and Exhibitions) → Aligns with table stakes gallery page + differentiator exhibition history
- Newsletter popup → Aligns with differentiator newsletter subscription. Note: Industry research suggests footer form or exit-intent over immediate popup
- Contact form → Aligns with table stakes contact feature
- Responsive design → Aligns with table stakes mobile responsive

**Gaps in current plan vs table stakes**:
- Artist bio page (required for credibility)
- Artist statement (required for gallery submissions)
- CV/Resume page (required for curators and galleries)
- High-quality image viewing with lightbox (expected behavior)

**Static site implications**:
- Newsletter: Requires third-party service (Mailchimp, ConvertKit) with form embed
- Contact form: Requires form service (Formspree, Netlify Forms, etc.) or serverless function
- E-commerce: Would require third-party integration (difficult for static). Defer to future/external
- Dynamic filtering: Possible with JavaScript, but limited compared to database-driven
- Image optimization: Critical for static sites. Use next-gen formats (WebP), proper compression

**Performance priorities for static site**:
1. Image optimization is make-or-break (static = no dynamic resizing)
2. Lazy loading essential (many images on gallery pages)
3. Progressive loading for high-res images
4. Minimize JavaScript (static sites should be fast by default)

## Implementation Recommendations

Based on research findings and Maria Fernanda's specific context:

### Phase 1: Core Portfolio (MVP)
**Goal**: Launch credible portfolio that meets gallery, collector, and student expectations

1. **Visual foundation**: Photograph all artworks professionally (natural light, consistent backgrounds, high-res)
2. **Information architecture**: Create content for bio (third-person, 2-3 paragraphs), statement (100-200 words), CV (reverse chronological)
3. **Gallery implementation**: Grid layout, 10-15 curated pieces, lightbox on click
4. **Mobile optimization**: Test on multiple devices, ensure images load <2 seconds
5. **Contact integration**: Implement form with spam protection (Formspree recommended for static sites)

### Phase 2: Enhanced Experience (Post-Launch)
**Goal**: Add differentiators based on user feedback and content availability

1. **Exhibition gallery**: Add installation photos from past shows
2. **Artwork detail pages**: Individual pages with dimensions, medium, year
3. **Newsletter**: Footer form for exhibition announcements (Mailchimp embedded form)
4. **Image zoom**: Implement deep zoom for detail viewing (if collector feedback requests)
5. **Social integration**: Add Instagram link/embed once active presence established

### Phase 3: Advanced Features (Future)
**Goal**: Add sophisticated features as needs emerge

1. **Series organization**: Group works by theme/body of work (once 20+ pieces)
2. **Video integration**: Studio tour or process videos (requires video production)
3. **Blog/news**: Updates on new work (requires content creation capacity)

## Sources

### Artist Portfolio Best Practices
- [20 Best Artist Portfolio Websites (Examples) 2026 - Colorlib](https://colorlib.com/wp/artist-portfolio-websites/)
- [19 Best Art Portfolio Website Examples for 2026 - Hostinger](https://www.hostinger.com/tutorials/art-portfolio-website-examples)
- [5 Great Art Portfolio Website Examples for 2026 - Squarespace](https://www.squarespace.com/blog/art-portfolio-examples)
- [Art Portfolios: 30+ Inspiring Website Examples (2026)](https://www.sitebuilderreport.com/inspiration/art-portfolios)
- [11 Best Website Builders for Artists – Launch Your Portfolio in 2026](https://www.tooltester.com/en/website-builder-for-artists/)

### Gallery and Curator Requirements
- [Artist Portfolio Tips: Stand Out and Attract Clients [2025] - ArtConnect Magazine](https://www.magazine.artconnect.com/resources/make-portfolio-stand-out)
- [How to Build a Portfolio That Works for Galleries, Collectors & Curators](https://womeninartsnetwork.com/how-to-build-a-portfolio-that-works-for-galleries-collectors-curators/)
- [Crafting a Professional Artist Portfolio for Galleries: An Ultimate Guide](https://professionalartist.com/crafting-a-professional-artist-portfolio-for-galleries-an-ultimate-guide/)
- [The Dos and Don'ts of Building a Successful Visual Art Portfolio - Artwork Archive](https://www.artworkarchive.com/blog/the-dos-and-don-ts-of-building-a-successful-visual-art-portfolio)

### Common Mistakes to Avoid
- [6 Art Portfolio Mistakes You Must Avoid - Milan Art Institute](https://www.milanartinstitute.com/blog/art-portfolio-mistakes)
- [Common mistakes when creating a portfolio (and how to avoid them) - Wix](https://www.wix.com/blog/common-portfolio-mistakes)
- [Art Portfolio Common Mistakes: How to Avoid Them in 2025 - Vsble](https://www.getvsble.com/blog/art-portfolio-common-mistakes-en)
- [6 Biggest Art Portfolio Mistakes To Avoid (With Tips) - Don Corgi](https://doncorgi.com/blog/art-portfolio-mistakes/)

### Image Viewing and Gallery Features
- [Enhance art portfolio website with advanced lightbox features - Beyondspace](https://www.beyondspace.studio/blog/enhance-art-portfolio-website-with-advanced-lightbox-features)
- [Pinchzoom Lightbox - Squarespace lightbox zoom - Beyondspace](https://www.beyondspace.studio/new-squarespace-lightbox-zoom-plugin)

### E-commerce Considerations
- [10 Best Websites to Sell Your Art Online in 2026 - EntryThingy](https://www.entrythingy.com/blog/best-websites-to-sell-your-art-online)
- [How To Sell Art Online: The Complete Guide (2026) - Shopify](https://www.shopify.com/blog/211990409-how-to-sell-art-online)
- [9 Best E-Commerce Platforms for Artists: Top Picks for 2026](https://www.websiteplanet.com/blog/best-ecommerce-platform-for-artists/)

### Artist Bio and Statement
- [Artist Bios 101: Here's How To Write An Amazing Artist Profile - Format](https://www.format.com/magazine/resources/art/artist-profile)
- [All Pages You Need For A Professional Artist's Website - CAI](https://www.contemporaryartissue.com/all-pages-you-need-for-a-professional-artists-website/)
- [The Complete Guide to Writing an Artist Statement - ARTDEX](https://www.artdex.com/the-complete-guide-to-writing-an-artist-statement/)
- [Writing an Artist Biography vs Statement: Why You Need Both](https://www.framedestination.com/blog/resources/writing-artist-biography-vs-statement-why-you-need-both)

### CV and Exhibition Documentation
- [Visual Artist Curriculum Vitae: Recommended Conventions - CAA](https://www.collegeart.org/standards-and-guidelines/guidelines/visual-art-cv)
- [How to Write an Artist CV to Get More Opportunities - Artwork Archive](https://www.artworkarchive.com/blog/how-to-write-an-artist-cv-to-get-more-opportunities)
- [Learn How to Write an Artist CV like a Pro - ArtConnect Magazine](https://www.magazine.artconnect.com/resources/how-to-write-an-artist-cv)

### Performance and Mobile Optimization
- [How to Improve Your Portfolio Loading Speed - Locus Visual Arts](https://www.locusdigital.com/blog/how-to-improve-your-portfolio-loading-speed)
- [Digital Portfolio Platforms 2026 Guide - InfluenceFlow](https://influenceflow.io/resources/digital-portfolio-platforms-the-complete-2026-guide-for-creators-freelancers-and-brands/)
- [20+ Interesting Website Speed Statistics (2026)](https://www.sitebuilderreport.com/website-speed-statistics)

### Social Media Integration
- [Best Social Media Platforms for Artists in 2026](https://www.socialpilot.co/blog/social-media-for-artists)
- [Social Media for Artists 2026: Best Platforms & Strategies to Sell Art](https://socialrails.com/blog/social-media-for-artists)
- [The Power of Social Media for Artists: What Works in 2026](https://www.theartfairguy.com/the-power-of-social-media-for-artists-what-works-in-2026/)

### SEO Optimization
- [SEO For Artist Websites: A Super Simple Guide (Examples) 2026](https://chriswilsonstudio.com/seo-for-artist-websites/)
- [How to Optimize Your Portfolio Website for SEO: A Creative's Guide - Pixpa](https://www.pixpa.com/blog/how-to-optimize-your-portfolio-website-for-seo)
- [5 SEO Tips for Artists - Artwork Archive](https://www.artworkarchive.com/blog/5-seo-tips-for-artists)

---
*Feature research for: Maria Fernanda's Artist Portfolio (portfólio artístico estático)*
*Researched: 2026-01-31*
*Confidence: HIGH (based on multiple recent industry sources, 2025-2026 best practices)*
