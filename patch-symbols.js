const fs = require('fs');
const filePath = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let content = fs.readFileSync(filePath, 'utf8');

// CHANGE 1: Add CSS before </style>
const cssBlock = `/* FLOATING MEDICAL SYMBOLS */
.meb-symbols{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:1;}
.meb-sym{position:absolute;font-size:48px;opacity:0;animation:sym-float var(--sdur,8s) ease-in-out var(--sdelay,0s) infinite;}
@keyframes sym-float{0%{opacity:0;transform:translateY(30px) scale(0.8)}20%{opacity:0.18}50%{opacity:0.22;transform:translateY(-20px) scale(1.05)}80%{opacity:0.18}100%{opacity:0;transform:translateY(30px) scale(0.8)}}
`;

if (content.includes('</style>')) {
  content = content.replace('</style>', cssBlock + '</style>');
  console.log('CSS insertion: OK');
} else {
  console.log('CSS insertion: </style> NOT FOUND');
}

// CHANGE 2: Add symbols HTML before meb-particles
const oldHtml = '  <div class="meb-particles">';
const newHtml = `  <div class="meb-symbols">
    <span class="meb-sym" style="left:5%;top:15%;--sdur:9s;--sdelay:0s">\u{1FA7A}</span>
    <span class="meb-sym" style="left:20%;top:60%;--sdur:7s;--sdelay:1.5s">\u{1F48A}</span>
    <span class="meb-sym" style="left:45%;top:10%;--sdur:11s;--sdelay:0.8s">\u2764\uFE0F</span>
    <span class="meb-sym" style="left:65%;top:70%;--sdur:8s;--sdelay:2s">\u{1FA7A}</span>
    <span class="meb-sym" style="left:78%;top:20%;--sdur:10s;--sdelay:0.3s">\u{1F48A}</span>
    <span class="meb-sym" style="left:88%;top:55%;--sdur:7.5s;--sdelay:1s">\u2764\uFE0F</span>
    <span class="meb-sym" style="left:33%;top:80%;--sdur:9.5s;--sdelay:1.8s">\u{1FA7A}</span>
  </div>
  <div class="meb-particles">`;

if (content.includes(oldHtml)) {
  content = content.replace(oldHtml, newHtml);
  console.log('HTML replacement: OK');
} else {
  console.log('HTML replacement: NOT FOUND');
  // Try to find it with different whitespace
  const idx = content.indexOf('meb-particles');
  if (idx >= 0) {
    console.log('meb-particles found at index:', idx);
    console.log('Context around it:', JSON.stringify(content.substring(idx - 20, idx + 40)));
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('File written successfully');

// Verify Hindi chars
const m = content.match(/[\u0900-\u097F]/g);
console.log('Hindi chars:', m ? m.length : 0);
