$ErrorActionPreference = 'Stop'
$sitePath = "C:\Users\prate\.openclaw\workspace\mereshabd\site"

# All 20 files
$allFiles = @(
    "$sitePath\index.html",
    "$sitePath\about.html",
    "$sitePath\archive.html",
    "$sitePath\gallery.html",
    "$sitePath\contact.html",
    "$sitePath\posts\guru-mahattva.html",
    "$sitePath\posts\health-is-wealth.html",
    "$sitePath\posts\jane-doctor-jubani.html",
    "$sitePath\posts\jivan-darshan.html",
    "$sitePath\posts\kalam-se-utare.html",
    "$sitePath\posts\kavya.html",
    "$sitePath\posts\kshanikayen-anil-saxena.html",
    "$sitePath\posts\mammi-amma-nani.html",
    "$sitePath\posts\najrana-pardesh-se.html",
    "$sitePath\posts\naritva.html",
    "$sitePath\posts\navvarsh-2025.html",
    "$sitePath\posts\peace-alone-can-light-the-way.html",
    "$sitePath\posts\reflection-and-hope.html",
    "$sitePath\posts\yadon-ke-pannon-se.html",
    "$sitePath\posts\yadon-mein-rahenge.html"
)

# 13 ink-fix files
$inkFiles = @(
    "$sitePath\posts\guru-mahattva.html",
    "$sitePath\posts\health-is-wealth.html",
    "$sitePath\posts\jane-doctor-jubani.html",
    "$sitePath\posts\jivan-darshan.html",
    "$sitePath\posts\kalam-se-utare.html",
    "$sitePath\posts\kavya.html",
    "$sitePath\posts\kshanikayen-anil-saxena.html",
    "$sitePath\posts\mammi-amma-nani.html",
    "$sitePath\posts\najrana-pardesh-se.html",
    "$sitePath\posts\naritva.html",
    "$sitePath\posts\navvarsh-2025.html",
    "$sitePath\posts\yadon-ke-pannon-se.html",
    "$sitePath\posts\yadon-mein-rahenge.html"
)

$hamburgerCSS = @'
.nav-hamburger{display:flex;flex-direction:column;gap:5px;cursor:pointer;z-index:101;background:none;border:none;padding:8px}
.nav-hamburger span{display:block;width:24px;height:2px;background:white;transition:all 0.3s}
.nav-hamburger.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.nav-hamburger.active span:nth-child(2){opacity:0}
.nav-hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}
nav.scrolled .nav-hamburger span{background:var(--ink,#1C1410)}
.nav-links{display:none;position:fixed;top:0;right:0;width:280px;height:100vh;background:rgba(28,20,16,0.97);backdrop-filter:blur(12px);flex-direction:column;padding:80px 32px 32px;gap:8px;z-index:100}
.nav-links.open{display:flex}
.nav-links a{color:white!important;font-size:16px!important;text-shadow:none!important;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08)}
.nav-links a:last-child{border-bottom:none}
.nav-links .nav-cta{margin-top:16px;text-align:center}
.nav-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:99}
.nav-overlay.open{display:block}
.hide-sm{display:block}
'@

$hamburgerDefaultCSS = @'
.nav-hamburger{display:none}
.nav-overlay{display:none}
'@

$hamburgerHTML = @'
<div class="nav-overlay" id="navOverlay"></div>
<button class="nav-hamburger" id="navHamburger" aria-label="Menu">
  <span></span><span></span><span></span>
</button>
'@

$hamburgerJS = @'
<script>
// Hamburger menu
const hamburger = document.getElementById('navHamburger');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.getElementById('navOverlay');
if(hamburger){
  hamburger.addEventListener('click',function(){
    this.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navOverlay.addEventListener('click',function(){
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}
</script>
'@

foreach ($file in $allFiles) {
    $name = Split-Path $file -Leaf
    Write-Host "Processing: $name"
    $content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
    $original = $content

    # ============================================================
    # FIX 1A: Add hamburger CSS defaults OUTSIDE media queries
    # Insert right before the FIRST @media(max-width:900px) occurrence
    # But only if not already added
    # ============================================================
    if ($content -notmatch '\.nav-hamburger\{display:none\}') {
        # Find the first @media(max-width:900px) and insert the default CSS before it
        $idx = $content.IndexOf('@media(max-width:900px)')
        if ($idx -gt 0) {
            $content = $content.Insert($idx, "$hamburgerDefaultCSS`n")
            Write-Host "  + Added hamburger default CSS"
        }
    }

    # ============================================================
    # FIX 1A: Add hamburger CSS inside FIRST @media(max-width:900px) block
    # We find the first @media(max-width:900px){ and add after the opening brace
    # ============================================================
    if ($content -notmatch '\.nav-hamburger\{display:flex') {
        # Refresh index since we may have inserted content
        $pattern = '@media(max-width:900px){'
        $idx = $content.IndexOf($pattern)
        if ($idx -lt 0) {
            # Try with space
            $pattern = '@media(max-width:900px) {'
            $idx = $content.IndexOf($pattern)
        }
        if ($idx -lt 0) {
            # Try finding it with regex approach - look for @media(max-width:900px) followed by {
            $match = [regex]::Match($content, '@media\(max-width:\s*900px\)\s*\{')
            if ($match.Success) {
                $idx = $match.Index
                $pattern = $match.Value
            }
        }
        if ($idx -gt 0) {
            $insertPoint = $idx + $pattern.Length
            $content = $content.Insert($insertPoint, "`n$hamburgerCSS")
            Write-Host "  + Added hamburger CSS inside @media(900px)"
        } else {
            Write-Host "  ! WARNING: Could not find @media(max-width:900px) in $name"
        }
    }

    # ============================================================
    # FIX 1B: Add hamburger HTML before <ul class="nav-links">
    # ============================================================
    if ($content -notmatch 'id="navHamburger"') {
        $navTarget = '<ul class="nav-links">'
        $idx = $content.IndexOf($navTarget)
        if ($idx -gt 0) {
            $content = $content.Insert($idx, "$hamburgerHTML`n  ")
            Write-Host "  + Added hamburger HTML"
        } else {
            Write-Host "  ! WARNING: Could not find <ul class=`"nav-links`"> in $name"
        }
    }

    # ============================================================
    # FIX 1C: Add hamburger JS before </body>
    # ============================================================
    if ($content -notmatch "getElementById\('navHamburger'\)") {
        $bodyEnd = '</body>'
        $idx = $content.LastIndexOf($bodyEnd)
        if ($idx -gt 0) {
            $content = $content.Insert($idx, "$hamburgerJS`n")
            Write-Host "  + Added hamburger JS"
        }
    }

    # ============================================================
    # FIX 4: Footer mobile 1-column at 600px
    # Check if there's a @media(max-width:600px) with .footer-main
    # ============================================================
    if ($content -notmatch '@media\(max-width:\s*600px\)\s*\{[^}]*\.footer-main\s*\{[^}]*grid-template-columns:\s*1fr') {
        # Check if there IS a @media(max-width:600px) block
        $m600 = [regex]::Match($content, '@media\(max-width:\s*600px\)\s*\{')
        if ($m600.Success) {
            # Add .footer-main{grid-template-columns:1fr} inside the FIRST 600px block
            $insertPoint = $m600.Index + $m600.Value.Length
            $content = $content.Insert($insertPoint, "`n  .footer-main{grid-template-columns:1fr!important;padding:32px 20px}")
            Write-Host "  + Added footer 1-col at 600px (inside existing block)"
        } else {
            # Need to add a new @media(max-width:600px) block - add it before </style>
            $styleEnd = $content.LastIndexOf('</style>')
            if ($styleEnd -gt 0) {
                $footerMobile = "`n@media(max-width:600px){`n  .footer-main{grid-template-columns:1fr!important;padding:32px 20px}`n}`n"
                $content = $content.Insert($styleEnd, $footerMobile)
                Write-Host "  + Added footer 1-col at 600px (new block)"
            }
        }
    } else {
        Write-Host "  = Footer 1-col at 600px already exists"
    }

    # Write back
    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file, $content, (New-Object System.Text.UTF8Encoding $true))
        Write-Host "  SAVED: $name" -ForegroundColor Green
    } else {
        Write-Host "  No changes needed for $name" -ForegroundColor Yellow
    }
}

# ============================================================
# FIX 2: --ink color replacement (13 files)
# ============================================================
Write-Host "`n=== FIX 2: Replacing --ink:#1565C0 with --ink:#1C1410 ==="
foreach ($file in $inkFiles) {
    $name = Split-Path $file -Leaf
    $content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
    $original = $content
    
    # Replace --ink:#1565C0 with --ink:#1C1410
    $content = $content -replace '--ink:#1565C0', '--ink:#1C1410'
    
    # Replace hardcoded color:#1565C0 in CSS with color:var(--ink)
    # But be careful with inline styles - those need #1C1410 directly
    # In <style> blocks: use var(--ink)
    # In inline style="": use #1C1410
    $content = $content -replace 'color:#1565C0', 'color:#1C1410'
    
    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file, $content, (New-Object System.Text.UTF8Encoding $true))
        $changes = ($original.Length - ($original -replace '#1565C0','').Length) / 7
        Write-Host "  FIXED: $name ($changes replacements)" -ForegroundColor Green
    }
}

# ============================================================
# FIX 5: Kshanikayen shabdavali hide on mobile
# ============================================================
Write-Host "`n=== FIX 5: Hiding shabdavali on mobile ==="
$kshFile = "$sitePath\posts\kshanikayen-anil-saxena.html"
$content = [System.IO.File]::ReadAllText($kshFile, [System.Text.Encoding]::UTF8)
if ($content -notmatch '\.shabdavali\s*\{\s*display:\s*none') {
    $styleEnd = $content.LastIndexOf('</style>')
    if ($styleEnd -gt 0) {
        $shabdFix = "`n@media(max-width:600px){`n  .shabdavali{display:none}`n}`n"
        $content = $content.Insert($styleEnd, $shabdFix)
        [System.IO.File]::WriteAllText($kshFile, $content, (New-Object System.Text.UTF8Encoding $true))
        Write-Host "  FIXED: kshanikayen-anil-saxena.html - shabdavali hidden at 600px" -ForegroundColor Green
    }
}

Write-Host "`n=== ALL FIXES APPLIED ===" -ForegroundColor Cyan
