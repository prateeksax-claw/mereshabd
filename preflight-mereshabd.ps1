$ErrorActionPreference = 'Stop'

$repo = 'C:\Users\prate\.openclaw\workspace\mereshabd'
$backupScript = Join-Path $repo 'backup-mereshabd.ps1'
$validator = Join-Path $repo 'validate-mereshabd-site.js'

Write-Host '=== Mereshabd Preflight ===' -ForegroundColor Cyan

Write-Host "`n[1/3] Git status" -ForegroundColor Yellow
git -C $repo status --short

Write-Host "`n[2/3] Creating timestamped backup" -ForegroundColor Yellow
& $backupScript

Write-Host "`n[3/3] Running validation" -ForegroundColor Yellow
node $validator

if ($LASTEXITCODE -ne 0) {
  Write-Host "`nPreflight FAILED. Do not edit or deploy until the issue is resolved." -ForegroundColor Red
  exit 1
}

Write-Host "`nPreflight PASSED. Safe to begin a scoped edit." -ForegroundColor Green
