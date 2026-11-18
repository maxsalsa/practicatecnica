import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
export const Route = createFileRoute("/legal")({ staticData: { sitemap: true },
    head: () => ({
        meta: [{ title: "Términos, privacidad y aviso legal · practicatecnica.com" },
            { name: "description", content: "Términos de uso, política de privacidad (Ley 8968), pagos y aviso legal de practicatecnica.com." },
            { property: "og:title", content: "Términos y privacidad · practicatecnica.com" },
            { property: "og:description", content: "Condiciones de uso, datos personales y pagos SINPE." },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary" },
        ],
    }),
    component: Legal,
});
const sections, string, [], [] = [
    ["1. Aviso legal", [
            "practicatecnica.com es una plataforma de preparación independiente desarrollada por GICM Desarrollo de Sistemas Digitales y Constructivos ICM. Responsable Sánchez, contacto +506 6090 6359.",
            "No tiene afiliación oficial con el MEP, el MOPT, COSEVI ni ninguna universidad. Los nombres de pruebas se usan solo como referencia. Los resultados de práctica no sustituyen evaluaciones oficiales.",
        ]],
    ["2. Términos de uso", [
            "Estas condiciones regulan el servicio. Las cuentas son personales e intransferibles. Leer un aviso institucional no equivale a aceptar un contrato; esta página no acredita una aceptación individual ni retroactiva.",
            "La marca, el software y los materiales originales pertenecen a GICM Desarrollo de Sistemas Digitales y Constructivos ICM. La suscripción concede uso personal o de aula autorizado, no propiedad ni permiso de reventa. Las fuentes y materiales de terceros conservan sus derechos y licencias.",
            "Nos esforzamos por que las preguntas sean correctas, pero pueden existir errores. Si encuentra uno, repórtelo por WhatsApp.",
            "Podemos suspender cuentas que hagan uso abusivo o fraudulento del servicio.",
        ]],
    ["3. Planes y pagos", [
            "Prueba gratis 13 días naturales de acceso completo sin costo y sin datos de pago. Al terminar, la cuenta conserva el Inicio y la Biblioteca; para practicar, hacer simulacros y competir en ligas debe suscribirse.",
            "Planes anuales vigentes por 12 meses desde la activación: Estudiantes ₡2.500; Estudiantes de colegio con plan institucional vigente y matrícula verificada ₡1.000; Público General y Docentes ₡3.500; Institución educativa ₡10.000. El plan institucional cubre al personal verificado de esa institución y no incluye el plan de cada estudiante.",
            "SINPE Móvil requiere revisión administrativa. Los cobros reales PayPal y tarjeta están bloqueados hasta completar las pruebas y verificaciones necesarias; Visa, Stripe y Google Pay no se presentan como habilitados. Cuando se habilite un pago, revise antes de aprobar el monto, moneda, conversión y comisiones mostrados. No guardamos números de tarjeta.",
            "Pago por SINPE Móvil al 6090 6359 (Max Salazar Sánchez, Banco Popular). Registrar un comprobante no activa el plan: administración debe confirmar la transferencia real antes de habilitar los 12 meses de acceso.",
            "Reembolsos 14 días naturales siguientes al pago. Las suscripciones anteriores gestionadas por Paddle conservan sus condiciones de renovación y cancelación; no se trasladan automáticamente a PayPal directo.",
            "El comprobante SINPE no es una factura electrónica de Hacienda.",
            "Para pedidos efectivamente procesados por Paddle, Paddle.com actúa como Merchant of Record (revendedor), gestionando cobro, impuestos y facturación, y aplican sus condiciones del comprador: https://www.paddle.com/legal/checkout-buyer-terms. Esta referencia no significa que el cobro esté habilitado. Cambiar de proveedor no migra automáticamente suscripciones existentes.",
            "Los pagos anuales SINPE y PayPal directo no autorizan por sí solos renovaciones automáticas. Para una suscripción recurrente anterior, revise las condiciones del proveedor y solicite asistencia para cancelarla; solicitar cancelación no demuestra que ya se haya completado ni equivale a un reembolso.",
        ]],
    ["Derechos, deberes y alcance de la suscripción", [
            "Usted tiene derecho a conocer el precio y alcance antes de pagar, consultar sus pagos registrados, recibir el acceso contratado tras confirmación, solicitar soporte y reportar errores o problemas de acceso. La compra no concede roles docentes, administrativos ni acceso a otra familia.",
            "Debe proporcionar información veraz, proteger su cuenta, no compartir credenciales, respetar a otras personas y no falsificar comprobantes, autorizaciones ni resultados. La dirección y el personal solo deben actuar dentro de sus permisos y verificar los documentos antes de aprobarlos.",
            "El servicio no garantiza aprobar exámenes oficiales ni cobertura curricular completa. Recreación, anotaciones docentes y resultados de IA no sustituyen evidencia académica verificada. La IA de pago necesita autorización individual; no se incluye uso ilimitado de servicios externos.",
            "Comedor y asistencia son distintos de la suscripción. Cada institución autoriza sus tarifas, becas y cortesías; no se cobra una tarifa propia por asistencia. Una referencia SINPE de tiquetes no acredita saldo sin verificación.",
            "El correo y la identificación familiar no autorizan una firma institucional. Un QR y SHA-256 permiten contrastar registros e integridad; no equivalen a firma digital certificada ni validación oficial de cédula. Avisos internos no garantizan entrega push o correo.",
        ]],
    ["Accesibilidad, inclusión y DUA", [
            "El compromiso de calidad es aplicar Diseño Universal para el Aprendizaje a prácticas, trabajos, preguntas e ítems: instrucciones claras, apoyos pertinentes y alternativas de representación y respuesta acordes al objetivo evaluado.",
            "Se procuran contextos diversos, trato respetuoso y neutral, sin estereotipos ni discriminación. Los apoyos no deben revelar respuestas de simulacros ni cambiar automáticamente sus tiempos, intentos o criterios de certificación.",
            "La revisión es progresiva certificación WCAG de todo el catálogo. Puede solicitar ayuda o comunicar barreras por WhatsApp al +506 60906359 o a maxi.salsa@gmail.com.",
        ]],
    ["4. Privacidad (Ley 8968)", [
            "Responsable del tratamiento, que decide la finalidad y los medios del tratamiento de sus datos.",
            "Datos que recopilamos, correo, nivel académico, resultados de práctica, visitas y actividad, solicitudes de soporte y, al pagar, teléfono y número de comprobante. El carné o libro de comunicación es opcional y privado; evite incluir datos de terceros innecesarios.",
            "Finalidad, guardar su avance, permitir que docentes autorizados vean el progreso de su grupo y verificar pagos. No vendemos sus datos.",
            "Base del tratamiento: prestación del servicio solicitado, cumplimiento de obligaciones legales sobre pagos y consentimiento para documentos opcionales. Los menores de edad deben usar el sitio con autorización de su madre, padre o encargado.",
            "Personas menores de edad (protección reforzada): solo pedimos los datos mínimos para estudiar; no hay perfiles públicos ni chat entre estudiantes. En los canales institucionales el estudiantado solo lee los avisos de su sección. Las familias conversan únicamente con el personal de la institución, los insultos se bloquean y las fotos o documentos que envían quedan en revisión hasta que la dirección o la persona guía los aprueben.",
            "Comunicación institucional institución afiliada decide quién integra su personal, sus secciones y las familias vinculadas, y GICM trata esos datos por cuenta de ella. Avisos, permisos y mensajes quedan registrados con fecha y autor como respaldo; la moderación puede ocultar mensajes sin borrarlos del registro. Antes de subirse, las fotos se procesan en su teléfono para quitar datos ocultos como la ubicación.",
            "Destinatarios autorizados; docentes únicamente respecto de su grupo; proveedores de alojamiento, autenticación, almacenamiento y entrega de correo necesarios para operar el servicio. PayPal procesa los pagos directos y los datos necesarios para cobro y prevención de fraude. Paddle.com actúa como Merchant of Record (revendedor) para la venta, gestión de suscripciones, cobros, impuestos y facturación de los pedidos procesados por Paddle. También podemos compartir datos con asesores profesionales (legales o contables) y con autoridades cuando la ley lo exija. No guardamos números de tarjeta.",
            "Conservación: los datos de perfil y avance se mantienen mientras la cuenta esté vigente. Puede solicitar eliminación; los documentos opcionales se conservan hasta su eliminación o cierre de la cuenta. Registros de pago y auditoría se conservan únicamente durante los plazos legales aplicables o para resolver reclamaciones. Las copias de respaldo pueden tardar en reflejar una eliminación.",
            "Medidas de seguridad, acceso autenticado y restringido por rol, separación de datos por usuario, documentos en almacenamiento privado con enlaces temporales, autorización del servidor para operaciones administrativas y registro de cambios de estado. Ningún sistema garantiza seguridad absoluta; comunique incidentes al contacto indicado.",
            "Cookies sesión, preferencias de tema e idioma y el avance guardado; no usamos cookies publicitarias. Puede borrarlo desde la configuración de su navegador.",
            "Usted puede pedir acceso, rectificación, cancelación u oposición sobre sus datos (derechos ARCO) por WhatsApp al +506 6090 6359 o al correo maxi.salsa@gmail.com; responderemos dentro de los plazos de la Ley 8968. Si considera que sus derechos no fueron atendidos, puede acudir a la Agencia de Protección de Datos de los Habitantes (PRODHAB).",
        ]],
    ["5. Cambios", ["Podemos actualizar estas condiciones; la versión vigente es siempre la publicada en esta página. Última actualización: noviembre de 2026."]],
];
function Legal() {
    return (<main className="min-h-screen bg-hero">
      <SiteHeader />
      <article className="mx-auto max-w-3xl space-y-6 px-5 pb-16">
        <h1 className="text-4xl font-black">Términos, privacidad y aviso legal</h1>
        {sections.map(([t, ps]) => (<section key={t} className="border-t border-border pt-6">
            <h2 className="text-xl font-extrabold">{t}</h2>
            {ps.map((p) => <p key={p} className="mt-2 text-sm leading-relaxed">{p}</p>)}
          </section>))}
      </article>
    </main>);
}
