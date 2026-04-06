const fs = require('fs');
const filePath = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let c = fs.readFileSync(filePath, 'utf8');

// CHANGE 1a: Replace the MEET THE EXPERTS BANNER CSS block
const oldCSS = `/* MEET THE EXPERTS BANNER */
.meet-experts-banner{position:relative;min-height:380px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;background-image:url('../images/doctor-one-placeholder.jpg');background-size:cover;background-position:center 20%;}
.meet-experts-banner::before{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(8,4,2,0.78) 0%,rgba(8,4,2,0.38) 45%,rgba(8,4,2,0.80) 100%);}
.meb-caption-block{position:relative;z-index:2;margin:36px 60px 0;padding:20px 28px;border-left:3px solid var(--gold);background:linear-gradient(to right,rgba(184,135,58,0.12),transparent);backdrop-filter:blur(2px);}
.meb-caption-eyebrow{display:block;font-family:'Noto Sans Devanagari',sans-serif;font-size:10px;color:var(--gold);font-weight:600;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;}
.meb-caption{display:block;font-family:'Cormorant Garamond',serif;font-size:22px;color:rgba(255,255,255,0.95);font-style:italic;margin-bottom:4px;line-height:1.5;letter-spacing:0;}
.meb-caption-sub{display:block;font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--gold-light);font-style:italic;line-height:1.5;letter-spacing:0;}
.meb-title-block{position:relative;z-index:2;padding:0 60px 48px;text-align:center;}
.meb-title{font-family:'Cormorant Garamond',serif;font-size:72px;color:white;font-weight:700;display:block;text-shadow:0 4px 28px rgba(0,0,0,0.6);line-height:1;}
.meb-title-underline{display:block;width:80px;height:2px;background:linear-gradient(to right,transparent,var(--gold),transparent);margin:16px auto 0;}
@media(max-width:900px){.meb-caption-block{margin:24px 24px 0;}.meb-title-block{padding:0 24px 36px;}.meb-title{font-size:44px;}.meb-caption{font-size:17px;}.meb-caption-sub{font-size:15px;}}
@media(max-width:600px){.meb-title{font-size:34px;}.meb-caption{font-size:15px;}}`;

const newCSS = `/* MEET THE EXPERTS BANNER */
.meet-experts-banner{position:relative;min-height:380px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;background:linear-gradient(135deg,#0D0608 0%,#1A0A10 30%,#0A0D18 60%,#0D0608 100%);}
.meet-experts-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 40%,rgba(184,135,58,0.08) 0%,transparent 70%);}
.meet-experts-banner::after{content:'\u2695';position:absolute;right:8%;top:50%;transform:translateY(-50%);font-size:220px;color:rgba(184,135,58,0.06);line-height:1;pointer-events:none;}
.meb-caption-block{position:relative;z-index:2;margin:36px 60px 0;padding:20px 28px;border-left:3px solid var(--gold);background:linear-gradient(to right,rgba(184,135,58,0.10),transparent);}
.meb-caption-eyebrow{display:block;font-family:'Noto Sans Devanagari',sans-serif;font-size:10px;color:var(--gold);font-weight:600;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;}
.meb-caption{display:block;font-family:'Cormorant Garamond',serif;font-size:22px;color:rgba(255,255,255,0.92);font-style:italic;margin-bottom:4px;line-height:1.5;letter-spacing:0;}
.meb-caption-sub{display:block;font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--gold-light);font-style:italic;line-height:1.5;letter-spacing:0;}
.meb-title-block{position:relative;z-index:2;padding:0 60px 48px;text-align:center;}
.meb-title{font-family:'Cormorant Garamond',serif;font-size:72px;color:white;font-weight:700;display:block;text-shadow:0 4px 28px rgba(0,0,0,0.6);line-height:1;}
.meb-title-underline{display:block;width:80px;height:2px;background:linear-gradient(to right,transparent,var(--gold),transparent);margin:16px auto 0;}
@media(max-width:900px){.meet-experts-banner::after{font-size:140px;}.meb-caption-block{margin:24px 24px 0;}.meb-title-block{padding:0 24px 36px;}.meb-title{font-size:44px;}.meb-caption{font-size:17px;}.meb-caption-sub{font-size:15px;}}
@media(max-width:600px){.meet-experts-banner::after{display:none;}.meb-title{font-size:34px;}.meb-caption{font-size:15px;}}`;

if (!c.includes(oldCSS)) {
  console.log('ERROR: Old CSS block not found exactly');
  process.exit(1);
}
c = c.replace(oldCSS, newCSS);
console.log('CSS block replaced OK');

// CHANGE 1b: Remove inline style from meet-experts-banner div if present
if (c.match(/<div class="meet-experts-banner" style="/)) {
  c = c.replace(/<div class="meet-experts-banner" style="[^"]*">/g, '<div class="meet-experts-banner">');
  console.log('Inline style removed from div');
} else {
  console.log('No inline style on banner div (nothing to remove)');
}

// CHANGE 2: Replace meet-doctor-heading content
const oldHeading = `  <div class="meet-doctor-heading">
    <span class="mds-title">Meet the Doctor</span>
    <span class="mds-subtitle">\u0921\u093c\u0949\u0915\u094d\u091f\u0930 \u0915\u0940 \u091c\u093c\u0941\u092c\u093e\u0928\u0940 \u2014 \u0935\u093f\u0936\u0947\u0937\u091c\u094d\u091e\u094b\u0902 \u0938\u0947 \u092e\u093f\u0932\u093f\u090f</span>
  </div>`;

const newHeading = `  <div class="meet-doctor-heading">
    <span class="mds-title">\u0921\u093c\u0949\u0915\u094d\u091f\u0930 \u0915\u0940 \u091c\u093c\u0941\u092c\u093e\u0928\u0940</span>
    <span class="mds-subtitle">\u0935\u093f\u0936\u0947\u0937\u091c\u094d\u091e\u094b\u0902 \u0938\u0947 \u0938\u0940\u0927\u0940 \u092c\u093e\u0924 \u2014 \u0938\u094d\u0935\u093e\u0938\u094d\u0925\u094d\u092f, \u0926\u0947\u0916\u092d\u093e\u0932 \u0914\u0930 \u091c\u0940\u0935\u0928</span>
  </div>`;

if (!c.includes(oldHeading)) {
  console.log('ERROR: Old heading block not found exactly');
  // Debug: show what we actually have around that area
  const idx = c.indexOf('meet-doctor-heading');
  if (idx >= 0) {
    console.log('Found meet-doctor-heading at index', idx);
    console.log('Context:', JSON.stringify(c.slice(idx, idx + 300)));
  }
  process.exit(1);
}
c = c.replace(oldHeading, newHeading);
console.log('Meet doctor heading replaced OK');

fs.writeFileSync(filePath, c, 'utf8');
console.log('File written successfully');
