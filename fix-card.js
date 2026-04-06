const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let content = fs.readFileSync(path, 'utf8');

const find = '    </div>\n  \n<!-- MEET THE DOCTOR -->';
const replace = '    <a href="./health-is-wealth.html" class="health-card">\n        <img src="../images/health-is-wealth-hero.png" alt="Health is Wealth" class="hc-thumb" loading="lazy">\n        <div class="hc-text">\n          <h3 class="hc-title">Health is Wealth</h3>\n          <p class="hc-desc">\u0928\u0947\u0915 \u0924\u0902\u0926\u0941\u0930\u0941\u0938\u094d\u0924\u0940 \u0932\u093e\u0916 \u0928\u093f\u092f\u093e\u092e\u0924 \u2014 \u0928\u093f\u0935\u0947\u0936 \u0915\u0930\u0947\u0902 \u0938\u094d\u0935\u093e\u0938\u094d\u0925\u094d\u092f \u092e\u0947\u0902</p>\n          <div class="hc-cta">\u092a\u0922\u093c\u0947\u0902 \u2192</div>\n        </div>\n      </a>\n    </div>\n  \n<!-- MEET THE DOCTOR -->';

if (content.includes(find)) {
  content = content.replace(find, replace);
  fs.writeFileSync(path, content, 'utf8');
  console.log('SUCCESS: replacement done');
} else {
  console.log('NOT FOUND: exact string not found, dumping context around MEET THE DOCTOR...');
  const idx = content.indexOf('MEET THE DOCTOR');
  if (idx !== -1) {
    console.log(JSON.stringify(content.substring(idx - 150, idx + 50)));
  }
}
