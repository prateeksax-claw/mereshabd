Add-Type -AssemblyName System.Drawing

$src = 'C:\Users\prate\.openclaw\workspace\mereshabd\site\images\health-is-wealth-poster.jpg'
$dst = 'C:\Users\prate\.openclaw\workspace\mereshabd\site\images\health-is-wealth-card.jpg'

$img = [System.Drawing.Image]::FromFile($src)
$w = $img.Width
$h = $img.Height

# Middle third
$cropX = [int]($w / 3)
$cropW = [int]($w / 3)
$cropY = 0
$cropH = $h

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cropped = $img.Clone($rect, $img.PixelFormat)
$img.Dispose()

$cropped.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cropped.Dispose()

Write-Host "Cropped: ${cropW}x${cropH} saved to $dst"
