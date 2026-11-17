param(
    [string]$MensajeCommit = "chore: sincronizacion segura automatizada"
)
$ErrorActionPreference = "Stop"
Set-Location "C:\PT26xD"

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host "  EJECUCION SEGURA EN POWERSHELL (SIN ALTERAR ENTORNO)" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# 1. Verificar estado actual de Git sin modificar nada
Write-Host "`n[1/4] Verificando estado del repositorio..." -ForegroundColor Yellow
git status

# 2. Ejecutar pruebas unitarias para garantizar integridad
Write-Host "`n[2/4] Ejecutando pruebas locales (npm test)..." -ForegroundColor Yellow
npm test

# 3. Compilar build local respetando la configuración existente
Write-Host "`n[3/4] Compilando proyecto (npm run build)..." -ForegroundColor Yellow
npm run build

# 4. Sincronizar cambios locales con Git / GitHub de forma limpia
Write-Host "`n[4/4] Sincronizando con repositorio remoto..." -ForegroundColor Yellow
git add .
$cambios = git status --porcelain
if ($cambios) {
    git commit -m $MensajeCommit
    git push origin main
    Write-Host "`n[EXITO] Cambios sincronizados y subidos correctamente." -ForegroundColor Green
} else {
    Write-Host "`n[AL DIA] No hay cambios pendientes por subir." -ForegroundColor Green
}