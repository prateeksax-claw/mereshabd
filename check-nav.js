const fs = require('fs');
const h = fs.readFileSync('site/index.html','utf8');

// Check navvarsh card
const navIdx = h.indexOf('navvarsh-2025.html');
console.log('navvarsh positions:', []);
let pos = 0;
while ((pos = h.indexOf('navvarsh-2025.html', pos)) !== -1) {
  console.log(' at', pos, ':', h.slice(pos-20, pos+60));
  pos++;
}

// Check navvarsh is in mag-grid at all
const magStart = h.indexOf('<div class="mag-grid">');
const magEnd = h.indexOf('</section>', magStart);
console.log('\nnavvarsh in mag-grid?', h.slice(magStart, magEnd).includes('navvarsh'));

// list all mi-en-excerpt occurrences with context
let ePos = 0;
let count = 0;
while ((ePos = h.indexOf('mi-en-excerpt', ePos)) !== -1) {
  count++;
  console.log('\nmi-en-excerpt #'+count+' at', ePos);
  console.log(h.slice(ePos, ePos+60));
  ePos++;
}
