$ErrorActionPreference = 'Stop'

$repo = 'C:\Users\prate\.openclaw\workspace\mereshabd'
$backupDir = 'C:\Users\prate\.openclaw\workspace\backups\mereshabd'
$ts = Get-Date -Format 'yyyy-MM-dd_HHmmss'
$zip = Join-Path $backupDir "mereshabd-pre-edit-$ts.zip"

New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
Compress-Archive -Path "$repo\*" -DestinationPath $zip -Force

Write-Output "Backup created: $zip"
