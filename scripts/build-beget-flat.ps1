$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)

npm run build

$flat = 'xristou7-site-flat'
if (Test-Path $flat) { Remove-Item $flat -Recurse -Force }
New-Item -ItemType Directory -Force -Path $flat | Out-Null

Copy-Item dist\index.html, dist\favicon.svg, dist\icons.svg $flat\
Copy-Item dist\assets\* $flat\

$js = (Get-ChildItem $flat -Filter '*.js').Name
$css = (Get-ChildItem $flat -Filter '*.css').Name
$html = Get-Content "$flat\index.html" -Raw -Encoding UTF8
$html = $html -replace '/assets/[^"]+\.js', "/$js"
$html = $html -replace '/assets/[^"]+\.css', "/$css"
[System.IO.File]::WriteAllText("$PWD\$flat\index.html", $html, [System.Text.UTF8Encoding]::new($false))

@'
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^cms/ - [L]
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
</IfModule>
'@ | Set-Content "$flat\.htaccess" -Encoding ASCII

if (Test-Path 'xristou7-site-flat.zip') { Remove-Item 'xristou7-site-flat.zip' -Force }
Compress-Archive -Path "$flat\*" -DestinationPath 'xristou7-site-flat.zip' -Force

Write-Host "Ready: xristou7-site-flat.zip"
Write-Host "JS:  $js"
Write-Host "CSS: $css"
