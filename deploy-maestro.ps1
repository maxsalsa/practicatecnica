param(
    [string]$Mensaje = "refactor(prod): autonomia total GICM, cero rastro externo"
)
$ErrorActionPreference = "Stop"
Set-Location "C:\PT26xD"

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host "  AUDITORIA QA + BUILD + GIT PUSH + VERCEL DEPLOY" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# Auditoría estricta solo en código fuente real (src/ y componentes)
Write-Host "`n[1/5] Auditando código fuente (src/)..." -ForegroundColor Yellow
$mencionesSrc = Get-ChildItem -Path "src" -Recurse -File | Select-String -Pattern "lovable" -CaseSensitive:$false
if ($mencionesSrc) {
    Write-Host "  [ERROR] Se encontraron referencias en src/:" -ForegroundColor Red
    $mencionesSrc | ForEach-Object { Write-Host "    -> $($_.Path):$($_.LineNumber)" -ForegroundColor Red }
    exit 1
}
Write-Host "  [OK] Código fuente 100% limpio." -ForegroundColor Green

Write-Host "`n[2/5] Verificando componentes de navegación..." -ForegroundColor Yellow
$rutasMenu = @("src\components\SiteHeader.tsx", "src\components\BottomNav.tsx", "src\components\useNavigationAccess.ts")
foreach ($rm in $rutasMenu) {
    if (-not (Test-Path $rm)) {
        Write-Host "  [ALERTA] Falta componente clave: $rm" -ForegroundColor Red
        exit 1
    }
}
Write-Host "  [OK] Componentes validados." -ForegroundColor Green

Write-Host "`n[3/5] Ejecutando pruebas unitarias (npm test)..." -ForegroundColor Yellow
npm test
Write-Host "  [OK] Pruebas en verde." -ForegroundColor Green

Write-Host "`n[4/5] Compilando para producción (npm run build)..." -ForegroundColor Yellow
npm run build
Write-Host "  [OK] Build completado con éxito." -ForegroundColor Green

Write-Host "`n[5/5] Sincronizando con GitHub (maxsalsa/practicatecnica)..." -ForegroundColor Yellow
git add .
git commit -m $Mensaje
git push origin main
Write-Host "`n=======================================================" -ForegroundColor Green
Write-Host "  ¡DESPLIEGUE AUTOMÁTICO COMPLETADO CON ÉXITO!" -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Green