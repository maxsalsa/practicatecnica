import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { Database } from '@/integrations/supabase/types';
export const Route=createFileRoute('/api/public/institution-pdf/$id')({staticData:{sitemap:false},server:{handlers:{GET:async({params,request})=>{
 if(!z.string().uuid().safeParse(params.id).success)return new Response(null,{status:404});
 const url=process.env['SUPABASE_URL'];const key=process.env['SUPABASE_PUBLISHABLE_KEY'];if(!url||!key)return new Response(null,{status:503});
 const client=createClient<Database>(url,key,{auth:{persistSession:false},global:{fetch:(input,init)=>{const h=new Headers(init?.headers);if(key.startsWith('sb_')&&h.get('Authorization')===`Bearer ${key}`)h.delete('Authorization');h.set('apikey',key);return fetch(input,{...init,headers:h});}}});
 const rows=await client.rpc('public_institution_resources');const row=rows.data?.find(r=>r.id===params.id&&r.kind==='pdf');if(!row?.file_path)return new Response(null,{status:404,headers:{'Cache-Control':'no-store'}});
 const file=await client.storage.from('institution-publications').download(row.file_path);if(file.error||!file.data)return new Response(null,{status:404});
 return new Response(file.data,{headers:{'Content-Type':'application/pdf','Content-Disposition':`${new URL(request.url).searchParams.has('download')?'attachment':'inline'}; filename="circular.pdf"`,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}}}});