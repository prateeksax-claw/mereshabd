const c = require('fs').readFileSync('C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html', 'utf8');
// Find the full opening of the div
const searchStr = '<div class="meet-doctor-heading">';
const idx = c.indexOf(searchStr);
console.log('div starts at index:', idx);

// Check what's at idx-4 to see indentation
console.log('Preceding 6 chars hex:');
for (let i = idx-6; i < idx; i++) {
  console.log(i, c.charCodeAt(i).toString(16), JSON.stringify(c[i]));
}
