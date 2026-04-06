const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let c = fs.readFileSync(path, 'utf8');

// Find the comment start
const commentStart = c.indexOf('<!-- MEET THE DOCTOR -->');
console.log('comment at:', commentStart);

// Find meet-doctor-section
const meetDoctorStr = '<div class="meet-doctor-section">';
const meetDoctorStart = c.indexOf(meetDoctorStr);
console.log('meet-doctor-section at:', meetDoctorStart);

// Show what the block looks like
const blockToReplace = c.slice(commentStart, meetDoctorStart);
console.log('Block length:', blockToReplace.length);
console.log('Block start:', JSON.stringify(blockToReplace.slice(0, 100)));
console.log('Block end:', JSON.stringify(blockToReplace.slice(-100)));

// New block (replace from comment up to but NOT including meet-doctor-section)
const newBlock = `<!-- MEET THE DOCTOR -->
<div class="invest-banner">
  <div class="invest-banner-bg"></div>
  <div class="invest-banner-overlay"></div>
  <div class="invest-banner-content">
    <span class="invest-eyebrow">✦ A Vision for Tomorrow</span>
    <span class="invest-title"><em>"Invest in Women's Health and Education"</em></span>
    <span class="invest-subtitle">Is the key to build strong families</span>
    <span class="invest-line"></span>
  </div>
</div>
`;

c = c.slice(0, commentStart) + newBlock + c.slice(meetDoctorStart);
console.log('New length:', c.length);

fs.writeFileSync(path, c, 'utf8');
console.log('CHANGE 3 written successfully');
