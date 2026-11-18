import React from 'react';

export function EscudoOficialMep({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mepGrad" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#003876" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#ce1126" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="url(#mepGrad)" stroke="#f8fafc" strokeWidth="4" />
      <path d="M22 65 C35 55, 45 65, 50 68 C55 65, 65 55, 78 65 L78 40 C65 32, 55 40, 50 44 C45 40, 35 32, 22 40 Z" fill="#ffffff" />
      <circle cx="50" cy="25" r="7" fill="#fbbf24" />
      <text x="50" y="86" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900" fontFamily="Arial, sans-serif">
        MEP
      </text>
    </svg>
  );
}

export function EscudoCtpMercedesNorte({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ctpGrad" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="50%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <polygon points="50,4 93,22 84,74 50,96 16,74 7,22" fill="url(#ctpGrad)" stroke="#38bdf8" strokeWidth="4" />
      <circle cx="50" cy="44" r="18" stroke="#fbbf24" strokeWidth="3.5" strokeDasharray="6 4" fill="#020617" />
      <text x="50" y="49" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="900" fontFamily="Arial, sans-serif">
        CTP
      </text>
      <text x="50" y="77" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif">
        MN • HEREDIA
      </text>
    </svg>
  );
}