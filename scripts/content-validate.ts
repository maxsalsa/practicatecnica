import {validateContent} from './content-lib';
import {main,report} from './shared';
main(async()=>{const{result}=await validateContent();await report('contenido.json',result);console.log(JSON.stringify(result,null,2));});
