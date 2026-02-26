const fs = require('fs');
const html = fs.readFileSync('site/index.html', 'utf8');

const checks = [
  ['FIX1 navvarsh-bg.jpg in poem-section CSS', html.includes('navvarsh-bg.jpg')],
  ['FIX1 old gradient-only removed', !html.includes('linear-gradient(135deg,#1A0808')],
  ['FIX2 stanza 1 en', html.includes('May the New Year be filled with good health')],
  ['FIX2 stanza 2 en', html.includes('May prosperity knock on your door')],
  ['FIX2 stanza 3 en', html.includes('Stringing words together')],
  ['FIX2 stanza 4 en', html.includes('Know the value of words')],
  ['FIX2 qi-en quote', html.includes('qi-en')],
  ['FIX2 aq-en author quote', html.includes('aq-en')],
  ['FIX2 ar-bio-en', html.includes('ar-bio-en')],
  ['FIX2 fbrand-en footer', html.includes('fbrand-en')],
  ['FIX2 marquee-en', html.includes('marquee-en')],
  ['FIX2 nav-cta-en', html.includes('nav-cta-en')],
  ['FIX2 intro-text-en', html.includes('intro-text-en')],
  ['FIX2 fcol-label-en', html.includes('fcol-label-en')],
  ['FIX2 footer copyright en', html.includes('All rights reserved')],
  ['FIX2 cred-sub-en', html.includes('cred-sub-en')],
  ['FIX3 global en rule', html.includes('[class*="-en"]')],
  ['FIX3 mi-en-excerpt 0.7 opacity', html.includes('rgba(255,255,255,0.7)')],
  ['FIX3 poem-stanza-en CSS defined', html.includes('poem-stanza-en{font')],
  ['FIX3 poem-en-label updated', html.includes('poem-en-label{font-family')],
  ['FIX3 rs-en-label Cormorant', html.includes('Cormorant Garamond')],
];

let pass = 0, fail = 0;
checks.forEach(([k, v]) => {
  console.log((v ? '✅' : '❌'), k);
  if (v) pass++; else fail++;
});
console.log('');
console.log('PASS:', pass, '/ FAIL:', fail);
console.log('Total HTML size:', html.length, 'bytes');
