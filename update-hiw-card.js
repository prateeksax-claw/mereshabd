const fs = require('fs');

// 1. Update Doctor Jubani card thumbnail
const jubaniPath = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let jubani = fs.readFileSync(jubaniPath, 'utf8');
jubani = jubani.replace(
  '<img src="../images/health-is-wealth-poster.jpg" alt="Health is Wealth" class="hc-thumb" loading="lazy">',
  '<img src="../images/health-is-wealth-card.jpg" alt="Health is Wealth" class="hc-thumb" loading="lazy">'
);
console.log('Jubani card updated:', jubani.includes('health-is-wealth-card.jpg'));
const h1 = (jubani.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Hindi:', h1);
if (h1 > 150) { fs.writeFileSync(jubaniPath, jubani, 'utf8'); console.log('Jubani saved'); }

// 2. Update Health is Wealth article hero
const hiwPath = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/health-is-wealth.html';
let hiw = fs.readFileSync(hiwPath, 'utf8');
hiw = hiw.replace(
  "background-image:url('../images/health-is-wealth-poster.jpg')",
  "background-image:url('../images/health-is-wealth-card.jpg')"
);
console.log('HIW article updated:', hiw.includes('health-is-wealth-card.jpg'));
const h2 = (hiw.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Hindi:', h2);
if (h2 > 150) { fs.writeFileSync(hiwPath, hiw, 'utf8'); console.log('HIW saved'); }
