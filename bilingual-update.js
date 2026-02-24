/**
 * bilingual-update.js
 * Adds bilingual English to mereshabd.com
 * Uses UTF-8 throughout — never PowerShell Set-Content
 */

const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, 'site');
const POSTS = path.join(SITE, 'posts');

// ─── HELPERS ────────────────────────────────────────────────────────────────

function readFile(p) {
  return fs.readFileSync(p, 'utf8');
}

function writeFile(p, content) {
  fs.writeFileSync(p, content, 'utf8');
  console.log('  ✓ Written:', path.relative(SITE, p));
}

// ─── 1. NAV CSS + NAV LINKS ────────────────────────────────────────────────

const NAV_CSS = `
.nav-en{font-size:9px;display:block;color:rgba(26,16,8,0.3);font-family:monospace;letter-spacing:1px;text-transform:uppercase;line-height:1;margin-top:1px}
.nav-links a:hover .nav-en{color:var(--red)}`;

// Root pages nav (no ../)
const ROOT_NAV_OLD = `    <li><a href="index.html">होम</a></li>
    <li><a href="about.html">परिचय</a></li>
    <li><a href="archive.html">रचनाएं</a></li>
    <li><a href="gallery.html">गैलरी</a></li>
    <li><a href="contact.html">संपर्क</a></li>`;

const ROOT_NAV_NEW = `    <li><a href="index.html">होम <span class="nav-en">Home</span></a></li>
    <li><a href="about.html" class="hide-sm">परिचय <span class="nav-en">About</span></a></li>
    <li><a href="archive.html">रचनाएं <span class="nav-en">Works</span></a></li>
    <li><a href="gallery.html" class="hide-sm">गैलरी <span class="nav-en">Gallery</span></a></li>
    <li><a href="contact.html" class="hide-sm">संपर्क <span class="nav-en">Connect</span></a></li>`;

// About page nav has class="active" on परिचय
const ABOUT_NAV_OLD = `    <li><a href="index.html">होम</a></li>
    <li><a href="about.html" class="active">परिचय</a></li>
    <li><a href="archive.html">रचनाएं</a></li>
    <li><a href="gallery.html">गैलरी</a></li>
    <li><a href="contact.html">संपर्क</a></li>`;

const ABOUT_NAV_NEW = `    <li><a href="index.html">होम <span class="nav-en">Home</span></a></li>
    <li><a href="about.html" class="hide-sm active">परिचय <span class="nav-en">About</span></a></li>
    <li><a href="archive.html">रचनाएं <span class="nav-en">Works</span></a></li>
    <li><a href="gallery.html" class="hide-sm">गैलरी <span class="nav-en">Gallery</span></a></li>
    <li><a href="contact.html" class="hide-sm">संपर्क <span class="nav-en">Connect</span></a></li>`;

// Archive page nav has class="active" on रचनाएं
const ARCHIVE_NAV_OLD = `    <li><a href="index.html">होम</a></li>
    <li><a href="about.html">परिचय</a></li>
    <li><a href="archive.html" class="active">रचनाएं</a></li>
    <li><a href="gallery.html">गैलरी</a></li>
    <li><a href="contact.html">संपर्क</a></li>`;

const ARCHIVE_NAV_NEW = `    <li><a href="index.html">होम <span class="nav-en">Home</span></a></li>
    <li><a href="about.html" class="hide-sm">परिचय <span class="nav-en">About</span></a></li>
    <li><a href="archive.html" class="active">रचनाएं <span class="nav-en">Works</span></a></li>
    <li><a href="gallery.html" class="hide-sm">गैलरी <span class="nav-en">Gallery</span></a></li>
    <li><a href="contact.html" class="hide-sm">संपर्क <span class="nav-en">Connect</span></a></li>`;

// Post pages nav (uses ../)
const POST_NAV_OLD = `    <li><a href="../index.html">होम</a></li>
    <li><a href="../about.html">परिचय</a></li>
    <li><a href="../archive.html">रचनाएं</a></li>
    <li><a href="../gallery.html">गैलरी</a></li>
    <li><a href="../contact.html">संपर्क</a></li>`;

const POST_NAV_NEW = `    <li><a href="../index.html">होम <span class="nav-en">Home</span></a></li>
    <li><a href="../about.html" class="hide-sm">परिचय <span class="nav-en">About</span></a></li>
    <li><a href="../archive.html">रचनाएं <span class="nav-en">Works</span></a></li>
    <li><a href="../gallery.html" class="hide-sm">गैलरी <span class="nav-en">Gallery</span></a></li>
    <li><a href="../contact.html" class="hide-sm">संपर्क <span class="nav-en">Connect</span></a></li>`;

function addNavCss(html) {
  // Insert nav CSS before closing </style> of the first style block
  // Find the first </style>
  const idx = html.indexOf('</style>');
  if (idx === -1) return html;
  // Check if nav-en already added
  if (html.includes('.nav-en{')) return html;
  return html.slice(0, idx) + NAV_CSS + '\n' + html.slice(idx);
}

// ─── 2. ABOUT PAGE ENGLISH BIO ───────────────────────────────────────────────

const ABOUT_EN_BIO = `
<div class="about-en-bio" style="margin-top:28px;padding-top:24px;border-top:1px solid rgba(0,0,0,0.07)">
  <p style="font-family:'Cormorant Garamond',serif;font-size:18px;color:rgba(26,16,8,0.6);line-height:1.8;font-style:italic;max-width:560px">For three decades, Gitanjali Saxena has woven words into the fabric of Hindi literature from Abu Dhabi. A PIB-accredited journalist, editor of the prestigious <em>Jyoti</em> magazine, and a poet whose verses carry the fragrance of India across the desert — her writing is a bridge between two worlds.</p>
</div>`;

// Insert after the last bio-text paragraph (before the bio-divider)
const BIO_DIVIDER = '    <div class="bio-divider"></div>';

// ─── 3. HOMEPAGE CATEGORY CARDS ─────────────────────────────────────────────

const RS_CSS = `
.rs-en-label{display:block;font-family:monospace;font-size:10px;color:rgba(255,255,255,0.4);letter-spacing:1px;text-transform:uppercase;margin-top:4px}`;

// ─── 4. HOMEPAGE MAGAZINE CARDS ──────────────────────────────────────────────

const MI_CSS = `
.mi-en-excerpt{font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(255,255,255,0.38);font-style:italic;margin:6px 0 0;line-height:1.4}`;

const MI_TEASERS = {
  'guru-mahattva':     'A tribute to teachers who light the way',
  'yadon-mein-rahenge':'Those we love never truly leave us',
  'health-is-wealth':  'On the wisdom of living well',
  'najrana-pardesh-se':'A gift of longing from a distant land',
  'naritva':           'Celebrating the grace and strength of womanhood',
  'kalam-se-utare':    'Words that the pen quietly whispers',
  'kshanikayen':       'Flash verses — small in form, vast in feeling',
  'yadon-ke-pannon-se':'Pages from memory, written in love',
  'kavya':             'Years of poetry, gathered in one place',
  'jivan-darshan':     "A philosopher's gaze on life's deep questions",
  'jane-doctor':       "Health wisdom, seen through a poet's eyes",
  'mammi-amma-nani':   'A poem for every mother who shaped us',
  'navvarsh-2025':     "A new year's gift woven in words",
};

// ─── 5. POST ENGLISH ESSENCE BLOCKS ─────────────────────────────────────────

const ESSENCE_CSS = `
.en-essence{border-left:2px solid var(--gold);padding:16px 20px;margin-bottom:36px;background:rgba(201,168,76,0.05)}
.en-essence-label{font-family:monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:8px}
.en-essence-text{font-family:'Cormorant Garamond',serif;font-size:17px;color:rgba(26,16,8,0.6);line-height:1.7;font-style:italic;margin:0;letter-spacing:0}`;

const ESSENCES = {
  'mammi-amma-nani.html':        'A poem celebrating the extraordinary women who shaped us — mothers, grandmothers, the quiet pillars of every family. Gitanjali Saxena writes of their resilience, their love, and the irreplaceable mark they leave on every life they touch.',
  'guru-mahattva.html':          'A heartfelt tribute to teachers — those who illuminate our path and shape our character long after their lessons end. Inspired by the timeless Indian tradition of Guru-Shishya, this piece honours every mentor who gave selflessly.',
  'yadon-mein-rahenge.html':     'Memories never truly leave us. In this memoir, Gitanjali Saxena recalls those unforgettable souls who remain vivid in heart and mind — proof that love and connection outlast every physical farewell.',
  'health-is-wealth.html':       'A thoughtful reflection on the wisdom of living well. Drawing on lived experience and observation, this essay explores why health — of body, mind and spirit — is the only wealth that truly matters.',
  'najrana-pardesh-se.html':     'A gift of words from a land far from home. This poem captures the bittersweet emotion of living abroad — the longing for roots, the pride in carrying one\'s culture across oceans.',
  'naritva.html':                'A celebration of womanhood in all its grace and strength. This poem honours the feminine spirit — nurturing yet fierce, gentle yet unbreakable — in the language closest to the heart.',
  'kalam-se-utare.html':         'Thoughts that descended from the pen. A collection of reflections on writing, language and the sacred act of putting feeling into words — by a poet who has never stopped believing in the power of ink.',
  'kshanikayen-anil-saxena.html':'A collection of brief, luminous verses — each a flash of insight, a moment frozen in language. Gitanjali Saxena\'s kshanikayen (flash poems) are small in form but vast in feeling.',
  'yadon-ke-pannon-se.html':     'Pages from memory — a tribute to her father and the legacy he left. These personal memoirs explore family, loss, and the quiet ways a parent\'s love shapes everything we become.',
  'kavya.html':                  'A journey through years of poetry — from 2022 to 2025. This collection gathers Gitanjali Saxena\'s verses on faith, love, nature and the immigrant experience, written from the heart of Abu Dhabi.',
  'jivan-darshan.html':          "A philosophical lens on life's deepest questions — purpose, faith, duty and joy. These essays invite the reader to pause, reflect and find meaning in the everyday.",
  'jane-doctor-jubani.html':     "Health wisdom from a poet's perspective. This piece brings together insight on wellness, modern medicine and the ancient Indian understanding of balance between body, mind and soul.",
  'navvarsh-2025.html':          'A new year\'s gift of words — a poem about health, joy, language and human connection. Gitanjali Saxena reminds us that words, like seeds, carry infinite potential for a new beginning.',
};

function makeEssenceBlock(text) {
  return `<div class="en-essence">
  <span class="en-essence-label">In essence</span>
  <p class="en-essence-text">${text}</p>
</div>\n`;
}

// ─── PROCESS ROOT PAGES ───────────────────────────────────────────────────────

console.log('\n=== Processing root pages ===');

const ROOT_PAGES = ['index.html', 'gallery.html', 'contact.html', '404.html'];
ROOT_PAGES.forEach(filename => {
  const fp = path.join(SITE, filename);
  if (!fs.existsSync(fp)) return;
  let html = readFile(fp);
  html = addNavCss(html);
  html = html.replace(ROOT_NAV_OLD, ROOT_NAV_NEW);
  writeFile(fp, html);
});

// about.html — special nav + English bio
{
  const fp = path.join(SITE, 'about.html');
  let html = readFile(fp);
  html = addNavCss(html);
  // Nav — about has class="active" on परिचय link
  if (html.includes(ABOUT_NAV_OLD)) {
    html = html.replace(ABOUT_NAV_OLD, ABOUT_NAV_NEW);
  } else {
    html = html.replace(ROOT_NAV_OLD, ROOT_NAV_NEW);
  }
  // English bio — insert before bio-divider
  if (!html.includes('about-en-bio') && html.includes(BIO_DIVIDER)) {
    html = html.replace(BIO_DIVIDER, ABOUT_EN_BIO + '\n' + BIO_DIVIDER);
  }
  writeFile(fp, html);
}

// archive.html — special nav
{
  const fp = path.join(SITE, 'archive.html');
  let html = readFile(fp);
  html = addNavCss(html);
  if (html.includes(ARCHIVE_NAV_OLD)) {
    html = html.replace(ARCHIVE_NAV_OLD, ARCHIVE_NAV_NEW);
  } else {
    html = html.replace(ROOT_NAV_OLD, ROOT_NAV_NEW);
  }
  writeFile(fp, html);
}

// ─── PROCESS INDEX.HTML EXTRA (category cards + mag grid) ────────────────────

console.log('\n=== Processing index.html extras ===');
{
  const fp = path.join(SITE, 'index.html');
  let html = readFile(fp);

  // RS_CSS
  if (!html.includes('.rs-en-label{')) {
    const idx = html.indexOf('</style>');
    if (idx !== -1) html = html.slice(0, idx) + RS_CSS + '\n' + html.slice(idx);
  }

  // MI_CSS
  if (!html.includes('.mi-en-excerpt{')) {
    const idx = html.indexOf('</style>');
    if (idx !== -1) html = html.slice(0, idx) + MI_CSS + '\n' + html.slice(idx);
  }

  // Category cards — add rs-en-label after rs-name div
  const RS_CARDS = [
    { hindi: 'कविता',    english: 'Poetry' },
    { hindi: 'लेख',      english: 'Essays' },
    { hindi: 'संस्मरण', english: 'Memoirs' },
    { hindi: 'प्रवासी मन', english: 'Diaspora Heart' },
    { hindi: 'विशेष',   english: 'Special' },
  ];
  RS_CARDS.forEach(({ hindi, english }) => {
    const old = `<div class="rs-name" style="color:`;
    // Find the rs-name div that contains this hindi word, add rs-en-label after it
    // Pattern: <div class="rs-name" ...>HINDI</div>
    const pattern = new RegExp(
      `(<div class="rs-name"[^>]*>${hindi}<\\/div>)(?!\\s*<span class="rs-en-label">)`,
      'g'
    );
    if (!html.includes(`>${hindi}</div>\n      <span class="rs-en-label">`)) {
      html = html.replace(pattern, `$1\n      <span class="rs-en-label">${english}</span>`);
    }
  });

  // Magazine grid — add mi-en-excerpt after mi-excerpt or after mi-title when no excerpt
  // We'll do href-based matching
  Object.entries(MI_TEASERS).forEach(([slug, teaser]) => {
    const hrefPattern = `posts/${slug}.html`;
    // Find the section of html for this card
    const cardStart = html.indexOf(`href="${hrefPattern}"`);
    if (cardStart === -1) {
      // Try partial match (kshanikayen, jane-doctor)
      const partials = Object.keys(MI_TEASERS).filter(k => k !== slug);
      return;
    }

    // Find the mi-inner div for this card
    const innerStart = html.indexOf('<div class="mi-inner">', cardStart);
    if (innerStart === -1) return;

    // Find next </a> after innerStart (end of this card)
    const cardEnd = html.indexOf('</a>', innerStart);
    
    // Check if already has mi-en-excerpt
    const cardSection = html.slice(innerStart, cardEnd);
    if (cardSection.includes('mi-en-excerpt')) return;

    // Find .mi-excerpt in this card section
    const excerptMatch = cardSection.match(/<p class="mi-excerpt">[\s\S]*?<\/p>/);
    if (excerptMatch) {
      const excerptEnd = innerStart + cardSection.indexOf(excerptMatch[0]) + excerptMatch[0].length;
      html = html.slice(0, excerptEnd) + 
             `\n        <p class="mi-en-excerpt">${teaser}</p>` +
             html.slice(excerptEnd);
    } else {
      // No excerpt — add after mi-title or mi-meta
      const miMetaIdx = cardSection.indexOf('<div class="mi-meta">');
      if (miMetaIdx !== -1) {
        const insertAt = innerStart + miMetaIdx;
        html = html.slice(0, insertAt) + 
               `<p class="mi-en-excerpt">${teaser}</p>\n        ` +
               html.slice(insertAt);
      }
    }
  });

  writeFile(fp, html);
}

// ─── PROCESS POST PAGES ───────────────────────────────────────────────────────

console.log('\n=== Processing post pages ===');
const postFiles = fs.readdirSync(POSTS).filter(f => f.endsWith('.html'));

postFiles.forEach(filename => {
  const fp = path.join(POSTS, filename);
  let html = readFile(fp);
  let changed = false;

  // 1. Add nav CSS
  const before = html;
  html = addNavCss(html);
  if (html !== before) changed = true;

  // 2. Update nav links (post pages use ../)
  if (html.includes(POST_NAV_OLD)) {
    html = html.replace(POST_NAV_OLD, POST_NAV_NEW);
    changed = true;
  }

  // 3. Add essence CSS
  if (!html.includes('.en-essence{')) {
    const idx = html.lastIndexOf('</style>');
    if (idx !== -1) {
      html = html.slice(0, idx) + ESSENCE_CSS + '\n' + html.slice(idx);
      changed = true;
    }
  }

  // 4. Add essence block at start of post body
  const essenceText = ESSENCES[filename];
  if (essenceText && !html.includes('en-essence')) {
    const essenceBlock = makeEssenceBlock(essenceText);
    
    // Try to find .prose-body opening and insert after it
    const prosBodyMatch = html.match(/<div class="prose-body">\s*\n/);
    if (prosBodyMatch) {
      const insertIdx = html.indexOf(prosBodyMatch[0]) + prosBodyMatch[0].length;
      html = html.slice(0, insertIdx) + essenceBlock + html.slice(insertIdx);
      changed = true;
    } else {
      // Try prose-body without newline
      const pIdx = html.indexOf('<div class="prose-body">');
      if (pIdx !== -1) {
        const afterDiv = pIdx + '<div class="prose-body">'.length;
        html = html.slice(0, afterDiv) + '\n' + essenceBlock + html.slice(afterDiv);
        changed = true;
      }
    }
  }

  if (changed) {
    writeFile(fp, html);
  } else {
    console.log('  – Skipped (no changes):', filename);
  }
});

console.log('\n✅ All bilingual updates applied!');
