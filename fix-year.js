const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/health-is-wealth.html';
let c = fs.readFileSync(path, 'utf8');

// Remove 2025 from author line (uses em dash —)
c = c.replace('— Gitanjali Saxena 2025', '— Gitanjali Saxena');
console.log('2025 removed:', !c.includes('Saxena 2025'));

const hindi = (c.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Hindi chars:', hindi);

if (hindi > 150) {
  fs.writeFileSync(path, c, 'utf8');
  console.log('Saved OK');
}
