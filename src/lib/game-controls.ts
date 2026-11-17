export function roadKeyboardAction(key:string) {
 const actions={ArrowUp:'avanzar',w:'avanzar',ArrowDown:'retroceder',s:'retroceder',ArrowLeft:'izquierda',a:'izquierda',ArrowRight:'derecha',d:'derecha'} as const;
 return actions[key as keyof typeof actions] ?? actions[key.toLowerCase() as keyof typeof actions];
}
export function pianoKeyboardNote(key:string) {
 const keys=['a','w','s','e','d','f','t','g','y','h','u','j','k'];
 const index=keys.indexOf(key.toLowerCase()); return index<0?null:60+index;
}