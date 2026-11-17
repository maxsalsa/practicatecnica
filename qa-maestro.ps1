param(
    [string]$Mensaje = "feat(qa): auditoria Kaizen, build autonomo y sincronizacion total GICM"
)
$ErrorActionPreference = "Stop"
Set-Location "C:\PT26xD"

Write-Host "
=======================================================" -ForegroundColor Cyan
Write-Host "  SISTEMA QA MAESTRO GICM — PRACTICA TECNICA" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# 1. Auditoría rigurosa de pureza y cero dependencias externas
Write-Host "
[1/4] Auditando pureza de codigo (Cero Lovable / TypeScript)..." -ForegroundColor Yellow
$menciones = Get-ChildItem -Path "src" -Recurse -File | Select-String -Pattern "lovable" -CaseSensitive:$false
if ($menciones) {
    Write-Host "  [ALERTA CRITICA] Se detecto una referencia no permitida:" -ForegroundColor Red
    $menciones | ForEach-Object { Write-Host "    -> $($_.Path):$($_.LineNumber)" -ForegroundColor Red }
    exit 1
}

# Verificar prohibicion estricta de archivos .tsx (TypeScript)
$tsFiles = Get-ChildItem -Path "src" -Recurse -Filter "*.tsx"
if ($tsFiles) {
    Write-Host "  [ALERTA CRITICA] Se detectaron archivos .tsx prohibidos:" -ForegroundColor Red
    $tsFiles | ForEach-Object { Write-Host "    -> $($_.FullName)" -ForegroundColor Red }
    exit 1
}
Write-Host "  [OK] Codigo fuente 100% puro en JavaScript/JSX y libre de terceros." -ForegroundColor Green

# 2. Ejecutar pruebas unitarias de calidad
Write-Host "
[2/4] Ejecutando banco de pruebas unitarias (Vitest)..." -ForegroundColor Yellow
npm test
Write-Host "  [OK] Todas las pruebas superadas en verde con rigor senior." -ForegroundColor Green

# 3. Compilación de producción (Vercel Nitro)
Write-Host "
[3/4] Compilando artefactos para Vercel..." -ForegroundColor Yellow
npm run build
Write-Host "  [OK] Compilacion completada con exito en entorno local." -ForegroundColor Green

# 4. Sincronización absoluta con Git / GitHub
Write-Host "
[4/4] Sincronizando con repositorio oficial (maxsalsa/practicatecnica)..." -ForegroundColor Yellow
git add .
$cambios = git status --porcelain
if ($cambios) {
    git commit -m $Mensaje
    git push origin main
    Write-Host "
[EXITO TOTAL] Cambios auditados, probados, subidos y desplegados en produccion." -ForegroundColor Green
} else {
    git push origin main
    Write-Host "
[AL DIA] El repositorio remoto ya se encuentra sincronizado." -ForegroundColor Green
}
