import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const origin = 'http://127.0.0.1:3187';
const results: { name: string; status: string }[] = [];
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3187'], {
  cwd: root, env: { ...process.env, APP_URL: origin, NEXT_PUBLIC_SUPABASE_URL: '', SUPABASE_SECRET_KEY: '', SUPABASE_SERVICE_ROLE_KEY: '' }, stdio: 'pipe',
});
let startup = '';
server.stderr?.on('data', chunk => { startup = (startup + chunk.toString()).slice(-2000); });
server.stdout?.on('data', () => {});
async function check(name: string, run: () => Promise<void>) { await run(); results.push({ name, status: 'passed' }); console.log('OK ' + name); }
const request = (route: string, init?: RequestInit) => fetch(origin + route, { ...init, signal: AbortSignal.timeout(10000) });
async function main() {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error('No se pudo iniciar Next.js: ' + startup);
    try { const r = await request('/api/catalog'); if (r.ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  assert(ready, 'El servidor no inició a tiempo.');
  await check('Portada y cabeceras de seguridad', async () => {
    const r = await request('/'); assert.equal(r.status, 200);
    assert.match(r.headers.get('content-security-policy') || '', /frame-ancestors 'none'/);
    assert.equal(r.headers.get('x-content-type-options'), 'nosniff');
    assert.match(await r.text(), /PracTICAtecnica/);
  });
  await check('Catálogo de siete especialidades sin respuestas', async () => {
    const r = await request('/api/catalog'); const d = await r.json();
    assert.equal(r.status, 200); assert.equal(d.specialties.length, 7); assert.equal(d.registrationOpen, false);
    assert.match(r.headers.get('cache-control') || '', /no-store/);
    assert(!JSON.stringify(d).match(/correct_option|correctOption|"answer"/));
  });
  await check('Visitante sin identidad ficticia', async () => { const r = await request('/api/me'); assert.equal(r.status, 200); assert.equal((await r.json()).user, null); });
  await check('Prácticas requieren sesión', async () => { const r = await request('/api/progress?specialty=3006'); assert.equal(r.status, 401); });
  await check('Administración requiere sesión', async () => { const r = await request('/api/owner/students'); assert.equal(r.status, 401); });
  await check('Mutación sin origen rechazada', async () => { const r = await request('/api/auth/register', {method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}); assert.equal(r.status, 403); });
  await check('Mutación desde otro sitio rechazada', async () => { const r = await request('/api/auth/register', {method:'POST',headers:{'Content-Type':'application/json',Origin:'https://ajeno.invalid'},body:'{}'}); assert.equal(r.status, 403); });
  await check('GET de verificación no activa cuentas', async () => { const r = await request('/api/auth/verify-email'); assert.equal(r.status, 405); });
  await check('JSON inválido produce error controlado', async () => { const r = await request('/api/auth/register', {method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:'{'}); assert.equal(r.status, 400); assert.equal((await r.json()).error.code, 'INVALID_JSON'); });
  await check('Manifest, iconos y worker disponibles', async () => {
    const r = await request('/manifest.webmanifest'); assert.equal(r.status, 200); const m = await r.json();
    assert(m.icons?.length >= 2);
    for (const icon of m.icons) assert.equal((await request(icon.src)).status, 200);
    const sw = await request('/sw.js'); assert.equal(sw.status, 200); assert.match(sw.headers.get('cache-control') || '', /no-cache|no-store/);
  });
  await check('Pantalla de verificación y rutas inválidas', async () => { assert.equal((await request('/verificar')).status, 200); assert.equal((await request('/ruta-inexistente')).status, 404); });
}
try {
  await main();
  await mkdir(path.join(root,'qa'),{recursive:true});
  await writeFile(path.join(root,'qa/http-smoke.json'),JSON.stringify({date:new Date().toISOString(),productionBuild:true,configuredServices:false,checks:results},null,2));
  console.log(`${results.length} comprobaciones HTTP aprobadas.`);
} catch (error) { console.error(error); process.exitCode=1; }
finally { server.kill('SIGTERM'); }
