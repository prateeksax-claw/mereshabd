const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let c = fs.readFileSync(path, 'utf8');

// Remove the health-is-wealth rm-card from "और पढ़ें" section
const rmCard = `      <a href="health-is-wealth.html" class="rm-card">
        <div class="rm-card-bg" style="background:linear-gradient(155deg,#0A2010 0%,#143020 50%,#071508 100%)"></div>
        <div class="rm-card-overlay"></div>
        <div class="rm-card-art">स्व</div>
        <div class="rm-card-inner">
          <span class="rm-card-cat">लेख</span>
          <div class="rm-card-title">Health is Wealth, So Invest Wisely</div>
          <div class="rm-card-excerpt">स्वास्थ्य ही असली दौलत है — समझदारी से निवेश करें अपने जीवन में।</div>
        </div>
      </a>`;

if (c.includes('health-is-wealth.html')) {
  // Find and remove the rm-card block
  const start = c.indexOf('<a href="health-is-wealth.html" class="rm-card">');
  const end = c.indexOf('</a>', start) + 4;
  c = c.substring(0, start) + c.substring(end);
  console.log('rm-card removed:', !c.includes('health-is-wealth.html'));
} else {
  console.log('Card not found');
}

const hindi = (c.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Hindi chars:', hindi);

if (hindi > 150) {
  fs.writeFileSync(path, c, 'utf8');
  console.log('File saved OK');
} else {
  console.log('ERROR: Hindi too low, not saving');
}
