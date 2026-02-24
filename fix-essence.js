/**
 * fix-essence.js
 * Inserts the en-essence HTML blocks into post pages
 * Fixes mi-en-excerpt for cards that have no mi-excerpt
 */
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, 'site');
const POSTS = path.join(SITE, 'posts');

function readFile(p) { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, content) {
  fs.writeFileSync(p, content, 'utf8');
  console.log('  ✓ Written:', path.relative(SITE, p));
}

const ESSENCES = {
  'mammi-amma-nani.html':        'A poem celebrating the extraordinary women who shaped us — mothers, grandmothers, the quiet pillars of every family. Gitanjali Saxena writes of their resilience, their love, and the irreplaceable mark they leave on every life they touch.',
  'guru-mahattva.html':          'A heartfelt tribute to teachers — those who illuminate our path and shape our character long after their lessons end. Inspired by the timeless Indian tradition of Guru-Shishya, this piece honours every mentor who gave selflessly.',
  'yadon-mein-rahenge.html':     'Memories never truly leave us. In this memoir, Gitanjali Saxena recalls those unforgettable souls who remain vivid in heart and mind — proof that love and connection outlast every physical farewell.',
  'health-is-wealth.html':       'A thoughtful reflection on the wisdom of living well. Drawing on lived experience and observation, this essay explores why health — of body, mind and spirit — is the only wealth that truly matters.',
  'najrana-pardesh-se.html':     "A gift of words from a land far from home. This poem captures the bittersweet emotion of living abroad — the longing for roots, the pride in carrying one's culture across oceans.",
  'naritva.html':                'A celebration of womanhood in all its grace and strength. This poem honours the feminine spirit — nurturing yet fierce, gentle yet unbreakable — in the language closest to the heart.',
  'kalam-se-utare.html':         'Thoughts that descended from the pen. A collection of reflections on writing, language and the sacred act of putting feeling into words — by a poet who has never stopped believing in the power of ink.',
  'kshanikayen-anil-saxena.html': "A collection of brief, luminous verses — each a flash of insight, a moment frozen in language. Gitanjali Saxena's kshanikayen (flash poems) are small in form but vast in feeling.",
  'yadon-ke-pannon-se.html':     "Pages from memory — a tribute to her father and the legacy he left. These personal memoirs explore family, loss, and the quiet ways a parent's love shapes everything we become.",
  'kavya.html':                  'A journey through years of poetry — from 2022 to 2025. This collection gathers Gitanjali Saxena\'s verses on faith, love, nature and the immigrant experience, written from the heart of Abu Dhabi.',
  'jivan-darshan.html':          "A philosophical lens on life's deepest questions — purpose, faith, duty and joy. These essays invite the reader to pause, reflect and find meaning in the everyday.",
  'jane-doctor-jubani.html':     "Health wisdom from a poet's perspective. This piece brings together insight on wellness, modern medicine and the ancient Indian understanding of balance between body, mind and soul.",
  'navvarsh-2025.html':          "A new year's gift of words — a poem about health, joy, language and human connection. Gitanjali Saxena reminds us that words, like seeds, carry infinite potential for a new beginning.",
};

function makeEssenceBlock(text) {
  return `<div class="en-essence">
  <span class="en-essence-label">In essence</span>
  <p class="en-essence-text">${text}</p>
</div>\n`;
}

// ── FIX POST PAGES: Insert essence block in body ─────────────────────────────
console.log('=== Inserting essence HTML blocks into posts ===');

const postFiles = fs.readdirSync(POSTS).filter(f => f.endsWith('.html'));
postFiles.forEach(filename => {
  const fp = path.join(POSTS, filename);
  let html = readFile(fp);
  const essenceText = ESSENCES[filename];
  if (!essenceText) { console.log('  – No essence for:', filename); return; }

  // Check if already in body
  if (html.includes('class="en-essence"')) {
    console.log('  – Already has essence block:', filename);
    return;
  }

  const essenceBlock = makeEssenceBlock(essenceText);
  const PROSE_BODY = '<div class="prose-body">';
  const pbIdx = html.indexOf(PROSE_BODY);

  if (pbIdx !== -1) {
    const afterDiv = pbIdx + PROSE_BODY.length;
    html = html.slice(0, afterDiv) + '\n' + essenceBlock + html.slice(afterDiv);
    writeFile(fp, html);
  } else {
    console.log('  ✗ Could not find prose-body in:', filename);
  }
});

// ── FIX INDEX.HTML: Add mi-en-excerpt to cards without mi-excerpt ─────────────
console.log('\n=== Fixing mi-en-excerpt for cards without mi-excerpt ===');

const MI_TEASERS = {
  'guru-mahattva':     'A tribute to teachers who light the way',
  'yadon-mein-rahenge':'Those we love never truly leave us',
  'health-is-wealth':  'On the wisdom of living well',
  'najrana-pardesh-se':'A gift of longing from a distant land',
  'naritva':           'Celebrating the grace and strength of womanhood',
  'kalam-se-utare':    'Words that the pen quietly whispers',
  'kshanikayen-anil-saxena': 'Flash verses — small in form, vast in feeling',
  'yadon-ke-pannon-se':'Pages from memory, written in love',
  'kavya':             'Years of poetry, gathered in one place',
  'jivan-darshan':     "A philosopher's gaze on life's deep questions",
  'jane-doctor-jubani': "Health wisdom, seen through a poet's eyes",
  'mammi-amma-nani':   'A poem for every mother who shaped us',
  'navvarsh-2025':     "A new year's gift woven in words",
};

const idxFp = path.join(SITE, 'index.html');
let idxHtml = readFile(idxFp);
let idxChanged = false;

Object.entries(MI_TEASERS).forEach(([slug, teaser]) => {
  const href = `posts/${slug}.html`;
  const cardStart = idxHtml.indexOf(`href="${href}"`);
  if (cardStart === -1) {
    console.log('  – Card not found for slug:', slug);
    return;
  }

  // Find the mi-inner div for this card
  const innerStart = idxHtml.indexOf('<div class="mi-inner">', cardStart);
  if (innerStart === -1) return;

  // Find the closing </a> of this card
  const cardEnd = idxHtml.indexOf('</a>', innerStart);
  const cardSection = idxHtml.slice(innerStart, cardEnd);

  // Skip if already has en-excerpt
  if (cardSection.includes('mi-en-excerpt')) {
    console.log('  – Already has en-excerpt:', slug);
    return;
  }

  // Find mi-excerpt in the card
  const excerptMatch = cardSection.match(/<p class="mi-excerpt">[^<]*<\/p>/);
  if (excerptMatch) {
    const excerptPos = cardSection.indexOf(excerptMatch[0]);
    const globalInsertPos = innerStart + excerptPos + excerptMatch[0].length;
    idxHtml = idxHtml.slice(0, globalInsertPos) +
              `\n        <p class="mi-en-excerpt">${teaser}</p>` +
              idxHtml.slice(globalInsertPos);
    console.log('  ✓ Added en-excerpt (after mi-excerpt) for:', slug);
    idxChanged = true;
  } else {
    // No mi-excerpt — insert before mi-meta
    const miMetaMatch = cardSection.match(/<div class="mi-meta">/);
    if (miMetaMatch) {
      const metaPos = cardSection.indexOf(miMetaMatch[0]);
      const globalInsertPos = innerStart + metaPos;
      idxHtml = idxHtml.slice(0, globalInsertPos) +
                `<p class="mi-en-excerpt">${teaser}</p>\n        ` +
                idxHtml.slice(globalInsertPos);
      console.log('  ✓ Added en-excerpt (before mi-meta) for:', slug);
      idxChanged = true;
    } else {
      console.log('  ✗ Could not insert en-excerpt for:', slug);
    }
  }
});

if (idxChanged) {
  writeFile(idxFp, idxHtml);
}

console.log('\n✅ Fixes applied!');
