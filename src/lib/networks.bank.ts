import type { Deck, Q } from './questions';
import { rng, toQuestion, type Level } from './generators/core';
import { networks } from './generators/applied';
const source = 'Práctica original independiente. IETF RFC 1918, RFC 4632, RFC 4291, RFC 5952, RFC 1034 y RFC 2131; no es examen oficial ni revisión completa del programa MEP.';
function item(q:string, options:string[], answer:number, why:string, difficulty:1|2|3=2):Q {return {q,options,answer,why,difficulty,source};}
const ipv4:Q[] = Array.from({length:15},(_,i)=>{
 const octet=10+i; const host=20+i;
 const options=[`192.168.${octet}.0`,`192.168.${octet}.1`,`192.168.${octet}.255`,`192.168.${octet+1}.0`];
 return item(`El laboratorio ${i+1} tiene el equipo 192.168.${octet}.${host}/24. ¿Qué dirección identifica su red?`,options,0,`/24 reserva los primeros 24 bits a la red. Los ocho bits de host se ponen en cero: 192.168.${octet}.0. La dirección .255 es difusión de esta subred.`,1);
});
const ipv6:Q[] = Array.from({length:15},(_,i)=>{
 const subnet=(16+i).toString(16);const host=(32+i).toString(16);
 return item(`Un equipo usa 2001:0db8:${subnet.padStart(4,'0')}:0000:0000:0000:0000:${host.padStart(4,'0')}. ¿Qué escritura comprimida conserva la misma dirección?`,[`2001:db8:${subnet}::${host}`,`2001:db8::${subnet}:${host}`,`2001:db8:${subnet}:${host}::`,`2001:db8:${subnet}::${host}::`],0,`Se quitan ceros iniciales de cada grupo y se sustituye una sola secuencia consecutiva de grupos cero por ::. La posición de ${subnet} y ${host} no cambia. 2001:db8::/32 está reservado para documentación.`,2);
});
const requirements=[6,10,14,20,28,30,40,50,60,90,100,120,150,200,250];
const subnets:Q[]=requirements.map((hosts,i)=>{
 const bits=Math.ceil(Math.log2(hosts+2)); const prefix=32-bits;const usable=2**bits-2;
 return item(`La oficina ${i+1} necesita ${hosts} equipos IPv4 en una subred convencional, reservando red y difusión. ¿Cuál es el prefijo más largo que permite alojarlos?`,[`/${prefix}`,`/${prefix+1}`,`/${prefix-1}`,`/${prefix-2}`],0,`Se necesitan al menos ${hosts+2} direcciones. Con ${bits} bits de host hay ${2**bits} direcciones, ${usable} utilizables: /${prefix}. /${prefix+1} solo permite ${2**(bits-1)-2} equipos. No se aplica aquí la excepción /31 de enlaces punto a punto.`,3);
});
const serviceRows:[string,string[],number,string][]=[
 ['Una computadora alcanza un servidor por IP, pero no por su nombre. ¿Qué servicio conviene revisar primero?',['DNS','NTP','Impresión','DHCP únicamente'],0,'DNS traduce nombres a direcciones. Si la conectividad por IP funciona, revisar la resolución de nombres ayuda a aislar el problema.'],
 ['Un equipo nuevo necesita dirección, máscara y puerta de enlace automáticamente. ¿Qué servicio se utiliza?',['DHCP','DNS','SSH','NTP'],0,'DHCP entrega parámetros de red mediante una concesión. DNS resuelve nombres y NTP sincroniza la hora.'],
 ['Un cliente DHCP inicia sin dirección. ¿Cuál es el primer mensaje del intercambio habitual DORA?',['Discover','Offer','Request','Acknowledgment'],0,'DORA significa Discover, Offer, Request, Acknowledgment. El cliente primero busca servidores disponibles.'],
 ['Un servidor ofrece una configuración DHCP. ¿Qué mensaje envía el cliente al solicitar esa oferta?',['Request','Discover','Acknowledgment','DNS query'],0,'Después de Offer, el cliente envía Request; el servidor confirma con ACK si concede la configuración.'],
 ['Un servidor confirma una concesión DHCP aceptada. ¿Qué mensaje corresponde?',['ACK','Discover','Offer','HTTP GET'],0,'DHCPACK confirma la concesión; no es una respuesta de DNS ni un mensaje HTTP.'],
 ['Los registros de equipos muestran horas distintas. ¿Qué servicio ayuda a sincronizarlas?',['NTP','DNS','DHCP','SMTP'],0,'NTP sincroniza relojes. La hora coherente facilita revisar registros y validar certificados.'],
 ['Se requiere administrar un equipo remoto por un canal cifrado. ¿Qué protocolo es apropiado?',['SSH','Telnet','HTTP sin TLS','TFTP'],0,'SSH cifra la sesión. Telnet transmite información sin esa protección; no es una alternativa segura.'],
 ['Una aplicación web necesita proteger el tránsito entre navegador y servidor. ¿Qué combinación corresponde?',['HTTPS con TLS','HTTP sin TLS','DNS solo','DHCP con dirección fija'],0,'HTTPS usa TLS para proteger confidencialidad e integridad y autenticar el servidor cuando la validación del certificado es correcta.'],
 ['Una consulta busca la dirección IPv4 de un nombre. ¿Qué tipo de registro DNS se solicita?',['A','AAAA','MX','TXT'],0,'A contiene una dirección IPv4. AAAA contiene IPv6; MX identifica servidores de correo.'],
 ['Una consulta busca la dirección IPv6 de un nombre. ¿Qué registro DNS corresponde?',['AAAA','A','MX','PTR únicamente'],0,'AAAA almacena una dirección IPv6. A es para IPv4; PTR se utiliza en resolución inversa.'],
 ['Una organización publica qué servidor recibe su correo. ¿Qué registro DNS usa?',['MX','A exclusivamente','AAAA exclusivamente','CNAME obligatorio'],0,'MX especifica el intercambiador de correo y su prioridad. La dirección del servidor se resuelve por registros de dirección.'],
 ['Dos equipos tienen la misma IPv4 manual. ¿Cuál es una causa probable de conectividad intermitente?',['Conflicto de dirección','Compresión IPv6','Cambio de registro MX','Exceso de grupos hexadecimales'],0,'Las direcciones deben ser únicas dentro de la red. Un conflicto provoca respuestas ambiguas y fallos intermitentes.'],
 ['Un equipo llega a vecinos de su subred, pero no a redes remotas. ¿Qué parámetro debe revisar?',['Puerta de enlace predeterminada','Registro MX','Nombre del archivo','Resolución de pantalla'],0,'La puerta de enlace permite enviar tráfico hacia otras redes. La conectividad local puede funcionar aun si ese parámetro es incorrecto.'],
 ['Un ping falla, pero HTTPS al mismo equipo funciona. ¿Cuál es la conclusión prudente?',['ICMP podría estar filtrado; no prueba caída total','El servidor está apagado necesariamente','DNS está roto necesariamente','DHCP agotó todas las direcciones necesariamente'],0,'ICMP puede estar bloqueado mientras otros protocolos funcionan. Una prueba aislada no establece por sí sola la causa del fallo.'],
 ['Tras cambiar un registro DNS, algunos clientes aún ven el valor anterior. ¿Qué explicación es posible?',['Caché dentro de su TTL','IPv6 no admite DNS','DHCP elimina DNS','TLS fija la IP para siempre'],0,'Las respuestas DNS se conservan en caché según su TTL. La actualización no obliga a vaciar inmediatamente todas las cachés.'],
];
const services=serviceRows.map(([q,options,a,why])=>item(q,options,a,why,2));
const units=[ipv4,ipv6,subnets,services];
// v1 blocks keep their original 15 canonical indices; items 16-20 are appended so practices reach 20 without moving legacy keys.
function fixedGenerated(seed:number, picks:number[]):Q[] {const r=rng(seed);return picks.map((g,i)=>{const level=(1+(i%3)) as Level;for(;;){const q=toQuestion(r,networks[g]!(r,level),level,source);if(q)return q;}});}
const ipv6Extra=[
 item('¿Cuántos bits tiene una dirección IPv6?',['128','32','64','48'],0,'IPv6 usa direcciones de 128 bits, escritas en ocho grupos de 16 bits en hexadecimal.',1),
 item('Según la recomendación RFC 5952, ¿cuál es la forma abreviada de 2001:0db8:0000:0000:0000:0000:0000:0001?',['2001:db8::1','2001::db8::1','2001:db8:1','2001:0db8::1::'],0,'Se eliminan los ceros a la izquierda y la secuencia más larga de grupos en cero se reemplaza una sola vez por «::».',2),
 item('¿Qué prefijo identifica las direcciones IPv6 de enlace local (link-local)?',['fe80::/10','2001:db8::/32','ff00::/8','::1/128'],0,'fe80::/10 es enlace local; 2001:db8::/32 es para documentación, ff00::/8 multidifusión y ::1 la dirección de bucle local.',2),
 item('¿Cuál es la dirección de bucle local (loopback) en IPv6?',['::1','127.0.0.1','fe80::1','::'],0,'En IPv6 el loopback es ::1; 127.0.0.1 corresponde a IPv4 y :: es la dirección no especificada.',1),
 item('¿Qué mecanismo permite a un equipo IPv6 autoconfigurar su dirección con los anuncios del enrutador?',['SLAAC','NAT','ARP','DHCPv4'],0,'SLAAC (autoconfiguración sin estado) usa los anuncios de enrutador para formar la dirección sin servidor DHCP.',3),
];
const serviceExtra=[
 item('¿Qué puerto usa HTTPS por defecto?',['443','80','22','53'],0,'HTTPS usa TCP 443; HTTP usa 80, SSH 22 y DNS 53.',1),
 item('¿Qué servicio traduce nombres de dominio a direcciones IP?',['DNS','DHCP','SMTP','FTP'],0,'DNS resuelve nombres como ejemplo.cr a direcciones IP.',1),
 item('¿Qué servicio asigna automáticamente direcciones IP a los equipos de una red?',['DHCP','DNS','HTTP','SSH'],0,'DHCP entrega dirección, máscara, puerta de enlace y servidores DNS a los clientes.',1),
 item('¿Qué protocolo se recomienda para administrar un servidor de forma remota y cifrada?',['SSH','Telnet','FTP','HTTP'],0,'SSH cifra la sesión; Telnet y FTP transmiten credenciales sin cifrar.',2),
 item('¿Qué puerto usa DNS por defecto?',['53','25','110','3389'],0,'DNS usa el puerto 53; 25 es SMTP, 110 POP3 y 3389 escritorio remoto.',2),
];
const practiceUnits=[[...ipv4,...fixedGenerated(26021,[5,0,5,0,2])],[...ipv6,...ipv6Extra],[...subnets,...fixedGenerated(26023,[1,3,4,6,2])],[...services,...serviceExtra]];
const titles=['IPv4 y dirección de red','IPv6 y notación','Subredes y capacidad','Servicios y diagnóstico'];
export const networkDecks:Deck[]=[...practiceUnits.map((questions,i)=>({id:`study-network-b${i+1}-v1`,title:`Redes · ${titles[i]}`,emoji:'🔌',level:'CTP · Bloque introductorio independiente, cobertura curricular no completa',questions})),{id:'study-network-mix-v1',title:'Redes · Simulacro mixto de 60 preguntas',emoji:'🔌',level:'CTP · IPv4, IPv6, subredes y servicios; preparación independiente',questions:units.flat()}];