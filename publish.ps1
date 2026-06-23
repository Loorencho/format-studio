# Публикация на GitHub (аккаунт Loorencho)
# Запустите в PowerShell из папки проекта:
#   .\publish.ps1

$ErrorActionPreference = "Stop"
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
Remove-Item Env:GH_TOKEN -ErrorAction SilentlyContinue

Write-Host "Проверка входа в GitHub..." -ForegroundColor Cyan
gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Откройте браузер и войдите в GitHub:" -ForegroundColor Yellow
  gh auth login -h github.com -p https -w
}

Write-Host "Создание репозитория и отправка кода..." -ForegroundColor Cyan
gh repo create format-studio --public --description "Сайт студии ремонта с админ-панелью заявок" --source=. --remote=origin --push

Write-Host ""
Write-Host "Готово: https://github.com/Loorencho/format-studio" -ForegroundColor Green
