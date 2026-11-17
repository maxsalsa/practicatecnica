param([string]$Mensaje = "feat: sincronizacion desde PC local hacia Lovable y practicatecnica.com")
Set-Location C:\pt26xd
npm run build
git add .
git commit -m "$Mensaje"
git push origin main
Write-Host "SINCRONIZADO CON EXITO EN GITHUB / LOVABLE (maxsalsa/practicatecnica.git)" -ForegroundColor Green
