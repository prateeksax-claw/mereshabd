const fs = require('fs');
const filePath = 'C:/Users/prate/.openclaw/workspace/mereshabd/site/posts/jane-doctor-jubani.html';
let c = fs.readFileSync(filePath, 'utf8');

// 1. Replace the animated card HTML
const oldCard = `    <a href="#meet-doctor-gynec" class="md-card md-card-animated">
      <div class="md-card-img md-card-img-photo" style="background-image:url('../images/doctor-one-placeholder.jpg');background-size:cover;background-position:center top;min-height:280px;position:relative;overflow:hidden;">
        <div class="md-shimmer-overlay"></div>
        <span class="md-live-badge md-live-pulse">✦ LIVE</span>
        <div class="md-photo-overlay">
          <span class="md-speciality">स्त्री रोग विशेषज्ञ</span>
        </div>
      </div>
      <div class="md-card-body">
        <div class="md-name md-name-typing">डॉ. <span class="typing-name">Gitanjali Saxena</span><span class="typing-cursor">|</span></div>
        <div class="md-month">अप्रैल २०२३</div>
        <div class="md-cta">Interview पढ़ें →</div>
      </div>
    </a>`;

const newCard = `    <a href="#meet-doctor-gynec" class="md-card md-card-animated">
      <div class="md-card-img md-card-img-photo" style="background-image:url('../images/doctor-one-placeholder.jpg');background-size:cover;background-position:center top;min-height:280px;position:relative;overflow:hidden;">
        <div class="md-shimmer-overlay"></div>
        <div class="md-photo-overlay">
          <span class="md-speciality">स्त्री रोग विशेषज्ञ</span>
        </div>
      </div>
      <div class="md-card-body">
        <div class="md-name">डॉ. ——</div>
        <div class="md-month" style="opacity:0.5;font-style:italic;font-size:12px;">नाम शीघ्र</div>
        <div class="md-cta">Interview पढ़ें →</div>
      </div>
    </a>`;

if (!c.includes(oldCard)) {
  console.error('ERROR: old card not found in file!');
  process.exit(1);
}
c = c.replace(oldCard, newCard);
console.log('Card HTML replaced OK');

// 2. Replace the CSS animation block
const oldCSS = `/* ANIMATED DOCTOR CARD */
.md-card-animated .md-shimmer-overlay{position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,215,100,0.25) 50%,transparent 60%);background-size:200% 100%;animation:shimmer-sweep 2.5s ease-in-out infinite;}
@keyframes shimmer-sweep{0%{background-position:200% 0}100%{background-position:-200% 0}}
.md-live-pulse{animation:pulse-badge 1.8s ease-in-out infinite;}
@keyframes pulse-badge{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.7;transform:scale(1.05)}}
.md-photo-overlay{position:absolute;bottom:0;left:0;right:0;padding:14px 16px;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 100%);display:flex;align-items:flex-end;}
.typing-cursor{display:inline-block;animation:blink 0.9s step-end infinite;color:var(--red);font-weight:300;margin-left:2px;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.md-card-animated{border:2px solid transparent;animation:card-glow 3s ease-in-out infinite;}
@keyframes card-glow{0%,100%{box-shadow:0 4px 20px rgba(0,0,0,0.10)}50%{box-shadow:0 8px 32px rgba(155,14,14,0.18),0 0 0 2px rgba(184,135,58,0.15)}}`;

const newCSS = `/* ANIMATED DOCTOR CARD */
.md-card-animated .md-shimmer-overlay{position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,215,100,0.18) 50%,transparent 65%);background-size:300% 100%;animation:shimmer-sweep 3.5s ease-in-out infinite;}
@keyframes shimmer-sweep{0%{background-position:300% 0}100%{background-position:-300% 0}}
.md-photo-overlay{position:absolute;bottom:0;left:0;right:0;padding:14px 16px;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 100%);display:flex;align-items:flex-end;}
.md-card-animated{animation:card-float 4s ease-in-out infinite;}
@keyframes card-float{0%,100%{box-shadow:0 4px 20px rgba(0,0,0,0.10);transform:translateY(0)}50%{box-shadow:0 12px 36px rgba(184,135,58,0.20);transform:translateY(-4px)}}`;

if (!c.includes(oldCSS)) {
  console.error('ERROR: old CSS block not found in file!');
  process.exit(1);
}
c = c.replace(oldCSS, newCSS);
console.log('CSS block replaced OK');

fs.writeFileSync(filePath, c, 'utf8');
console.log('File written OK');
