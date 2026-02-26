const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'site', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// ─────────────────────────────────────────────────────────────────────────────
// FIX 1: poem-section background image
// ─────────────────────────────────────────────────────────────────────────────
html = html.replace(
  /\/\* POEM SECTION[^*]*\*\/\s*\.poem-section\{[^}]+\}/,
  `/* POEM SECTION — full-width with navvarsh background image */
.poem-section{background:linear-gradient(rgba(0,0,0,0.55), rgba(20,8,4,0.62)), url('images/navvarsh-bg.jpg') center 40%/cover no-repeat;display:block;min-height:520px;overflow:hidden;position:relative}`
);

// ─────────────────────────────────────────────────────────────────────────────
// FIX 3: English font size/weight/color improvements (add global rule + update existing classes)
// ─────────────────────────────────────────────────────────────────────────────

// Update existing English element styles
html = html.replace(
  '.nav-en{font-size:9px;display:block;color:rgba(26,16,8,0.3);font-family:monospace;letter-spacing:1px;text-transform:uppercase;line-height:1;margin-top:1px}',
  '.nav-en{font-size:10px;display:block;color:rgba(26,16,8,0.5);font-family:monospace;font-weight:500;letter-spacing:1px;text-transform:uppercase;line-height:1;margin-top:1px}'
);
html = html.replace(
  '.nav-links a:hover .nav-en{color:var(--red)}',
  '.nav-links a:hover .nav-en{color:var(--red)} nav.scrolled .nav-en{color:rgba(26,16,8,0.45)}'
);

html = html.replace(
  '.rs-en-label{display:block;font-family:monospace;font-size:10px;color:rgba(255,255,255,0.4);letter-spacing:1px;text-transform:uppercase;margin-top:4px}',
  '.rs-en-label{display:block;font-family:"Cormorant Garamond",serif;font-size:14px;color:rgba(26,16,8,0.55);font-weight:500;font-style:italic;letter-spacing:0;text-transform:none;margin-top:4px}'
);

html = html.replace(
  '.mi-en-excerpt{font-family:\'Cormorant Garamond\',serif;font-size:13px;color:rgba(255,255,255,0.38);font-style:italic;margin:6px 0 0;line-height:1.4}',
  '.mi-en-excerpt{font-family:\'Cormorant Garamond\',serif;font-size:14px;color:rgba(255,255,255,0.7);font-style:italic;font-weight:500;margin:6px 0 0;line-height:1.6}'
);

html = html.replace(
  '.poem-en-label{font-family:\'Cormorant Garamond\',serif;font-size:13px;color:rgba(255,255,255,0.42);font-style:italic;margin-bottom:20px;margin-top:-20px}',
  '.poem-en-label{font-family:\'Cormorant Garamond\',serif;font-size:15px;color:rgba(255,255,255,0.72);font-style:italic;font-weight:500;margin-bottom:20px;margin-top:-20px;line-height:1.6}'
);

html = html.replace(
  '.poem-en-title{font-family:\'Cormorant Garamond\',serif;font-size:13px;color:rgba(255,255,255,0.38);font-style:italic;margin-top:-32px;margin-bottom:36px}',
  '.poem-en-title{font-family:\'Cormorant Garamond\',serif;font-size:15px;color:rgba(255,255,255,0.7);font-style:italic;font-weight:500;margin-top:-32px;margin-bottom:36px;line-height:1.6}'
);

html = html.replace(
  '.section-en-sub{font-family:\'Cormorant Garamond\',serif;font-size:14px;color:rgba(26,16,8,0.42);font-style:italic;margin-top:-16px;margin-bottom:20px}',
  '.section-en-sub{font-family:\'Cormorant Garamond\',serif;font-size:15px;color:rgba(26,16,8,0.62);font-style:italic;font-weight:500;margin-top:-16px;margin-bottom:20px;line-height:1.6}'
);

html = html.replace(
  '.mag-en-sub{font-family:\'Cormorant Garamond\',serif;font-size:14px;color:rgba(26,16,8,0.42);font-style:italic;margin-top:4px}',
  '.mag-en-sub{font-family:\'Cormorant Garamond\',serif;font-size:15px;color:rgba(26,16,8,0.62);font-style:italic;font-weight:500;margin-top:4px;line-height:1.6}'
);

// Update hero-name-en and hero-en-sub
html = html.replace(
  '.hero-name-en{font-family:\'Cormorant Garamond\',serif;font-size:20px;color:rgba(255,255,255,0.38);letter-spacing:6px;font-style:italic;margin-bottom:28px;font-weight:300}',
  '.hero-name-en{font-family:\'Cormorant Garamond\',serif;font-size:20px;color:rgba(255,255,255,0.65);letter-spacing:6px;font-style:italic;margin-bottom:28px;font-weight:500}'
);
html = html.replace(
  '.hero-en-sub{font-family:\'Cormorant Garamond\',serif;font-size:14px;color:rgba(255,255,255,0.42);font-style:italic;margin-bottom:28px;margin-top:-20px}',
  '.hero-en-sub{font-family:\'Cormorant Garamond\',serif;font-size:15px;color:rgba(255,255,255,0.72);font-style:italic;font-weight:500;margin-bottom:28px;margin-top:-20px;line-height:1.6}'
);

// Update pattr-text (attribution text)
html = html.replace(
  '.pattr-text{font-family:\'Noto Sans Devanagari\',sans-serif;font-size:14px;color:rgba(255,255,255,0.4);font-weight:300}',
  '.pattr-text{font-family:\'Noto Sans Devanagari\',sans-serif;font-size:14px;color:rgba(255,255,255,0.65);font-weight:400}'
);

// Add global English rule + new classes just before closing </style>
const globalEnRule = `
/* GLOBAL English translation elements — bolder and more visible */
[class*="-en"], [class*="en-"] { font-size: 14px; font-weight: 500; opacity: 0.72; }

/* Poem stanza English translations */
.poem-stanza-en{font-family:'Cormorant Garamond',serif;font-size:15px;color:rgba(255,255,255,0.7);font-style:italic;font-weight:500;display:block;margin-top:8px;margin-bottom:20px;padding-left:4px;line-height:1.7;opacity:1}

/* Author section English */
.aq-en{font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(255,255,255,0.65);font-style:italic;font-weight:500;display:block;margin-top:8px;line-height:1.6;margin-bottom:16px}
.ar-eyebrow-en{font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(26,16,8,0.6);font-style:italic;font-weight:500;display:block;margin-top:-20px;margin-bottom:20px;line-height:1.6}
.ar-bio-en{font-family:'Cormorant Garamond',serif;font-size:15px;color:rgba(26,16,8,0.6);font-style:italic;font-weight:500;margin-bottom:28px;margin-top:-32px;line-height:1.7}
.cred-sub-en{font-family:'Cormorant Garamond',serif;font-size:12px;color:rgba(26,16,8,0.5);font-style:italic;font-weight:500;margin-top:2px;display:block}

/* Footer English */
.fcol-label-en{font-family:'Cormorant Garamond',serif;font-size:12px;color:rgba(255,255,255,0.45);font-style:italic;font-weight:500;display:block;margin-top:-16px;margin-bottom:14px;line-height:1.5}
.fbrand-en{font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(255,255,255,0.5);font-style:italic;font-weight:500;margin-bottom:20px;margin-top:-16px;line-height:1.6}
.footer-copy-en{font-size:10px;color:rgba(255,255,255,0.25);font-family:monospace;font-weight:500;letter-spacing:0.5px}

/* rs-card English desc */
.rs-en-desc{font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(26,16,8,0.55);font-style:italic;font-weight:500;margin-top:-4px;line-height:1.6}

/* Quote interlude English */
.qi-en{font-family:'Cormorant Garamond',serif;font-size:16px;color:rgba(255,255,255,0.7);font-style:italic;font-weight:500;display:block;margin-top:16px;line-height:1.7;max-width:700px;margin-left:auto;margin-right:auto}

/* Marquee English */
.marquee-en{font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(255,255,255,0.55);font-style:italic;font-weight:500;margin-left:4px}

/* Intro section English */
.intro-tag-en{font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(26,16,8,0.55);font-style:italic;font-weight:500;display:block;margin-top:-14px;margin-bottom:18px}
.intro-text-en{font-family:'Cormorant Garamond',serif;font-size:15px;color:rgba(26,16,8,0.6);font-style:italic;font-weight:500;margin-bottom:24px;margin-top:-24px;max-width:540px;line-height:1.8}

/* Hero badges English */
.badge-en{font-family:'Cormorant Garamond',serif;font-size:11px;color:rgba(255,255,255,0.55);font-style:italic;font-weight:500;margin-left:4px}

/* Nav CTA English */
.nav-cta-en{font-size:10px;display:block;color:rgba(255,255,255,0.65);font-family:monospace;font-weight:500;letter-spacing:1px;text-transform:uppercase;line-height:1;margin-top:1px}
`;

html = html.replace('</style>', globalEnRule + '\n</style>');

// ─────────────────────────────────────────────────────────────────────────────
// FIX 2: Add English translations to ALL sections
// ─────────────────────────────────────────────────────────────────────────────

// -- NAV: CTA button English
html = html.replace(
  '<a href="archive.html" class="nav-cta">रचनाएं देखें</a>',
  '<a href="archive.html" class="nav-cta">रचनाएं देखें<span class="nav-cta-en">Read Works</span></a>'
);

// -- HERO: overline English
html = html.replace(
  '<div class="hero-overline">अबू धाबी से हिंदी की आवाज़</div>',
  '<div class="hero-overline">अबू धाबी से हिंदी की आवाज़ <span style="font-family:\'Cormorant Garamond\',serif;font-size:12px;font-style:italic;color:rgba(255,255,255,0.55);font-weight:500;margin-left:6px">Hindi voice from Abu Dhabi</span></div>'
);

// -- HERO: desc English subtitle
html = html.replace(
  '<p class="hero-desc">नवभारत टाइम्स की पत्रकार · PIB-मान्यता प्राप्त · जयोति संपादक</p>',
  '<p class="hero-desc">नवभारत टाइम्स की पत्रकार · PIB-मान्यता प्राप्त · जयोति संपादक</p>\n    <p style="font-family:\'Cormorant Garamond\',serif;font-size:14px;color:rgba(255,255,255,0.62);font-style:italic;font-weight:500;margin-top:-10px;margin-bottom:20px;line-height:1.6">Journalist · PIB Accredited · Jyoti Magazine Editor</p>'
);

// -- HERO: badges English  
html = html.replace(
  '<span class="badge">कवयित्री</span>',
  '<span class="badge">कवयित्री <span class="badge-en">Poet</span></span>'
);
html = html.replace(
  '<span class="badge">लेखिका</span>',
  '<span class="badge">लेखिका <span class="badge-en">Author</span></span>'
);
html = html.replace(
  '<span class="badge">पत्रकार</span>',
  '<span class="badge">पत्रकार <span class="badge-en">Journalist</span></span>'
);

// -- HERO: CTA English
html = html.replace(
  '<a href="archive.html" class="hero-cta">रचनाएं पढ़ें</a>',
  '<a href="archive.html" class="hero-cta">रचनाएं पढ़ें <span style="font-family:\'Cormorant Garamond\',serif;font-size:14px;font-style:italic;color:rgba(255,255,255,0.6);font-weight:500;margin-left:4px">Read My Works →</span></a>'
);

// -- MARQUEE: add English after each item
html = html.replace(
  '<span class="marquee-item">कविता</span>\n    <span class="marquee-item">लेख</span>\n    <span class="marquee-item">संस्मरण</span>\n    <span class="marquee-item">प्रवासी मन</span>\n    <span class="marquee-item">विशेष</span>\n    <span class="marquee-item">कविता</span>\n    <span class="marquee-item">लेख</span>\n    <span class="marquee-item">संस्मरण</span>\n    <span class="marquee-item">प्रवासी मन</span>\n    <span class="marquee-item">विशेष</span>',
  `<span class="marquee-item">कविता <span class="marquee-en">Poetry</span></span>
    <span class="marquee-item">लेख <span class="marquee-en">Essays</span></span>
    <span class="marquee-item">संस्मरण <span class="marquee-en">Memoirs</span></span>
    <span class="marquee-item">प्रवासी मन <span class="marquee-en">Diaspora</span></span>
    <span class="marquee-item">विशेष <span class="marquee-en">Special</span></span>
    <span class="marquee-item">कविता <span class="marquee-en">Poetry</span></span>
    <span class="marquee-item">लेख <span class="marquee-en">Essays</span></span>
    <span class="marquee-item">संस्मरण <span class="marquee-en">Memoirs</span></span>
    <span class="marquee-item">प्रवासी मन <span class="marquee-en">Diaspora</span></span>
    <span class="marquee-item">विशेष <span class="marquee-en">Special</span></span>`
);

// -- POEM SECTION: poem label English — already exists (.poem-en-label "New Year · January 2026")
// Add English translations for each stanza
html = html.replace(
  `      <span class="pline xl">नववर्ष भरा रहे</span>
      <span class="pline lg">अच्छे स्वास्थ्य से,</span>

      <span class="pgap"></span>
      <span class="pline md">सुख-समृद्धि दे दस्तक जीवन में,</span>
      <span class="pline md">जीवन ही तो है उत्सव, है अनमोल,</span>

      <span class="pgap"></span>
      <span class="pline lg">शब्द पिरोकर कुछ</span>
      <span class="pline xl">कहने-सुनने का…</span>

      <span class="pgap"></span>
      <span class="pline sm">शब्दों का मोल जीवन में जानें…</span>`,
  `      <span class="pline xl">नववर्ष भरा रहे</span>
      <span class="pline lg">अच्छे स्वास्थ्य से,</span>
      <span class="poem-stanza-en">"May the New Year be filled with good health…"</span>

      <span class="pgap"></span>
      <span class="pline md">सुख-समृद्धि दे दस्तक जीवन में,</span>
      <span class="pline md">जीवन ही तो है उत्सव, है अनमोल,</span>
      <span class="poem-stanza-en">"May prosperity knock on your door, for life itself is a celebration…"</span>

      <span class="pgap"></span>
      <span class="pline lg">शब्द पिरोकर कुछ</span>
      <span class="pline xl">कहने-सुनने का…</span>
      <span class="poem-stanza-en">"Stringing words together, to speak and to listen…"</span>

      <span class="pgap"></span>
      <span class="pline sm">शब्दों का मोल जीवन में जानें…</span>
      <span class="poem-stanza-en">"Know the value of words in your life…"</span>`
);

// -- POEM: attribution text English
html = html.replace(
  '<div class="pattr-text">गीतांजलि सक्सेना, जनवरी २०२६</div>',
  '<div class="pattr-text">गीतांजलि सक्सेना, जनवरी २०२६<br><span style="font-family:\'Cormorant Garamond\',serif;font-size:13px;font-style:italic;color:rgba(255,255,255,0.55);font-weight:500">Gitanjali Saxena, January 2026</span></div>'
);

// -- POEM: "पूरी कविता →" link English
html = html.replace(
  '<a href="posts/navvarsh-2025.html" class="pread">पूरी कविता →</a>',
  '<a href="posts/navvarsh-2025.html" class="pread" title="Read full poem">पूरी कविता → <span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;font-style:italic;font-weight:500">Full poem</span></a>'
);

// -- EDITORIAL INTRO: label-v English
html = html.replace(
  '<div class="intro-label-v">रचना संसार</div>',
  '<div class="intro-label-v">रचना संसार</div>\n    <div style="writing-mode:vertical-rl;font-family:\'Cormorant Garamond\',serif;font-size:9px;color:rgba(26,16,8,0.45);font-style:italic;font-weight:500;letter-spacing:0;margin-bottom:16px">Creative World</div>'
);

// -- EDITORIAL INTRO: tag English
html = html.replace(
  '<h2 class="intro-headline">शब्द ही हैं<br>मेरी <em>पहचान</em></h2>',
  '<h2 class="intro-headline">शब्द ही हैं<br>मेरी <em>पहचान</em></h2>'
);
// section-en-sub already exists: "Words are my identity — my gift to the world" ✓

// Add English below intro-text
html = html.replace(
  '<p class="intro-text">सिर्फ शब्दों से खिलवाड़ ही नहीं, माला में पिरोना भी है फ़ितरत। कभी भी न थमने वाला लेखन सिलसिला यूं ही जारी रहेगा हमेशा...</p>',
  '<p class="intro-text">सिर्फ शब्दों से खिलवाड़ ही नहीं, माला में पिरोना भी है फ़ितरत। कभी भी न थमने वाला लेखन सिलसिला यूं ही जारी रहेगा हमेशा...</p>\n    <p class="intro-text-en">Not just playing with words, but stringing them into a garland — a writing journey that will never stop, always continuing…</p>'
);

// -- EDITORIAL INTRO: read link English
html = html.replace(
  '<a href="about.html" class="intro-read">पूरा परिचय पढ़ें →</a>',
  '<a href="about.html" class="intro-read">पूरा परिचय पढ़ें → <span style="font-family:\'Cormorant Garamond\',serif;font-size:13px;font-style:italic;font-weight:500;color:rgba(155,14,14,0.65)">Read Full Profile</span></a>'
);

// -- MAGAZINE GRID: mag-all English
html = html.replace(
  '<a href="archive.html" class="mag-all">सभी देखें →</a>',
  '<a href="archive.html" class="mag-all">सभी देखें → <span style="font-family:\'Cormorant Garamond\',serif;font-size:12px;font-style:italic;font-weight:500">View All</span></a>'
);

// -- MAGAZINE GRID: mag-sub (already has mag-en-sub "Latest Works") ✓

// -- MAGAZINE GRID: mi-cat labels English (add English to category tags)
// Sansmaran
html = html.replace(
  /<span class="mi-cat sansmaran">संस्मरण<\/span>/g,
  '<span class="mi-cat sansmaran">संस्मरण <span style="font-size:10px;font-style:italic;font-weight:500;opacity:0.8">Memoir</span></span>'
);
// kavita
html = html.replace(
  /<span class="mi-cat">कविता<\/span>/g,
  '<span class="mi-cat">कविता <span style="font-size:10px;font-style:italic;font-weight:500;opacity:0.8">Poetry</span></span>'
);
// lekh
html = html.replace(
  /<span class="mi-cat lekh">लेख<\/span>/g,
  '<span class="mi-cat lekh">लेख <span style="font-size:10px;font-style:italic;font-weight:500;opacity:0.8">Essay</span></span>'
);
// pravasi
html = html.replace(
  /<span class="mi-cat pravasi">प्रवासी मन<\/span>/g,
  '<span class="mi-cat pravasi">प्रवासी मन <span style="font-size:10px;font-style:italic;font-weight:500;opacity:0.8">Diaspora</span></span>'
);

// -- MAGAZINE GRID: mi-meta dates — add English month
// "सितम्बर २०२५" → add "Sep 2025"
html = html.replace(
  '<div class="mi-meta">सितम्बर २०२५</div>',
  '<div class="mi-meta">सितम्बर २०२५ <span style="font-family:\'Cormorant Garamond\',serif;font-size:12px;font-style:italic;color:rgba(255,255,255,0.5)">Sep 2025</span></div>'
);
html = html.replace(
  '<div class="mi-meta">जुलाई २०२५</div>',
  '<div class="mi-meta">जुलाई २०२५ <span style="font-family:\'Cormorant Garamond\',serif;font-size:12px;font-style:italic;color:rgba(255,255,255,0.5)">Jul 2025</span></div>'
);
html = html.replace(
  '<div class="mi-meta">अक्टूबर २०२५</div>',
  '<div class="mi-meta">अक्टूबर २०२५ <span style="font-family:\'Cormorant Garamond\',serif;font-size:12px;font-style:italic;color:rgba(255,255,255,0.5)">Oct 2025</span></div>'
);
html = html.replace(
  /<div class="mi-meta">जुलाई २०२२<\/div>/g,
  '<div class="mi-meta">जुलाई २०२२ <span style="font-family:\'Cormorant Garamond\',serif;font-size:12px;font-style:italic;color:rgba(255,255,255,0.5)">Jul 2022</span></div>'
);

// -- RACHNAON KA SANSAR: header English
html = html.replace(
  '<div class="rs-eyebrow">रचनाओं का संसार</div>',
  '<div class="rs-eyebrow">रचनाओं का संसार</div>\n    <div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;color:rgba(26,16,8,0.55);font-style:italic;font-weight:500;margin-bottom:10px">Universe of Creations</div>'
);
html = html.replace(
  '<div class="rs-title">किस विधा में खोजना चाहते हैं?</div>',
  '<div class="rs-title">किस विधा में खोजना चाहते हैं?</div>\n    <div style="font-family:\'Cormorant Garamond\',serif;font-size:15px;color:rgba(26,16,8,0.6);font-style:italic;font-weight:500;margin-bottom:10px">Which form calls to you?</div>'
);
// rs-sub already has "Browse by category — pick what calls you" ✓

// -- RACHNAON KA SANSAR: rs-card CTA English
html = html.replace(
  /<div class="rs-cta" style="color:#9B0E0E">देखें →<\/div>/g,
  '<div class="rs-cta" style="color:#9B0E0E">देखें → <span style="font-family:\'Cormorant Garamond\',serif;font-size:12px;font-style:italic;font-weight:500;color:rgba(155,14,14,0.7)">Browse</span></div>'
);
html = html.replace(
  /<div class="rs-cta" style="color:#B8873A">देखें →<\/div>/g,
  '<div class="rs-cta" style="color:#B8873A">देखें → <span style="font-family:\'Cormorant Garamond\',serif;font-size:12px;font-style:italic;font-weight:500;color:rgba(184,135,58,0.8)">Browse</span></div>'
);
html = html.replace(
  /<div class="rs-cta" style="color:#2D6A4F">देखें →<\/div>/g,
  '<div class="rs-cta" style="color:#2D6A4F">देखें → <span style="font-family:\'Cormorant Garamond\',serif;font-size:12px;font-style:italic;font-weight:500;color:rgba(45,106,79,0.8)">Browse</span></div>'
);
html = html.replace(
  /<div class="rs-cta" style="color:#1A3A6B">देखें →<\/div>/g,
  '<div class="rs-cta" style="color:#1A3A6B">देखें → <span style="font-family:\'Cormorant Garamond\',serif;font-size:12px;font-style:italic;font-weight:500;color:rgba(26,58,107,0.8)">Browse</span></div>'
);
html = html.replace(
  /<div class="rs-cta" style="color:#6B2FA0">देखें →<\/div>/g,
  '<div class="rs-cta" style="color:#6B2FA0">देखें → <span style="font-family:\'Cormorant Garamond\',serif;font-size:12px;font-style:italic;font-weight:500;color:rgba(107,47,160,0.8)">Browse</span></div>'
);

// -- QUOTE INTERLUDE: add English translation
html = html.replace(
  '<div class="qi-attr">— गीतांजलि सक्सेना</div>',
  '<div class="qi-attr">— गीतांजलि सक्सेना</div>\n  <span class="qi-en">"Not just playing with words, but stringing them into a garland — a writing journey that will never cease, ever…"</span>'
);

// -- AUTHOR SPREAD: aq-text English
html = html.replace(
  '<p class="aq-text">"शब्द ही मेरा संसार है,<br>शब्द ही मेरी पहचान।"</p>',
  '<p class="aq-text">"शब्द ही मेरा संसार है,<br>शब्द ही मेरी पहचान।"</p>\n      <span class="aq-en">"Words are my world, words are my identity."</span>'
);

// -- AUTHOR SPREAD: author-left CTA English
html = html.replace(
  '<a href="about.html" class="ar-cta">पूरा परिचय पढ़ें →</a>\n    </div>\n  </div>\n  <div class="author-right">',
  '<a href="about.html" class="ar-cta">पूरा परिचय पढ़ें → <span style="font-family:\'Cormorant Garamond\',serif;font-size:13px;font-style:italic;font-weight:500;opacity:0.75;margin-left:4px">Read My Story</span></a>\n    </div>\n  </div>\n  <div class="author-right">'
);

// -- AUTHOR SPREAD: ar-eyebrow English
html = html.replace(
  '<div class="ar-eyebrow">लेखिका के बारे में</div>',
  '<div class="ar-eyebrow">लेखिका के बारे में</div>\n      <p class="ar-eyebrow-en">About the Author</p>'
);

// -- AUTHOR SPREAD: ar-bio English
html = html.replace(
  '<p class="ar-bio">नवभारत टाइम्स की वरिष्ठ पत्रकार। PIB-मान्यता प्राप्त। अबू धाबी में भारतीय महिला संघ की जयोति पत्रिका की संपादक। तीन दशकों से हिंदी साहित्य और पत्रकारिता में सक्रिय।</p>',
  '<p class="ar-bio">नवभारत टाइम्स की वरिष्ठ पत्रकार। PIB-मान्यता प्राप्त। अबू धाबी में भारतीय महिला संघ की जयोति पत्रिका की संपादक। तीन दशकों से हिंदी साहित्य और पत्रकारिता में सक्रिय।</p>\n      <p class="ar-bio-en">Senior journalist at Navbharat Times. PIB accredited. Editor of Jyoti magazine, Indian Women\'s Association, Abu Dhabi. Three decades in Hindi literature and journalism.</p>'
);

// -- AUTHOR SPREAD: cred-items English
html = html.replace(
  '<div class="cred-item"><div class="cred-title">३०+</div><div class="cred-sub">वर्षों का अनुभव</div></div>',
  '<div class="cred-item"><div class="cred-title">३०+</div><div class="cred-sub">वर्षों का अनुभव</div><span class="cred-sub-en">Years of experience</span></div>'
);
html = html.replace(
  '<div class="cred-item"><div class="cred-title">५०+</div><div class="cred-sub">प्रकाशित रचनाएं</div></div>',
  '<div class="cred-item"><div class="cred-title">५०+</div><div class="cred-sub">प्रकाशित रचनाएं</div><span class="cred-sub-en">Published works</span></div>'
);
html = html.replace(
  '<div class="cred-item"><div class="cred-title">अबू धाबी</div><div class="cred-sub">वर्तमान निवास</div></div>',
  '<div class="cred-item"><div class="cred-title">अबू धाबी</div><div class="cred-sub">वर्तमान निवास</div><span class="cred-sub-en">Current home · Abu Dhabi</span></div>'
);
html = html.replace(
  '<div class="cred-item"><div class="cred-title">PIB</div><div class="cred-sub">मान्यता प्राप्त</div></div>',
  '<div class="cred-item"><div class="cred-title">PIB</div><div class="cred-sub">मान्यता प्राप्त</div><span class="cred-sub-en">Press accredited</span></div>'
);

// -- AUTHOR SPREAD: right side CTA English
html = html.replace(
  '<a href="about.html" class="ar-cta">पूरा परिचय →</a>',
  '<a href="about.html" class="ar-cta">पूरा परिचय → <span style="font-family:\'Cormorant Garamond\',serif;font-size:13px;font-style:italic;font-weight:500;opacity:0.75;margin-left:4px">Full Profile</span></a>'
);

// -- FOOTER: brand text English
html = html.replace(
  '<div class="fbrand-text">गीतांजलि सक्सेना की रचनाओं का संग्रह।<br>अबू धाबी से हिंदी साहित्य की आवाज़।</div>',
  '<div class="fbrand-text">गीतांजलि सक्सेना की रचनाओं का संग्रह।<br>अबू धाबी से हिंदी साहित्य की आवाज़।</div>\n      <div class="fbrand-en">A collection of Gitanjali Saxena\'s writings — the voice of Hindi literature from Abu Dhabi.</div>'
);

// -- FOOTER: quick links English
html = html.replace(
  `    <div class="fblinks">
        <a href="about.html">परिचय</a>
        <a href="contact.html">संपर्क</a>
        <a href="archive.html">रचनाएं</a>
      </div>
    </div>`,
  `    <div class="fblinks">
        <a href="about.html">परिचय <span style="font-family:'Cormorant Garamond',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.4)">About</span></a>
        <a href="contact.html">संपर्क <span style="font-family:'Cormorant Garamond',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.4)">Contact</span></a>
        <a href="archive.html">रचनाएं <span style="font-family:'Cormorant Garamond',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.4)">Works</span></a>
      </div>
    </div>`
);

// -- FOOTER: column labels English
html = html.replace(
  '<div class="fcol-label">रचनाएं</div>\n      <ul>',
  '<div class="fcol-label">रचनाएं</div>\n      <span class="fcol-label-en">Writings</span>\n      <ul>'
);
html = html.replace(
  '<div class="fcol-label">अन्वेषण</div>',
  '<div class="fcol-label">अन्वेषण</div>\n      <span class="fcol-label-en">Explore</span>'
);
html = html.replace(
  '<div class="fcol-label">मेरे शब्द</div>',
  '<div class="fcol-label">मेरे शब्द</div>\n      <span class="fcol-label-en">Mere Shabd</span>'
);

// -- FOOTER: footer-bottom links English
html = html.replace(
  `  <div class="footer-bottom">
    <span>© २०२५ गीतांजलि सक्सेना। सर्वाधिकार सुरक्षित।</span>
    <div class="fblinks">
      <a href="index.html">होम</a>
      <a href="about.html">परिचय</a>
      <a href="contact.html">संपर्क</a>
    </div>
  </div>`,
  `  <div class="footer-bottom">
    <span>© २०२५ गीतांजलि सक्सेना। सर्वाधिकार सुरक्षित। <span class="footer-copy-en">All rights reserved.</span></span>
    <div class="fblinks">
      <a href="index.html">होम <span style="font-family:'Cormorant Garamond',serif;font-size:10px;font-style:italic;color:rgba(255,255,255,0.28)">Home</span></a>
      <a href="about.html">परिचय <span style="font-family:'Cormorant Garamond',serif;font-size:10px;font-style:italic;color:rgba(255,255,255,0.28)">About</span></a>
      <a href="contact.html">संपर्क <span style="font-family:'Cormorant Garamond',serif;font-size:10px;font-style:italic;color:rgba(255,255,255,0.28)">Contact</span></a>
    </div>
  </div>`
);

// -- FOOTER: category links English in columns
html = html.replace(
  '<li><a href="archive.html?cat=kavita">कविता</a></li>',
  '<li><a href="archive.html?cat=kavita">कविता <span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.3)">Poetry</span></a></li>'
);
html = html.replace(
  '<li><a href="archive.html?cat=lekh">लेख</a></li>',
  '<li><a href="archive.html?cat=lekh">लेख <span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.3)">Essays</span></a></li>'
);
html = html.replace(
  '<li><a href="archive.html?cat=sansmaran">संस्मरण</a></li>',
  '<li><a href="archive.html?cat=sansmaran">संस्मरण <span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.3)">Memoirs</span></a></li>'
);
html = html.replace(
  '<li><a href="archive.html?cat=pravasi">प्रवासी मन</a></li>',
  '<li><a href="archive.html?cat=pravasi">प्रवासी मन <span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.3)">Diaspora</span></a></li>'
);
html = html.replace(
  '<li><a href="archive.html?cat=vishesh">विशेष</a></li>',
  '<li><a href="archive.html?cat=vishesh">विशेष <span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.3)">Special</span></a></li>'
);

// Explore column links
html = html.replace(
  '<li><a href="about.html">परिचय</a></li>',
  '<li><a href="about.html">परिचय <span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.3)">About</span></a></li>'
);
html = html.replace(
  '<li><a href="gallery.html">गैलरी</a></li>',
  '<li><a href="gallery.html">गैलरी <span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.3)">Gallery</span></a></li>'
);
html = html.replace(
  '<li><a href="contact.html">संपर्क</a></li>',
  '<li><a href="contact.html">संपर्क <span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.3)">Contact</span></a></li>'
);
html = html.replace(
  '<li><a href="index.html">होम</a></li>',
  '<li><a href="index.html">होम <span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.3)">Home</span></a></li>'
);
html = html.replace(
  '<li><a href="archive.html">सभी रचनाएं</a></li>',
  '<li><a href="archive.html">सभी रचनाएं <span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.3)">All Works</span></a></li>'
);

// Write the file
fs.writeFileSync(filePath, html, 'utf8');
console.log('✅ fix-homepage-translations.js applied successfully!');
console.log('');
console.log('Changes made:');
console.log('  Fix 1: poem-section now has navvarsh-bg.jpg background with dark overlay');
console.log('  Fix 2: English translations added to ALL sections:');
console.log('    - Nav items (including CTA button)');
console.log('    - Hero overline, desc, badges, CTA');
console.log('    - Marquee items');
console.log('    - Poem stanzas (4 stanza translations)');
console.log('    - Poem attribution and read-more link');
console.log('    - Editorial intro section');
console.log('    - Magazine grid (categories, dates, mag-all)');
console.log('    - Rachnaon ka Sansar section (header, CTAs)');
console.log('    - Quote interlude English translation');
console.log('    - Author spread (quote, bio, creds, CTAs)');
console.log('    - Footer (brand, columns, bottom links, copyright)');
console.log('  Fix 3: All English text bolder (500 weight), larger (14-16px),');
console.log('    more visible (0.7 opacity on dark, 0.6 on light)');
console.log('    + global [class*="-en"] rule added');
