const fs = require('fs');
const idx = fs.readFileSync('site/index.html','utf8');

console.log('=== INDEX NAV ===');
const navStart = idx.indexOf('<ul class="nav-links">');
const navEnd = idx.indexOf('</ul>', navStart);
console.log(idx.slice(navStart, navEnd + 5).substring(0, 500));

console.log('\n=== RS CARD (कविता) ===');
const rsStart = idx.indexOf('rs-name');
console.log(idx.slice(rsStart - 20, rsStart + 200));

console.log('\n=== MI CARD guru-mahattva ===');
const miStart = idx.indexOf('guru-mahattva.html');
console.log(idx.slice(miStart, miStart + 500));

console.log('\n=== ABOUT BIO ===');
const about = fs.readFileSync('site/about.html','utf8');
const bioStart = about.indexOf('bio-divider');
console.log(about.slice(bioStart - 400, bioStart + 50));

console.log('\n=== POST ESSENCE (guru-mahattva) ===');
const post = fs.readFileSync('site/posts/guru-mahattva.html','utf8');
const essStart = post.indexOf('en-essence');
console.log(post.slice(essStart - 50, essStart + 400));

console.log('\n=== POST NAV (guru-mahattva) ===');
const pnavStart = post.indexOf('<ul class="nav-links">');
const pnavEnd = post.indexOf('</ul>', pnavStart);
console.log(post.slice(pnavStart, pnavEnd + 5).substring(0, 500));
