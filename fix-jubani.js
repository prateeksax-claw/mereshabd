const fs = require('fs');
const path = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let c = fs.readFileSync(path, 'utf8');

// CHANGE 1: Remove Health is Wealth card
c = c.replace(/<a href="\.\/health-is-wealth\.html" class="health-card">[\s\S]*?<\/a>/m, '');
console.log('HIW card removed:', !c.includes('health-is-wealth-hero.png'));

// CHANGE 2: Add invest caption banner before MEET THE DOCTOR
const insertPoint = '    </div>\n  \n<!-- MEET THE DOCTOR -->';
const newHTML = `    </div>

<div class="invest-caption-banner">
  <div class="icb-overlay"></div>
  <div class="icb-content">
    <span class="icb-eyebrow">✦ A Vision for Tomorrow</span>
    <span class="icb-title">"Invest in Women's Health and Education —</span>
    <span class="icb-subtitle">Is the key to build strong families"</span>
    <span class="icb-line"></span>
  </div>
</div>
  
<!-- MEET THE DOCTOR -->`;

if (c.includes(insertPoint)) {
  c = c.replace(insertPoint, newHTML);
  console.log('Banner inserted: true');
} else {
  // try alternate whitespace
  const alt = '    </div>\n\n<!-- MEET THE DOCTOR -->';
  if (c.includes(alt)) {
    c = c.replace(alt, newHTML.replace('    </div>\n  \n', '    </div>\n\n'));
    console.log('Banner inserted (alt): true');
  } else {
    console.log('Insert point NOT FOUND — trying broader search');
    const idx = c.indexOf('<!-- MEET THE DOCTOR -->');
    console.log('MEET THE DOCTOR at:', idx);
    console.log('Context:', JSON.stringify(c.substring(idx-50, idx+30)));
  }
}

// CHANGE 3: Add CSS before </style>
const css = `
/* INVEST CAPTION BANNER */
.invest-caption-banner{position:relative;padding:64px 80px;text-align:center;background:linear-gradient(135deg,#0a0612 0%,#150a20 40%,#0a1020 70%,#0a0612 100%);overflow:hidden;}
.invest-caption-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(184,135,58,0.10) 0%,transparent 70%);}
.icb-overlay{position:absolute;inset:0;pointer-events:none;}
.icb-content{position:relative;z-index:2;max-width:800px;margin:0 auto;}
.icb-eyebrow{display:block;font-family:'Noto Sans Devanagari',sans-serif;font-size:11px;color:var(--gold);font-weight:600;text-transform:uppercase;letter-spacing:3px;margin-bottom:20px;}
.icb-title{display:block;font-family:'Cormorant Garamond',serif;font-size:44px;color:white;font-weight:700;font-style:italic;line-height:1.25;margin-bottom:8px;text-shadow:0 3px 20px rgba(0,0,0,0.4);}
.icb-subtitle{display:block;font-family:'Cormorant Garamond',serif;font-size:38px;color:var(--gold-light);font-weight:700;font-style:italic;line-height:1.4;}
.icb-line{display:block;width:80px;height:2px;background:linear-gradient(to right,transparent,var(--gold),transparent);margin:24px auto 0;}
@media(max-width:900px){.invest-caption-banner{padding:48px 32px;}.icb-title{font-size:28px;}.icb-subtitle{font-size:24px;}}
@media(max-width:600px){.invest-caption-banner{padding:40px 20px;}.icb-title{font-size:22px;}.icb-subtitle{font-size:18px;}}
`;
c = c.replace('</style>', css + '</style>');
console.log('CSS added:', c.includes('invest-caption-banner'));

// Verify Hindi
const hindi = (c.match(/[\u0900-\u097F]/g)||[]).length;
console.log('Hindi chars:', hindi);

if (hindi > 150) {
  fs.writeFileSync(path, c, 'utf8');
  console.log('File saved OK');
} else {
  console.log('ERROR: Hindi count too low, NOT saving');
}
