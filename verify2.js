const fs = require('fs');
const idx = fs.readFileSync('site/index.html','utf8');

console.log('=== RS CARD कविता (in body) ===');
const rsCardStart = idx.indexOf('"rs-card"');
console.log(idx.slice(rsCardStart, rsCardStart + 300));

console.log('\n=== MI CARD guru excerpt ===');
const excerptMatch = idx.match(/mi-excerpt[\s\S]{0,200}/);
if (excerptMatch) console.log(excerptMatch[0].substring(0, 250));

console.log('\n=== MI CARD yadon-mein-rahenge ===');
const yadonStart = idx.indexOf('yadon-mein-rahenge.html');
console.log(idx.slice(yadonStart, yadonStart + 350));

console.log('\n=== ABOUT BIO TEXT section ===');
const about = fs.readFileSync('site/about.html','utf8');
// Find the English bio div
const enBioIdx = about.indexOf('about-en-bio');
if (enBioIdx !== -1) {
  console.log('FOUND about-en-bio at:', enBioIdx);
  console.log(about.slice(enBioIdx - 10, enBioIdx + 300));
} else {
  console.log('NOT FOUND - about-en-bio');
  // Show bio-divider context
  const bdIdx = about.indexOf('bio-divider');
  console.log(about.slice(bdIdx - 200, bdIdx + 100));
}

console.log('\n=== POST ESSENCE in HTML body (guru-mahattva) ===');
const post = fs.readFileSync('site/posts/guru-mahattva.html','utf8');
const enEssBodyIdx = post.indexOf('class="en-essence"');
if (enEssBodyIdx !== -1) {
  console.log('FOUND in body at:', enEssBodyIdx);
  console.log(post.slice(enEssBodyIdx, enEssBodyIdx + 350));
} else {
  console.log('NOT FOUND in body');
  // Check where prose-body is
  const pbIdx = post.indexOf('<div class="prose-body">');
  console.log('prose-body at:', pbIdx);
  console.log(post.slice(pbIdx, pbIdx + 300));
}
