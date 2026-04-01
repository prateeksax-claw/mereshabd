import { readFileSync } from 'fs';
const c = readFileSync('C:\\Users\\prate\\.openclaw\\workspace\\mereshabd\\site\\posts\\kavya.html', 'utf8');

// Split out CSS vs HTML body
const styleEnd = c.indexOf('</style>');
const bodyStart = c.indexOf('<body>');
const html = c.substring(bodyStart);

console.log('=== HTML BODY CHECKS ===');
console.log('year-section class in body:', (html.match(/class="year-section/g) || []).length);
console.log('year-band class in body:', (html.match(/class="year-band/g) || []).length);
console.log('id="yearNav" in body:', html.includes('id="yearNav"'));
console.log('yn-tab class in body:', (html.match(/class="yn-tab/g) || []).length);
console.log('collection id in body:', html.includes('id="collection"'));
console.log('collection-band in body:', html.includes('collection-band'));
console.log('is-new articles:', (html.match(/class="poem-entry[^"]*is-new/g) || []).length);
console.log('pe-new-badge spans:', (html.match(/pe-new-badge/g) || []).length);

// Verify Hindi poem titles are intact
const titles = ['काव्य-जगत', 'डिलीवरी मैन', 'ILA कविता', 'लॉकडाउन कविता', 'पति-देव', 'कवनी - जन्मदिन', 'उपजिंदर के नाम', 'माटी', 'सालगिरह कविता', 'कोविड़ कविता'];
console.log('\n=== HINDI TITLE CHECK ===');
titles.forEach(t => console.log(t, ':', html.includes(t) ? '✅' : '❌'));
