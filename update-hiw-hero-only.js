const fs = require('fs');

// Copy new image to site/images
fs.copyFileSync(
  'C:/Users/prate/.openclaw/workspace/health-is-wealth-v3.jpg',
  'C:/Users/prate/.openclaw/workspace/mereshabd/site/images/health-is-wealth-hero-v3.jpg'
);
console.log('Image copied');

// Update ONLY the hero background in health-is-wealth.html
const hiwPath = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/health-is-wealth.html';
let hiw = fs.readFileSync(hiwPath, 'utf8');

// Replace whatever is currently the hero bg image
hiw = hiw.replace(
  /background-image:url\('\.\.\/images\/health-is-wealth[^']*'\)/,
  "background-image:url('../images/health-is-wealth-hero-v3.jpg')"
);

console.log('Hero updated:', hiw.includes('health-is-wealth-hero-v3.jpg'));
const hindi = (hiw.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Hindi chars:', hindi);

if (hindi > 150) {
  fs.writeFileSync(hiwPath, hiw, 'utf8');
  console.log('Saved OK');
}
