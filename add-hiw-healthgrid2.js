const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let c = fs.readFileSync(path, 'utf8');

// Find the swasthya-lekh card closing </a> and insert after it
const swasthyaEnd = c.indexOf('swasthya-lekh');
// Find the closing </a> after this point
const closingA = c.indexOf('</a>', swasthyaEnd);
const insertPos = closingA + 4; // after </a>

const newCard = `
<a href="./health-is-wealth.html" class="health-card">
        <img src="../images/health-is-wealth-hero.png" alt="Health is Wealth" class="hc-thumb" loading="lazy">
        <div class="hc-text">
          <h3 class="hc-title">Health is Wealth</h3>
          <p class="hc-desc">नेक तंदुरुस्ती लाख नियामत — निवेश करें स्वास्थ्य में</p>
          <div class="hc-cta">पढ़ें →</div>
        </div>
      </a>`;

c = c.substring(0, insertPos) + newCard + c.substring(insertPos);
console.log('HIW card in health-grid:', c.includes('health-is-wealth-hero.png'));

const hindi = (c.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Hindi chars:', hindi);

if (hindi > 150) {
  fs.writeFileSync(path, c, 'utf8');
  console.log('Saved OK');
}
