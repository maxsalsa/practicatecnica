export const SIMULADOR_REDES_CTP = {
  version: "2026.1.1-CiscoMaster",
  especialidad: "Redes y Telecomunicaciones / CCNA 1 y 2",
  simuladorComandosCisco: {
    activo: true,
    comandosSoportados: [
      { comando: "enable", descripcion: "Accede al modo EXEC privilegiado." },
      { comando: "configure terminal", descripcion: "Ingresa al modo de configuración global." },
      { comando: "interface fastEthernet 0/1", descripcion: "Selecciona una interfaz específica de red." },
      { comando: "ip address 192.168.1.1 255.255.255.0", descripcion: "Asigna una dirección IPv4 y máscara de subred." },
      { comando: "no shutdown", descripcion: "Activa y enciende la interfaz de red." }
    ]
  },
  retosSubnettingYIps: {
    activo: true,
    bancoPreguntasRedes: [
      {
        pregunta: "Dada la dirección IP 192.168.1.10 con máscara 255.255.255.0, ¿cuántos hosts utilizables admite esta subred?",
        opciones: ["254", "256", "510", "1024"],
        respuestaCorrecta: "254",
        explicacion: "Con 8 bits para hosts (32-24=8), 2^8 - 2 = 254 direcciones utilizables."
      },
      {
        pregunta: "¿Qué comando en Cisco IOS permite verificar la tabla de enrutamiento y las redes conectadas directamente?",
        opciones: ["show ip route", "ping 8.8.8.8", "show running-config", "ip routing"],
        respuestaCorrecta: "show ip route",
        explicacion: "Muestra las rutas aprendidas y estáticas del dispositivo."
      }
    ]
  },
  dispositivosYTopologias: {
    activo: true,
    elementos: ["Router (Capa 3 - Enrutamiento)", "Switch Administrable (Capa 2 - Conmutación)", "Hub (Capa 1 - Repetidor pasivo)", "Cables de red (Directo, Cruzado y Consola)"]
  }
};
"// Simulador de Redes y Cisco CTP inicializado correctamente";