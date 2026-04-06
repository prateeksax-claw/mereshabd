const fs = require('fs');
let c = fs.readFileSync('C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html', 'utf8');

// 1. CSS to insert before </style>
const css = `/* MEET THE DOCTOR */
.meet-doctor-section{padding:60px 80px;background:var(--cream);margin-top:40px}
.meet-doctor-heading{text-align:center;margin-bottom:40px}
.mds-title{font-family:'Cormorant Garamond',serif;font-size:42px;color:var(--ink);font-weight:700;display:block;margin-bottom:8px}
.mds-subtitle{font-family:'Noto Sans Devanagari',sans-serif;font-size:16px;color:var(--dust);display:block}
.meet-doctor-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.md-card{border-radius:12px;overflow:hidden;text-decoration:none;display:flex;flex-direction:column;box-shadow:0 4px 20px rgba(0,0,0,0.10);transition:transform 0.3s,box-shadow 0.3s;background:white}
.md-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,0.16)}
.md-card-img{min-height:260px;position:relative;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px}
.md-live-badge{position:absolute;top:16px;right:16px;background:var(--gold);color:white;font-size:11px;font-family:'Cormorant Garamond',serif;font-weight:700;padding:4px 12px;border-radius:20px}
.md-icon{font-size:56px}
.md-speciality{font-family:'Noto Sans Devanagari',sans-serif;font-size:12px;color:rgba(255,255,255,0.9);font-weight:700;letter-spacing:1px;text-transform:uppercase;background:rgba(0,0,0,0.2);padding:4px 12px;border-radius:20px}
.md-card-body{padding:20px 24px 24px}
.md-name{font-family:'Tiro Devanagari Hindi',serif;font-size:22px;color:var(--ink);margin-bottom:4px}
.md-month{font-family:'Cormorant Garamond',serif;font-size:13px;color:var(--dust);font-style:italic;margin-bottom:16px}
.md-cta{font-family:'Cormorant Garamond',serif;font-size:16px;color:var(--red);font-style:italic;font-weight:700}
.md-cta-soon{font-family:'Noto Sans Devanagari',sans-serif;font-size:13px;color:var(--dust);opacity:0.5}
.md-coming{position:absolute;bottom:16px;font-family:'Noto Sans Devanagari',sans-serif;font-size:12px;color:rgba(255,255,255,0.6)}
@media(max-width:900px){.meet-doctor-section{padding:40px 24px}.meet-doctor-grid{grid-template-columns:1fr 1fr;gap:16px}}
@media(max-width:600px){.meet-doctor-grid{grid-template-columns:1fr}}
`;

// 2. HTML to insert before the section-wrap closing </div>
const html = `
<!-- MEET THE DOCTOR -->
<div class="meet-doctor-section">
  <div class="meet-doctor-heading">
    <span class="mds-title">Meet the Doctor</span>
    <span class="mds-subtitle">\u0921\u0949\u0915\u094d\u091f\u0930 \u0915\u0940 \u091c\u093c\u0941\u092c\u093e\u0928\u0940 \u2014 \u0935\u093f\u0936\u0947\u0937\u091c\u094d\u091e\u094b\u0902 \u0938\u0947 \u092e\u093f\u0932\u093f\u090f</span>
  </div>
  <div class="meet-doctor-grid">
    <a href="#meet-doctor-gynec" class="md-card">
      <div class="md-card-img" style="background:linear-gradient(135deg,#6B2D6B 0%,#9B4A9B 100%)">
        <span class="md-live-badge">\u2746 LIVE</span>
        <div class="md-icon">\uD83E\uDE7A</div>
        <span class="md-speciality">\u0938\u094d\u0924\u094d\u0930\u0940 \u0930\u094b\u0917 \u0935\u093f\u0936\u0947\u0937\u091c\u094d\u091e</span>
      </div>
      <div class="md-card-body">
        <div class="md-name">\u0921\u0949. [\u0928\u093e\u092e \u0936\u0940\u0918\u094d\u0930]</div>
        <div class="md-month">\u0905\u092a\u094d\u0930\u0948\u0932 \u0968\u0966\u0968\u0969</div>
        <div class="md-cta">Interview \u092a\u0922\u093c\u0947\u0902 \u2192</div>
      </div>
    </a>
    <a href="#" class="md-card" style="pointer-events:none;opacity:0.85">
      <div class="md-card-img" style="background:linear-gradient(135deg,#0d4f3c 0%,#1a7a5e 100%)">
        <div class="md-icon">\u2764\uFE0F</div>
        <span class="md-speciality">\u0939\u0943\u0926\u092f \u0930\u094b\u0917 \u0935\u093f\u0936\u0947\u0937\u091c\u094d\u091e</span>
        <div class="md-coming">\u091c\u0932\u094d\u0926 \u0906 \u0930\u0939\u093e \u0939\u0948...</div>
      </div>
      <div class="md-card-body">
        <div class="md-name">\u0921\u0949. [\u0928\u093e\u092e \u0936\u0940\u0918\u094d\u0930]</div>
        <div class="md-month">\u092e\u0908 \u0968\u0966\u0968\u0969</div>
        <div class="md-cta-soon">\u0936\u0940\u0918\u094d\u0930 \u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924</div>
      </div>
    </a>
    <a href="#" class="md-card" style="pointer-events:none;opacity:0.85">
      <div class="md-card-img" style="background:linear-gradient(135deg,#1a3a6b 0%,#2d5fa8 100%)">
        <div class="md-icon">\uD83D\uDC41\uFE0F</div>
        <span class="md-speciality">\u0928\u0947\u0924\u094d\u0930 \u0935\u093f\u0936\u0947\u0937\u091c\u094d\u091e</span>
        <div class="md-coming">\u091c\u0932\u094d\u0926 \u0906 \u0930\u0939\u093e \u0939\u0948...</div>
      </div>
      <div class="md-card-body">
        <div class="md-name">\u0921\u0949. [\u0928\u093e\u092e \u0936\u0940\u0918\u094d\u0930]</div>
        <div class="md-month">\u091c\u0942\u0928 \u0968\u0966\u0968\u0969</div>
        <div class="md-cta-soon">\u0936\u0940\u0918\u094d\u0930 \u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924</div>
      </div>
    </a>
  </div>
</div>
`;

// Insert CSS before last </style>
const styleIdx = c.lastIndexOf('</style>');
c = c.slice(0, styleIdx) + css + '\n' + c.slice(styleIdx);
console.log('CSS inserted at index:', styleIdx);

// Insert HTML before the section-wrap closing </div>
// The pattern is: health-grid closes, then inner div, then section-wrap </div>
// Followed by blank lines and <!-- AND MORE SECTION -->
const insertMarker = '</div>\n\n\n<!-- AND MORE SECTION -->';
const markerIdx = c.indexOf(insertMarker);
if (markerIdx === -1) {
  console.error('Marker not found!');
  process.exit(1);
}
console.log('Marker found at:', markerIdx);

// Insert the HTML just before the section-wrap closing </div>
// The structure before marker is: \n    </div>\n  </div>\n</div>
// We want to insert BEFORE the last </div> (which closes section-wrap)
// Let's find that closing </div> right before the marker
const beforeMarker = c.slice(0, markerIdx);
const lastDivClose = beforeMarker.lastIndexOf('</div>');
console.log('section-wrap closing </div> at:', lastDivClose);
console.log('Context:', JSON.stringify(c.slice(lastDivClose - 20, lastDivClose + 10)));

c = c.slice(0, lastDivClose) + html + '\n' + c.slice(lastDivClose);

fs.writeFileSync('C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html', c, 'utf8');
console.log('Done! New file length:', c.length);

// Verify Devanagari is intact
const devanagariCheck = c.includes('\u0921\u0949\u0915\u094d\u091f\u0930');
console.log('Devanagari intact:', devanagariCheck);
