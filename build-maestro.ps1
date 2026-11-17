
$ErrorActionPreference = "Stop"
Set-Location "C:\PT26xD"
Write-Host "`n=== COMPILACION GICM ===" -ForegroundColor Cyan
npm run build
git add .
git commit -m "feat(chat): sincronizacion final"
git push origin main
Write-Host "EXITO TOTAL" -ForegroundColor Green

