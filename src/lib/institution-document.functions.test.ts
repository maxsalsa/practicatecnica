import {expect,it,vi} from 'vitest';
vi.mock('@tanstack/react-start',()=>({createServerFn:()=>({middleware(){return this;},inputValidator(){return this;},handler(fn:unknown){return fn;}})}));
vi.mock('@/integrations/supabase/auth-middleware',()=>({requireSupabaseAuth:{}}));
const download=vi.hoisted(()=>vi.fn());
vi.mock('@/integrations/supabase/client.server',()=>({supabaseAdmin:{storage:{from:()=>({download})}}}));
import {downloadInstitutionDocument} from './institution-document.functions';
const invoke=downloadInstitutionDocument as unknown as (input:unknown)=>Promise<unknown>;
it('denies missing document authorization before reading private bytes',async()=>{
 download.mockClear();const table={select(){return this;},eq(){return this;},maybeSingle:vi.fn().mockResolvedValue({data:null,error:null})};
 await expect(invoke({data:{path:'institution/private.pdf'},context:{supabase:{from:()=>table}}})).rejects.toThrow('Documento no disponible');expect(download).not.toHaveBeenCalled();
});
it('denies a membership removed while the document is being read',async()=>{
 download.mockResolvedValue({data:new Blob(['private']),error:null});const table={select(){return this;},eq(){return this;},maybeSingle:vi.fn().mockResolvedValueOnce({data:{id:'doc',path:'institution/private.pdf'},error:null}).mockResolvedValueOnce({data:null,error:null})};
 await expect(invoke({data:{path:'institution/private.pdf'},context:{supabase:{from:()=>table}}})).rejects.toThrow('Acceso retirado');
});