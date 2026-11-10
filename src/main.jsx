import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// Limpieza automática de estados corruptos al arrancar la app
try {
  const versionActual = "v2026.11.PRO";
  if (localStorage.getItem("pt_version_sis") !== versionActual) {
    localStorage.removeItem("pt_saberes_offline");
    localStorage.setItem("pt_version_sis", versionActual);
  }
} catch(e) {}
