/**
 * Fix nav for gallery.html, contact.html, and navvarsh-2025.html
 */
const fs = require('fs');
const path = require('path');

function fixNav(fp, oldNav, newNav) {
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes('<span class="nav-en">Home</span>')) {
    console.log('Already fixed:', path.basename(fp));
    return;
  }
  if (!html.includes(oldNav)) {
    console.log('Pattern not found in:', path.basename(fp));
    // Show what the nav looks like
    const ulStart = html.indexOf('<ul class="nav-links">');
    const ulEnd = html.indexOf('</ul>', ulStart);
    console.log('  Current nav:', JSON.stringify(html.slice(ulStart, ulEnd + 5).substring(0, 300)));
    return;
  }
  html = html.replace(oldNav, newNav);
  fs.writeFileSync(fp, html, 'utf8');
  console.log('✓ Fixed nav:', path.basename(fp));
}

// gallery.html — has class="active" on gallery link, no class on others
const GALLERY_NAV_OLD = `    <li><a href="index.html">होम</a></li>
    <li><a href="about.html">परिचय</a></li>
    <li><a href="archive.html">रचनाएं</a></li>
    <li><a href="gallery.html" class="active">गैलरी</a></li>
    <li><a href="contact.html">संपर्क</a></li>`;

const GALLERY_NAV_NEW = `    <li><a href="index.html">होम <span class="nav-en">Home</span></a></li>
    <li><a href="about.html" class="hide-sm">परिचय <span class="nav-en">About</span></a></li>
    <li><a href="archive.html">रचनाएं <span class="nav-en">Works</span></a></li>
    <li><a href="gallery.html" class="hide-sm active">गैलरी <span class="nav-en">Gallery</span></a></li>
    <li><a href="contact.html" class="hide-sm">संपर्क <span class="nav-en">Connect</span></a></li>`;

fixNav(path.join(__dirname, 'site', 'gallery.html'), GALLERY_NAV_OLD, GALLERY_NAV_NEW);

// contact.html — probably has class="active" on contact
const fp_contact = path.join(__dirname, 'site', 'contact.html');
let contactHtml = fs.readFileSync(fp_contact, 'utf8');
const contNavStart = contactHtml.indexOf('<ul class="nav-links">');
const contNavEnd = contactHtml.indexOf('</ul>', contNavStart);
const contNav = contactHtml.slice(contNavStart, contNavEnd + 5);
console.log('\nContact nav current:\n', contNav.substring(0, 400));

// navvarsh-2025.html — it's a post so uses ../ paths
const fp_nav = path.join(__dirname, 'site', 'posts', 'navvarsh-2025.html');
let navHtml = fs.readFileSync(fp_nav, 'utf8');
const navNavStart = navHtml.indexOf('<ul class="nav-links">');
const navNavEnd = navHtml.indexOf('</ul>', navNavStart);
const navNav = navHtml.slice(navNavStart, navNavEnd + 5);
console.log('\nNavvarsh nav current:\n', navNav.substring(0, 400));
