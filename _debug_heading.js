const c = require('fs').readFileSync('C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html', 'utf8');
const idx = c.indexOf('meet-doctor-heading">');
console.log('idx:', idx);
if (idx >= 0) {
  const ctx = c.slice(idx - 5, idx + 450);
  // Print hex of each char to see what's there
  console.log('Context:');
  console.log(ctx);
  console.log('\nHex of subtitle area:');
  const sub = c.slice(idx + 100, idx + 300);
  for (let i = 0; i < sub.length; i++) {
    process.stdout.write(sub.charCodeAt(i).toString(16).padStart(4,'0') + ' ');
    if ((i+1)%16===0) process.stdout.write('\n');
  }
  process.stdout.write('\n');
}
