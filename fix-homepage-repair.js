// fix-homepage-repair.js
// Repairs the current state of index.html:
// 1. Adds the missing poem section back (standalone, full-width dark gradient)
// 2. Fixes the <<h2 malformed HTML in intro-body
// Previous script (v1) already applied:
//   - temple col CSS removal
//   - font size increases
//   - English subtitle CSS + most HTML subtitles
//   - duplicate POEM FULLBLEED removed

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'site', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

console.log('Current file size:', html.length, 'bytes');

// ============================================================
// REPAIR 1: Fix <<h2 malformed HTML (double <)
// ============================================================
html = html.replace(/<<h2 class="intro-headline">/g, '<h2 class="intro-headline">');
console.log('Repair 1: Fixed <<h2 malformed HTML');

// ============================================================
// REPAIR 2: Add the missing poem section back
// Insert a proper poem section between marquee and editorial intro
// ============================================================

const poemSectionHTML = `
<!-- POEM SECTION -->
<section class="poem-section">
  <div class="poem-text-col">
    <div class="poem-label"><span>नूतन वर्ष · जनवरी २०२६</span></div>
    <p class="poem-en-label">New Year · January 2026</p>
    <div class="poem-wrap">
      <div class="poem-title-sm">— नववर्ष पर शब्दों की भेंट</div>
      <p class="poem-en-title">A gift of words for the New Year</p>
      <span class="pline xl">नववर्ष भरा रहे</span>
      <span class="pline lg">अच्छे स्वास्थ्य से,</span>
      <span class="pgap"></span>
      <span class="pline md">सुख-समृद्धि दे दस्तक जीवन में,</span>
      <span class="pline md">जीवन ही तो है उत्सव, है अनमोल,</span>
      <span class="pgap"></span>
      <span class="pline lg">शब्द पिरोकर कुछ</span>
      <span class="pline xl">कहने-सुनने का…</span>
      <span class="pgap"></span>
      <span class="pline sm">शब्दों का मोल जीवन में जानें…</span>
      <div class="poem-attr">
        <div class="pattr-line"></div>
        <div class="pattr-text">गीतांजलि सक्सेना, जनवरी २०२६</div>
        <a href="posts/navvarsh-2025.html" class="pread">पूरी कविता →</a>
      </div>
    </div>
  </div>
</section>
`;

// Insert before <!-- EDITORIAL INTRO -->
html = html.replace('<!-- EDITORIAL INTRO -->', poemSectionHTML + '<!-- EDITORIAL INTRO -->');
console.log('Repair 2: Standalone poem section added');

// ============================================================
// REPAIR 3: Verify/add hero English subtitle if not present
// ============================================================
if (!html.includes('class="hero-en-sub"')) {
  html = html.replace(
    `<p class="hero-desc">नवभारत टाइम्स की पत्रकार · PIB-मान्यता प्राप्त · जयोति संपादक</p>`,
    `<p class="hero-desc">नवभारत टाइम्स की पत्रकार · PIB-मान्यता प्राप्त · जयोति संपादक</p>
    <p class="hero-en-sub">Words from the heart — Hindi poetry &amp; literature from Abu Dhabi</p>`
  );
  console.log('Repair 3: Hero English subtitle added');
} else {
  console.log('Repair 3: Hero English subtitle already present ✓');
}

// ============================================================
// Write
// ============================================================
fs.writeFileSync(filePath, html, 'utf8');
console.log('\nRepairs written to:', filePath);

// ============================================================
// Verification
// ============================================================
const written = fs.readFileSync(filePath, 'utf8');
console.log('\n=== FINAL VERIFICATION ===');
console.log('File size:', written.length, 'bytes');

const checks = [
  ['poem-temple-col CSS', !written.includes('.poem-temple-col{')],
  ['poem-temple-col HTML', !written.includes('class="poem-temple-col"')],
  ['Dark gradient #1A0808', written.includes('#1A0808')],
  ['Standalone poem-section', written.includes('<section class="poem-section">')],
  ['POEM FULLBLEED duplicate REMOVED', !written.includes('<!-- POEM FULLBLEED -->')],
  ['Body font-size 18px', written.includes('font-size:18px')],
  ['pline.xl 54px', written.includes('.pline.xl{font-size:54px}')],
  ['nav-links 16px', written.includes('font-size:16px')],
  ['hero-en-sub', written.includes('hero-en-sub')],
  ['poem-en-label', written.includes('poem-en-label')],
  ['poem-en-title', written.includes('poem-en-title')],
  ['section-en-sub', written.includes('section-en-sub')],
  ['Latest Works', written.includes('Latest Works')],
  ['No mandir-golden in img tag', !written.includes('<img src="images/mandir-golden.jpg"')],
  ['No <<  malformed HTML', !written.includes('<<')],
];

let allPass = true;
checks.forEach(([name, pass]) => {
  const icon = pass ? '✓' : '⚠ FAIL';
  if (!pass) allPass = false;
  console.log(`  ${icon} ${name}`);
});

console.log('\n' + (allPass ? '✅ ALL CHECKS PASSED' : '⚠ SOME CHECKS FAILED - review above'));
