export function institutionSectionLinks(institutionId:string,section:string){
 const link=(vista:string)=>`https://practicatecnica.com/institucion?${new URLSearchParams({vista,centro:institutionId,seccion:section})}`;
 return {student:link('mi-horario'),family:link('resultados'),channels:link('canales')};
}