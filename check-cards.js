const fs = require('fs');
const h = fs.readFileSync('site/index.html','utf8');

// Find mag-section
const magStart = h.indexOf('<div class="mag-grid">');
const magEnd = h.indexOf('</section>', magStart);
const magSection = h.slice(magStart, magEnd);

// Get all hrefs
const matches = magSection.match(/href="posts\/([^"]+\.html)"/g) || [];
console.log('Cards in mag-grid:');
matches.forEach(m => console.log(' ', m));
