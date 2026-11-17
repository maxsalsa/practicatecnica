# INSTRUCCIONES ESTRICTAS DE SOBERANÍA Y MARCA PROPIA (EJECUCIÓN 6:00 PM — MÁXIMO 1 CRÉDITO)

## DIRECTRIZ OBLIGATORIA PARA EL AGENTE (EJECUTAR EN 1 SOLO PASO SIN GASTAR CRÉDITOS EXTRA)

1. **PROHIBICIÓN TOTAL DE MARCAS EXTERNAS Y CORAZONES:**
   - Eliminar y mantener fuera del proyecto cualquier ícono de corazón, badge flotante, watermark, script externo (`gptengineer.js`), carpeta `.lovable` o referencia textual a plataformas de terceros en `index.html`, `package.json`, `manifest.json` y todos los componentes de `src/`.
   - La única identidad autorizada en toda la interfaz es **Práctica Técnica .com — GICM / BDS Devs (Ing. Max Salazar Sánchez)**.

2. **EMBLEMA OFICIAL DEL BÚHO AZUL SIN FONDO BLANCO (SIN NOMBRE "LUMI"):**
   - El ícono oficial de la aplicación, del `favicon.svg`, del `apple-touch-icon` y del instalador PWA (`manifest.json`) es exclusivamente el **Búho Azul vectorial con fondo 100% transparente (`fill="none"`, `background_color: "#00000000"`)**.
   - **No llamar "Lumi" al búho en ninguna pantalla.** El búho azul es el emblema institucional mudo de **Práctica Técnica .com / GICM**.

3. **AUTENTICACIÓN SOBERANA (SOLO GOOGLE OAUTH Y CORREO GMAIL REAL):**
   - El acceso de usuarios debe mostrar únicamente **"Inicia con Google"** y **"Crear usuario Gmail"** (`@gmail.com` o `@est.mep.go.cr` / `@mep.go.cr`) bajo identidad **GICM**.

4. **CONTROL DE ACCESO POR PLANES (RBAC) Y PODER EXCLUSIVO SUPERADMIN:**
   - **SuperAdmin (`maxi.salsa@gmail.com` — Ing. Max Salazar Sánchez):** Único usuario con acceso irrestricto al 100% de las pantallas, consola de delegación de roles y simulador de planes.
   - **Plan Institución (Anualidad):** Acceso institucional completo (Analíticas, Comunicados, Comedor, CoopePago, Docencia y Práctica).
   - **Plan Docente Particular:** Acceso a la Fábrica Pedagógica Automática (Planeamientos de 4 momentos, Trabajos Cotidianos 1-3, Proyectos en 4 etapas y Exámenes con Tabla de Especificaciones), Certificados y Banco 9M.
   - **Plan Estudiante de Centro Educativo (Anualidad):** Acceso a estudio + Comedor, Horarios, Comunicados y Billetera CoopePago.
   - **Plan Estudiante Particular:** Acceso individual a Aprender, Repasar, Simular y Actualizar (Banco 9M), Licencias MOPT, Juegos Lógicos, IA Offline y Certificados SHA-256.

5. **PUREZA TÉCNICA:**
   - Mantener 100% JavaScript y `.jsx` puro (cero archivos `.ts` o `.tsx`).
   - Compilación `vite build` con **0 errores y 0 warnings**.