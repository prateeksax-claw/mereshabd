/**
 * fix-essence2.js
 * Inserts en-essence blocks for posts that have non-prose-body containers
 * Strategy: insert right after the breadcrumb </div>
 */
const fs = require('fs');
const path = require('path');
const POSTS = path.join(__dirname, 'site', 'posts');

const ESSENCES = {
  'mammi-amma-nani.html':        'A poem celebrating the extraordinary women who shaped us — mothers, grandmothers, the quiet pillars of every family. Gitanjali Saxena writes of their resilience, their love, and the irreplaceable mark they leave on every life they touch.',
  'najrana-pardesh-se.html':     "A gift of words from a land far from home. This poem captures the bittersweet emotion of living abroad — the longing for roots, the pride in carrying one's culture across oceans.",
  'naritva.html':                'A celebration of womanhood in all its grace and strength. This poem honours the feminine spirit — nurturing yet fierce, gentle yet unbreakable — in the language closest to the heart.',
  'kshanikayen-anil-saxena.html': "A collection of brief, luminous verses — each a flash of insight, a moment frozen in language. Gitanjali Saxena's kshanikayen (flash poems) are small in form but vast in feeling.",
  'yadon-ke-pannon-se.html':     "Pages from memory — a tribute to her father and the legacy he left. These personal memoirs explore family, loss, and the quiet ways a parent's love shapes everything we become.",
  'kavya.html':                  "A journey through years of poetry — from 2022 to 2025. This collection gathers Gitanjali Saxena's verses on faith, love, nature and the immigrant experience, written from the heart of Abu Dhabi.",
  'jivan-darshan.html':          "A philosophical lens on life's deepest questions — purpose, faith, duty and joy. These essays invite the reader to pause, reflect and find meaning in the everyday.",
  'jane-doctor-jubani.html':     "Health wisdom from a poet's perspective. This piece brings together insight on wellness, modern medicine and the ancient Indian understanding of balance between body, mind and soul.",
  'navvarsh-2025.html':          "A new year's gift of words — a poem about health, joy, language and human connection. Gitanjali Saxena reminds us that words, like seeds, carry infinite potential for a new beginning.",
};

function makeEssenceBlock(text) {
  return `\n<div class="en-essence" style="max-width:900px;margin:28px auto;padding:16px 20px 16px 80px">
  <span class="en-essence-label">In essence</span>
  <p class="en-essence-text">${text}</p>
</div>\n`;
}

// For navvarsh-2025 which has post-body
const POST_BODY_FILES = ['navvarsh-2025.html'];

Object.entries(ESSENCES).forEach(([filename, text]) => {
  const fp = path.join(POSTS, filename);
  if (!fs.existsSync(fp)) { console.log('NOT FOUND:', filename); return; }
  
  let html = fs.readFileSync(fp, 'utf8');
  
  // Skip if already has essence block in body
  if (html.includes('class="en-essence"')) {
    console.log('Already has essence:', filename);
    return;
  }

  const essenceBlock = makeEssenceBlock(text);
  
  if (POST_BODY_FILES.includes(filename)) {
    // navvarsh uses post-body
    const marker = '<div class="post-body">';
    const idx = html.indexOf(marker);
    if (idx !== -1) {
      const afterDiv = idx + marker.length;
      html = html.slice(0, afterDiv) + '\n' + essenceBlock + html.slice(afterDiv);
      fs.writeFileSync(fp, html, 'utf8');
      console.log('✓ post-body insertion:', filename);
      return;
    }
  }

  // For poem-display pages (mammi, naritva, najrana): insert before poem-display div
  const POEM_DISPLAY = '<div class="poem-display">';
  const pdIdx = html.indexOf(POEM_DISPLAY);
  if (pdIdx !== -1) {
    html = html.slice(0, pdIdx) + essenceBlock + html.slice(pdIdx);
    fs.writeFileSync(fp, html, 'utf8');
    console.log('✓ poem-display insertion:', filename);
    return;
  }

  // For breadcrumb-section pages: insert after breadcrumb closing div
  // Find the breadcrumb div block and insert after it
  const bcStart = html.indexOf('<div class="breadcrumb">');
  if (bcStart !== -1) {
    // Find the closing </div> of the breadcrumb
    const bcEnd = html.indexOf('</div>', bcStart) + 6; // +6 for </div>
    html = html.slice(0, bcEnd) + '\n' + essenceBlock + html.slice(bcEnd);
    fs.writeFileSync(fp, html, 'utf8');
    console.log('✓ breadcrumb insertion:', filename);
    return;
  }

  console.log('✗ No insertion point found:', filename);
});

console.log('\n✅ Done!');
