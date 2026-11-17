import {expect,it,vi} from 'vitest';
vi.mock('@tanstack/react-start',()=>({createServerFn:()=>({middleware(){return this;},inputValidator(){return this;},handler(fn:unknown){return fn;}})}));
vi.mock('@/integrations/supabase/auth-middleware',()=>({requireSupabaseAuth:{}}));
import {prepareAreaBank} from './area-bank.functions';
it('student cannot load canonical keys or create institutional review drafts',async()=>{
 const from=vi.fn(),rpc=vi.fn().mockImplementation((name:string)=>Promise.resolve({data:name==='has_role'?false:'estudiante',error:null}));
 const invoke=prepareAreaBank as unknown as (i:unknown)=>Promise<unknown>;
 await expect(invoke({data:{institutionId:'test',key:'ingles'},context:{userId:'student',supabase:{rpc,from}}})).rejects.toThrow('Solo Dirección');expect(from).not.toHaveBeenCalled();
});