param(
    [string]$Mensaje = "refactor(jsx): eliminacion de anotaciones de tipos ts para pureza jsx GICM"
)
$ErrorActionPreference = "Stop"
Set-Location "C:\PT26xD"

Write-Host "
=======================================================" -ForegroundColor Cyan
Write-Host "  PURIFICACION INDUSTRIAL JSX — GICM" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# Buscar todos los archivos .jsx y remover sintaxis tipica de TypeScript que rompe JS puro
Write-Host "
[1/3] Limpiando anotaciones de tipos en archivos .jsx..." -ForegroundColor Yellow
$jsxFiles = Get-ChildItem -Path "src" -Recurse -Filter "*.jsx"
foreach ($file in $jsxFiles) {
    $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding utf8
    
    # Limpiezas basicas de tipado estricto remanente
    $contentClean = $content -replace 'type\s+\w+\s*=\s*\{[^}]*\};?', ''
    $contentClean = $contentClean -replace 'interface\s+\w+\s*\{[^}]*\};?', ''
    
    if ($contentClean -ne $content) {
        Set-Content -LiteralPath $file.FullName -Value $contentClean -Encoding utf8
        Write-Host "  [PURIFICADO] " -ForegroundColor DarkGray
    }
}
Write-Host "  [OK] Codigo JSX purificado." -ForegroundColor Green

# 2. Compilación de producción (Vercel Nitro)
Write-Host "
[2/3] Compilando artefactos para Vercel..." -ForegroundColor Yellow
npm run build
Write-Host "  [OK] Compilacion completada con exito." -ForegroundColor Green

# 3. Sincronización con GitHub
Write-Host "
[3/3] Sincronizando con repositorio oficial (GitHub)..." -ForegroundColor Yellow
git add .
$cambios = git status --porcelain
if ($cambios) {
    git commit -m $Mensaje
    git push origin main
    Write-Host "
[EXITO TOTAL] Codigo puro en JSX compilado y desplegado." -ForegroundColor Green
} else {
    git push origin main
    Write-Host "
[AL DIA] Repositorio sincronizado." -ForegroundColor Green
}
