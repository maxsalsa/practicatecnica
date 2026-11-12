import React, { useState, useEffect } from 'react';
import { verificarAccesoPro } from '../utils/controlSuscripciones';
import { ShieldCheck, Clock, CreditCard, ExternalLink, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function PanelSuscripcionUsuario({ emailUsuario, onAbrirPasarela }) {
  const [estadoAcceso, setEstadoAcceso] = useState(null);
  const [mostrarPagos, setMostrarPagos] = useState(false);

  const PAYPAL_URL = 'https://www.paypal.com/ncp/payment/WAJQEQHLJ2QYU';
  const WHATSAPP_URL = 'https://wa.me/50660906359?text=Hola%20Max,%20adjunto%20comprobante%20de%20pago%20para%20activar%20mi%20cuenta%20Pro%20en%20Pr%C3%A1ctica%20T%C3%A9cnica.';

  useEffect(() => {
    const acceso = verificarAccesoPro(emailUsuario);
    setEstadoAcceso(acceso);
  }, [emailUsuario]);

  const abrirPayPal = async () => {
    try {
      if (supabase) {
        await supabase.from('payment_logs').insert([{
          user_email: emailUsuario || 'usuario@practicatecnica.com',
          platform: 'practicatecnica',
          payment_method: 'PAYPAL_VISA',
          amount: 15,
          currency: 'USD',
          reference_code: 'CLICK_PANEL_SUSCRIPCION',
          status: 'pending'
        }]);
      }
    } catch (e) {
      console.error(e);
    }
    window.open(PAYPAL_URL, '_blank', 'noopener,noreferrer');
  };

  if (!estadoAcceso) return null;

  return (
    <div className="card bg-base-100 shadow-xl border border-primary/20 p-4 my-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {estadoAcceso.esPro ? (
            <ShieldCheck className="w-8 h-8 text-success shrink-0" />
          ) : (
            <Clock className="w-8 h-8 text-warning shrink-0" />
          )}
          <div>
            <h3 className="font-bold text-base">
              {estadoAcceso.esPro ? 'Suscripción PRO Activa' : 'Modo Prueba / Activar Plan PRO'}
            </h3>
            <p className="text-xs opacity-75">
              {estadoAcceso.mensaje || 'Activa acceso ilimitado con PayPal, Tarjeta Visa o SINPE Móvil.'}
            </p>
          </div>
        </div>

        {!estadoAcceso.esPro && (
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={abrirPayPal}
              className="btn btn-primary btn-sm font-bold text-white flex-1 sm:flex-initial gap-1 shadow"
            >
              <CreditCard className="w-4 h-4" />
              Pagar con PayPal / Visa
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => setMostrarPagos(!mostrarPagos)}
              className="btn btn-outline btn-secondary btn-sm font-bold flex-1 sm:flex-initial"
            >
              SINPE Móvil
            </button>
          </div>
        )}
      </div>

      {mostrarPagos && !estadoAcceso.esPro && (
        <div className="mt-4 pt-3 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-3 bg-base-200 p-3 rounded-lg">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase opacity-70">Transferencia SINPE Móvil Oficial</span>
            <p className="text-lg font-black text-secondary">6090-6359</p>
            <p className="text-xs opacity-80">Titular: Max Salazar
