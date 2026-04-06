const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let c = fs.readFileSync(path, 'utf8');

// Insert Health is Wealth card right after स्वास्थ्य लेख card closing </a>
const insertAfter = `        </div>
      </a>
    
    </div>

<div class="invest-caption-banner">`;

const newCard = `        </div>
      </a>
<a href="./health-is-wealth.html" class="health-card">
        <img src="../images/health-is-wealth-hero.png" alt="Health is Wealth" class="hc-thumb" loading="lazy">
        <div class="hc-text">
          <h3 class="hc-title">Health is Wealth</h3>
          <p class="hc-desc">नेक तंदुरुस्ती लाख नियामत — निवेश करें स्वास्थ्य में</p>
          <div class="hc-cta">पढ़ें →</div>
        </div>
      </a>
    
    </div>

<div class="invest-caption-banner">`;

if (c.includes(insertAfter)) {
  c = c.replace(insertAfter, newCard);
  console.log('HIW card added to health-grid:', c.includes('health-is-wealth-hero.png'));
} else {
  console.log('Insert point not found, checking...');
  const idx = c.indexOf('invest-caption-banner');
  console.log('Context:', c.substring(idx-200, idx+50));
}

const hindi = (c.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Hindi chars:', hindi);

if (hindi > 150) {
  fs.writeFileSync(path, c, 'utf8');
  console.log('Saved OK');
}
