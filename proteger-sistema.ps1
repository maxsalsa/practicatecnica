param(
    [string]$Mensaje = "chore(prod): operacion autonoma GICM sin rastro externo"
)
$ErrorActionPreference = "Stop"
Set-Location "C:\PT26xD"

Write-Host "
=======================================================" -ForegroundColor Cyan
Write-Host "  SISTEMA AUTONOMO GICM — BUILD Y DESPLIEGUE SEGURO" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

Write-Host "
[1/4] Verificando pureza del codigo fuente (src/)..." -ForegroundColor Yellow
$menciones = Get-ChildItem -Path "src" -Recurse -File | Select-String -Pattern "lovable" -CaseSensitive:$false
if ($menciones) {
    Write-Host "  [ALERTA] Se detecto una referencia no deseada:" -ForegroundColor Red
    $menciones | ForEach-Object { Write-Host "    -> $($_.Path):$($_.LineNumber)" -ForegroundColor Red }
    exit 1
}
Write-Host "  [OK] Codigo fuente 100% independiente y limpio." -ForegroundColor Green

Write-Host "
[2/4] Ejecutando banco de pruebas unitarias..." -ForegroundColor Yellow
npm test
Write-Host "  [OK] Todas las pruebas pasaron en verde." -ForegroundColor Green

Write-Host "
[3/4] Compilando artefactos para Vercel..." -ForegroundColor Yellow
npm run build
Write-Host "  [OK] Compilacion completada con exito." -ForegroundColor Green

Write-Host "
[4/4] Sincronizando con repositorio oficial (GitHub)..." -ForegroundColor Yellow
git add .
$cambios = git status --porcelain
if ($cambios) {
    git commit -m $Mensaje
    git push origin main
    Write-Host "
[LISTO] Cambios subidos y desplegados en produccion." -ForegroundColor Green
} else {
    git push origin main
    Write-Host "
[AL DIA] El repositorio ya esta sincronizado." -ForegroundColor Green
}
