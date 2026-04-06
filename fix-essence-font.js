const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/health-is-wealth.html';
let c = fs.readFileSync(path, 'utf8');

// 1. Make "In Essence" box text bold
// The en-essence-text class has the description text
c = c.replace(
  '.en-essence-text{font-family:\'Cormorant Garamond\',serif;font-size:17px;color:#1C1410;line-height:1.7;font-style:italic;margin:0;letter-spacing:0}',
  '.en-essence-text{font-family:\'Cormorant Garamond\',serif;font-size:17px;color:#1C1410;line-height:1.7;font-style:italic;margin:0;letter-spacing:0;font-weight:700}'
);
console.log('In Essence bold:', c.includes('en-essence-text{font-family') && c.includes('font-weight:700'));

// 2. Remove "2025" from author line
c = c.replace(
  'style="font-style:italic;color:var(--dust);text-align:right;font-weight:700">- Gitanjali Saxena 2025</p>',
  'style="font-style:italic;color:var(--dust);text-align:right;font-weight:700">- Gitanjali Saxena</p>'
);
console.log('2025 removed:', !c.includes('Gitanjali Saxena 2025'));

const hindi = (c.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Hindi chars:', hindi);

if (hindi > 150) {
  fs.writeFileSync(path, c, 'utf8');
  console.log('Saved OK');
}
