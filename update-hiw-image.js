const fs = require('fs');

// 1. Update Health is Wealth card thumbnail in jane-doctor-jubani.html
const jubaniPath = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let jubani = fs.readFileSync(jubaniPath, 'utf8');

jubani = jubani.replace(
  '<img src="../images/health-is-wealth-hero.png" alt="Health is Wealth" class="hc-thumb" loading="lazy">',
  '<img src="../images/health-is-wealth-poster.jpg" alt="Health is Wealth" class="hc-thumb" loading="lazy">'
);
console.log('Jubani card image updated:', jubani.includes('health-is-wealth-poster.jpg'));

const hindi1 = (jubani.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Jubani Hindi chars:', hindi1);
if (hindi1 > 150) { fs.writeFileSync(jubaniPath, jubani, 'utf8'); console.log('Jubani saved OK'); }

// 2. Update the hero image on health-is-wealth.html article page
const hiwPath = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/health-is-wealth.html';
let hiw = fs.readFileSync(hiwPath, 'utf8');

// Replace the hero background image
hiw = hiw.replace(
  "background-image:url('../images/health-is-wealth-hero.png')",
  "background-image:url('../images/health-is-wealth-poster.jpg')"
);
console.log('HIW article hero updated:', hiw.includes('health-is-wealth-poster.jpg'));

const hindi2 = (hiw.match(/[\u0900-\u097F]/g)||[]).length;
console.log('HIW Hindi chars:', hindi2);
if (hindi2 > 150) { fs.writeFileSync(hiwPath, hiw, 'utf8'); console.log('HIW saved OK'); }
