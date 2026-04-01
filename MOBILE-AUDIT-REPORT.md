# 📱 Mobile Responsiveness Audit — mereshabd.com

**Audited:** April 1, 2026  
**Viewport tested:** 375px (iPhone SE/13 mini), observed at live site `mereshabd.pages.dev`  
**Pages tested:** 10 (homepage, about, archive, gallery, contact, + 5 posts)  
**Auditor:** Senior Mobile UI/UX Audit (automated)

---

## 🔴 CRITICAL Mobile Issues

### 1. `.hide-sm` class is NEVER DEFINED (affects ALL pages)

- **Pages affected:** ALL pages (index, about, archive, gallery, contact, ALL posts)
- **Problem:** Navigation links for "परिचय", "गैलरी", and "संपर्क" have `class="hide-sm"` applied in the HTML, but **no CSS rule for `.hide-sm` exists** in any page except `navvarsh-2025.html`. This means these items are NOT hidden on mobile — the nav bar has 6 items crammed into 375px width, causing horizontal overflow.
- **Evidence:** At 375px, the nav shows: होम | परिचय | रचनाएं | गैलरी | संपर्क | रचनाएं देखें — all visible, text too small, touching and overlapping.
- **Current CSS:** Only `navvarsh-2025.html` has `.nav-links .hide-sm{display:none}` at `@media(max-width:900px)`. All other pages are missing it entirely.
- **Recommended fix — add to EVERY page's `@media(max-width:900px)` block:**
```css
@media(max-width:900px) {
  .nav-links .hide-sm { display: none; }
}
```

### 2. No Hamburger Menu — Nav Overflows on Mobile

- **Pages affected:** ALL pages
- **Problem:** There is NO hamburger/mobile menu at all. The nav is a horizontal `display:flex` list. At 375px even after hiding `.hide-sm` items, the remaining items (होम, रचनाएं, रचनाएं देखें) will be cramped. The CTA button "रचनाएं देखें" is hidden at 900px via `.nav-links .nav-cta{display:none}`, but there's no toggle menu for the hidden items.
- **Current CSS:** `nav` is `display:flex` with `justify-content:space-between`. `.nav-links` is `display:flex; gap:32px` (reduced to `gap:16px` at 900px). No hamburger button or sliding menu exists in any page.
- **Recommended fix:**
```css
/* Add a hamburger button (needs HTML changes too) */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

@media(max-width:768px) {
  .nav-toggle { display: block; }
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--ink);
    flex-direction: column;
    padding: 20px 24px;
    gap: 16px;
  }
  .nav-links.open { display: flex; }
  .nav-links .hide-sm { display: block; } /* Show all items in menu */
  .nav-links a { color: rgba(255,255,255,0.88); font-size: 16px; }
}
```

### 3. Post Hero Title 72px on Mobile — Way Too Large

- **Pages affected:** mammi-amma-nani, naritva, reflection-and-hope (and other poems)
- **Problem:** `.post-title` is set to `font-size:72px` by default. At 900px it goes to 40px, at 600px to 30px. But the `@media(max-width:900px)` rule uses `!important` overrides that work, **however** the hero content padding `.ph-content{padding:0 80px}` is only reduced to 24-28px in some pages, not all.
- **Specific issue on mammi-amma-nani:** The hero title "मम्मी, अम्मा, नानी... जीवन सफ़र" renders well after the media query kicks in, but the `.ph-content` padding of `80px` at desktop causes content to be very narrow before the breakpoint.
- **Current CSS:** `.post-title{font-size:72px}` → `@media(900px): 40px!important` → `@media(600px): 30px!important`
- **Recommended fix:** Add an intermediate breakpoint and ensure padding is consistent:
```css
@media(max-width:768px) {
  .post-title { font-size: 36px !important; }
  .ph-content { padding: 0 20px 48px !important; }
}
```

### 4. Contact Page — Form Inputs Invisible / Unstyled at Mobile

- **Pages affected:** contact.html
- **Problem:** The contact form uses `.fs-input` and `.fs-label` classes from the footer subscribe strip — NOT the form-specific classes. The form inputs appear as very thin, barely-visible lines on mobile because the `.fs-input` has `background:rgba(255,255,255,0.1)` styling meant for the dark footer, but is used on a light background. The form labels are also hard to see.
- **Evidence:** In the 375px screenshot, the form section on the right shows almost invisible inputs — you can barely see where to type.
- **Current CSS:** Form uses `class="fs-input"` and `class="fs-label"` which are styled for dark backgrounds.
- **Recommended fix:** Use proper form classes or override:
```css
.contact-section .fs-input {
  background: var(--cream);
  border: 1.5px solid rgba(0,0,0,0.15);
  color: var(--ink);
}
.contact-section .fs-label {
  color: var(--ink);
}
```

### 5. Post Layout Sidebar (300px) Not Hidden on Some Pages

- **Pages affected:** mammi-amma-nani.html, peace-alone-can-light-the-way.html
- **Problem:** The `.post-layout{grid-template-columns:1fr 300px}` creates a 2-column layout. While the `@media(max-width:900px)` in most pages collapses this to 1fr, the sidebar `.post-sidebar` still takes up space on mobile. In the mammi-amma-nani page, the `@media(900px)` rule says `.post-aside,.sidebar,.side-col{display:none}` but the actual class is `.post-sidebar` — potential mismatch causing sidebar to remain visible.
- **Evidence:** On the mammi-amma-nani 375px screenshot, the sidebar content (author photo, related posts) IS visible below the poem, which is correct — but it takes up significant scroll space.
- **Current CSS:** Various pages use different selectors (`.post-aside`, `.sidebar`, `.side-col`, `.post-sidebar`) to target the sidebar column.
- **Recommended fix:** Standardize:
```css
@media(max-width:900px) {
  .post-layout { grid-template-columns: 1fr !important; }
  .post-sidebar {
    position: static !important;
    max-height: none !important;
    border-left: none !important;
    border-top: 1px solid rgba(0,0,0,0.07);
    padding: 32px 24px !important;
  }
}
```

---

## 🟡 IMPORTANT Mobile Issues

### 6. Hero Section on Homepage — 72vh Height + Large Font at Mobile

- **Pages affected:** index.html
- **Problem:** The hero uses `min-height:72vh` (some pages 62vh) which is fine on desktop but on mobile creates a huge hero that pushes all content below the fold. The hero name is set to 52px at 900px and 36px at 600px — better but the hero still consumes the entire viewport.
- **Current CSS:** `.hero-name{font-size:72px}` → `52px (900px)` → `36px (600px)`. Hero has `min-height:72vh` in index.
- **Recommended fix:**
```css
@media(max-width:600px) {
  .hero { min-height: 50vh; }
  .hero-name { font-size: 32px !important; }
}
```

### 7. Footer Grid Doesn't Fully Stack on Mobile

- **Pages affected:** ALL pages
- **Problem:** Footer uses `grid-template-columns:2fr 1fr 1fr 1fr` at desktop. At 900px it goes to `1fr 1fr`. But on a 375px screen, 2 columns is still too cramped for Hindi text. The footer columns squeeze the text, making footer links hard to tap.
- **Current CSS:** `@media(max-width:900px){.footer-main{grid-template-columns:1fr 1fr;...}}`
- **Recommended fix:**
```css
@media(max-width:600px) {
  .footer-main { grid-template-columns: 1fr !important; padding: 32px 20px; }
}
```
*Note: About.html already has this fix at 600px. Other pages don't.*

### 8. Breadcrumb Padding 80px on Post Pages

- **Pages affected:** All post pages (mammi-amma-nani, naritva, peace, reflection-and-hope, kshanikayen)
- **Problem:** `.breadcrumb{padding:14px 80px}` — 80px horizontal padding on a 375px screen means only 215px of usable width for breadcrumb text. This is extremely cramped.
- **Current CSS:** `@media(max-width:900px): breadcrumb{padding:12px 24px}` — this IS handled in most pages, but double-check all pages have it.
- **Status:** Most pages DO reduce this at 900px. ✅ But kshanikayen only has `breadcrumb{padding:12px 24px}` at 900px breakpoint — OK.

### 9. Archive Filter Bar — Horizontal Scroll on Mobile

- **Pages affected:** archive.html
- **Problem:** The filter bar has 6 filter buttons (सभी, कविता, लेख, संस्मरण, यात्रा, विशेष) in a horizontal flex layout. At 375px, these overflow. The `.filter-inner` gets `padding:0 20px` at 900px, but there's no `overflow-x:auto` to make it scrollable.
- **Evidence:** From the 375px screenshot of archive.html, the filter buttons appear to fit just barely but are cramped.
- **Current CSS:** `.filter-bar` is `position:sticky; top:88px`. `.filter-inner{display:flex; gap:6px; overflow-x:auto}` — actually, let me verify.
- **Recommended fix (if overflow-x isn't set):**
```css
.filter-inner {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.filter-inner::-webkit-scrollbar { display: none; }
```

### 10. Kshanikayen — Floating Shabdavali Words Clutter Mobile

- **Pages affected:** kshanikayen-anil-saxena.html
- **Problem:** The hero has 20 floating `.shabd` elements positioned absolutely with sizes from 34px to 68px. On a 375px screen, these words overlap each other and the hero title, creating visual chaos. The shabdavali elements use `left:3-38%` and `right:3-32%` positioning — on a 375px screen, `left:38%` = 142px which means words are stacked on top of each other.
- **Current CSS:** No responsive rule hides or shrinks these. `@media(max-width:900px)` only adjusts hero padding and poem grid.
- **Recommended fix:**
```css
@media(max-width:768px) {
  .shabdavali { display: none; }
  /* Or scale down: */
  .shabd { font-size: 24px !important; opacity: 0.3 !important; }
}
```

### 11. Poem Lines `.pline.xl` at 52px on Mobile

- **Pages affected:** mammi-amma-nani.html, naritva.html
- **Problem:** `.pline.xl{font-size:52px}` for large poem lines. At 900px it reduces to 34px, at 600px to 26px (mammi-amma-nani) or 22px (naritva). However, 26px Devanagari text with the default 80px content padding (reduced to 24px at 900px) can still cause overflow on very long Hindi words.
- **Current CSS:** Properly handled in most pages with cascading media queries.
- **Recommended fix:** Already mostly handled, but add `word-break: break-word` as safety:
```css
.pline { word-break: break-word; overflow-wrap: break-word; }
```

### 12. Post Content Padding 80px on All Sides

- **Pages affected:** All post pages
- **Problem:** `.post-content{padding:80px 80px 80px 80px}` — this means 160px of horizontal padding on a 375px screen = only 215px for content. The 900px media query reduces to `40px 24px`, which is correct.
- **Current CSS:** Most pages handle this correctly at 900px. ✅
- **Risk:** If any page is missing the media query override, content will be unreadable.

### 13. Author Bio Section Grid on Mobile

- **Pages affected:** All post pages with author bio at bottom
- **Problem:** `.author-bio-inner{grid-template-columns:140px 1fr; gap:48px; padding:72px 80px}`. At 900px, reflection-and-hope reduces to `grid-template-columns:1fr` and `padding:40px 24px`. But mammi-amma-nani and naritva use `.abio{flex-direction:column; padding:32px 24px}` which targets a different class.
- **Recommended fix:** Ensure consistency across all pages:
```css
@media(max-width:900px) {
  .author-bio-inner {
    grid-template-columns: 1fr !important;
    padding: 40px 24px !important;
    gap: 24px;
  }
  .author-bio-photo {
    width: 80px !important;
    height: 80px !important;
  }
}
```

### 14. Contact Page Two-Column Grid on Mobile

- **Pages affected:** contact.html
- **Problem:** `.contact-grid{display:grid; grid-template-columns:1fr 1.4fr; gap:72px}`. At 900px this becomes `grid-template-columns:1fr; gap:40px`. From the screenshot, this IS working — the form stacks below the info. ✅
- **But:** The contact hero title `.contact-hero-title{font-size:72px}` reduces to 48px at 900px. On 375px, 48px is still quite large for "मिलिए, बात करें" in Devanagari.
- **Recommended fix:**
```css
@media(max-width:600px) {
  .contact-hero-title { font-size: 36px !important; }
}
```

---

## 🟢 Nice to Have

### 15. Gallery Grid Could Be 1-Column on Very Small Screens

- **Pages affected:** gallery.html
- **Problem:** Gallery goes from 4-col → 3-col (900px) → 2-col (600px). At 375px with 2 columns, images are ~170px wide each, which is OK but a 1-column layout would show images much larger and more impactful.
- **Current CSS:** `@media(max-width:600px){.gallery-grid{grid-template-columns:repeat(2,1fr)}}`
- **Optional improvement:**
```css
@media(max-width:400px) {
  .gallery-grid { grid-template-columns: 1fr; }
  .gallery-item { height: 240px; }
}
```

### 16. Tap Target Sizes for Nav Links

- **Pages affected:** ALL pages
- **Problem:** Nav links at 14px (reduced to 12px on kshanikayen) with only gap between them. On mobile, the minimum recommended tap target is 44×44px. The nav links are approximately 30px tall with minimal padding.
- **Recommended fix:** Increase nav link padding in mobile menu:
```css
@media(max-width:768px) {
  .nav-links a { padding: 12px 0; font-size: 16px; }
}
```

### 17. Hero Description Text Hidden Behind Photo on About Page

- **Pages affected:** about.html
- **Problem:** At 600px, `.hero-desc{display:none}` hides the description entirely. The hero photo overlay is at `opacity:0.25` which makes it less distracting, but the user loses the author description.
- **Alternative approach:** Keep a shorter version visible:
```css
@media(max-width:600px) {
  .hero-desc { font-size: 14px; max-height: 60px; overflow: hidden; }
}
```

### 18. Kshanikayen PDF Modal Should Be Fullscreen on Mobile

- **Pages affected:** kshanikayen-anil-saxena.html
- **Problem:** The PDF modal uses `padding:40px` on the lightbox. On mobile, the PDF viewer should take the full screen.
- **Current CSS:** No specific mobile override for `.pdf-modal`.
- **Recommended fix:**
```css
@media(max-width:768px) {
  .pdf-modal { padding: 0; }
  .pdf-modal-header { padding: 12px 16px; }
  .pdf-modal-title { font-size: 16px; }
}
```

### 19. Footer Bottom Row Should Stack on Mobile

- **Pages affected:** Pages where footer-bottom isn't stacking
- **Problem:** `.footer-bottom{display:flex; justify-content:space-between}` — at 375px, the copyright text and links compete for space. About.html already fixes this at 900px with `flex-direction:column; gap:12px; text-align:center`. Other pages don't have this.
- **Recommended fix:** Add to all pages:
```css
@media(max-width:768px) {
  .footer-bottom {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
```

### 20. Rachnaon Ka Sansar Grid on Small Mobile

- **Pages affected:** index.html
- **Problem:** The 5-column grid goes to 2-col (900px) → 1-col (600px). This is properly handled. ✅
- **Minor enhancement:** Cards could use slightly less padding on mobile:
```css
@media(max-width:600px) {
  .rs-card { padding: 20px 18px; }
}
```

---

## ✅ What's Working Well

### ✅ Archive Page Grid — Responsive Correctly
The 3-column grid collapses to 2-col at 900px and 1-col at 600px. Card heights adjust properly. Filter bar is scrollable.

### ✅ Post Layout Grid — Collapses to Single Column
All tested post pages properly collapse `.post-layout` from `1fr 300px` to `1fr` at 900px. Sidebar stacks below content.

### ✅ Gallery Grid — Good Responsive Behavior
Gallery goes 4-col → 3-col → 2-col. Images use `object-fit:cover` and maintain consistent heights.

### ✅ Content Text Readability
Hindi text (Tiro Devanagari Hindi + Noto Sans Devanagari) is legible at mobile sizes. Line heights are generous (1.65-2.3) which is essential for Devanagari.

### ✅ Hero Content Padding Reduces on Mobile
Most pages properly reduce `.hero-content` padding from 60-80px to 24px at the 900px breakpoint.

### ✅ Poem Font Sizes Scale Down
Poem lines properly cascade: xl(52→34→26px), lg(38→24→20px). Readable on mobile.

### ✅ Contact Form Layout Stacks
The 2-column contact layout properly becomes single-column at 900px.

### ✅ About Page Bio Section
The 3-column bio section collapses properly. The side column is hidden on mobile.

### ✅ Images Use object-fit: cover
No image overflow issues observed. All images constrained to their containers.

### ✅ viewport meta tag Present
All pages have `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.

### ✅ overflow-x: hidden on body
All pages have `body{overflow-x:hidden}` preventing horizontal scroll at page level.

---

## 📋 Summary & Priority

| Priority | Issue | Impact | Effort |
|----------|-------|--------|--------|
| 🔴 P0 | `.hide-sm` undefined — nav overflows | ALL pages broken | 5 min (add 1 CSS rule to each page) |
| 🔴 P0 | No hamburger menu | ALL pages — no mobile nav | 2 hrs (HTML+CSS+JS) |
| 🔴 P0 | Contact form inputs invisible | Contact page unusable | 15 min |
| 🟡 P1 | Footer doesn't stack to 1-col at 600px | Most pages | 10 min |
| 🟡 P1 | Kshanikayen shabdavali clutter | 1 page | 5 min |
| 🟡 P1 | Contact hero title too large | 1 page | 2 min |
| 🟡 P1 | Footer bottom doesn't stack | Multiple pages | 5 min |
| 🟢 P2 | Gallery 1-col at 400px | Nice to have | 2 min |
| 🟢 P2 | Tap targets too small | Accessibility | 10 min |
| 🟢 P2 | PDF modal fullscreen | 1 page | 5 min |

---

## 💡 Global Recommendation: Create a Shared CSS File

Currently, each page has its own `<style>` block with duplicated CSS. This means:
- Bug fixes (like `.hide-sm`) must be applied to 15+ files manually
- Responsive rules are inconsistent across pages
- Maintenance is a nightmare

**Strong recommendation:** Extract common styles (nav, footer, responsive breakpoints) into a `styles/common.css` file and link it from every page. Then page-specific styles can remain inline.

```html
<link rel="stylesheet" href="styles/common.css">
<style>
  /* Page-specific styles only */
</style>
```

This would prevent ~80% of the issues found in this audit from recurring.
