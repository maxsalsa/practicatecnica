'use strict';
const CACHE='practicatecnica-public-11.0.0';
const PUBLIC=['/offline.html','/icons/icon-192.png','/icons/icon-512.png','/icons/maskable-512.png','/icons/icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(PUBLIC))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const names=await caches.keys();await Promise.all(names.filter(name=>name!==CACHE&&/^(?:practicatecnica|practica[-_]|aula[-_])/i.test(name)).map(name=>caches.delete(name)));await self.clients.claim();})()));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('fetch',event=>{const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==self.location.origin)return;if(PUBLIC.includes(url.pathname)&&!url.search){event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));return;}if(url.pathname.startsWith('/api/')||/token|verificar|recuperar|confirmar-correo|mfa|cambiar-clave|ingresar|registro/.test(url.pathname+url.search))return;if(request.mode==='navigate')event.respondWith(fetch(request).catch(async()=>(await caches.match('/offline.html'))||Response.error()));});
