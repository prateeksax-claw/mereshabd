const fs = require('fs');
const path = require('path');
const SITE = path.join(__dirname, 'site');
const POSTS = path.join(SITE, 'posts');

let allGood = true;

function check(label, condition) {
  const ok = !!condition;
  if (!ok) allGood = false;
  console.log(`  ${ok ? '✓' : '✗'} ${label}`);
  return ok;
}

// ── ROOT PAGES ────────────────────────────────────────────────────────────────
console.log('\n=== ROOT PAGES NAV ===');
['index.html','about.html','archive.html','gallery.html','contact.html'].forEach(f => {
  const html = fs.readFileSync(path.join(SITE, f), 'utf8');
  check(`${f}: .nav-en CSS`, html.includes('.nav-en{'));
  check(`${f}: nav spans`, html.includes('<span class="nav-en">Home</span>'));
});

// ── ABOUT BIO ─────────────────────────────────────────────────────────────────
console.log('\n=== ABOUT BIO ===');
const about = fs.readFileSync(path.join(SITE, 'about.html'), 'utf8');
check('about-en-bio div', about.includes('about-en-bio'));
check('bio English text', about.includes('For three decades, Gitanjali Saxena'));

// ── RS CARDS ─────────────────────────────────────────────────────────────────
console.log('\n=== RS CARDS ===');
const idx = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');
check('rs-en-label CSS', idx.includes('.rs-en-label{'));
['Poetry','Essays','Memoirs','Diaspora Heart','Special'].forEach(e =>
  check(`rs-en-label: ${e}`, idx.includes(`"rs-en-label">${e}</span>`))
);

// ── MI EXCERPTS ──────────────────────────────────────────────────────────────
console.log('\n=== MI EXCERPTS (mag-grid only - 7 cards) ===');
const magStart = idx.indexOf('<div class="mag-grid">');
const magEnd = idx.indexOf('</section>', magStart);
const magSection = idx.slice(magStart, magEnd);
check('mi-en-excerpt CSS', idx.includes('.mi-en-excerpt{'));
['A tribute to teachers', 'Those we love', 'A poem for every mother',
 'On the wisdom', 'A gift of longing', 'Celebrating the grace', 'Years of poetry'].forEach(t =>
  check(`teaser: "${t.substring(0,25)}..."`, magSection.includes(t))
);

// ── ARCHIVE FILTERS ───────────────────────────────────────────────────────────
console.log('\n=== ARCHIVE FILTERS ===');
const arc = fs.readFileSync(path.join(SITE, 'archive.html'), 'utf8');
check('filter-en CSS', arc.includes('.filter-en{'));
['Poetry','Essays','Memoirs','Diaspora Heart','Special'].forEach(e =>
  check(`filter-en: ${e}`, arc.includes(`"filter-en">${e}</span>`))
);

// ── POST ESSENCE BLOCKS ───────────────────────────────────────────────────────
console.log('\n=== POST ESSENCE BLOCKS ===');
const postFiles = fs.readdirSync(POSTS).filter(f => f.endsWith('.html'));
postFiles.forEach(f => {
  const html = fs.readFileSync(path.join(POSTS, f), 'utf8');
  check(`${f}: en-essence block`, html.includes('class="en-essence"'));
  check(`${f}: en-essence CSS`, html.includes('.en-essence{'));
  check(`${f}: nav-en spans`, html.includes('<span class="nav-en">Home</span>'));
});

console.log(`\n${allGood ? '✅ ALL CHECKS PASSED' : '❌ SOME CHECKS FAILED'}`);
