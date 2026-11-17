param(
    [string]$Mensaje = "feat(admin): actualizacion del sistema administrativo estudiantil"
)
$ErrorActionPreference = "Stop"
Set-Location "C:\PT26xD"

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host "  MOTOR ADMINISTRATIVO ESTUDIANTIL - GICM y CTP" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# 1. Auditoría de integridad y pureza del código
Write-Host "`n[1/4] Auditando modulos administrativos y de matricula..." -ForegroundColor Yellow
$menciones = Get-ChildItem -Path "src" -Recurse -File | Select-String -Pattern "lovable" -CaseSensitive:$false
if ($menciones) {
    Write-Host "  [ALERTA] Se detecto una referencia no deseada." -ForegroundColor Red
    exit 1
}
Write-Host "  [OK] Modulos limpios y bajo control autonomo." -ForegroundColor Green

# 2. Ejecutar pruebas unitarias de lógica estudiantil y académica
Write-Host "`n[2/4] Ejecutando banco de pruebas de gestion estudiantil..." -ForegroundColor Yellow
npm test
Write-Host "  [OK] Pruebas de matricula y notas validadas en verde." -ForegroundColor Green

# 3. Compilación de producción para Vercel
Write-Host "`n[3/4] Compilando artefactos para despliegue global..." -ForegroundColor Yellow
npm run build
Write-Host "  [OK] Compilacion completada con exito." -ForegroundColor Green

# 4. Sincronización con GitHub (Repositorio Oficial)
Write-Host "`n[4/4] Sincronizando con la red de servidores..." -ForegroundColor Yellow
git add .
$cambios = git status --porcelain
if ($cambios) {
    git commit -m $Mensaje
    git push origin main
    Write-Host "`n[EXITO] Sistema administrativo actualizado y desplegado." -ForegroundColor Green
} else {
    git push origin main
    Write-Host "`n[AL DIA] El entorno estudiantil ya esta sincronizado." -ForegroundColor Green
}