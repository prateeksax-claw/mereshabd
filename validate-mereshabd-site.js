const fs = require('fs');
const path = require('path');

const siteDir = path.join(__dirname, 'site');
const coreFiles = [
  'index.html',
  'about.html',
  'archive.html',
  'contact.html',
  'gallery.html',
  path.join('posts', 'guru-mahattva.html'),
  path.join('posts', 'mammi-amma-nani.html'),
  path.join('posts', 'naritva.html'),
  path.join('posts', 'yadon-mein-rahenge.html')
];

function walk(dir, exts, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, exts, out);
    else if (exts.includes(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const textFiles = walk(siteDir, ['.html', '.xml', '.css', '.js']);
let devanagari = 0;
let mojibake = 0;
let replacementChars = 0;
let missingCore = [];

for (const rel of coreFiles) {
  const full = path.join(siteDir, rel);
  if (!fs.existsSync(full)) missingCore.push(rel);
}

for (const file of textFiles) {
  const text = fs.readFileSync(file, 'utf8');
  devanagari += (text.match(/[\u0900-\u097F]/g) || []).length;
  mojibake += (text.match(/à¤|à¥|ï¿½/g) || []).length;
  replacementChars += (text.match(/�/g) || []).length;
}

const checks = [
  { name: 'Core files present', ok: missingCore.length === 0, value: missingCore.length ? missingCore.join(', ') : 'ok' },
  { name: 'Devanagari count > 1000', ok: devanagari > 1000, value: devanagari },
  { name: 'Mojibake markers = 0', ok: mojibake === 0, value: mojibake },
  { name: 'Replacement chars <= 1', ok: replacementChars <= 1, value: replacementChars },
];

console.log('Mereshabd Site Validation');
console.log('-------------------------');
checks.forEach(c => console.log(`${c.ok ? 'PASS' : 'FAIL'} | ${c.name} | value=${c.value}`));

if (replacementChars > 0) {
  console.log('\nNote: replacement characters were detected somewhere in the text surface. Inspect if a new edit touches the affected page.');
}

const failed = checks.filter(c => !c.ok);
if (failed.length) process.exitCode = 1;
else console.log('All critical checks passed.');
