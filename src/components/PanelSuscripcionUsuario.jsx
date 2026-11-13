import React, { useState } from 'react';

export default function PanelSuscripcionUsuario({ usuario = null, onCerrar = null }) {
  const [planSeleccionado, setPlanSeleccionado] = useState('estudiante');
  const [copiado, setCopiado] = useState(false);

  const planes = {
    estudiante: {
      id: 'estudiante',
      titulo: 'Plan Estudiante',
      precio: '₡1.500',
      periodo: 'por año (12 meses)',
      descripcion: 'Acceso total a Primaria, Secundaria, CTP, simulacros y certificados SHA-256.',
      destacado: true,
    },
    docente: {
      id: 'docente',
      titulo: 'Plan Docente / Público General',
      precio: '₡3.500',
      periodo: 'por año (12 meses)',
      descripcion: 'Incluye creador de exámenes protegidos, seguimiento de grupos, MOPT/COSEVI, idiomas y admisión.',
      destacado: false,
    },
  };

  const numeroSinpe = '60906359';

  const copiarSinpe = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(numeroSinpe);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    }
  };

  const planActual = planes[planSeleccionado];
  const mensajeWhatsApp = encodeURIComponent(
    `Hola Ing. Max Salazar, adjunto mi comprobante SINPE Móvil por ${planActual.precio} (${planActual.titulo}) para activar mi suscripción anual en pracTICAtecnica.com. Correo: ${usuario?.email || ''}`
  );

  return (
    <section className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-[#0B132B] text-white rounded-2xl border border-slate-800 shadow-2xl">
      {/* Encabezado */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[#10B981]/20 text-[#10B981] mb-2">
            13 días de prueba gratuita sin tarjeta
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Suscripción Anual · prac<span className="text-[#3B82F6] underline decoration-[#10B981] decoration-2">TICA</span>tecnica.com
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Repase. Practique. Prepárese. Acceso continuo durante 12 meses a precio popular.
          </p>
        </div>
        {onCerrar && (
          <button
            onClick={onCerrar}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
            aria-label="Cerrar panel de suscripción"
          >
            Cerrar
          </button>
        )}
      </div>

      {/* Selector de Planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {Object.values(planes).map((plan) => {
          const activo = planSeleccionado === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setPlanSeleccionado(plan.id)}
              className={`text-left p-5 rounded-xl border-2 transition-all ${
                activo
                  ? 'border-[#10B981] bg-slate-900/90 shadow-lg'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white">{plan.titulo}</span>
                {plan.destacado && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#2563EB] text-white">
                    Más elegido
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#10B981]">{plan.precio}</span>
                <span className="text-xs text-slate-400">{plan.periodo}</span>
              </div>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">{plan.descripcion}</p>
            </button>
          );
        })}
      </div>

      {/* Pasarela SINPE Móvil Oficial */}
      <div className="mt-6 p-5 rounded-xl bg-slate-900 border border-[#2563EB]/40">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
          Pago Oficial por SINPE Móvil (Costa Rica)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
          <div className="p-3 rounded-lg bg-[#0B132B] border border-slate-800">
            <span className="block text-xs text-slate-400">Número SINPE Móvil</span>
            <div className="flex items-center justify-between mt-1">
              <strong className="text-lg font-black text-white tracking-wide">+506 6090 6359</strong>
              <button
                type="button"
                onClick={copiarSinpe}
                className="px-2.5 py-1 text-xs font-bold rounded bg-[#2563EB] hover:bg-blue-500 text-white"
              >
                {copiado ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#0B132B] border border-slate-800">
            <span className="block text-xs text-slate-400">Titular y Entidad</span>
            <strong className="block text-sm font-bold text-white mt-1">Max Salazar Sánchez</strong>
            <span className="text-xs text-slate-300">Banco Popular y de Desarrollo Comunal</span>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-lg bg-[#0B132B] border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
          <span>
            Monto a transferir: <strong className="text-[#10B981] text-sm">{planActual.precio}</strong>
          </span>
          <span>
            Detalle sugerido: <strong className="text-white px-2 py-0.5 rounded bg-slate-800">.</strong>
          </span>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/50660906359?text=${mensajeWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-3 px-4 rounded-xl font-bold text-sm bg-[#10B981] hover:bg-emerald-400 text-[#0B132B] transition-colors"
          >
            Enviar comprobante por WhatsApp (+506 6090 6359)
          </a>
        </div>
      </div>

      {/* Deslinde Legal Ley 8968 e Independencia */}
      <footer className="mt-5 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
        <p>
          Preparación educativa independiente titularidad exclusiva de GICM Desarrollo de Sistemas Digitales y Constructivos ICM. Sin afiliación oficial al MEP, MOPT, COSEVI ni universidades públicas.
        </p>
        <p>
          Datos protegidos conforme a la Ley N.° 8968 de Costa Rica (PRODHAB). Derechos ARCO disponibles al +506 6090 6359.
        </p>
      </footer>
    </section>
  );
}
