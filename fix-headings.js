const fs = require('fs');
const filePath = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/health-is-wealth.html';
let c = fs.readFileSync(filePath, 'utf8');

// 1. Main h1 post-title — add bold + blue inline style
c = c.replace(
  '<h1 class="post-title">Health is Wealth, So Invest Wisely</h1>',
  '<h1 class="post-title" style="font-weight:700;color:#1565C0;">Health is Wealth, So Invest Wisely</h1>'
);

// 2. h2: Health is wealth, so invest wisely
c = c.replace(
  "<h2 class=\"prose-text\" style=\"font-family:'Cormorant Garamond',serif;font-size:1.5em;font-style:italic;margin-bottom:0.5rem\">'Health is wealth, so invest wisely'</h2>",
  "<h2 class=\"prose-text\" style=\"font-family:'Cormorant Garamond',serif;font-size:1.5em;font-style:italic;margin-bottom:0.5rem;color:#1565C0;font-weight:700;\">'Health is wealth, so invest wisely'</h2>"
);

// 3. h3: नेक तंदुरुस्ती लाख नियामत
c = c.replace(
  "<h3 class=\"prose-text\" style=\"font-family:'Tiro Devanagari Hindi',serif;font-size:1.2em;color:var(--dust);margin-bottom:1.5rem\">'नेक तंदुरुस्ती लाख नियामत'</h3>",
  "<h3 class=\"prose-text\" style=\"font-family:'Tiro Devanagari Hindi',serif;font-size:1.2em;color:#1565C0;font-weight:700;margin-bottom:1.5rem\">'नेक तंदुरुस्ती लाख नियामत'</h3>"
);

// 4. h3: Key areas in health investment
c = c.replace(
  '<h3 class="prose-text" style="font-weight:600;margin-top:1.5rem">\'Key areas in health investment\'</h3>',
  '<h3 class="prose-text" style="font-weight:700;color:#1565C0;margin-top:1.5rem">\'Key areas in health investment\'</h3>'
);

// 5. h3: The Benefits of early Health Investment
c = c.replace(
  '<h3 class="prose-text" style="font-weight:600;margin-top:1.5rem">\'The Benefits of early Health Investment\'</h3>',
  '<h3 class="prose-text" style="font-weight:700;color:#1565C0;margin-top:1.5rem">\'The Benefits of early Health Investment\'</h3>'
);

// 6. h3: We can't Clap with One Hand
c = c.replace(
  '<h3 class="prose-text" style="font-weight:600;margin-top:1.5rem">\'We can\'t Clap with One Hand (ताली एक हाथ से नहीं बजती)\'</h3>',
  '<h3 class="prose-text" style="font-weight:700;color:#1565C0;margin-top:1.5rem">\'We can\'t Clap with One Hand (ताली एक हाथ से नहीं बजती)\'</h3>'
);

// 7. h3: Towards a Healthier Tomorrow
c = c.replace(
  '<h3 class="prose-text" style="font-weight:600;margin-top:1.5rem">Towards a Healthier Tomorrow… With Expert guidance</h3>',
  '<h3 class="prose-text" style="font-weight:700;color:#1565C0;margin-top:1.5rem">Towards a Healthier Tomorrow… With Expert guidance</h3>'
);

fs.writeFileSync(filePath, c, 'utf8');
console.log('File written successfully');

// Verify Hindi chars
const m = c.match(/[\u0900-\u097F]/g);
console.log('Hindi chars:', m ? m.length : 0);
