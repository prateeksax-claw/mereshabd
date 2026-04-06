const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let c = fs.readFileSync(path, 'utf8');

// CHANGE 1: Remove HIW health card
const hiwCard = '<a href="./health-is-wealth.html" class="health-card">\r\n        <img src="../images/health-is-wealth-hero.png" alt="Health is Wealth" class="hc-thumb" loading="lazy">\r\n        <div class="hc-text">\r\n          <h3 class="hc-title">Health is Wealth</h3>\r\n          <p class="hc-desc">\u0928\u0947\u0915 \u0924\u0902\u0926\u0941\u0930\u0941\u0938\u094d\u0924\u0940 \u0932\u093e\u0916 \u0928\u093f\u092f\u093e\u092e\u0924 \u2014 \u0928\u093f\u0935\u0947\u0936 \u0915\u0930\u0947\u0902 \u0938\u094d\u0935\u093e\u0938\u094d\u0925\u094d\u092f \u092e\u0947\u0902</p>\r\n          <div class="hc-cta">\u092a\u0922\u093c\u0947\u0902 \u2192</div>\r\n        </div>\r\n      </a>';
if (!c.includes(hiwCard)) {
  console.error('ERROR: HIW card not found - trying without \\r');
  // Try LF only
  const hiwCardLF = hiwCard.replace(/\r\n/g, '\n');
  if (!c.includes(hiwCardLF)) {
    console.error('ERROR: HIW card not found with LF either. Dumping nearby text:');
    const idx = c.indexOf('health-is-wealth-hero.png');
    console.error(JSON.stringify(c.slice(idx-100, idx+400)));
    process.exit(1);
  }
  c = c.replace(hiwCardLF, '');
  console.log('Change 1 done (LF). HIW removed:', !c.includes('health-is-wealth-hero.png'));
} else {
  c = c.replace(hiwCard, '');
  console.log('Change 1 done (CRLF). HIW removed:', !c.includes('health-is-wealth-hero.png'));
}

// CHANGE 2: Add caption banner before MEET THE DOCTOR comment
const oldSection = '    </div>\r\n  \r\n<!-- MEET THE DOCTOR -->';
const newSection = '    </div>\r\n\r\n<div class="invest-caption-banner">\r\n  <div class="icb-overlay"></div>\r\n  <div class="icb-content">\r\n    <span class="icb-eyebrow">\u2726 A Vision for Tomorrow</span>\r\n    <span class="icb-title">"Invest in Women\'s Health and Education"</span>\r\n    <span class="icb-subtitle">Is the key to build strong families</span>\r\n    <span class="icb-line"></span>\r\n  </div>\r\n</div>\r\n  \r\n<!-- MEET THE DOCTOR -->';

if (!c.includes(oldSection)) {
  console.error('ERROR: Section target (CRLF) not found. Trying LF...');
  const oldSectionLF = oldSection.replace(/\r\n/g, '\n');
  const newSectionLF = newSection.replace(/\r\n/g, '\n');
  if (!c.includes(oldSectionLF)) {
    console.error('ERROR: Section target not found with LF either.');
    // Show context around MEET THE DOCTOR
    const idx = c.indexOf('<!-- MEET THE DOCTOR -->');
    console.error(JSON.stringify(c.slice(idx-150, idx+50)));
    process.exit(1);
  }
  c = c.replace(oldSectionLF, newSectionLF);
  console.log('Change 2 done (LF). Caption banner present:', c.includes('invest-caption-banner'));
} else {
  c = c.replace(oldSection, newSection);
  console.log('Change 2 done (CRLF). Caption banner present:', c.includes('invest-caption-banner'));
}

// CHANGE 3: Add CSS before </style>
const cssToAdd = `\r\n/* INVEST CAPTION BANNER */\r\n.invest-caption-banner{position:relative;padding:64px 80px;text-align:center;background:linear-gradient(135deg,#0a0612 0%,#150a20 40%,#0a1020 70%,#0a0612 100%);overflow:hidden;}\r\n.invest-caption-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(184,135,58,0.10) 0%,transparent 70%);}\r\n.icb-overlay{position:absolute;inset:0;pointer-events:none;}\r\n.icb-content{position:relative;z-index:2;max-width:800px;margin:0 auto;}\r\n.icb-eyebrow{display:block;font-family:'Noto Sans Devanagari',sans-serif;font-size:11px;color:var(--gold);font-weight:600;text-transform:uppercase;letter-spacing:3px;margin-bottom:20px;}\r\n.icb-title{display:block;font-family:'Cormorant Garamond',serif;font-size:44px;color:white;font-weight:700;font-style:italic;line-height:1.25;margin-bottom:16px;text-shadow:0 3px 20px rgba(0,0,0,0.4);}\r\n.icb-subtitle{display:block;font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--gold-light);font-style:italic;line-height:1.5;}\r\n.icb-line{display:block;width:80px;height:2px;background:linear-gradient(to right,transparent,var(--gold),transparent);margin:24px auto 0;}\r\n@media(max-width:900px){.invest-caption-banner{padding:48px 32px;}.icb-title{font-size:32px;}.icb-subtitle{font-size:19px;}}\r\n@media(max-width:600px){.invest-caption-banner{padding:40px 20px;}.icb-title{font-size:26px;}.icb-subtitle{font-size:16px;}}\r\n`;

// Find last </style> occurrence
const lastStyleClose = c.lastIndexOf('</style>');
if (lastStyleClose === -1) {
  console.error('ERROR: </style> not found');
  process.exit(1);
}
c = c.slice(0, lastStyleClose) + cssToAdd + c.slice(lastStyleClose);
console.log('Change 3 done. CSS added before </style>. invest-caption-banner CSS present:', c.includes('.invest-caption-banner{'));

// Write back
fs.writeFileSync(path, c, 'utf8');
console.log('File written successfully.');
console.log('File size:', c.length);
