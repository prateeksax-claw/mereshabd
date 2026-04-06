const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/health-is-wealth.html';
let c = fs.readFileSync(path, 'utf8');

// Find and fix the Towards heading - replace color:#1565C0 with #9B0E0E for this specific heading
const idx = c.indexOf('Towards a Healthier Tomorrow');
const headingStart = c.lastIndexOf('<h3', idx);
const headingEnd = c.indexOf('</h3>', idx) + 5;
const oldHeading = c.substring(headingStart, headingEnd);
console.log('Found heading:', oldHeading.substring(0,120));

const newHeading = oldHeading.replace('color:#1565C0', 'color:#9B0E0E').replace('font-weight:600', 'font-weight:700');
c = c.substring(0, headingStart) + newHeading + c.substring(headingEnd);

console.log('Heading red:', c.includes('#9B0E0E') && c.includes('Towards a Healthier'));
const hindi = (c.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Hindi chars:', hindi);
if (hindi > 150) { fs.writeFileSync(path, c, 'utf8'); console.log('Saved OK'); }
