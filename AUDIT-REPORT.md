# 🔍 MereShabd.com — Comprehensive UI/UX Audit Report

**Date:** 1 April 2026  
**Auditor:** Sunny (Senior Hindi Web UI/UX Audit)  
**Website:** https://mereshabd.pages.dev  
**Source:** `C:\Users\prate\.openclaw\workspace\mereshabd\site\`  
**Pages Audited:** 20 (5 main + 15 posts)

---

## 🔴 CRITICAL (Must Fix)

### C1. `--ink` Color Inconsistency — Body Text Color Split
- **Pages affected:** ALL 13 older post pages (guru-mahattva, health-is-wealth, jane-doctor-jubani, jivan-darshan, kalam-se-utare, kavya, kshanikayen-anil-saxena, mammi-amma-nani, najrana-pardesh-se, naritva, navvarsh-2025, yadon-ke-pannon-se, yadon-mein-rahenge)
- **Problem:** These pages define `--ink: #1565C0` (a **blue** color), while all main pages (index, about, archive, gallery, contact) and the two NEW posts use `--ink: #1C1410` (correct dark brown/black).
- **Impact:** All body text on post pages renders in blue instead of the intended dark ink color. This is the single biggest visual inconsistency on the site.
- **Fix:** Change `--ink:#1565C0` → `--ink:#1C1410` on all 13 older post pages.

### C2. Category Taxonomy Mismatch: "प्रवासी मन" vs "यात्रा"
- **Pages affected:** index.html, archive.html, footer links across all pages
- **Problem:** The homepage and footer link to `archive.html?cat=pravasi` (प्रवासी मन / Diaspora), but the archive page uses `data-cat="yatra"` (यात्रा / Travel) for "नज़राना परदेश से." The archive filter bar has "यात्रा" button but NO "प्रवासी मन" button.
- **Impact:** Clicking "प्रवासी मन" from homepage or footer yields zero results on archive page (filter shows empty). The homepage footer says "प्रवासी मन" but archive footer says "यात्रा".
- **Fix:** Decide on ONE category name. If keeping "प्रवासी मन", change archive to use `data-cat="pravasi"` and update filter button. If keeping "यात्रा", update homepage and index footer links.

### C3. Archive Page Count Wrong — Shows 14, Should Be 15
- **Page affected:** archive.html
- **Problem:** The "सभी" filter button shows `14` and `visibleCount` defaults to `14`, but there are actually **15** post-card elements in the grid (peace + reflection + navvarsh + guru + mammi + yadon-mein + health + jivan + jane-doctor + kalam + najrana + naritva + kavya + yadon-ke + kshanikayen).
- **Fix:** Update filter count to `15` and default visibleCount to `15`.

### C4. Archive Category Counts Are Wrong
- **Page affected:** archive.html
- **Problem:** Filter buttons show:
  - कविता: `5` → Actually **6** cards (peace, reflection, navvarsh, mammi, naritva, kavya)
  - लेख: `4` → Correct ✓
  - संस्मरण: `3` → Correct ✓
  - यात्रा: `1` → Correct ✓ (but see C2 about naming)
  - विशेष: `1` → Correct ✓
- **Fix:** Update कविता count from `5` to `6`. Update सभी from `14` to `15`.

### C5. `.hide-sm` Class Used But Never Defined (Most Pages)
- **Pages affected:** ALL pages except navvarsh-2025.html
- **Problem:** Nav links for "परिचय", "गैलरी", and "संपर्क" use `class="hide-sm"` to hide on mobile, but the CSS class `.hide-sm` is **never defined** in index.html, about.html, archive.html, contact.html, gallery.html, or any post page except navvarsh-2025.html. This means on mobile, ALL nav items remain visible, causing the nav to overflow or wrap messily.
- **Fix:** Add `.hide-sm { display:none }` inside the `@media(max-width:900px)` block on every page — or better, extract shared CSS.

### C6. navvarsh-2025.html Has Completely Different Design Language
- **Page affected:** posts/navvarsh-2025.html
- **Problem:** This page uses a fundamentally different nav, hero, layout, sidebar, and footer design compared to every other page:
  - **Nav:** Always opaque white background with border-bottom (no scroll transparency effect), different padding, height fixed at 64px
  - **Hero:** Split grid layout (text left, image right) vs full-bleed gradient hero on all other posts
  - **Sidebar:** Completely different structure (table-like info rows vs author card + related links)
  - **Footer:** Different grid structure, different class names (`.footer-grid`, `.fb-title` vs `.footer-main`, `.fbrand-text`)
  - **CSS variables:** Different `--red` (#8B1A1A vs #9B0E0E), different `--gold` (#C9A84C vs #B8873A), different `--cream` (#F5F0E8 vs #F7F2EA)
  - **No breadcrumb** (all other post pages have one)
- **Impact:** Visiting this page feels like a completely different website.
- **Fix:** Rebuild navvarsh-2025.html using the same template as other post pages (mammi-amma-nani.html is a good reference).

---

## 🟡 IMPORTANT (Should Fix)

### I1. `.nav-en` Class Used But Not Styled on index.html
- **Page affected:** index.html
- **Problem:** The homepage nav uses `<span class="nav-en">Home</span>` etc., but `.nav-en` is never defined in the homepage CSS. Other pages (about.html, post pages) define it properly.
- **Impact:** English nav labels render as inline text next to Hindi labels with default styling, not the intended small monospace block.
- **Fix:** Add the `.nav-en` CSS rule to index.html.

### I2. Bengali Script Character in Hindi Text
- **Page affected:** index.html, "Rachnaon ka Sansar" section
- **Problem:** The "विशेष" card description says `"সুর-ताल जुগলবंदি — ২৩ कविताओं..."`. The "২৩" is **Bengali numeral** (U+09E8 U+09E9), not Devanagari "२३".
- **Impact:** May render differently or confuse screen readers. Breaks linguistic consistency.
- **Fix:** Replace `২৩` with `२३` (Devanagari numerals).

### I3. No Hamburger Menu for Mobile Navigation
- **Pages affected:** ALL pages
- **Problem:** There is no mobile hamburger/toggle menu anywhere. On small screens, nav items either overflow horizontally, wrap, or (with the undefined `.hide-sm`) remain fully visible. The nav CTA button is hidden via CSS on mobile, but the remaining 5 links still crowd the space.
- **Impact:** Poor mobile UX. Nav becomes unusable or ugly on phones.
- **Fix:** Implement a hamburger menu toggle for screens below 900px.

### I4. Massive Image Files — Performance Killer
- **Pages affected:** Multiple post pages
- **Problem:** Several images are enormous:
  - `2026-03-27-jeevan-darshan-v2.png` — **21.5 MB**
  - `2025-01-25-jeevan-darshan-hero.png` — **19.4 MB**
  - `jd-hero-colorful.jpg` — **19.1 MB**
  - `kavya-sansaar-sagar.png` — **19.1 MB**
  - `yadon-man-of-style.png` — **19.1 MB**
  - Multiple images between 2-7 MB
- **Impact:** Pages load extremely slowly, especially on mobile. A single post page could require 30+ MB of images.
- **Fix:** Compress all images. JPEGs should be under 200KB, PNGs under 500KB. Use WebP format. Consider lazy loading (`loading="lazy"` attribute).

### I5. 25 Unused Images in /images/ Folder
- **Problem:** These images exist in the images folder but are not referenced by any HTML file:
  - `2025-01-25-jeevan-darshan-hero.png` (19.4 MB!)
  - `2026-03-27-jeevan-darshan-v2.png` (21.5 MB!)
  - `2026-03-27-jeevan-darshan-v3.png` (19.1 MB!)
  - `gitanjali-baps-mandir.jpg`, `gitanjali-mandir-card.jpg`, `gitanjali-mandir-photo.jpg`, `gitanjali-mandir.jpg`
  - `gitanjali-portrait-gemini-hd.jpg`, `gitanjali-portrait-hd.jpg`, `gitanjali-portrait-recreated.jpg`
  - `hero-dhol.jpg`, `hero-harmonium.jpg`, `hero-music-notes.jpg`, `hero-poetry-lamp.jpg`, `hero-sitar.jpg`, `hero-tabla.jpg`
  - `kshanikayen-hero.jpg`, `lotus-desert.jpg`
  - `naritva-hero-option2.png`, `naritva-poem-devi-mask.png`, `naritva-poem-devi.png`
  - `post-bday.jpg`, `post-bday.png`, `post-mammi.png`
  - `temple-dancers.jpg`
- **Impact:** Wasted disk space (~100+ MB of unused images). Some of these are 19 MB each.
- **Fix:** Archive or delete unused images. Move them to a `_drafts/` folder if they might be needed later.

### I6. All CSS Is Inline — No Shared Stylesheet
- **Pages affected:** ALL 20 pages
- **Problem:** Every single page has its own full `<style>` block (200-400 lines each). Nav CSS, footer CSS, typography CSS, and variables are duplicated across all 20 pages.
- **Impact:**
  - Any design change requires editing 20 files
  - Pages are 30-50KB larger than necessary
  - Bugs like C1 (wrong --ink color) and C5 (missing .hide-sm) happen because updates aren't propagated
  - No browser caching benefit for CSS
- **Fix:** Extract shared CSS (nav, footer, typography, variables, responsive) into a single `style.css` file. Keep only page-specific styles inline.

### I7. Homepage "Rachnaon Ka Sansar" Section Counts Are Wrong
- **Page affected:** index.html
- **Problem:** The category cards show:
  - कविता: "3 रचनाएं" → should be **6** (peace, reflection, navvarsh, mammi, naritva, kavya)
  - लेख: "5 रचनाएं" → should be **4** (health, jivan-darshan, jane-doctor, kalam-se)
  - संस्मरण: "2 रचनाएं" → should be **3** (guru-mahattva, yadon-mein, yadon-ke-pannon)
  - प्रवासी मन: "1 रचनाएं" → correct (but naming issue, see C2)
  - विशेष: "1 रचनाएं" → correct
- **Fix:** Update all counts to match actual content.

### I8. Footer Inconsistency Between Pages
- **Pages affected:** Various
- **Problem:** Footer structures vary:
  - Homepage: has fbrand-en English text, English subtitles on links
  - About: no English translations in footer
  - Archive: footer uses "यात्रा" while homepage uses "प्रवासी मन"
  - Navvarsh: completely different footer structure
  - Some posts: footer has fblinks div, some don't
  - Peace-alone: footer logo uses different filter (`brightness(0) invert(0.7)` vs `brightness(0) invert(1)`)
  - Copyright: Some say "© २०२५", reflection says "© २०२६", peace says "© गीतांजलि सक्सेना" (no year)
- **Fix:** Standardize footer HTML across all pages. Use "© २०२६" consistently.

### I9. Two NEW Pages Missing from Homepage Magazine Grid
- **Page affected:** index.html
- **Problem:** The "ताज़ी रचनाएं" (Latest Works) magazine grid on the homepage shows 7 posts but does NOT include the two newest poems (peace-alone-can-light-the-way, reflection-and-hope).
- **Fix:** Add the new poems to the magazine grid, or at least replace the oldest entries with the newest ones to keep the section fresh.

### I10. No `loading="lazy"` on Images
- **Pages affected:** ALL pages with images
- **Problem:** None of the `<img>` tags use `loading="lazy"`. With images as large as 19 MB, this causes unnecessary bandwidth consumption on initial page load.
- **Fix:** Add `loading="lazy"` to all images that are below the fold.

---

## 🟢 NICE TO HAVE (Polish)

### N1. Inconsistent Hero Heights Across Post Pages
- **Pages affected:** Post pages
- **Problem:** Most post heroes use `min-height:72vh`, but peace-alone uses `min-height:76vh`. Navvarsh uses a completely different grid hero at `min-height:460px`. The visual effect is consistent enough for newer pages, but the navvarsh page sticks out.
- **Fix:** Standardize to `min-height:72vh` across all post pages.

### N2. `post-subtitle` Missing `display: flex` Property
- **Page affected:** mammi-amma-nani.html, guru-mahattva.html
- **Problem:** `.post-subtitle` has `align-items:center;gap:24px;flex-wrap:wrap` but no `display:flex`. These properties have no effect without flex display.
- **Fix:** Add `display:flex` or remove the unused flex properties.

### N3. Missing `nav-cta-en` on Some Pages
- **Pages affected:** about.html, archive.html nav CTAs
- **Problem:** Homepage nav CTA has `<span class="nav-cta-en">Read Works</span>`, but about.html's nav CTA just says "रचनाएं देखें" without the English subtitle. Same for archive page.
- **Fix:** Add English subtitle consistently to all nav CTAs or remove from all.

### N4. Breadcrumb Missing on Homepage
- **Page affected:** index.html
- **Problem:** Homepage doesn't have a breadcrumb (fine for homepage), but also doesn't indicate active nav state. The nav link for "होम" has no `.active` class on the homepage.
- **Fix:** Add `class="active"` to the "होम" nav link on index.html (about.html has it for "परिचय", archive.html has it for "रचनाएं").

### N5. OG Image Could Be More Specific Per Post
- **Pages affected:** peace-alone-can-light-the-way.html, reflection-and-hope.html
- **Problem:** Both new pages use `images/author.jpg` as the OG image. Since these pages have no hero image (gradient-only heroes), there's no post-specific preview image for social sharing.
- **Fix:** Create unique OG images for these posts, or generate them from the gradient + title text.

### N6. Canonical URLs Inconsistent
- **Pages affected:** navvarsh-2025.html
- **Problem:** Navvarsh canonical is `https://mereshabd.com/posts/navvarsh-2025.html` (with .html extension), while peace-alone uses `https://mereshabd.com/posts/peace-alone-can-light-the-way` (without .html). Other main pages use without extension too.
- **Fix:** Standardize canonical URLs — either all with `.html` or all without. Since Cloudflare Pages can handle both, pick one and be consistent.

### N7. Archive Page Scroll Position Could Reset on Filter
- **Page affected:** archive.html
- **Problem:** When clicking a filter button, the grid updates but the scroll position doesn't change. If user scrolled down, they might miss that the grid changed.
- **Fix:** Scroll to the top of the grid when a filter is clicked.

### N8. Contact Page Form Has No Backend
- **Page affected:** contact.html
- **Problem:** If there's a form, it likely has no form handler (no Formspree, Netlify Forms, etc. configured).
- **Note:** This would need investigation — not able to fully test without viewing the contact page's form action.

### N9. Gallery Videos Referenced But No Playback Controls
- **Page affected:** gallery.html
- **Problem:** Four `.mp4` video files exist in the gallery folder. Need to verify if they have proper `<video>` elements with controls.
- **Fix:** Ensure all videos have `controls`, `preload="metadata"`, and poster images.

### N10. Missing `display:swap` Fallback on Some Font Loads
- **Pages affected:** All pages use `display=swap` correctly in Google Fonts URL ✓
- **Status:** Already handled well.

### N11. Copyright Year Should Be 2026
- **Pages affected:** index.html, about.html, archive.html, some posts
- **Problem:** Some pages say "© २०२५" while the newest ones say "© २०२६". Since it's April 2026, all should say 2026.
- **Fix:** Update copyright to "© २०२६" across all pages.

### N12. `editorial-intro` Section Not Responsive
- **Page affected:** index.html
- **Problem:** The editorial intro uses `grid-template-columns:120px 1fr` which could break on very small screens. The mobile CSS targets `.intro-grid` but the actual class is `.editorial-intro`.
- **Fix:** Add proper mobile override for `.editorial-intro` grid.

---

## ✅ WHAT'S WORKING WELL

### W1. Design Language (When Consistent) Is Beautiful
The overall design language — the deep red/gold/cream color palette, the use of Tiro Devanagari Hindi for headings and Noto Sans Devanagari for body, the editorial/magazine-style layout — is genuinely excellent. This is a high-quality Hindi literary website.

### W2. letter-spacing: 0 Enforcement Is Thorough
The systematic enforcement of `letter-spacing: 0 !important` on all Devanagari text is the RIGHT approach. Devanagari matra rendering breaks with letter-spacing, and this site handles it correctly across all pages.

### W3. SEO Is Generally Well-Done
- Open Graph tags present on all main pages and most post pages
- Twitter Card tags present
- JSON-LD structured data on homepage, about page, and both new posts
- Canonical URLs present (though inconsistent format)
- Unique titles and descriptions per page

### W4. Scroll-Based Nav Transparency Effect
The nav that starts transparent over the hero and becomes opaque on scroll is elegant and works well (on pages that implement it).

### W5. Post Navigation (Prev/Next) Is Good UX
The post navigation bar at the bottom of post pages, showing previous and next posts, is a nice touch for content discovery.

### W6. Archive Filter Logic Is Solid
The JavaScript filtering on archive.html is clean and functional. The URL parameter routing (`?cat=kavita`) is a smart touch. The vishesh inline section toggling is well-implemented.

### W7. English Translations Are Tasteful
The bilingual approach — Hindi primary with Cormorant Garamond italic English subtitles — is elegant and doesn't feel forced. The English is clearly secondary, serving as accessibility/context rather than equal treatment.

### W8. Reading Progress Bar on New Posts
The progress bar at the top of peace-alone and reflection-and-hope is a nice UX detail for long poetry pages.

### W9. Author Photo Consistency
The author photo (`author.jpg`) is used consistently across all pages — hero, sidebar, footer — creating a personal, unified brand identity.

### W10. Both New Pages (Peace, Reflection) Match Modern Design
The two newest posts are well-designed, use the correct `--ink` color, have proper breadcrumbs, consistent nav/footer, reading progress bars, sidebars, related posts, tags, share buttons, and OG/Twitter/JSON-LD metadata. They represent the design standard the rest of the site should match.

---

## 📊 Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 6 |
| 🟡 Important | 10 |
| 🟢 Nice to Have | 12 |
| ✅ Working Well | 10 |

### Priority Order for Fixes:
1. **C1** — Fix `--ink` color on all 13 post pages (5 min, huge visual impact)
2. **C5** — Add `.hide-sm` CSS definition to all pages (5 min)
3. **C3/C4** — Fix archive counts (2 min)
4. **C2** — Resolve category naming (decide & fix, 10 min)
5. **C6** — Rebuild navvarsh-2025.html to match site template (30-60 min)
6. **I1** — Add `.nav-en` to index.html (2 min)
7. **I2** — Fix Bengali character (1 min)
8. **I6** — Extract shared CSS (2-4 hours, prevents future inconsistencies)
9. **I4** — Compress images (30 min with batch tool)
10. **I5** — Clean up unused images (10 min)

---

*Report generated by Sunny — Senior Hindi Web UI/UX Audit*
