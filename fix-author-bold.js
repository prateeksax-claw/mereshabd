const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/health-is-wealth.html';
let content = fs.readFileSync(path, 'utf8');

// Find the prose author line and check context
const idx = content.indexOf('Gitanjali Saxena 2025');
if (idx === -1) {
  console.log('ERROR: Gitanjali Saxena 2025 not found in file');
  process.exit(1);
}

console.log('Found at position:', idx);
console.log('Surrounding:', JSON.stringify(content.substring(idx - 150, idx + 30)));

// Replace: add font-weight:700 to the style attribute of that prose-text paragraph
const oldStr = 'font-style:italic;color:var(--dust);text-align:right">— Gitanjali Saxena 2025</p>';
const newStr = 'font-style:italic;color:var(--dust);text-align:right;font-weight:700">— Gitanjali Saxena 2025</p>';

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log('SUCCESS: Author name is now bold (font-weight:700 added)');
} else {
  console.log('Pattern not found, trying alternate...');
  // Try with hyphen instead of em-dash
  const oldStr2 = 'font-style:italic;color:var(--dust);text-align:right">- Gitanjali Saxena 2025</p>';
  if (content.includes(oldStr2)) {
    const newStr2 = 'font-style:italic;color:var(--dust);text-align:right;font-weight:700">- Gitanjali Saxena 2025</p>';
    content = content.replace(oldStr2, newStr2);
    fs.writeFileSync(path, content, 'utf8');
    console.log('SUCCESS (hyphen variant): Author name is now bold');
  } else {
    console.log('Neither pattern matched. Manual inspection needed.');
    process.exit(1);
  }
}

// Verify Hindi chars intact
const m = content.match(/[\u0900-\u097F]/g);
console.log('Hindi chars:', m ? m.length : 0);
