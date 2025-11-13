'use client';

import { useState } from 'react';
import { RSVPFormData, GuestInfo } from '../../domain/entities/Ticket';
import { FirebaseService } from '../../data/services/FirebaseService';
import RSVPSuccessMessage from './RSVPSuccessMessage';

interface RSVPFormProps {
  accommodationAvailable: number;
  onSubmitSuccess?: () => void;
}

export default function RSVPForm({ accommodationAvailable, onSubmitSuccess }: RSVPFormProps) {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    needsAccommodation: false,
    interestedInTequilaTour: false,
    interestedInSharedAirbnb: false,
    guests: 1,
    guestsList: [],
    dietaryRestrictions: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const firebaseService = new FirebaseService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Verificar si el email ya está registrado
      const emailExists = await firebaseService.checkEmailExists(formData.email);
      
      if (emailExists) {
        setError('Este email ya está registrado. Si necesitas modificar tu Información, mandame un mensjae, jaja.');
        setIsSubmitting(false);
        return;
      }

      // Guardar RSVP en Firebase
      const rsvpId = await firebaseService.saveRSVP(formData);
      console.log('RSVP guardado exitosamente con ID:', rsvpId);
      
      setSubmitted(true);
      
      // Llamar al callback para actualizar las estadísticas
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      console.error('Error al enviar RSVP:', err);
      setError('Hubo un error al procesar tu confirmación. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      
      // Validación especial para hospedaje
      if (name === 'needsAccommodation' && checked) {
        // Contar cuántos invitados ya necesitan hospedaje
        const guestsNeedingAccommodation = formData.guestsList.filter(g => g.needsAccommodation).length;
        
        // Verificar si hay cupo disponible
        if (guestsNeedingAccommodation >= accommodationAvailable) {
          alert(`⚠️ Lo siento, solo hay ${accommodationAvailable} espacios de hospedaje disponibles y ya están todos solicitados por tus invitados.`);
          return; // No permitir marcar el checkbox
        }
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === 'guests') {
      const guestCount = parseInt(value);
      // Actualizar la lista de invitados cuando cambia el número
      const currentGuests = formData.guestsList;
      let newGuestsList = [...currentGuests];
      
      if (guestCount > 1) {
        // Agregar o mantener invitados según el número
        const guestsNeeded = guestCount - 1; // -1 porque el organizador no cuenta
        if (newGuestsList.length < guestsNeeded) {
          // Agregar nuevos invitados
          for (let i = newGuestsList.length; i < guestsNeeded; i++) {
            newGuestsList.push({
              name: '',
              needsAccommodation: false,
              interestedInTequilaTour: false,
              interestedInSharedAirbnb: false,
            });
          }
        } else if (newGuestsList.length > guestsNeeded) {
          // Eliminar invitados extras
          newGuestsList = newGuestsList.slice(0, guestsNeeded);
        }
      } else {
        newGuestsList = [];
      }
      
      setFormData(prev => ({
        ...prev,
        guests: guestCount,
        guestsList: newGuestsList,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value,
      }));
    }
  };

  const handleGuestChange = (index: number, field: keyof GuestInfo, value: string | boolean) => {
    const newGuestsList = [...formData.guestsList];
    
    // Si se está intentando marcar hospedaje para un invitado, verificar cupos disponibles
    if (field === 'needsAccommodation' && value === true) {
      // Contar cuántos ya necesitan hospedaje (incluyendo el titular si marcó)
      const currentAccommodationNeeds = (formData.needsAccommodation ? 1 : 0) + 
        formData.guestsList.filter(g => g.needsAccommodation).length;
      
      // Verificar si hay cupo disponible
      if (currentAccommodationNeeds >= accommodationAvailable) {
        alert(`⚠️ Lo siento, solo hay ${accommodationAvailable} espacios de hospedaje disponibles y ya están todos solicitados.`);
        return; // No permitir marcar el checkbox
      }
    }
    
    newGuestsList[index] = {
      ...newGuestsList[index],
      [field]: value,
    };
    setFormData(prev => ({
      ...prev,
      guestsList: newGuestsList,
    }));
  };

  if (submitted) {
    return (
      <RSVPSuccessMessage
        email={formData.email}
        phone={formData.phone}
        needsAccommodation={formData.needsAccommodation}
        onNewRSVP={() => {
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            city: '',
            needsAccommodation: false,
            interestedInTequilaTour: false,
            interestedInSharedAirbnb: false,
            guests: 1,
            guestsList: [],
            dietaryRestrictions: '',
            message: '',
          });
        }}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-zinc-900/50 backdrop-blur-sm border-2 border-cyan-500/20 rounded-2xl space-y-6">
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
            inputMode="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-900/50 border-2 border-cyan-500/30 focus:border-cyan-500 text-white outline-none transition-all font-mono rounded-xl"
            placeholder="tu@email.com"
            title="Ingresa un correo válido (ejemplo: usuario@email.com)"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* WhatsApp */}
        <div>
          <label htmlFor="phone" className="block text-cyan-400 font-mono text-sm mb-2">
            WHATSAPP *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-900/50 border-2 border-cyan-500/30 focus:border-cyan-500 text-white outline-none transition-all font-mono rounded-xl"
            placeholder="3312345678"
            title="Ingresa 10 dígitos sin espacios (ejemplo: 3312345678)"
          />
          <p className="text-gray-400 text-xs mt-1">10 dígitos sin espacios ni guiones</p>
        </div>

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

      {/* Lista de invitados adicionales - Solo nombres */}
      {formData.guests > 1 && (
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg mb-4">
            Nombres de tus invitados
          </h3>
          {formData.guestsList.map((guest, index) => (
            <div key={index} className="p-4 bg-zinc-900/70 border border-cyan-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-cyan-400 font-mono text-sm">INVITADO #{index + 1}</span>
              </div>
              
              <div>
                <label htmlFor={`guest-name-${index}`} className="block text-cyan-400 font-mono text-xs mb-2">
                  NOMBRE COMPLETO *
                </label>
                <input
                  type="text"
                  id={`guest-name-${index}`}
                  required
                  value={guest.name}
                  onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900/50 border border-cyan-500/30 focus:border-cyan-500 text-white outline-none transition-all font-mono rounded-lg text-sm"
                  placeholder="Nombre del invitado"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hospedaje */}
      <div className="p-6 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-2 border-purple-500/20 rounded-xl space-y-4">
        {/* Indicador de espacios disponibles */}
        <div className="mb-4 p-3 bg-purple-900/30 border border-purple-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-purple-300 font-mono text-sm">
              🏠 Espacios de hospedaje disponibles:
            </span>
            <span className="text-purple-400 font-bold text-lg">
              {Math.max(0, accommodationAvailable - 
                (formData.needsAccommodation ? 1 : 0) - 
                formData.guestsList.filter(g => g.needsAccommodation).length
              )} / {accommodationAvailable}
            </span>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            id="needsAccommodation"
            name="needsAccommodation"
            checked={formData.needsAccommodation}
            onChange={handleChange}
            disabled={!formData.needsAccommodation && accommodationAvailable === 0}
            className="mt-1 w-5 h-5 accent-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="flex-1">
            <label htmlFor="needsAccommodation" className="block text-white font-bold mb-2 cursor-pointer">
              🏠 Necesito hospedaje
            </label>
            <p className="text-zinc-300 text-sm mb-2">
              ¿Vienes de otra ciudad? Puedes quedarte en mi casa.
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

        {/* Invitados que necesitan hospedaje */}
        {formData.guests > 1 && (
          <div className="pl-9">
            <p className="text-gray-300 text-sm mb-3">¿Cuáles de tus invitados necesitan hospedaje?</p>
            <div className="space-y-2">
              {formData.guestsList.map((guest, index) => {
                // Calcular cupos usados sin incluir este invitado
                const currentUsed = (formData.needsAccommodation ? 1 : 0) + 
                  formData.guestsList.filter((g, i) => i !== index && g.needsAccommodation).length;
                const isDisabled = !guest.needsAccommodation && currentUsed >= accommodationAvailable;
                
                return (
                  <label 
                    key={index} 
                    className={`flex items-center gap-2 text-sm ${isDisabled ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 cursor-pointer'}`}
                  >
                    <input
                      type="checkbox"
                      checked={guest.needsAccommodation}
                      onChange={(e) => handleGuestChange(index, 'needsAccommodation', e.target.checked)}
                      disabled={isDisabled}
                      className="w-4 h-4 accent-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span>{guest.name || `Invitado #${index + 1}`}</span>
                    {isDisabled && (
                      <span className="text-xs text-red-400">(Sin cupo)</span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Airbnb Compartido - Solo aparece si no hay cupos disponibles */}
      {accommodationAvailable === 0 && (
        <div className="p-6 bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border-2 border-orange-500/20 rounded-xl space-y-4">
          <div className="mb-4 p-3 bg-orange-900/30 border border-orange-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-2xl">🏘️</span>
              <div>
                <p className="text-orange-300 font-bold text-sm mb-1">
                  Los cupos de hospedaje en casa están llenos
                </p>
                <p className="text-orange-200 text-xs">
                  ¿Te interesa compartir un Airbnb con otros invitados? Te ayudaremos a conectar con otros asistentes para dividir costos.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              id="interestedInSharedAirbnb"
              name="interestedInSharedAirbnb"
              checked={formData.interestedInSharedAirbnb}
              onChange={handleChange}
              className="mt-1 w-5 h-5 accent-orange-500"
            />
            <div className="flex-1">
              <label htmlFor="interestedInSharedAirbnb" className="block text-white font-bold mb-2 cursor-pointer">
                🏠 Me interesa compartir Airbnb con otros invitados
              </label>
              <p className="text-zinc-300 text-sm mb-2">
                Te pondremos en contacto con otros invitados interesados en rentar un Airbnb juntos para dividir gastos.
              </p>
              {formData.interestedInSharedAirbnb && (
                <div className="mt-3 p-3 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                  <p className="text-orange-400 font-mono text-xs">
                    ✓ Te enviaremos información para coordinar el Airbnb compartido.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Invitados interesados en Airbnb compartido */}
          {formData.guests > 1 && (
            <div className="pl-9">
              <p className="text-gray-300 text-sm mb-3">¿Cuáles de tus invitados están interesados?</p>
              <div className="space-y-2">
                {formData.guestsList.map((guest, index) => (
                  <label key={index} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={guest.interestedInSharedAirbnb}
                      onChange={(e) => handleGuestChange(index, 'interestedInSharedAirbnb', e.target.checked)}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span>{guest.name || `Invitado #${index + 1}`}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tour a Tequila */}
      <div className="p-6 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-2 border-cyan-500/20 rounded-xl space-y-4">
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

        {/* Invitados interesados en tour */}
        {formData.guests > 1 && (
          <div className="pl-9">
            <p className="text-gray-300 text-sm mb-3">¿Cuáles de tus invitados están interesados en el tour?</p>
            <div className="space-y-2">
              {formData.guestsList.map((guest, index) => (
                <label key={index} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={guest.interestedInTequilaTour}
                    onChange={(e) => handleGuestChange(index, 'interestedInTequilaTour', e.target.checked)}
                    className="w-4 h-4 accent-cyan-500"
                  />
                  <span>{guest.name || `Invitado #${index + 1}`}</span>
                </label>
              ))}
            </div>
          </div>
        )}
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

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-900/20 border-2 border-red-500/50 rounded-xl">
          <p className="text-red-400 font-mono text-sm flex items-center gap-2">
            <span>⚠️</span>
            {error}
          </p>
        </div>
      )}

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
    </div>
  );
}
