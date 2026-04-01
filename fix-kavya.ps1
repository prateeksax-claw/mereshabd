$file = 'C:\Users\prate\.openclaw\workspace\mereshabd\site\posts\kavya.html'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# 1. Update hero count - remove "3 varsh" reference
$content = $content -replace [regex]::Escape('१० रचनाएं · ३ वर्ष'), 'संपूर्ण काव्य संग्रह'

# 2. Update hero subtitle
$content = $content -replace [regex]::Escape('संपूर्ण काव्य संग्रह - शब्दों का प्रवाह, भावनाओं का उफान'), 'शब्दों का प्रवाह, भावनाओं का उफान — सभी कविताएं एक स्थान पर'

# 3. Update stats bar - remove "3 varsh" stat, change to collection info
$oldStats = @'
<div class="stats-bar">
  <div class="stat-item"><div class="stat-num">१०</div><div class="stat-label">रचनाएं</div></div>
  <div class="stat-sep"></div>
  <div class="stat-item"><div class="stat-num">३</div><div class="stat-label">वर्ष</div></div>
  <div class="stat-sep"></div>
  <div class="stat-item"><div class="stat-num">२०२५</div><div class="stat-label">नवीनतम</div></div>
</div>
'@
$newStats = @'
<div class="stats-bar">
  <div class="stat-item"><div class="stat-num">१०</div><div class="stat-label">कविताएं</div></div>
  <div class="stat-sep"></div>
  <div class="stat-item"><div class="stat-num">५</div><div class="stat-label">नई रचनाएं</div></div>
  <div class="stat-sep"></div>
  <div class="stat-item"><div class="stat-num">२०२५</div><div class="stat-label">नवीनतम</div></div>
</div>
'@
$content = $content.Replace($oldStats.Trim(), $newStats.Trim())

# 4. Update gallery links from year anchors to #collection
$content = $content -replace 'href="#y2025"', 'href="#collection"'
$content = $content -replace 'href="#y2023"', 'href="#collection"'
$content = $content -replace 'href="#y2022"', 'href="#collection"'

# 5. Remove year navigation entirely
$yearNavStart = '<nav class="year-nav" id="yearNav">'
$yearNavEnd = '</nav>'
$idx1 = $content.IndexOf($yearNavStart)
if ($idx1 -ge 0) {
    $idx2 = $content.IndexOf($yearNavEnd, $idx1)
    if ($idx2 -ge 0) {
        $content = $content.Substring(0, $idx1) + $content.Substring($idx2 + $yearNavEnd.Length)
    }
}

# 6. Replace year sections with unified collection
# Remove year-section wrappers and year-bands, keep poems

# First, remove all year-band divs and year-section open/close tags
# Replace the 2025 section opening with collection section
$old2025Start = @'
<!-- ══════ 2025 ══════════════════════════════════════════════ -->
<section class="year-section" id="y2025">
  <div class="year-band" style="--band-bg:linear-gradient(135deg,#6B0A0A,#3D0808)">
    <div class="year-band-art">२०२५</div>
    <div class="year-band-num">२०२५</div>
    <div class="year-band-info">
      <div class="year-band-eyebrow">नवीनतम</div>
      <div class="year-band-title">नवीनतम रचनाएं</div>
    </div>
    <div class="year-band-count">५ रचनाएं</div>
  </div>
  <div class="poems-list">
'@
$newCollectionStart = @'
<!-- ══════ COLLECTION ══════════════════════════════════════════════ -->
<section id="collection">
  <div class="collection-band">
    <div class="collection-band-art">काव्य</div>
    <div class="collection-band-icon">📜</div>
    <div class="collection-band-info">
      <div class="collection-band-eyebrow">Complete Collection</div>
      <div class="collection-band-title">संपूर्ण काव्य संग्रह</div>
    </div>
    <div class="collection-band-count">१० कविताएं</div>
  </div>
  <div class="poems-list">
'@
$content = $content.Replace($old2025Start.Trim(), $newCollectionStart.Trim())

# Remove 2025 section close and 2023 section open (merge them)
$old2025to2023 = @'
  </div>
</section>

<!-- ══════ 2023 ══════════════════════════════════════════════ -->
<section class="year-section" id="y2023">
  <div class="year-band" style="--band-bg:linear-gradient(135deg,#2D0A5A,#1A0830)">
    <div class="year-band-art">२०२३</div>
    <div class="year-band-num">२०२३</div>
    <div class="year-band-info">
      <div class="year-band-eyebrow">वर्ष २०२३</div>
      <div class="year-band-title">कविता</div>
    </div>
    <div class="year-band-count">१ कविता</div>
  </div>
  <div class="poems-list">
'@
$content = $content.Replace($old2025to2023.Trim(), '')

# Remove 2023 section close and 2022 section open (merge them)
$old2023to2022 = @'
  </div>
</section>

<!-- ══════ 2022 ══════════════════════════════════════════════ -->
<section class="year-section" id="y2022">
  <div class="year-band" style="--band-bg:linear-gradient(135deg,#5A3A08,#2A1A04)">
    <div class="year-band-art">२०२२</div>
    <div class="year-band-num">२०२२</div>
    <div class="year-band-info">
      <div class="year-band-eyebrow">वर्ष २०२२</div>
      <div class="year-band-title">कविताएं</div>
    </div>
    <div class="year-band-count">४ कविताएं</div>
  </div>
  <div class="poems-list">
'@
$content = $content.Replace($old2023to2022.Trim(), '')

# Remove remaining year-section close tags that are now orphaned
# The 2022 section close before "AND MORE SECTION" 
$old2022Close = @'
  </div>
</section>




<!-- AND MORE SECTION -->
'@
$new2022Close = @'
  </div>
</section>

<!-- AND MORE SECTION -->
'@
$content = $content.Replace($old2022Close.Trim(), $new2022Close.Trim())

# 7. Add "is-new" class to 2025 poems (first 5 articles) and update pe-cat with badge
# Update poem 01 (World of Magic)
$content = $content.Replace(
    '<article class="poem-entry" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०१</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२५ · English</div>
      <h2 class="pe-title">काव्य-जगत</h2>',
    '<article class="poem-entry is-new" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०१</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · English <span class="pe-new-badge">✨ नई</span></div>
      <h2 class="pe-title">काव्य-जगत</h2>'
)

# Poem 02 (Delivery Man)
$content = $content.Replace(
    '<article class="poem-entry pdf-only" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०२</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२५ · हिंदी</div>
      <h2 class="pe-title">डिलीवरी मैन</h2>',
    '<article class="poem-entry pdf-only is-new" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०२</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी <span class="pe-new-badge">✨ नई</span></div>
      <h2 class="pe-title">डिलीवरी मैन</h2>'
)

# Poem 03 (ILA)
$content = $content.Replace(
    '<article class="poem-entry" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०३</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२५ · English</div>
      <h2 class="pe-title">ILA कविता</h2>',
    '<article class="poem-entry is-new" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०३</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · English <span class="pe-new-badge">✨ नई</span></div>
      <h2 class="pe-title">ILA कविता</h2>'
)

# Poem 04 (Lockdown)
$content = $content.Replace(
    '<article class="poem-entry pdf-only" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०४</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२५ · हिंदी</div>
      <h2 class="pe-title">लॉकडाउन कविता</h2>',
    '<article class="poem-entry pdf-only is-new" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०४</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी <span class="pe-new-badge">✨ नई</span></div>
      <h2 class="pe-title">लॉकडाउन कविता</h2>'
)

# Poem 05 (Pati Dev)
$content = $content.Replace(
    '<article class="poem-entry pdf-only" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०५</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२५ · हिंदी</div>
      <h2 class="pe-title">पति-देव</h2>',
    '<article class="poem-entry pdf-only is-new" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०५</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी <span class="pe-new-badge">✨ नई</span></div>
      <h2 class="pe-title">पति-देव</h2>'
)

# 8. Renumber poems 06-10 (was 01 in 2023, 01-04 in 2022)
# 2023 poem: Kavni was 01, now 06
$content = $content.Replace(
    '<article class="poem-entry" style="--year-color:#4A1A7A">
    <div class="pe-gutter"><span class="pe-num">०१</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२३ · हिंदी</div>
      <h2 class="pe-title">कवनी - जन्मदिन</h2>',
    '<article class="poem-entry" style="--year-color:#9B0E0E">
    <div class="pe-gutter"><span class="pe-num">०६</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी</div>
      <h2 class="pe-title">कवनी - जन्मदिन</h2>'
)

# 2022 poems: renumber and update colors
# Upjinder: was 01 -> 07
$content = $content.Replace(
    '<article class="poem-entry" style="--year-color:#7A4A0A">
    <div class="pe-gutter"><span class="pe-num">०१</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२२ · हिंदी</div>
      <h2 class="pe-title">उपजिंदर के नाम</h2>',
    '<article class="poem-entry" style="--year-color:#9B0E0E">
    <div class="pe-gutter"><span class="pe-num">०७</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी</div>
      <h2 class="pe-title">उपजिंदर के नाम</h2>'
)

# Maati: was 02 -> 08
$content = $content.Replace(
    '<article class="poem-entry pdf-only" style="--year-color:#7A4A0A">
    <div class="pe-gutter"><span class="pe-num">०२</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२२ · हिंदी</div>
      <h2 class="pe-title">माटी</h2>',
    '<article class="poem-entry pdf-only" style="--year-color:#9B0E0E">
    <div class="pe-gutter"><span class="pe-num">०८</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी</div>
      <h2 class="pe-title">माटी</h2>'
)

# Salgirah: was 03 -> 09
$content = $content.Replace(
    '<article class="poem-entry pdf-only" style="--year-color:#7A4A0A">
    <div class="pe-gutter"><span class="pe-num">०३</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२२ · हिंदी</div>
      <h2 class="pe-title">सालगिरह कविता</h2>',
    '<article class="poem-entry pdf-only" style="--year-color:#9B0E0E">
    <div class="pe-gutter"><span class="pe-num">०९</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी</div>
      <h2 class="pe-title">सालगिरह कविता</h2>'
)

# Covid: was 04 -> 10
$content = $content.Replace(
    '<article class="poem-entry pdf-only" style="--year-color:#7A4A0A">
    <div class="pe-gutter"><span class="pe-num">०४</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२२ · हिंदी</div>
      <h2 class="pe-title">कोविड़ कविता</h2>',
    '<article class="poem-entry pdf-only" style="--year-color:#9B0E0E">
    <div class="pe-gutter"><span class="pe-num">१०</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी</div>
      <h2 class="pe-title">कोविड़ कविता</h2>'
)

# 9. Update the JavaScript - remove year tab highlighting logic
$oldJS = @'
  // Year tab highlight
  const ids=['y2025','y2023','y2022'];
  let cur='';
  ids.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=110)cur=id;});
  document.querySelectorAll('.yn-tab').forEach(t=>t.classList.toggle('active',t.getAttribute('href').substring(1)===cur));
'@
$content = $content.Replace($oldJS.Trim(), '')

# Remove year nav smooth scroll JS
$oldYearNavJS = @'
// Smooth year nav scroll
document.querySelectorAll('.yn-tab').forEach(t=>t.addEventListener('click',e=>{
  e.preventDefault();
  const el=document.getElementById(t.getAttribute('href').substring(1));
  if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
}));
'@
$content = $content.Replace($oldYearNavJS.Trim(), '')

# 10. Update twitter meta
$content = $content -replace [regex]::Escape('काव्य-धारा - गीतांजलि सक्सेना | हिंदी कविता संग्रह'), 'काव्य-धारा — संपूर्ण काव्य संग्रह | गीतांजलि सक्सेना'

# Write back
[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "Done! File updated successfully."
