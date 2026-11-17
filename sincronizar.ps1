param([string]$Mensaje = "feat(kaizen): compilacion limpia cero errores y soberania practicatecnica.com")
Set-Location C:\pt26xd
Write-Host "Ejecutando auditoria de compilacion (vite build)..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Host "ERROR QA: La compilacion fallo. Se detuvo el push para proteger produccion." -ForegroundColor Red
  exit 1
}
git add .
git commit -m "$Mensaje"
git push origin main
Write-Host "COMPILACION 100% VERDE Y SINCRONIZADA EN GITHUB (practicatecnica.com)" -ForegroundColor Green