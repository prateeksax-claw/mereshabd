// fix-homepage-v2.js
// Clean targeted fixes - read original, apply all 4 fixes, write back
// Uses fs.writeFileSync with utf8 encoding

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'site', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

console.log('Read index.html (' + html.length + ' bytes)');

// ============================================================
// FIX 1a: CSS - Replace poem-section grid with single-column dark gradient
// ============================================================

// Replace the old split poem-section CSS comment + rule
html = html.replace(
  `/* POEM SECTION — split: text left, temple right */
.poem-section{background:var(--ink);display:grid;grid-template-columns:1fr 420px;min-height:520px;overflow:hidden;position:relative}
.poem-text-col{padding:72px 64px 72px 72px;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2}
.poem-temple-col{position:relative;overflow:hidden}
.poem-temple-col img{width:100%;height:100%;object-fit:cover;object-position:center 20%;opacity:0.88;display:block}
.poem-temple-col::before{content:'';position:absolute;inset:0;background:linear-gradient(to right,rgba(26,8,8,0.7) 0%,rgba(26,8,8,0.15) 60%,transparent 100%);z-index:1}`,
  `/* POEM SECTION — full-width dark gradient, no photo */
.poem-section{background:linear-gradient(135deg,#1A0808 0%,#2D0808 50%,#1A1008 100%);display:block;min-height:520px;overflow:hidden;position:relative}
.poem-text-col{padding:72px 80px;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2;max-width:900px;margin:0 auto}`
);

console.log('Fix 1a applied: poem-section CSS updated');

// ============================================================
// FIX 1b: CSS - Remove poem-temple-col from media queries
// ============================================================
html = html.replace(
  `@media(max-width:960px){
  .poem-section{grid-template-columns:1fr;min-height:auto}
  .poem-text-col{padding:56px 32px}
  .poem-temple-col{height:280px}`,
  `@media(max-width:960px){
  .poem-section{min-height:auto}
  .poem-text-col{padding:56px 32px}`
);

html = html.replace(
  `@media(max-width:600px){
  .poem-text-col{padding:40px 20px}
  .poem-temple-col{height:220px}`,
  `@media(max-width:600px){
  .poem-text-col{padding:40px 20px}`
);

console.log('Fix 1b applied: media query temple col removed');

// ============================================================
// FIX 3: Larger fonts in CSS
// ============================================================

// Body base font 18px
html = html.replace(
  `body{font-family:'Noto Sans Devanagari',sans-serif;background:var(--warm-white);color:var(--ink);overflow-x:hidden;letter-spacing:0}`,
  `body{font-family:'Noto Sans Devanagari',sans-serif;font-size:18px;background:var(--warm-white);color:var(--ink);overflow-x:hidden;letter-spacing:0}`
);

// Nav links 16px  
html = html.replace(
  `.nav-links a{font-family:'Noto Sans Devanagari',sans-serif;font-size:14px;`,
  `.nav-links a{font-family:'Noto Sans Devanagari',sans-serif;font-size:16px;`
);

// Intro headline
html = html.replace(
  `.intro-headline{font-family:'Tiro Devanagari Hindi',serif;font-size:50px;`,
  `.intro-headline{font-family:'Tiro Devanagari Hindi',serif;font-size:56px;`
);

// Intro text
html = html.replace(
  `.intro-text{font-family:'Noto Sans Devanagari',sans-serif;font-size:20px;`,
  `.intro-text{font-family:'Noto Sans Devanagari',sans-serif;font-size:22px;`
);

// Magazine grid titles
html = html.replace('.mi-xl .mi-title{font-size:38px}', '.mi-xl .mi-title{font-size:42px}');
html = html.replace('.mi-md .mi-title{font-size:24px}', '.mi-md .mi-title{font-size:26px}');
html = html.replace('.mi-sm .mi-title{font-size:20px}', '.mi-sm .mi-title{font-size:22px}');

// Poem lines larger
html = html.replace('.pline.xl{font-size:48px}', '.pline.xl{font-size:54px}');
html = html.replace('.pline.lg{font-size:34px;', '.pline.lg{font-size:40px;');
html = html.replace('.pline.md{font-size:26px;', '.pline.md{font-size:30px;');
html = html.replace('.pline.sm{font-size:20px;', '.pline.sm{font-size:23px;');

// Mobile poem lines
html = html.replace('  .pline.xl{font-size:36px}', '  .pline.xl{font-size:40px}');

// Quote interlude
html = html.replace('.qi-text{font-family:\'Tiro Devanagari Hindi\',serif;font-size:46px;', '.qi-text{font-family:\'Tiro Devanagari Hindi\',serif;font-size:50px;');

// Author bio
html = html.replace('.ar-bio{font-family:\'Noto Sans Devanagari\',sans-serif;font-size:19px;', '.ar-bio{font-family:\'Noto Sans Devanagari\',sans-serif;font-size:21px;');

// mi-excerpt
html = html.replace('.mi-excerpt{font-family:\'Noto Sans Devanagari\',sans-serif;font-size:16px;', '.mi-excerpt{font-family:\'Noto Sans Devanagari\',sans-serif;font-size:17px;');

console.log('Fix 3 applied: Font sizes increased');

// ============================================================
// FIX 4: CSS for English subtitles
// ============================================================
const englishSubtitleCSS = `
/* English subtitle/translation styles */
.hero-en-sub{font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(255,255,255,0.42);font-style:italic;margin-bottom:28px;margin-top:-20px}
.poem-en-label{font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(255,255,255,0.42);font-style:italic;margin-bottom:20px;margin-top:-20px}
.poem-en-title{font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(255,255,255,0.38);font-style:italic;margin-top:-30px;margin-bottom:36px}
.section-en-sub{font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(26,16,8,0.42);font-style:italic;margin-top:-16px;margin-bottom:20px}
.mag-en-sub{font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(26,16,8,0.42);font-style:italic;margin-top:4px;margin-bottom:0}
`;
html = html.replace('</style>', englishSubtitleCSS + '</style>');
console.log('Fix 4a applied: English subtitle CSS added');

// ============================================================
// FIX 1c + FIX 2: HTML - Fix the body
// The poem-section was nested INSIDE .intro-body AND there was a duplicate <!-- POEM FULLBLEED -->
// We need to:
//   1. Fix the intro-body (remove the nested poem-section from inside it)
//   2. Add a proper standalone poem-section between marquee and editorial-intro
//   3. Remove the old duplicate POEM FULLBLEED section
// ============================================================

// First, remove the duplicate <!-- POEM FULLBLEED --> section after editorial intro
// It looks like: \n<!-- POEM FULLBLEED -->\n<section class="poem-section">...</section>
const fullbleedPattern = /\n\n<!-- POEM FULLBLEED -->\n<section class="poem-section">[\s\S]*?<\/section>/;
if (fullbleedPattern.test(html)) {
  html = html.replace(fullbleedPattern, '');
  console.log('Fix 2: Removed duplicate POEM FULLBLEED section');
} else {
  console.log('Fix 2: POEM FULLBLEED duplicate not found (may already be removed)');
}

// Now fix the editorial-intro: the poem-section was nested inside .intro-body
// The structure was:
// <div class="intro-body">
//   <div class="poem-section">  <-- poem nested inside
//     <div class="poem-text-col">...poem...</div>
//     <div class="poem-temple-col">...</div>  <-- already removed from HTML above
//   </div>
//   <h2 class="intro-headline">...
// We need to:
//   A. Remove the nested poem-section div from intro-body
//   B. Extract the poem content 
//   C. Create a proper standalone <section class="poem-section"> between marquee and editorial-intro

// Extract the poem content from inside intro-body
const introPoemRegex = /<div class="intro-body">\s*<div class="poem-section">\s*<div class="poem-text-col">([\s\S]*?)<\/div>\s*<\/div>/;
const introPoemMatch = html.match(introPoemRegex);

if (introPoemMatch) {
  const poemInnerContent = introPoemMatch[1];
  console.log('Found nested poem inside intro-body, length:', poemInnerContent.length);
  
  // Remove the nested poem-section from inside intro-body
  html = html.replace(introPoemRegex, '<div class="intro-body">');
  
  // Build the standalone poem section
  const standalonePoemSection = `
<!-- POEM SECTION -->
<section class="poem-section">
  <div class="poem-text-col">${poemInnerContent}  </div>
</section>
`;
  
  // Insert the standalone poem section before <!-- EDITORIAL INTRO -->
  html = html.replace('<!-- EDITORIAL INTRO -->', standalonePoemSection + '<!-- EDITORIAL INTRO -->');
  console.log('Fix 1c: Standalone poem section added between marquee and editorial intro');
} else {
  console.log('Nested poem inside intro-body not found. Checking alternative structure...');
  // The poem might have already been restructured. Check if poem-section exists standalone.
  if (html.includes('<section class="poem-section">')) {
    console.log('Standalone poem-section already exists - OK');
  } else {
    console.log('WARNING: No poem-section found in HTML!');
  }
}

// ============================================================
// FIX 4b: HTML - Add English subtitles to body elements
// ============================================================

// 4b-1: Hero section — add English subtitle after hero-desc
html = html.replace(
  `<p class="hero-desc">नवभारत टाइम्स की पत्रकार · PIB-मान्यता प्राप्त · जयोति संपादक</p>`,
  `<p class="hero-desc">नवभारत टाइम्स की पत्रकार · PIB-मान्यता प्राप्त · जयोति संपादक</p>
    <p class="hero-en-sub">Words from the heart — Hindi poetry &amp; literature from Abu Dhabi</p>`
);

// 4b-2: Poem label — add English below
// This replaces ALL occurrences (there should be one in the new standalone section)
html = html.replace(
  `<div class="poem-label"><span>नूतन वर्ष · जनवरी २०२६</span></div>`,
  `<div class="poem-label"><span>नूतन वर्ष · जनवरी २०२६</span></div>
    <p class="poem-en-label">New Year · January 2026</p>`
);

// 4b-3: Poem title — add English below
html = html.replace(
  `<div class="poem-title-sm">— नववर्ष पर शब्दों की भेंट</div>`,
  `<div class="poem-title-sm">— नववर्ष पर शब्दों की भेंट</div>
      <p class="poem-en-title">A gift of words for the New Year</p>`
);

// 4b-4: Intro headline — add English below
html = html.replace(
  `<h2 class="intro-headline">शब्द ही हैं<br>मेरी <em>पहचान</em></h2>`,
  `<h2 class="intro-headline">शब्द ही हैं<br>मेरी <em>पहचान</em></h2>
    <p class="section-en-sub">Words are my identity — my gift to the world</p>`
);

// 4b-5: Magazine section header
html = html.replace(
  `<h2 class="mag-title">ताज़ी रचनाएं</h2>`,
  `<h2 class="mag-title">ताज़ी रचनाएं</h2>
    <p class="mag-en-sub">Latest Works</p>`
);

console.log('Fix 4b applied: English HTML subtitles added');

// ============================================================
// Write the file
// ============================================================
fs.writeFileSync(filePath, html, 'utf8');
console.log('\nAll fixes applied and written to: ' + filePath);

// ============================================================
// Verification
// ============================================================
const written = fs.readFileSync(filePath, 'utf8');
console.log('\n=== VERIFICATION ===');
console.log('File size:', written.length, 'bytes');
console.log('poem-temple-col in CSS:', written.includes('.poem-temple-col{') ? 'STILL PRESENT ⚠' : 'REMOVED ✓');
console.log('poem-temple-col in HTML:', written.includes('class="poem-temple-col"') ? 'STILL PRESENT ⚠' : 'REMOVED ✓');
console.log('Dark gradient (#1A0808):', written.includes('#1A0808') ? 'PRESENT ✓' : 'MISSING ⚠');
console.log('Standalone poem-section:', written.includes('<section class="poem-section">') ? 'PRESENT ✓' : 'MISSING ⚠');
console.log('POEM FULLBLEED duplicate:', written.includes('<!-- POEM FULLBLEED -->') ? 'STILL PRESENT ⚠' : 'REMOVED ✓');
console.log('Body font-size 18px:', written.includes('font-size:18px') ? 'PRESENT ✓' : 'MISSING ⚠');
console.log('pline.xl 54px:', written.includes('.pline.xl{font-size:54px}') ? 'PRESENT ✓' : 'MISSING ⚠');
console.log('nav-links 16px:', written.includes('font-size:16px') ? 'PRESENT ✓' : 'MISSING ⚠');
console.log('hero-en-sub:', written.includes('hero-en-sub') ? 'PRESENT ✓' : 'MISSING ⚠');
console.log('poem-en-label:', written.includes('poem-en-label') ? 'PRESENT ✓' : 'MISSING ⚠');
console.log('poem-en-title:', written.includes('poem-en-title') ? 'PRESENT ✓' : 'MISSING ⚠');
console.log('section-en-sub:', written.includes('section-en-sub') ? 'PRESENT ✓' : 'MISSING ⚠');
console.log('Latest Works:', written.includes('Latest Works') ? 'PRESENT ✓' : 'MISSING ⚠');
console.log('mandir-golden in img tag:', written.includes('mandir-golden.jpg') ? 'STILL IN HTML ⚠' : 'REMOVED ✓');

// Show snippet around the standalone poem section
const psIdx = written.indexOf('<section class="poem-section">');
if (psIdx > -1) {
  console.log('\n--- Poem section start ---');
  console.log(written.slice(psIdx, psIdx + 300));
  console.log('---');
}

// Check for double-< issue
if (written.includes('<<')) {
  console.log('\n⚠ WARNING: Found <<  (malformed HTML) at positions:');
  let idx = 0;
  while ((idx = written.indexOf('<<', idx)) !== -1) {
    console.log('  Position', idx, ':', written.slice(idx, idx + 50));
    idx += 2;
  }
} else {
  console.log('\n✓ No malformed << found');
}
