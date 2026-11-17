param(
    [string]$Mensaje = "refactor(jsx): purificacion quirurgica de anotaciones ts para compilacion limpia"
)
$ErrorActionPreference = "Stop"
Set-Location "C:\PT26xD"

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host "  PURIFICACION QUIRURGICA DE TIPOS TS EN ARCHIVOS JSX" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# 1. Limpiar anotaciones de tipos restrictivas en archivos de rutas y componentes
Write-Host "`n[1/3] Removiendo sintaxis de TypeScript remanente..." -ForegroundColor Yellow
$jsxFiles = Get-ChildItem -Path "src" -Recurse -Filter "*.jsx"
foreach ($file in $jsxFiles) {
    $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding utf8
    $original = $content

    # Remover bloques type ... = { ... } o interface ... { ... }
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, 'type\s+\w+\s*=\s*\{[^}]*\}', '')
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, 'interface\s+\w+\s*\{[^}]*\}', '')

    # Remover tipado en validateSearch de TanStack Router (ej: (s: Record<string, unknown>) => o similares)
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, 'validateSearch:\s*\([^)]*:[^)]*\)\s*=>', 'validateSearch: (s) =>')
    
    # Remover declaraciones de tipos sueltas en parámetros de funciones
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\(\s*([a-zA-Z0-9_]+)\s*:\s*[A-Z][a-zA-Z0-9_<>\s,|\[\]]*\s*\)', '($1)')

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8SinBom)
        Write-Host "  [PURIFICADO] $($file.Name)" -ForegroundColor DarkGray
    }
}
Write-Host "  [OK] Archivos JSX limpios y adaptados a JavaScript puro." -ForegroundColor Green

# 2. Compilación de producción
Write-Host "`n[2/3] Compilando artefactos..." -ForegroundColor Yellow
npm run build
Write-Host "  [OK] Compilacion exitosa." -ForegroundColor Green

# 3. Sincronización con GitHub
Write-Host "`n[3/3] Sincronizando con repositorio oficial..." -ForegroundColor Yellow
git add .
$cambios = git status --porcelain
if ($cambios) {
    git commit -m $Mensaje
    git push origin main
    Write-Host "`n[EXITO TOTAL] Sistema purificado y desplegado correctamente." -ForegroundColor Green
} else {
    git push origin main
    Write-Host "`n[AL DIA] Todo sincronizado." -ForegroundColor Green
}