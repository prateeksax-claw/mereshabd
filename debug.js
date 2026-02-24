const fs = require('fs');
const post = fs.readFileSync('site/posts/guru-mahattva.html','utf8');

// Check the actual content around prose-body
const pbIdx = post.indexOf('<div class="prose-body">');
console.log('prose-body idx:', pbIdx);
console.log('chars after:', JSON.stringify(post.slice(pbIdx, pbIdx + 60)));

// Check if essence is in CSS only
const allEssence = [];
let idx = 0;
while ((idx = post.indexOf('en-essence', idx)) !== -1) {
  allEssence.push(idx);
  idx++;
}
console.log('All en-essence positions:', allEssence);
console.log('Contexts:');
allEssence.forEach(pos => {
  console.log(' At', pos, ':', JSON.stringify(post.slice(pos - 5, pos + 50)));
});
