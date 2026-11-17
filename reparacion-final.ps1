$ErrorActionPreference = "Stop"
Set-Location "C:\PT26xD"

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host "  REPARACION QUIRURGICA FINAL DE RUTAS — GICM" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# 1. Corregir el archivo con dolar en el nombre si es necesario
$rutaDolar = "C:\PT26xD\src\routes\instituciones_.practica.`$id.jsx"
if (!(Test-Path $rutaDolar)) {
    # Buscar si existe con codificacion literal
    $matchPath = Get-ChildItem -Path "C:\PT26xD\src\routes" -Filter "*practica*.jsx" | Select-Object -First 1
    if ($matchPath) { $rutaDolar = $matchPath.FullName }
}

$rutasCriticas = @(
    "C:\PT26xD\src\routes\admin-pagos.jsx",
    "C:\PT26xD\src\routes\conversacion.jsx",
    "C:\PT26xD\src\routes\destrezas.jsx",
    "C:\PT26xD\src\routes\examenes-docentes.jsx",
    "C:\PT26xD\src\routes\idiomas.jsx",
    $rutaDolar
)

foreach ($path in $rutasCriticas) {
    if ($path and (Test-Path $path)) {
        $content = Get-Content -LiteralPath $path -Raw -Encoding utf8
        
        # Eliminar genéricos problemáticos como <Record<string, any>> o similares en createFileRoute
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, 'createFileRoute\s*<[^>]+>\s*\(', 'createFileRoute(')
        
        # Eliminar casting de tipos con 'as ...'
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\s+as\s+[A-Za-z<>\[\]]+', '')

        [System.IO.File]::WriteAllText($path, $content, [System.Text.UTF8Encoding]::new($false))
        Write-Host "  [LIMPIO] $path" -ForegroundColor Green
    }
}

Write-Host "`n[OK] Compilando proyecto..." -ForegroundColor Yellow
npm run build