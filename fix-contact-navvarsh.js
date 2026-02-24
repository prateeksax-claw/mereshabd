const fs = require('fs');
const path = require('path');

// Fix contact.html
{
  const fp = path.join(__dirname, 'site', 'contact.html');
  let html = fs.readFileSync(fp, 'utf8');
  const OLD = `    <li><a href="index.html">होम</a></li>
    <li><a href="about.html">परिचय</a></li>
    <li><a href="archive.html">रचनाएं</a></li>
    <li><a href="gallery.html">गैलरी</a></li>
    <li><a href="contact.html" class="active">संपर्क</a></li>`;
  const NEW = `    <li><a href="index.html">होम <span class="nav-en">Home</span></a></li>
    <li><a href="about.html" class="hide-sm">परिचय <span class="nav-en">About</span></a></li>
    <li><a href="archive.html">रचनाएं <span class="nav-en">Works</span></a></li>
    <li><a href="gallery.html" class="hide-sm">गैलरी <span class="nav-en">Gallery</span></a></li>
    <li><a href="contact.html" class="hide-sm active">संपर्क <span class="nav-en">Connect</span></a></li>`;
  if (html.includes(OLD)) {
    html = html.replace(OLD, NEW);
    fs.writeFileSync(fp, html, 'utf8');
    console.log('✓ Fixed contact.html nav');
  } else {
    console.log('✗ Pattern not found in contact.html');
  }
}

// Fix navvarsh-2025.html — it already has hide-sm but no nav-en
{
  const fp = path.join(__dirname, 'site', 'posts', 'navvarsh-2025.html');
  let html = fs.readFileSync(fp, 'utf8');
  
  // The nav has hide-sm already
  const OLD = `    <li><a href="../index.html">होम</a></li>
    <li><a href="../about.html" class="hide-sm">परिचय</a></li>
    <li><a href="../archive.html">रचनाएं</a></li>
    <li><a href="../gallery.html" class="hide-sm">गैलरी</a></li>
    <li><a href="../contact.html" class="hide-sm">संपर्क</a></li>`;
  const NEW = `    <li><a href="../index.html">होम <span class="nav-en">Home</span></a></li>
    <li><a href="../about.html" class="hide-sm">परिचय <span class="nav-en">About</span></a></li>
    <li><a href="../archive.html">रचनाएं <span class="nav-en">Works</span></a></li>
    <li><a href="../gallery.html" class="hide-sm">गैलरी <span class="nav-en">Gallery</span></a></li>
    <li><a href="../contact.html" class="hide-sm">संपर्क <span class="nav-en">Connect</span></a></li>`;
  if (html.includes(OLD)) {
    html = html.replace(OLD, NEW);
    fs.writeFileSync(fp, html, 'utf8');
    console.log('✓ Fixed navvarsh-2025.html nav');
  } else {
    console.log('✗ Pattern not found in navvarsh-2025.html');
    // Debug
    const ulStart = html.indexOf('<ul class="nav-links">');
    const ulEnd = html.indexOf('</ul>', ulStart);
    console.log('Actual nav:', JSON.stringify(html.slice(ulStart+22, ulEnd)));
  }
}
