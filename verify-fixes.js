const fs = require('fs');
const html = fs.readFileSync('site/index.html', 'utf8');

// Check poem section structure
const poemStart = html.indexOf('<!-- POEM SECTION -->');
const poemEnd = html.indexOf('<!-- EDITORIAL INTRO -->');
if (poemStart > -1 && poemEnd > -1) {
  console.log('=== POEM SECTION ===');
  console.log(html.slice(poemStart, poemEnd).substring(0, 800));
  console.log('...');
} else {
  console.log('Poem section markers:', poemStart, poemEnd);
  // Check if poem section is inline
  const psIdx = html.indexOf('poem-section');
  console.log('poem-section found at:', psIdx);
  if (psIdx > -1) {
    console.log(html.slice(Math.max(0, psIdx - 50), psIdx + 400));
  }
}

// Check editorial intro structure  
const introStart = html.indexOf('<!-- EDITORIAL INTRO -->');
if (introStart > -1) {
  console.log('\n=== EDITORIAL INTRO (first 600 chars) ===');
  console.log(html.slice(introStart, introStart + 600));
}

// Check count of poem-section class
const poemCount = html.split('class="poem-section"').length - 1;
console.log('\nNumber of poem-section elements:', poemCount);

// Check hero-en-sub
const heroEnIdx = html.indexOf('hero-en-sub');
console.log('Hero en-sub found:', heroEnIdx > -1 ? 'YES at ' + heroEnIdx : 'NOT FOUND');

// Check mag-en-sub
console.log('Latest Works:', html.includes('Latest Works') ? 'YES' : 'NO');
console.log('poem-en-label:', html.includes('poem-en-label') ? 'YES' : 'NO');
console.log('section-en-sub:', html.includes('section-en-sub') ? 'YES' : 'NO');
console.log('mandir-golden in HTML body (not CSS):', html.includes('mandir-golden.jpg') ? 'STILL PRESENT - CHECK' : 'REMOVED');
console.log('\nTotal file size:', html.length, 'bytes');
