const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/health-is-wealth.html';
let c = fs.readFileSync(path, 'utf8');

// 1. Make "Towards a Healthier Tomorrow… With Expert guidance" heading bold red
c = c.replace(
  '<h3 class="prose-text" style="font-weight:600;margin-top:1.5rem">Towards a Healthier Tomorrow… With Expert guidance</h3>',
  '<h3 class="prose-text" style="font-weight:700;margin-top:1.5rem;color:#9B0E0E;">Towards a Healthier Tomorrow… With Expert guidance</h3>'
);

console.log('Heading bold red:', c.includes('Towards a Healthier Tomorrow') && c.includes('#9B0E0E'));

const hindi = (c.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Hindi chars:', hindi);

if (hindi > 150) {
  fs.writeFileSync(path, c, 'utf8');
  console.log('Saved OK');
}
