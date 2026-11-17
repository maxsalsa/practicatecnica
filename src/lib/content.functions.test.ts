import {expect,it,vi} from 'vitest';
vi.mock('@tanstack/react-start',()=>({createServerFn:()=>({middleware(){return this;},inputValidator(){return this;},handler(fn:unknown){return fn;}})}));
vi.mock('@/integrations/supabase/auth-middleware',()=>({requireSupabaseAuth:{}}));
import {getAuthorizedContent} from './content.functions';
it('denies a signed-in caller whose verified access has expired',async()=>{
 const rpc=vi.fn().mockResolvedValue({data:[{has_access:false}],error:null});
 const invoke=getAuthorizedContent as unknown as (input:unknown)=>Promise<unknown>;
 await expect(invoke({data:{id:'mopt-carro',lang:'es'},context:{supabase:{rpc}}})).rejects.toThrow('Suscripción o prueba vigente requerida');
 expect(rpc).toHaveBeenCalledWith('my_access');
});