import { readFileSync, writeFileSync } from 'fs';

const file = 'C:\\Users\\prate\\.openclaw\\workspace\\mereshabd\\site\\posts\\kavya.html';
let c = readFileSync(file, 'utf8');

// 1. Update hero count
c = c.replace('१० रचनाएं · ३ वर्ष', 'संपूर्ण काव्य संग्रह');

// 2. Update hero subtitle
c = c.replace(
  'संपूर्ण काव्य संग्रह - शब्दों का प्रवाह, भावनाओं का उफान',
  'शब्दों का प्रवाह, भावनाओं का उफान — सभी कविताएं एक स्थान पर'
);

// 3. Update stats bar
c = c.replace(
  `<div class="stats-bar">
  <div class="stat-item"><div class="stat-num">१०</div><div class="stat-label">रचनाएं</div></div>
  <div class="stat-sep"></div>
  <div class="stat-item"><div class="stat-num">३</div><div class="stat-label">वर्ष</div></div>
  <div class="stat-sep"></div>
  <div class="stat-item"><div class="stat-num">२०२५</div><div class="stat-label">नवीनतम</div></div>
</div>`,
  `<div class="stats-bar">
  <div class="stat-item"><div class="stat-num">१०</div><div class="stat-label">कविताएं</div></div>
  <div class="stat-sep"></div>
  <div class="stat-item"><div class="stat-num">५</div><div class="stat-label">नई रचनाएं</div></div>
  <div class="stat-sep"></div>
  <div class="stat-item"><div class="stat-num">२०२५</div><div class="stat-label">नवीनतम</div></div>
</div>`
);

// 4. Update gallery links
c = c.replaceAll('href="#y2025"', 'href="#collection"');
c = c.replaceAll('href="#y2023"', 'href="#collection"');
c = c.replaceAll('href="#y2022"', 'href="#collection"');

// 5. Remove year navigation
const ynStart = c.indexOf('<nav class="year-nav" id="yearNav">');
if (ynStart >= 0) {
  const ynEnd = c.indexOf('</nav>', ynStart);
  if (ynEnd >= 0) {
    c = c.substring(0, ynStart) + c.substring(ynEnd + '</nav>'.length);
  }
}

// 6. Replace 2025 section opening with collection header
c = c.replace(
  `<!-- ══════ 2025 ══════════════════════════════════════════════ -->
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
  <div class="poems-list">`,
  `<!-- ══════ COLLECTION ══════════════════════════════════════════════ -->
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
  <div class="poems-list">`
);

// 7. Remove 2025->2023 section boundary
c = c.replace(
  `  </div>
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
  <div class="poems-list">`,
  ''
);

// 8. Remove 2023->2022 section boundary
c = c.replace(
  `  </div>
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
  <div class="poems-list">`,
  ''
);

// 9. Add "is-new" class and badge for 2025 poems (first 5)
// Poem 01 - World of Magic
c = c.replace(
  `  <article class="poem-entry" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०१</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२५ · English</div>
      <h2 class="pe-title">काव्य-जगत</h2>`,
  `  <article class="poem-entry is-new" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०१</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · English <span class="pe-new-badge">✨ नई</span></div>
      <h2 class="pe-title">काव्य-जगत</h2>`
);

// Poem 02 - Delivery Man
c = c.replace(
  `  <article class="poem-entry pdf-only" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०२</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२५ · हिंदी</div>
      <h2 class="pe-title">डिलीवरी मैन</h2>`,
  `  <article class="poem-entry pdf-only is-new" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०२</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी <span class="pe-new-badge">✨ नई</span></div>
      <h2 class="pe-title">डिलीवरी मैन</h2>`
);

// Poem 03 - ILA
c = c.replace(
  `  <article class="poem-entry" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०३</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२५ · English</div>
      <h2 class="pe-title">ILA कविता</h2>`,
  `  <article class="poem-entry is-new" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०३</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · English <span class="pe-new-badge">✨ नई</span></div>
      <h2 class="pe-title">ILA कविता</h2>`
);

// Poem 04 - Lockdown
c = c.replace(
  `  <article class="poem-entry pdf-only" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०४</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२५ · हिंदी</div>
      <h2 class="pe-title">लॉकडाउन कविता</h2>`,
  `  <article class="poem-entry pdf-only is-new" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०४</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी <span class="pe-new-badge">✨ नई</span></div>
      <h2 class="pe-title">लॉकडाउन कविता</h2>`
);

// Poem 05 - Pati Dev
c = c.replace(
  `  <article class="poem-entry pdf-only" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०५</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२५ · हिंदी</div>
      <h2 class="pe-title">पति-देव</h2>`,
  `  <article class="poem-entry pdf-only is-new" style="--year-color:#8B1414">
    <div class="pe-gutter"><span class="pe-num">०५</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी <span class="pe-new-badge">✨ नई</span></div>
      <h2 class="pe-title">पति-देव</h2>`
);

// 10. Renumber & restyle poems 06-10
// Kavni (was 2023 poem 01 -> 06)
c = c.replace(
  `  <article class="poem-entry" style="--year-color:#4A1A7A">
    <div class="pe-gutter"><span class="pe-num">०१</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२३ · हिंदी</div>
      <h2 class="pe-title">कवनी - जन्मदिन</h2>`,
  `  <article class="poem-entry" style="--year-color:#9B0E0E">
    <div class="pe-gutter"><span class="pe-num">०६</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी</div>
      <h2 class="pe-title">कवनी - जन्मदिन</h2>`
);

// Upjinder (was 2022 poem 01 -> 07)
c = c.replace(
  `  <article class="poem-entry" style="--year-color:#7A4A0A">
    <div class="pe-gutter"><span class="pe-num">०१</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२२ · हिंदी</div>
      <h2 class="pe-title">उपजिंदर के नाम</h2>`,
  `  <article class="poem-entry" style="--year-color:#9B0E0E">
    <div class="pe-gutter"><span class="pe-num">०७</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी</div>
      <h2 class="pe-title">उपजिंदर के नाम</h2>`
);

// Maati (was 2022 poem 02 -> 08)
c = c.replace(
  `  <article class="poem-entry pdf-only" style="--year-color:#7A4A0A">
    <div class="pe-gutter"><span class="pe-num">०२</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२२ · हिंदी</div>
      <h2 class="pe-title">माटी</h2>`,
  `  <article class="poem-entry pdf-only" style="--year-color:#9B0E0E">
    <div class="pe-gutter"><span class="pe-num">०८</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी</div>
      <h2 class="pe-title">माटी</h2>`
);

// Salgirah (was 2022 poem 03 -> 09)
c = c.replace(
  `  <article class="poem-entry pdf-only" style="--year-color:#7A4A0A">
    <div class="pe-gutter"><span class="pe-num">०३</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२२ · हिंदी</div>
      <h2 class="pe-title">सालगिरह कविता</h2>`,
  `  <article class="poem-entry pdf-only" style="--year-color:#9B0E0E">
    <div class="pe-gutter"><span class="pe-num">०९</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी</div>
      <h2 class="pe-title">सालगिरह कविता</h2>`
);

// Covid (was 2022 poem 04 -> 10)
c = c.replace(
  `  <article class="poem-entry pdf-only" style="--year-color:#7A4A0A">
    <div class="pe-gutter"><span class="pe-num">०४</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · २०२२ · हिंदी</div>
      <h2 class="pe-title">कोविड़ कविता</h2>`,
  `  <article class="poem-entry pdf-only" style="--year-color:#9B0E0E">
    <div class="pe-gutter"><span class="pe-num">१०</span></div>
    <div class="pe-body">
      <div class="pe-cat">कविता · हिंदी</div>
      <h2 class="pe-title">कोविड़ कविता</h2>`
);

// 11. Remove year tab JS
c = c.replace(
  `  // Year tab highlight
  const ids=['y2025','y2023','y2022'];
  let cur='';
  ids.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=110)cur=id;});
  document.querySelectorAll('.yn-tab').forEach(t=>t.classList.toggle('active',t.getAttribute('href').substring(1)===cur));`,
  ''
);

c = c.replace(
  `// Smooth year nav scroll
document.querySelectorAll('.yn-tab').forEach(t=>t.addEventListener('click',e=>{
  e.preventDefault();
  const el=document.getElementById(t.getAttribute('href').substring(1));
  if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
}));`,
  ''
);

// 12. Update remaining meta tags
c = c.replaceAll('हिंदी कविता संग्रह ०২০২২\'২০২৫', 'संपूर्ण काव्य संग्रह');
c = c.replaceAll('गीतांजलि सक्सेना की हिंदी कविताएं २०२२ से २०२৫ तक - World of Magic, ILA, Upjinder सहित वर्षवार रचनाएं। Hindi kavita collection, Abu Dhabi poet.', 'गीतांजलि सक्सेना का संपूर्ण काव्य संग्रह — सभी कविताएं एक स्थान पर। Hindi kavita collection, Abu Dhabi poet.');

writeFileSync(file, c, 'utf8');
console.log('Done! kavya.html updated.');
