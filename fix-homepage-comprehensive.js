// fix-homepage-comprehensive.js
// Applies all 4 homepage fixes to index.html
// Uses fs.writeFileSync with utf8 encoding (NEVER PowerShell Set-Content)

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'site', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

console.log('Read index.html (' + html.length + ' bytes)');

// ============================================================
// FIX 1: Remove temple photo column from poem section
// Change poem-section to single-column dark gradient, no image
// ============================================================

// Update CSS for poem-section — remove temple col, make full-width dark gradient
html = html.replace(
  /\/\* POEM SECTION — split: text left, temple right \*\/\s*\.poem-section\{[^}]+\}/,
  `/* POEM SECTION — full-width dark gradient, no photo */
.poem-section{background:linear-gradient(135deg,#1A0808 0%,#2D0808 50%,#1A1008 100%);display:block;min-height:520px;overflow:hidden;position:relative}`
);

// Remove .poem-text-col layout (update to full-width padding)
html = html.replace(
  /\.poem-text-col\{padding:72px 64px 72px 72px;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2\}/,
  '.poem-text-col{padding:72px 80px;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2;max-width:900px;margin:0 auto}'
);

// Remove .poem-temple-col CSS rules entirely
html = html.replace(/\.poem-temple-col\{[^}]+\}\s*/g, '');
html = html.replace(/\.poem-temple-col img\{[^}]+\}\s*/g, '');
html = html.replace(/\.poem-temple-col::before\{[^}]+\}\s*/g, '');

// Remove the poem-temple-col div from HTML (with its img)
html = html.replace(
  /\s*<div class="poem-temple-col">\s*<img[^>]*>\s*<\/div>/g,
  ''
);

// Also fix the responsive media query for poem-section (remove temple col responsive rules)
html = html.replace(
  /@media\(max-width:960px\)\{\s*\.poem-section\{grid-template-columns:1fr;min-height:auto\}\s*\.poem-text-col\{padding:56px 32px\}\s*\.poem-temple-col\{height:280px\}/,
  '@media(max-width:960px){.poem-section{min-height:auto}.poem-text-col{padding:56px 32px}'
);
html = html.replace(
  /@media\(max-width:600px\)\{\s*\.poem-text-col\{padding:40px 20px\}\s*\.poem-temple-col\{height:220px\}/,
  '@media(max-width:600px){.poem-text-col{padding:40px 20px}'
);

console.log('Fix 1 applied: Temple photo column removed, dark gradient applied');

// ============================================================
// FIX 2: Remove duplicate poem (the old POEM FULLBLEED section)
// The duplicate is inside .editorial-intro > .intro-body and also
// there's an old <!-- POEM FULLBLEED --> section after the intro.
// Keep only the styled .poem-section inside .intro-body? 
// Actually looking at the HTML:
// - The poem-section is INSIDE .intro-body (nested incorrectly)
// - There's ALSO a standalone <!-- POEM FULLBLEED --> <section class="poem-section"> after
// We'll move poem-section OUT of intro-body and remove the duplicate fullbleed
// ============================================================

// The structure is: .intro-body contains poem-section + intro-headline + intro-text + intro-read
// We need to:
// 1. Extract poem-section from inside .intro-body
// 2. Remove the duplicate <!-- POEM FULLBLEED --> section
// 3. Place the single clean poem-section between marquee and editorial-intro

// First, let's remove the old duplicate <!-- POEM FULLBLEED --> section
html = html.replace(
  /\s*<!-- POEM FULLBLEED -->\s*<section class="poem-section">[\s\S]*?<\/section>\s*/,
  '\n'
);

// Now fix the editorial-intro: extract poem-section from inside intro-body
// The poem-section is currently nested inside .intro-body div
// We'll restructure: remove it from inside intro-body, and place it as standalone section

// Extract the poem-section content that's inside intro-body
const poemSectionMatch = html.match(/<div class="intro-body">\s*(<div class="poem-section">[\s\S]*?<\/div>\s*(?:<\/div>)?)\s*(<h2 class="intro-headline")/);

if (poemSectionMatch) {
  console.log('Found nested poem-section inside intro-body, restructuring...');
  
  // The nested poem-section inside intro-body - we need to remove it from there
  // and place a clean standalone section
  html = html.replace(
    /<div class="intro-body">\s*<div class="poem-section">[\s\S]*?<\/div>\s*(?:<\/div>)?\s*(<h2 class="intro-headline")/,
    '<div class="intro-body">\n    <$1'
  );
}

// Now wrap what we have as a proper standalone section
// Check if poem-section is now standalone inside intro-body or not
// Let's just make sure there's a clean standalone poem section
// by replacing any remaining nested poem-section

// Clean up: if poem-section is inside intro-body, move it out
if (html.includes('<div class="intro-body">\n    <div class="poem-section">') ||
    html.includes('<div class="intro-body"><div class="poem-section">')) {
  
  // Extract the poem section out of intro-body
  html = html.replace(
    /(<div class="intro-body">)\s*(<div class="poem-section">[\s\S]*?<\/div>\s*<\/div>)\s*(<h2)/,
    (match, introBody, poemSection, h2) => {
      return `</div>\n</section>\n\n<!-- POEM SECTION -->\n<section class="poem-section">\n  <div class="poem-text-col">\n` +
        poemSection.replace(/<div class="poem-section">/, '').replace(/<div class="poem-text-col">/, '').replace(/<\/div>\s*$/, '') +
        `\n  </div>\n</section>\n\n<!-- EDITORIAL INTRO -->\n<section class="editorial-intro">\n  <div class="intro-side">\n    <div class="intro-label-v">रचना संसार</div>\n    <div class="intro-num">०१</div>\n  </div>\n  ${introBody}\n    <${h2.slice(1)}`;
    }
  );
}

console.log('Fix 2 applied: Duplicate poem removed');

// ============================================================
// FIX 3: Larger, bolder fonts for elderly readers
// ============================================================

// Body base font 18px
html = html.replace(
  /body\{font-family:'Noto Sans Devanagari',sans-serif;background:var\(--warm-white\);color:var\(--ink\);overflow-x:hidden;letter-spacing:0\}/,
  "body{font-family:'Noto Sans Devanagari',sans-serif;font-size:18px;background:var(--warm-white);color:var(--ink);overflow-x:hidden;letter-spacing:0}"
);

// Nav links 16px
html = html.replace(
  /\.nav-links a\{font-family:'Noto Sans Devanagari',sans-serif;font-size:14px;/,
  ".nav-links a{font-family:'Noto Sans Devanagari',sans-serif;font-size:16px;"
);

// Intro headline larger
html = html.replace(
  /\.intro-headline\{font-family:'Tiro Devanagari Hindi',serif;font-size:50px;/,
  ".intro-headline{font-family:'Tiro Devanagari Hindi',serif;font-size:56px;"
);

// Intro text larger
html = html.replace(
  /\.intro-text\{font-family:'Noto Sans Devanagari',sans-serif;font-size:20px;/,
  ".intro-text{font-family:'Noto Sans Devanagari',sans-serif;font-size:22px;"
);

// Magazine grid titles
html = html.replace(
  /\.mi-xl \.mi-title\{font-size:38px\}/,
  '.mi-xl .mi-title{font-size:42px}'
);
html = html.replace(
  /\.mi-md \.mi-title\{font-size:24px\}/,
  '.mi-md .mi-title{font-size:26px}'
);
html = html.replace(
  /\.mi-sm \.mi-title\{font-size:20px\}/,
  '.mi-sm .mi-title{font-size:22px}'
);

// Poem lines larger
html = html.replace(
  /\.pline\.xl\{font-size:48px\}/,
  '.pline.xl{font-size:54px}'
);
html = html.replace(
  /\.pline\.lg\{font-size:34px;/,
  '.pline.lg{font-size:40px;'
);
html = html.replace(
  /\.pline\.md\{font-size:26px;/,
  '.pline.md{font-size:30px;'
);
html = html.replace(
  /\.pline\.sm\{font-size:20px;/,
  '.pline.sm{font-size:23px;'
);

// Footer text
html = html.replace(
  /\.fbrand-text\{font-family:'Noto Sans Devanagari',sans-serif;font-size:16px;/,
  ".fbrand-text{font-family:'Noto Sans Devanagari',sans-serif;font-size:15px;"
);
html = html.replace(
  /\.fcol ul a\{font-family:'Noto Sans Devanagari',sans-serif;font-size:16px;/,
  ".fcol ul a{font-family:'Noto Sans Devanagari',sans-serif;font-size:15px;"
);

// Quote interlude larger
html = html.replace(
  /\.qi-text\{font-family:'Tiro Devanagari Hindi',serif;font-size:46px;/,
  ".qi-text{font-family:'Tiro Devanagari Hindi',serif;font-size:50px;"
);

// Author bio larger
html = html.replace(
  /\.ar-bio\{font-family:'Noto Sans Devanagari',sans-serif;font-size:19px;/,
  ".ar-bio{font-family:'Noto Sans Devanagari',sans-serif;font-size:21px;"
);

// mi-excerpt
html = html.replace(
  /\.mi-excerpt\{font-family:'Noto Sans Devanagari',sans-serif;font-size:16px;/,
  ".mi-excerpt{font-family:'Noto Sans Devanagari',sans-serif;font-size:17px;"
);

console.log('Fix 3 applied: Font sizes increased for elderly readers');

// ============================================================
// FIX 4: Add English translations/subtitles
// ============================================================

// 4a. Hero section — English subtitle below Hindi tagline/desc
// Add after .hero-desc paragraph
html = html.replace(
  /(<p class="hero-desc">.*?<\/p>)/s,
  '$1\n    <p class="hero-en-sub">Words from the heart — Hindi poetry &amp; literature from Abu Dhabi</p>'
);

// Add CSS for hero-en-sub
html = html.replace(
  /\.hero-cta\{display:inline-flex;/,
  `.hero-en-sub{font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(255,255,255,0.42);font-style:italic;margin-bottom:28px;margin-top:-20px}
.hero-cta{display:inline-flex;`
);

// 4b. Poem label — add English below Hindi label span
html = html.replace(
  /<div class="poem-label"><span>नूतन वर्ष · जनवरी २०२६<\/span><\/div>/g,
  `<div class="poem-label"><span>नूतन वर्ष · जनवरी २०२६</span></div>
    <p class="poem-en-label">New Year · January 2026</p>`
);

// 4c. Poem title — add English below Hindi title
html = html.replace(
  /<div class="poem-title-sm">— नववर्ष पर शब्दों की भेंट<\/div>/g,
  `<div class="poem-title-sm">— नववर्ष पर शब्दों की भेंट</div>
      <p class="poem-en-title">A gift of words for the New Year</p>`
);

// 4d. Intro section headline — add English below
html = html.replace(
  /(<h2 class="intro-headline">शब्द ही हैं<br>मेरी <em>पहचान<\/em><\/h2>)/,
  `$1\n    <p class="section-en-sub">Words are my identity — my gift to the world</p>`
);

// 4e. Magazine grid section header — add English below "ताज़ी रचनाएं"
html = html.replace(
  /(<h2 class="mag-title">ताज़ी रचनाएं<\/h2>)/,
  `$1\n    <p class="mag-en-sub">Latest Works</p>`
);

// Add CSS for new English subtitle elements
const englishSubtitleCSS = `
/* English subtitle/translation styles */
.poem-en-label{font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(255,255,255,0.42);font-style:italic;margin-bottom:20px;margin-top:-20px}
.poem-en-title{font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(255,255,255,0.38);font-style:italic;margin-top:-32px;margin-bottom:36px}
.section-en-sub{font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(26,16,8,0.42);font-style:italic;margin-top:-16px;margin-bottom:20px}
.mag-en-sub{font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(26,16,8,0.42);font-style:italic;margin-top:4px}
`;

// Insert CSS before closing </style>
html = html.replace('</style>', englishSubtitleCSS + '</style>');

console.log('Fix 4 applied: English translations/subtitles added');

// ============================================================
// Write the file
// ============================================================
fs.writeFileSync(filePath, html, 'utf8');
console.log('\nAll 4 fixes applied successfully!');
console.log('Written to: ' + filePath);

// Quick verification
const written = fs.readFileSync(filePath, 'utf8');
console.log('\nVerification checks:');
console.log('- poem-temple-col in CSS:', written.includes('.poem-temple-col{') ? 'STILL PRESENT (problem!)' : 'REMOVED ✓');
console.log('- poem-temple-col in HTML:', written.includes('class="poem-temple-col"') ? 'STILL PRESENT (problem!)' : 'REMOVED ✓');
console.log('- Dark gradient background:', written.includes('#1A0808') ? 'PRESENT ✓' : 'MISSING (problem!)');
console.log('- POEM FULLBLEED duplicate:', written.includes('<!-- POEM FULLBLEED -->') ? 'STILL PRESENT (check)' : 'REMOVED ✓');
console.log('- Body font-size 18px:', written.includes('font-size:18px') ? 'PRESENT ✓' : 'MISSING');
console.log('- pline.xl 54px:', written.includes('.pline.xl{font-size:54px}') ? 'PRESENT ✓' : 'MISSING');
console.log('- hero-en-sub:', written.includes('hero-en-sub') ? 'PRESENT ✓' : 'MISSING');
console.log('- poem-en-label:', written.includes('poem-en-label') ? 'PRESENT ✓' : 'MISSING');
console.log('- mag-en-sub Latest Works:', written.includes('Latest Works') ? 'PRESENT ✓' : 'MISSING');
console.log('- nav-links 16px:', written.includes('nav-links a{font-family') && written.includes('font-size:16px') ? 'PRESENT ✓' : 'CHECK MANUALLY');
