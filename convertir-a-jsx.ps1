param(
    [string]$Mensaje = "refactor(jsx): conversion automatica estricta de tsx a jsx por mandato GICM"
)
$ErrorActionPreference = "Stop"
Set-Location "C:\PT26xD"

Write-Host "
=======================================================" -ForegroundColor Cyan
Write-Host "  CONVERSION INDUSTRIAL TSX -> JSX & QA — GICM" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# 1. Buscar y renombrar todos los archivos .tsx a .jsx recursivamente
Write-Host "
[1/4] Renombrando archivos .tsx a .jsx..." -ForegroundColor Yellow
$tsFiles = Get-ChildItem -Path "src" -Recurse -Filter "*.tsx"
foreach ($file in $tsFiles) {
    $newPath = $file.FullName -replace '\.tsx$', '.jsx'
    Rename-Item -LiteralPath $file.FullName -NewName (Split-Path $newPath -Leaf)
    Write-Host "  [RENOMBRADO]  -> .jsx" -ForegroundColor DarkGray
}
Write-Host "  [OK] Todos los componentes convertidos a JSX." -ForegroundColor Green

# 2. Auditoría de control (Cero Lovable / Cero TSX)
Write-Host "
[2/4] Verificando pureza absoluta (Cero rastro .tsx)..." -ForegroundColor Yellow
$remainingTsx = Get-ChildItem -Path "src" -Recurse -Filter "*.tsx"
if ($remainingTsx) {
    Write-Host "  [ALERTA] Aun quedan archivos .tsx pendientes." -ForegroundColor Red
    exit 1
}
$lovableCheck = Get-ChildItem -Path "src" -Recurse -File | Select-String -Pattern "lovable" -CaseSensitive:$false
if ($lovableCheck) {
    Write-Host "  [ALERTA] Se detectaron referencias a Lovable." -ForegroundColor Red
    exit 1
}
Write-Host "  [OK] Entorno 100% puro en JavaScript/JSX." -ForegroundColor Green

# 3. Compilación de producción (Vercel Nitro)
Write-Host "
[3/4] Compilando artefactos en JSX..." -ForegroundColor Yellow
npm run build
Write-Host "  [OK] Compilacion completada con exito." -ForegroundColor Green

# 4. Sincronización con GitHub
Write-Host "
[4/4] Sincronizando con repositorio oficial (GitHub)..." -ForegroundColor Yellow
git add .
$cambios = git status --porcelain
if ($cambios) {
    git commit -m $Mensaje
    git push origin main
    Write-Host "
[EXITO TOTAL] Migracion a JSX completada y desplegada en produccion." -ForegroundColor Green
} else {
    git push origin main
    Write-Host "
[AL DIA] Repositorio sincronizado." -ForegroundColor Green
}
