# Mereshabd mobile/image optimization audit — 2026-04-27

Scope: `site/*.html`, `site/posts/*.html`, `site/images` only. No deploy performed.

## Highest-impact image findings

- **Critical 18–21 MB hero/content images**: `site/images/2025-01-25-jeevan-darshan-hero.png` 18.93 MB 5504×3072, `2026-03-27-jeevan-darshan-v2.png` 21.00 MB 5504×3072, `2026-03-27-jeevan-darshan-v3.png` 18.68 MB 5504×3072, `jd-hero-colorful.jpg` 18.68 MB 5504×3072, `kavya-sansaar-sagar.png` 18.68 MB 5504×3072, `yadon-man-of-style.png` 18.68 MB 5504×3072. Referenced pages include `site/posts/jivan-darshan.html` and `site/posts/yadon-ke-pannon-se.html`; the first three may be unused duplicates but should be confirmed before deletion.
- **Large PNG groups that should become responsive WebP/JPEG**:
  - `site/posts/naritva.html`: `naritva-*.png` mostly 1.25–2.16 MB each.
  - `site/posts/yadon-ke-pannon-se.html`: `yadon-*.png` mostly 1.50–1.96 MB each plus one 18.68 MB file.
  - `site/posts/jivan-darshan.html`: `jd-*.jpg` mostly 1.29–2.00 MB each plus one 18.68 MB hero.
  - `site/posts/sur-taal-jugalbandi.html`: `ks-01.jpg`…`ks-24.jpg` total ≈27 MB, each ~1.0–1.3 MB, used as CSS backgrounds for small cards.
- **Large card/thumbnail assets reused on index/archive/posts**: `post-guru-mahattva.jpg` 1.74 MB, `post-jivan-darshan.jpg` 1.87 MB, `post-kalam-se-utare.jpg` 1.52 MB, `post-kshanikayen.jpg` 1.92 MB, `post-navvarsh.jpg` 1.81 MB, `post-yadon-ke-pannon-se.jpg` 1.56 MB. These are card-sized but currently megabyte-scale.
- **Video payloads in `site/gallery.html`**: four MP4s in `site/images/gallery/` are 7.49, 8.46, 13.39, and 15.78 MB. Ensure `preload="metadata"`, poster thumbnails, and no autoplay; consider compressed mobile versions.
- **Existing good optimized variants not consistently used**: `hero-yadon-letters2-opt.webp` is 95 KB vs `hero-yadon-letters2.png` 5.99 MB; `petal-*-opt.webp` are 10–26 KB vs 1.17–1.45 MB PNGs. Replace references where visual parity is acceptable.
- **Broken/corrupt asset**: `site/images/jd-independence-opt.webp` exists but Pillow cannot identify it as an image. Regenerate or remove to avoid future broken references.

## HTML/CSS mobile layout findings

- **No responsive image markup**: audit found `srcset=0` across all scanned pages. Add `srcset`/`sizes` for `<img>` heroes/cards; CSS `background-image` cards cannot benefit from native responsive selection.
- **Lazy loading gap**: only `site/gallery.html` has meaningful `loading="lazy"`; most posts have `lazy=0` despite multiple images/background cards. Add `loading="lazy" decoding="async"` to non-LCP `<img>` and `fetchpriority="high"` only to the page’s LCP hero.
- **CSS background cards are overused for content images**: `site/posts/sur-taal-jugalbandi.html` uses 24 `ks-*` images as inline `background-image` (`.pc-img` lines around 367–574), and many posts use `.rm-card-bg`/post-card backgrounds. Prefer `<picture><img>` for real images so browser can lazy-load, size, and select WebP/AVIF.
- **Repeated desktop-first grid patterns**: common `grid-template-columns:1fr 300px`, `repeat(3,1fr)`, footer `2fr 1fr 1fr 1fr`. Most files include mobile overrides, but audit flagged risky grids in `about.html`, `archive.html`, `gallery.html`, and most `site/posts/*.html`; verify no late duplicate CSS overrides undo mobile rules.
- **Fixed 280px mobile nav drawer**: repeated `.nav-links{position:fixed; right:0; width:280px; height:100vh ...}`. Safer mobile pattern: `width:min(86vw,280px); height:100dvh; overflow-y:auto`.
- **Large fixed horizontal padding**: repeated `padding:... 80px` / `60px` in post heroes, breadcrumbs, sections, footer. Some have media overrides; standardize to `padding-inline:clamp(20px,6vw,80px)` to avoid overflow regressions.
- **`white-space:nowrap` appears repeatedly** on `.nav-cta`, labels, poem/card titles, tags. Highest-risk file is `site/posts/yadon-ke-pannon-se.html` (`nowrap=16`); audit at 320–390px viewport and allow wrapping for titles/buttons.
- **Animation budget**: `site/posts/jane-doctor-jubani.html` has many animations (`anims=20`); `site/posts/sur-taal-jugalbandi.html` animates 20 floating `.shabd` elements; `site/404.html` has several keyframes. Add `@media (prefers-reduced-motion: reduce)` and reduce/disable decorative animations under ~600px.
- **`overflow-x:hidden` masks problems**: body has this in many pages; keep temporarily, but use browser 320px audit to find true overflow from fixed widths/nowrap instead of hiding it.

## Safe recommended commands/scripts

These do not deploy. Run from `C:\Users\prate\.openclaw\workspace\mereshabd`.

```powershell
# 1) Inventory largest images and dimensions (requires Pillow)
@'
from pathlib import Path
from PIL import Image
for p in sorted(Path('site/images').rglob('*')):
    if p.suffix.lower() in ['.jpg','.jpeg','.png','.webp']:
        try:
            im=Image.open(p); w,h=im.size
        except Exception as e:
            print('BAD', p, e); continue
        mb=p.stat().st_size/1048576
        if mb > 0.5 or w > 1600 or h > 1600:
            print(f'{p.as_posix()}\t{mb:.2f}MB\t{w}x{h}')
'@ | python -
```

```powershell
# 2) Create optimized copies in a separate folder; does not overwrite originals (requires ImageMagick)
New-Item -ItemType Directory -Force tmp\optimized-images | Out-Null
magick site\images\jd-hero-colorful.jpg -resize "1600x1600>" -quality 78 tmp\optimized-images\jd-hero-colorful.webp
magick site\images\yadon-man-of-style.png -resize "1600x1600>" -quality 78 tmp\optimized-images\yadon-man-of-style.webp
magick site\images\health-is-wealth-hero-v3.jpg -resize "1600x1600>" -quality 78 tmp\optimized-images\health-is-wealth-hero-v3.webp
```

```powershell
# 3) Compress card images as copies; inspect before replacing references
New-Item -ItemType Directory -Force tmp\optimized-cards | Out-Null
Get-ChildItem site\images -Include post-*.jpg,post-*.jpeg,post-*.png,ks-*.jpg -File | ForEach-Object {
  magick $_.FullName -resize "900x900>" -quality 72 ("tmp\optimized-cards\" + $_.BaseName + ".webp")
}
```

## Suggested implementation order

1. Replace/compress the 18–21 MB assets first, especially `jd-hero-colorful.jpg`, `kavya-sansaar-sagar.png`, and `yadon-man-of-style.png` where referenced.
2. Convert card/background groups (`post-*`, `ks-*`, `naritva-*`, `yadon-*`, `jd-*`) to WebP copies and update HTML references after visual QA.
3. Add `srcset`/`sizes` and `loading`/`decoding` attributes; convert CSS background content cards to `<picture>` where feasible.
4. Standardize mobile CSS utilities (`clamp()` padding, nav `min(86vw,280px)`, `100dvh`, `prefers-reduced-motion`).
5. Run a 320px/375px browser smoke test on `index.html`, `archive.html`, `gallery.html`, `posts/jivan-darshan.html`, `posts/yadon-ke-pannon-se.html`, `posts/sur-taal-jugalbandi.html`, and `posts/naritva.html`.
