import React from "react";
import { Lock, ShieldCheck, UserCheck, Database, FileText } from "lucide-react";

export function PoliticaPrivacidadSeguridad() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-slate-300">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
        <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/30">
          <Lock className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Seguridad de la Información y Política de Privacidad (Ley 8968 PRODHAB)
          </h1>
          <p className="text-xs text-slate-400">
            Ing. Max Salazar Sánchez · Servicios Profesionales ICM · www.practicatecnica.com
          </p>
        </div>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 shadow-lg">
          <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            1. Protección de Datos Personales de Menores y Estudiantes
          </h2>
          <p>
            En estricto cumplimiento con la <strong>Ley de Protección de la Persona Frente al Tratamiento de sus Datos Personales (Ley N.° 8968)</strong> de la República de Costa Rica, <strong className="text-white">pracTICAtecnica.com</strong> garantiza que la recolección de datos de trazabilidad académica, saberes esenciales y simulacros se realiza bajo principios de licitud, consentimiento informado y seguridad técnica avanzada. No comercializamos ni compartimos datos con terceros.
          </p>
        </div>

        <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 shadow-lg">
          <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-2">
            <Database className="h-5 w-5 text-cyan-400" />
            2. Cifrado en Tránsito (HTTPS) y Almacenamiento Seguro
          </h2>
          <p>
            Toda la comunicación entre la persona estudiante/docente y nuestros servidores se encuentra cifrada extremo a extremo mediante protocolos <strong className="text-white">TLS/SSL (HTTPS estricto)</strong>. Las credenciales de pago y transacciones mediante <strong className="text-white">Tilopay</strong> y <strong className="text-white">Google Pay</strong> se procesan en pasarelas certificadas PCI-DSS Nivel 1; nuestra plataforma nunca almacena números de tarjetas de crédito o débito completas en bases de datos locales.
          </p>
        </div>

        <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 shadow-lg">
          <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-2">
            <UserCheck className="h-5 w-5 text-amber-400" />
            3. Control de Acceso Basado en Roles (RBAC) y Auditoría
          </h2>
          <p>
            El acceso al sistema está segmentado por perfiles de seguridad estrictos (<strong className="text-white">SUPER_ADMIN</strong>, <strong className="text-white">DOCENTE</strong>, <strong className="text-white">ESTUDIANTE</strong> y <strong className="text-white">ENCARGADO_LEGAL</strong>). El SuperAdmin mantiene bitácoras de auditoría cifradas para verificar la integridad de las notas de los simulacros oficiales de 60 preguntas, evitando alteraciones no autorizadas en las calificaciones.
          </p>
        </div>

        <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 shadow-lg">
          <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-purple-400" />
            4. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
          </h2>
          <p>
            Los usuarios o sus encargados legales pueden ejercer sus derechos de acceso, rectificación o supresión de datos de trazabilidad enviando una solicitud formal al correo administrativo o al canal oficial de soporte técnico con el Ing. Max Salazar Sánchez.
          </p>
        </div>
      </div>
    </div>
  );
}
