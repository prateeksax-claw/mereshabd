/**
 * fix-archive.js
 * Adds English labels to archive filter buttons
 */
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'site', 'archive.html');
let html = fs.readFileSync(fp, 'utf8');

// Archive filter button mapping
const FILTER_MAP = [
  { hindi: 'कविता', english: 'Poetry' },
  { hindi: 'लेख', english: 'Essays' },
  { hindi: 'संस्मरण', english: 'Memoirs' },
  { hindi: 'प्रवासी मन', english: 'Diaspora Heart' },
  { hindi: 'विशेष', english: 'Special' },
];

// The filter buttons look like:
// <button class="filter-btn" data-cat="kavita">कविता <span class="filter-count">3</span></button>
// We'll add a small en label span after the Hindi text but inside the span structure

// Add CSS for filter English labels
const FILTER_CSS = `
.filter-en{font-family:monospace;font-size:8px;color:rgba(255,255,255,0.35);letter-spacing:1px;text-transform:uppercase;display:block;line-height:1;margin-top:2px}
.filter-btn:hover .filter-en,.filter-btn.active .filter-en{color:rgba(255,255,255,0.6)}`;

if (!html.includes('.filter-en{')) {
  const idx = html.lastIndexOf('</style>');
  if (idx !== -1) {
    html = html.slice(0, idx) + FILTER_CSS + '\n' + html.slice(idx);
  }
}

FILTER_MAP.forEach(({ hindi, english }) => {
  // Pattern: >HINDI <span class="filter-count">
  const oldPattern = `>${hindi} <span class="filter-count">`;
  const newPattern = `><span style="display:block">${hindi}</span><span class="filter-en">${english}</span><span class="filter-count" style="display:none">`;
  
  if (html.includes(oldPattern) && !html.includes(`filter-en">${english}`)) {
    html = html.replace(oldPattern, newPattern);
  }
});

// Actually, the above approach hides the count which might break JS. Let's do a simpler approach.
// Just append a <span class="filter-en"> after the Hindi text, before the filter-count span

// Revert above and do it cleanly
html = fs.readFileSync(fp, 'utf8');

// Re-add CSS  
if (!html.includes('.filter-en{')) {
  const idx = html.lastIndexOf('</style>');
  if (idx !== -1) {
    html = html.slice(0, idx) + FILTER_CSS + '\n' + html.slice(idx);
  }
}

// Fix filter buttons: wrap Hindi in a block and add English below
// <button class="filter-btn" data-cat="kavita">कविता <span class="filter-count">3</span></button>
// -> <button class="filter-btn" data-cat="kavita">कविता <span class="filter-count">3</span><span class="filter-en">Poetry</span></button>

FILTER_MAP.forEach(({ hindi, english }) => {
  if (html.includes(`filter-en">${english}`)) {
    console.log('Already has filter-en for:', english);
    return;
  }
  // Find the button for this Hindi word
  const btnPattern = `>${hindi} <span class="filter-count">`;
  const countEnd = html.indexOf('</span></button>', html.indexOf(btnPattern));
  if (countEnd !== -1 && html.includes(btnPattern)) {
    const insertAt = countEnd + '</span>'.length; // after the count span
    html = html.slice(0, insertAt) + `<span class="filter-en">${english}</span>` + html.slice(insertAt);
    console.log('✓ Added filter-en for:', english);
  } else {
    console.log('✗ Could not find button for:', hindi);
  }
});

fs.writeFileSync(fp, html, 'utf8');
console.log('✓ archive.html updated');
