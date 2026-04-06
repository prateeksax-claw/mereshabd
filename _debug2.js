const c = require('fs').readFileSync('C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html', 'utf8');
const idx = c.indexOf('meet-doctor-heading">');
// Get the text starting 10 chars before the div tag
const start = idx - 10;
const chunk = c.slice(start, start + 250);
console.log('Raw chunk hex:');
for (let i = 0; i < chunk.length; i++) {
  process.stdout.write(chunk.charCodeAt(i).toString(16).padStart(4,'0') + ' ');
  if ((i+1)%16===0) process.stdout.write('\n');
}
process.stdout.write('\n\nText:\n');
console.log(chunk);
