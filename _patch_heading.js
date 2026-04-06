const fs = require('fs');
const filePath = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let c = fs.readFileSync(filePath, 'utf8');

// Build old/new heading strings from exact hex values seen in file
// Old subtitle: डॉक्टर की ज़ुबानी — विशेषज्ञों से मिलिए
// Hex: 0921 0949 0915 094d 091f 0930 0020 0915 0940 0020 091c 093c 0941 092c 093e 0928 0940 0020 2014 0020 0935 093f 0936 0947 0937 091c 094d 091e 094b 0902 0020 0938 0947 0020 092e 093f 0932 093f 090f
const oldSubtitle = '\u0921\u0949\u0915\u094d\u091f\u0930 \u0915\u0940 \u091c\u093c\u0941\u092c\u093e\u0928\u0940 \u2014 \u0935\u093f\u0936\u0947\u0937\u091c\u094d\u091e\u094b\u0902 \u0938\u0947 \u092e\u093f\u0932\u093f\u090f';

const oldHeading = `  <div class="meet-doctor-heading">\n    <span class="mds-title">Meet the Doctor</span>\n    <span class="mds-subtitle">${oldSubtitle}</span>\n  </div>`;

// New title: डॉक्टर की ज़ुबानी (same chars minus the " — विशेषज्ञों से मिलिए")
// New subtitle: विशेषज्ञों से सीधी बात — स्वास्थ्य, देखभाल और जीवन
// Using same encoding pattern
const newTitle = '\u0921\u0949\u0915\u094d\u091f\u0930 \u0915\u0940 \u091c\u093c\u0941\u092c\u093e\u0928\u0940';
const newSubtitle = '\u0935\u093f\u0936\u0947\u0937\u091c\u094d\u091e\u094b\u0902 \u0938\u0947 \u0938\u0940\u0927\u0940 \u092c\u093e\u0924 \u2014 \u0938\u094d\u0935\u093e\u0938\u094d\u0925\u094d\u092f, \u0926\u0947\u0916\u092d\u093e\u0932 \u0914\u0930 \u091c\u0940\u0935\u0928';

const newHeading = `  <div class="meet-doctor-heading">\n    <span class="mds-title">${newTitle}</span>\n    <span class="mds-subtitle">${newSubtitle}</span>\n  </div>`;

console.log('Looking for oldHeading:');
console.log(oldHeading);
console.log('\nFound:', c.includes(oldHeading));

if (!c.includes(oldHeading)) {
  console.log('ERROR: Old heading not found. Checking partial...');
  // Check if title part matches
  console.log('Has title span:', c.includes('<span class="mds-title">Meet the Doctor</span>'));
  console.log('Has subtitle span:', c.includes('<span class="mds-subtitle">' + oldSubtitle + '</span>'));
  
  // Try to find what's actually in there
  const idx = c.indexOf('<span class="mds-title">');
  if (idx >= 0) {
    console.log('mds-title context hex:');
    const chunk = c.slice(idx - 10, idx + 100);
    for (let i = 0; i < chunk.length; i++) {
      process.stdout.write(chunk.charCodeAt(i).toString(16).padStart(4,'0') + ' ');
      if ((i+1)%20===0) process.stdout.write('\n');
    }
  }
  process.exit(1);
}

c = c.replace(oldHeading, newHeading);
console.log('\nHeading replaced OK');

fs.writeFileSync(filePath, c, 'utf8');
console.log('File written successfully');
