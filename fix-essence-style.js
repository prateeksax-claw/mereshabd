/**
 * Remove the extra inline styles from en-essence blocks in posts
 * Keep only class="en-essence" (styled by CSS)
 */
const fs = require('fs');
const path = require('path');
const POSTS = path.join(__dirname, 'site', 'posts');

const files = fs.readdirSync(POSTS).filter(f => f.endsWith('.html'));
files.forEach(f => {
  const fp = path.join(POSTS, f);
  let html = fs.readFileSync(fp, 'utf8');
  
  // Fix the excess inline style on en-essence div from fix-essence2.js
  const old1 = '<div class="en-essence" style="max-width:900px;margin:28px auto;padding:16px 20px 16px 80px">';
  const new1 = '<div class="en-essence">';
  
  if (html.includes(old1)) {
    html = html.replace(old1, new1);
    fs.writeFileSync(fp, html, 'utf8');
    console.log('✓ Cleaned inline style:', f);
  }
});
console.log('Done.');
