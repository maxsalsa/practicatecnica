param(
    [string]$Mensaje = "refactor(jsx): purificacion avanzada de sintaxis ts en rutas criticas"
)
$ErrorActionPreference = "Stop"
Set-Location "C:\PT26xD"

Write-Host "
=======================================================" -ForegroundColor Cyan
Write-Host "  BLINDAJE Y PURIFICACION DE RUTAS JSX — GICM" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

$rutasCriticas = @(
    "C:\PT26xD\src\routes\admin-pagos.jsx",
    "C:\PT26xD\src\routes\conversacion.jsx",
    "C:\PT26xD\src\routes\destrezas.jsx",
    "C:\PT26xD\src\routes\examenes-docentes.jsx",
    "C:\PT26xD\src\routes\idiomas.jsx",
    "C:\PT26xD\src\routes\instituciones_.practica.$id.jsx"
)

foreach ($path in $rutasCriticas) {
    if (Test-Path $path) {
        $content = Get-Content -LiteralPath $path -Raw -Encoding utf8
        
        # Eliminar declaraciones de tipos tipo "type Q = ..." o "interface ..."
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, '(type|interface)\s+\w+[\s\S]*?=\s*\{[^}]*\};?', '')
        
        # Limpiar anotaciones en parametros de funciones de ruta
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\(\s*([a-zA-Z0-9_]+)\s*:\s*[^)]+\)', '($1)')

        [System.IO.File]::WriteAllText($path, $content, [System.Text.UTF8Encoding]::new($false))
        Write-Host "  [BLINDADO] $path" -ForegroundColor DarkGray
    } else {
        Write-Host "  [AVISO] No se encontro: $path" -ForegroundColor Yellow
    }
}

Write-Host "
[OK] Rutas criticas purificadas con exito." -ForegroundColor Green

# Ejecutar compilacion para verificar
npm run build
