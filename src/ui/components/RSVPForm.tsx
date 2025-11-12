'use client';

import { useState } from 'react';
import { RSVPFormData } from '../../domain/entities/Ticket';

interface RSVPFormProps {
  accommodationAvailable: number;
}

export default function RSVPForm({ accommodationAvailable }: RSVPFormProps) {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    email: '',
    city: '',
    needsAccommodation: false,
    interestedInTequilaTour: false,
    guests: 1,
    dietaryRestrictions: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de envío - aquí conectarás con tu backend
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('RSVP Data:', formData);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value,
      }));
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 md:p-8 bg-zinc-900/70 border-2 border-cyan-500 text-center rounded-2xl backdrop-blur-sm">
        <div className="mb-6">
          <div className="text-6xl mb-4">✓</div>
          <h3 className="text-2xl md:text-3xl font-black text-cyan-400 mb-4">
            ¡CONFIRMACIÓN EXITOSA!
          </h3>
          <p className="text-zinc-300 text-base md:text-lg mb-4">
            Gracias por confirmar tu asistencia a la Techno Posada 2025
          </p>
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-purple-900/30 border border-purple-500/30 rounded-xl">
            <span className="text-purple-400 font-mono text-xs md:text-sm">
              ▸ Te enviaremos los detalles a: <span className="text-cyan-400">{formData.email}</span>
            </span>
          </div>
        </div>

        {formData.needsAccommodation && (
          <div className="mt-6 p-4 bg-cyan-900/20 border border-cyan-500/30">
            <p className="text-cyan-400 font-mono text-sm">
              🏠 ¡Perfecto! Te contactaremos pronto con información sobre el hospedaje.
            </p>
          </div>
        )}

        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              city: '',
              needsAccommodation: false,
              interestedInTequilaTour: false,
              guests: 1,
              dietaryRestrictions: '',
              message: '',
            });
          }}
          className="mt-8 px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold hover:bg-cyan-400/10 transition-all"
        >
          NUEVA CONFIRMACIÓN
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 px-4">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-cyan-400 font-mono text-sm mb-2">
            NOMBRE COMPLETO *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-900/50 border-2 border-cyan-500/30 focus:border-cyan-500 text-white outline-none transition-all font-mono rounded-xl"
            placeholder="Tu nombre"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-cyan-400 font-mono text-sm mb-2">
            EMAIL *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-900/50 border-2 border-cyan-500/30 focus:border-cyan-500 text-white outline-none transition-all font-mono rounded-xl"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Ciudad */}
        <div>
          <label htmlFor="city" className="block text-cyan-400 font-mono text-sm mb-2">
            CIUDAD DE ORIGEN *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-900/50 border-2 border-cyan-500/30 focus:border-cyan-500 text-white outline-none transition-all font-mono rounded-xl"
            placeholder="Ciudad, Estado"
          />
        </div>

        {/* Número de invitados */}
        <div>
          <label htmlFor="guests" className="block text-cyan-400 font-mono text-sm mb-2">
            ¿CUÁNTOS ASISTIRÁN? *
          </label>
          <select
            id="guests"
            name="guests"
            required
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-900/50 border-2 border-cyan-500/30 focus:border-cyan-500 text-white outline-none transition-all font-mono rounded-xl"
          >
            <option value={1}>Solo yo</option>
            <option value={2}>2 personas</option>
            <option value={3}>3 personas</option>
            <option value={4}>4 personas</option>
            <option value={5}>5+ personas</option>
          </select>
        </div>
      </div>

      {/* Hospedaje */}
      <div className="p-6 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-2 border-purple-500/20 rounded-xl">
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            id="needsAccommodation"
            name="needsAccommodation"
            checked={formData.needsAccommodation}
            onChange={handleChange}
            className="mt-1 w-5 h-5 accent-cyan-500"
          />
          <div className="flex-1">
            <label htmlFor="needsAccommodation" className="block text-white font-bold mb-2 cursor-pointer">
              🏠 Necesito hospedaje
            </label>
            <p className="text-zinc-300 text-sm mb-2">
              ¿Vienes de otra ciudad? Puedes quedarte en mi casa. Hay espacio para {accommodationAvailable} personas.
            </p>
            {formData.needsAccommodation && (
              <div className="mt-3 p-3 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
                <p className="text-cyan-400 font-mono text-xs">
                  ✓ Solicitaste hospedaje. Te contactaremos con los detalles.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tour a Tequila */}
      <div className="p-6 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-2 border-cyan-500/20 rounded-xl">
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            id="interestedInTequilaTour"
            name="interestedInTequilaTour"
            checked={formData.interestedInTequilaTour}
            onChange={handleChange}
            className="mt-1 w-5 h-5 accent-cyan-500"
          />
          <div className="flex-1">
            <label htmlFor="interestedInTequilaTour" className="block text-white font-bold mb-2 cursor-pointer">
              🚌 Me interesa el tour a Tequila
            </label>
            <p className="text-zinc-300 text-sm mb-2">
              Domingo 21 de Diciembre - Salida al pueblo mágico de Tequila, Jalisco (opcional).
            </p>
            {formData.interestedInTequilaTour && (
              <div className="mt-3 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                <p className="text-purple-400 font-mono text-xs">
                  ✓ Te enviaremos información del tour por email.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Restricciones dietéticas */}
      <div>
        <label htmlFor="dietaryRestrictions" className="block text-cyan-400 font-mono text-sm mb-2">
          RESTRICCIONES ALIMENTARIAS (OPCIONAL)
        </label>
        <input
          type="text"
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          value={formData.dietaryRestrictions}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-zinc-900/50 border-2 border-cyan-500/30 focus:border-cyan-500 text-white outline-none transition-all font-mono rounded-xl"
          placeholder="Vegetariano, vegano, alergias, etc."
        />
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="message" className="block text-cyan-400 font-mono text-sm mb-2">
          MENSAJE (OPCIONAL)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-zinc-900/50 border-2 border-cyan-500/30 focus:border-cyan-500 text-white outline-none transition-all font-mono resize-none rounded-xl"
          placeholder="Algún comentario o pregunta..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 font-bold text-lg transition-all rounded-xl ${
          isSubmitting
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-3">
            <span className="animate-spin">⚡</span>
            ENVIANDO...
          </span>
        ) : (
          '✓ CONFIRMAR ASISTENCIA'
        )}
      </button>

      <p className="text-zinc-400 text-center text-sm font-mono">
        * Campos obligatorios | 🔒 Tu información está segura
      </p>
    </form>
  );
}
