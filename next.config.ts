import type { NextConfig } from 'next';
let storageOrigin = '';
try { storageOrigin = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || '').origin; } catch {}
const csp = [
  "default-src 'self'", `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`, "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:", "font-src 'self'", `connect-src 'self' ${storageOrigin}${process.env.NODE_ENV === 'development' ? ' ws://localhost:* ws://127.0.0.1:*' : ''}`.trim(),
  "object-src 'none'", "base-uri 'self'", "form-action 'self'", "frame-ancestors 'none'", "worker-src 'self'",
].join('; ');
const config: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  async headers() {
    return [
      {source:'/:path*',headers:[
        {key:'Content-Security-Policy',value:csp},
        {key:'X-Content-Type-Options',value:'nosniff'},
        {key:'X-Frame-Options',value:'DENY'},
        {key:'Referrer-Policy',value:'no-referrer'},
        {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
      ]},
      {source:'/api/:path*',headers:[{key:'Cache-Control',value:'private, no-store, max-age=0'}]},
      {source:'/sw.js',headers:[{key:'Cache-Control',value:'no-cache, no-store, must-revalidate'},{key:'Service-Worker-Allowed',value:'/'}]},
    ];
  },
};
export default config;
