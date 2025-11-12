'use client';

import { Calendar, MessageCircle } from 'lucide-react';

interface RSVPSuccessMessageProps {
  email: string;
  phone: string;
  needsAccommodation: boolean;
  onNewRSVP: () => void;
}

export default function RSVPSuccessMessage({
  email,
  phone,
  needsAccommodation,
  onNewRSVP,
}: RSVPSuccessMessageProps) {
  // URL del evento de Google Calendar (todos se unen al mismo evento)
  const googleCalendarUrl = 'https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MjkxZDdrbDRuNGdqdWd0ZmdjOW1tOGFyaXAgemFqaWRjYW1wb3NAbQ&tmsrc=zajidcampos%40gmail.com';
  
  // Datos del evento para el archivo ICS
  const eventDetails = {
    title: 'TECHNO POSADA 2025',
    description: 'Fiesta techno navideña - La ubicación exacta se enviará por WhatsApp y estará en los detalles del evento',
    location: 'Zapopan, Jalisco',
    startDate: '20251219T200000', // 19 Dic 2025, 20:00
    endDate: '20251220T040000',   // 20 Dic 2025, 04:00
  };

  // Generar archivo ICS para Apple Calendar / Outlook
  const generateICSFile = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Techno Posada//ES
BEGIN:VEVENT
UID:${Date.now()}@technoposada.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${eventDetails.startDate}
DTEND:${eventDetails.endDate}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'techno-posada-2025.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 bg-zinc-900/70 border-2 border-cyan-500 text-center rounded-2xl backdrop-blur-sm space-y-6">
      {/* Ícono de éxito */}
      <div className="mb-6">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-cyan-400 mb-4">
          ¡CONFIRMACIÓN EXITOSA!
        </h3>
        <p className="text-zinc-300 text-base md:text-lg mb-4">
          Gracias por confirmar tu asistencia a la Techno Posada 2025
        </p>
      </div>

      {/* Información importante */}
      <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-cyan-500/30 rounded-xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <MessageCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
          <div className="text-left">
            <p className="text-white font-bold mb-2">📍 Ubicación exacta</p>
            <p className="text-gray-300 text-sm">
              Te enviaremos la dirección completa a tu WhatsApp <span className="text-cyan-400 font-mono">{phone}</span> unos días antes del evento.
            </p>
          </div>
        </div>

        <div className="h-px bg-cyan-500/20"></div>

        <div className="flex items-start gap-3">
          <Calendar className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
          <div className="text-left">
            <p className="text-white font-bold mb-2">📧 Confirmación por email</p>
            <p className="text-gray-300 text-sm">
              Enviamos todos los detalles a <span className="text-cyan-400 font-mono">{email}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Botones para agregar al calendario */}
      <div className="space-y-4">
        <p className="text-white font-bold text-lg">
          📅 Agrega el evento a tu calendario
        </p>
        <p className="text-gray-400 text-sm">
          La ubicación exacta se actualizará en el evento de tu calendario antes de la fiesta
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.open(googleCalendarUrl, '_blank')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
          >
            <Calendar className="w-5 h-5" />
            <span>Google Calendar</span>
          </button>

          <button
            onClick={generateICSFile}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          >
            <Calendar className="w-5 h-5" />
            <span>Apple / Outlook</span>
          </button>
        </div>
      </div>

      {/* Información de hospedaje */}
      {needsAccommodation && (
        <div className="mt-6 p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-xl">
          <p className="text-cyan-400 font-mono text-sm">
            🏠 Solicitaste hospedaje. Te contactaremos pronto con la información.
          </p>
        </div>
      )}

      {/* Botón para nueva confirmación */}
      <button
        onClick={onNewRSVP}
        className="mt-8 px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold hover:bg-cyan-400/10 transition-all rounded-xl"
      >
        NUEVA CONFIRMACIÓN
      </button>
    </div>
  );
}
