const fs = require('fs');

// 1. Check all posts have essence blocks
const posts = fs.readdirSync('site/posts').filter(f => f.endsWith('.html'));
console.log('=== POST ESSENCE CHECK ===');
posts.forEach(f => {
  const html = fs.readFileSync(`site/posts/${f}`, 'utf8');
  const hasEssence = html.includes('class="en-essence"');
  console.log(`  ${hasEssence ? '✓' : '✗'} ${f}`);
});

// 2. Check index.html mi-en-excerpt
const idx = fs.readFileSync('site/index.html', 'utf8');
console.log('\n=== INDEX MI-EN-EXCERPT CHECK ===');
const cards = [
  'guru-mahattva', 'yadon-mein-rahenge', 'mammi-amma-nani', 'health-is-wealth',
  'najrana-pardesh-se', 'naritva', 'kavya', 'kalam-se-utare', 'jivan-darshan',
  'jane-doctor-jubani', 'kshanikayen-anil-saxena', 'navvarsh-2025', 'yadon-ke-pannon-se'
];
cards.forEach(slug => {
  const hrefIdx = idx.indexOf(`posts/${slug}.html`);
  if (hrefIdx === -1) { console.log(`  ✗ CARD NOT FOUND: ${slug}`); return; }
  const cardEnd = idx.indexOf('</a>', hrefIdx);
  const section = idx.slice(hrefIdx, cardEnd);
  const hasExcerpt = section.includes('mi-en-excerpt');
  console.log(`  ${hasExcerpt ? '✓' : '✗'} ${slug}`);
});

// 3. Check about bio
const about = fs.readFileSync('site/about.html', 'utf8');
console.log('\n=== ABOUT EN BIO ===');
console.log('  ' + (about.includes('about-en-bio') ? '✓ Found' : '✗ Missing'));

// 4. Check rs-en-label in index
console.log('\n=== RS EN LABELS ===');
['Poetry', 'Essays', 'Memoirs', 'Diaspora Heart', 'Special'].forEach(label => {
  console.log(`  ${idx.includes(`">${label}</span>`) ? '✓' : '✗'} ${label}`);
});

// 5. Check nav in post
const post = fs.readFileSync('site/posts/guru-mahattva.html', 'utf8');
console.log('\n=== POST NAV (guru-mahattva) ===');
console.log('  ' + (post.includes('nav-en') ? '✓ Has nav-en' : '✗ Missing nav-en'));
console.log('  ' + (post.includes('class="en-essence"') ? '✓ Has essence block' : '✗ Missing essence block'));
