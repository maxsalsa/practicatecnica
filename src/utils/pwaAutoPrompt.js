// Detección automática PWA para www.practicatecnica.com
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPrompt = e;
  console.log("PWA lista para instalación automática en dispositivo.");
});