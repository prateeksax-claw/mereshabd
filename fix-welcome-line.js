const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/health-is-wealth.html';
let c = fs.readFileSync(path, 'utf8');

// Make "Welcome to this first Chapter, in new column @Mereshabd.com" bold red
c = c.replace(
  'Welcome to this first Chapter, in new column @Mereshabd.com.',
  '<span style="color:#9B0E0E;font-weight:700;">Welcome to this first Chapter, in new column @Mereshabd.com.</span>'
);

console.log('Welcome line updated:', c.includes('color:#9B0E0E;font-weight:700'));
const hindi = (c.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Hindi chars:', hindi);

if (hindi > 150) {
  fs.writeFileSync(path, c, 'utf8');
  console.log('Saved OK');
}
