import React, { useState, useEffect } from 'react';

const GOOGLE_CLIENT_ID =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GOOGLE_CLIENT_ID) ||
  '669679702279-ldlbgldda2hi0meid6kfp4v5aaltdsct.apps.googleusercontent.com';

function decodeJwtPayload(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function GicmGoogleAuth() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pt26_gicm_google_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    // Capturar retorno OAuth2 en el hash de la URL si viene del flujo directo de Google
    if (typeof window !== 'undefined' && window.location.hash.includes('id_token=')) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      const idToken = params.get('id_token');
      if (idToken) {
        const profile = decodeJwtPayload(idToken);
        if (profile && profile.email) {
          const isSuperAdmin = profile.email.toLowerCase() === 'maxi.salsa@gmail.com';
          const sessionUser = {
            name: profile.name || profile.email.split('@')[0],
            email: profile.email,
            picture: profile.picture || '/icon-192.png',
            role: isSuperAdmin ? 'SUPER_ADMIN · GICM' : 'Estudiante / Docente',
            loginAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          localStorage.setItem('pt26_gicm_google_user', JSON.stringify(sessionUser));
          setUser(sessionUser);
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    }

    // Cargar script oficial Google Identity Services (GSI) con tu Client ID propio
    if (typeof document !== 'undefined' && !document.getElementById('google-gsi-script')) {
      const script = document.createElement('script');
      script.id = 'google-gsi-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response) => {
              if (response && response.credential) {
                const profile = decodeJwtPayload(response.credential);
                if (profile && profile.email) {
                  const isSuperAdmin = profile.email.toLowerCase() === 'maxi.salsa@gmail.com';
                  const sessionUser = {
                    name: profile.name || profile.email.split('@')[0],
                    email: profile.email,
                    picture: profile.picture || '/icon-192.png',
                    role: isSuperAdmin ? 'SUPER_ADMIN · GICM' : 'Miembro Verificado',
                    loginAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  };
                  localStorage.setItem('pt26_gicm_google_user', JSON.stringify(sessionUser));
                  setUser(sessionUser);
                  setStatusMsg('');
                }
              }
            }
          });
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  const handleDirectGoogleLogin = () => {
    setStatusMsg('');
    // Si GSI One-Tap está listo, lanza el selector oficial con el Client ID de GICM
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          openOAuthDirectWindow();
        }
      });
    } else {
      openOAuthDirectWindow();
    }
  };

  const openOAuthDirectWindow = () => {
    // Redireccion directa a accounts.google.com usando EXCLUSIVAMENTE tu Client ID 669679702279-...
    const redirectUri = window.location.origin;
    const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const authUrl =
      'https://accounts.google.com/o/oauth2/v2/auth' +
      '?client_id=' + encodeURIComponent(GOOGLE_CLIENT_ID) +
      '&redirect_uri=' + encodeURIComponent(redirectUri) +
      '&response_type=id_token' +
      '&scope=' + encodeURIComponent('openid email profile') +
      '&nonce=' + encodeURIComponent(nonce) +
      '&prompt=select_account';

    window.location.href = authUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem('pt26_gicm_google_user');
    setUser(null);
  };

  if (user) {
    return (
      <div className="flex items-center gap-3 bg-white/15 backdrop-blur px-3.5 py-1.5 rounded-xl border border-white/20">
        <img
          src={user.picture}
          alt={user.name}
          className="h-8 w-8 rounded-full border border-white/40 object-cover"
          onError={(e) => { e.currentTarget.src = '/icon-192.png'; }}
        />
        <div className="text-left">
          <p className="text-xs font-extrabold text-white leading-tight">{user.name}</p>
          <p className="text-[10px] font-semibold text-emerald-200">{user.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="ml-2 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-red-500/80 text-[11px] font-bold text-white transition cursor-pointer"
        >
          Salir
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={handleDirectGoogleLogin}
        className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white text-slate-800 hover:bg-slate-50 font-bold text-xs shadow-md transition cursor-pointer"
        title="Autenticación directa Google OAuth 2.0 · GICM · practicatecnica.com"
      >
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
          <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
        </svg>
        <span>Iniciar con Google · GICM</span>
      </button>
      {statusMsg && <span className="text-[10px] text-amber-200 mt-1">{statusMsg}</span>}
    </div>
  );
}