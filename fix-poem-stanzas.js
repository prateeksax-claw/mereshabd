const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'site', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Insert stanza 1 English after "अच्छे स्वास्थ्य से,"
html = html.replace(
  /<span class="pline lg">अच्छे स्वास्थ्य से,<\/span>/,
  '<span class="pline lg">अच्छे स्वास्थ्य से,</span>\n      <span class="poem-stanza-en">"May the New Year be filled with good health…"</span>'
);

// Insert stanza 2 English after "जीवन ही तो है उत्सव, है अनमोल,"
html = html.replace(
  /<span class="pline md">जीवन ही तो है उत्सव, है अनमोल,<\/span>/,
  '<span class="pline md">जीवन ही तो है उत्सव, है अनमोल,</span>\n      <span class="poem-stanza-en">"May prosperity knock on your door, for life itself is a celebration…"</span>'
);

// Insert stanza 3 English after "कहने-सुनने का…"
html = html.replace(
  /<span class="pline xl">कहने-सुनने का…<\/span>/,
  '<span class="pline xl">कहने-सुनने का…</span>\n      <span class="poem-stanza-en">"Stringing words together, to speak and to listen…"</span>'
);

// Insert stanza 4 English after "शब्दों का मोल जीवन में जानें…"
html = html.replace(
  /<span class="pline sm">शब्दों का मोल जीवन में जानें…<\/span>/,
  '<span class="pline sm">शब्दों का मोल जीवन में जानें…</span>\n      <span class="poem-stanza-en">"Know the value of words in your life…"</span>'
);

fs.writeFileSync(filePath, html, 'utf8');

// Verify
const result = fs.readFileSync(filePath, 'utf8');
const count = (result.match(/poem-stanza-en/g) || []).length;
console.log('poem-stanza-en count (should be 5 = 1 CSS + 4 HTML):', count);
console.log('S1:', result.includes('May the New Year be filled with good health'));
console.log('S2:', result.includes('May prosperity knock on your door'));
console.log('S3:', result.includes('Stringing words together'));
console.log('S4:', result.includes('Know the value of words'));
console.log('✅ Stanza translations applied!');
