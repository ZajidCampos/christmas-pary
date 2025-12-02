"use client";

import { useState } from 'react';
import { Search, User, Users } from 'lucide-react';
import { FirebaseService } from '../../data/services/FirebaseService';

const svc = new FirebaseService();

export default function RoomLookupCard() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [members, setMembers] = useState<any[] | null>(null);

  const whatsappNumber = '523339126481'; // +52 33 3912 6481

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setMembers(null);

    if (!validateEmail(email)) {
      setError('Ingresa un correo válido.');
      return;
    }

    setLoading(true);
    try {
      // Buscar por email
      const rsvp = await svc.getRSVPByEmail(email.trim().toLowerCase());
      if (!rsvp) {
        setError('No hay ningún registro asociado a ese correo. Si quieres, comunícate para que te asignemos habitación.');
        return;
      }

      setResult(rsvp);

      // Si tiene room_number, buscar todos los registros con el mismo número
      const roomNumber = rsvp.room_number;
      if (typeof roomNumber === 'number' && Number.isInteger(roomNumber)) {
        const list = await svc.getRSVPsByRoomNumber(roomNumber);
        setMembers(list || []);
      } else {
        setMembers([]);
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al buscar el registro. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-neutral-900 border border-gray-800 rounded-2xl">
      <h3 className="text-xl font-semibold mb-3">¿Cuál es tu recámara?</h3>
      <p className="text-sm text-gray-400 mb-4">Ingresa el correo con el que te registraste y te diremos a qué recámara perteneces y con quién estás compartiendo (si aplica).</p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="flex-1 px-4 py-3 bg-zinc-900/50 border-2 border-cyan-500/30 text-white rounded-xl outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl"
        >
          <Search className="w-4 h-4" />
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && (
        <div className="mt-4">
          <p className="text-sm text-red-400">{error}</p>
          {/* If email not found, offer WhatsApp contact */}
          {error.includes('No hay ningún registro') && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded text-sm"
            >
              Comunicarse por WhatsApp
            </a>
          )}
        </div>
      )}

      {result && (
        <div className="mt-6 bg-zinc-900/60 border border-cyan-500/20 p-4 rounded-lg">
          {/* Mostrar tarjeta de la recámara si existe room_number */}
          {typeof result.room_number === 'number' && Number.isInteger(result.room_number) && (
            <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:w-48 shrink-0 rounded overflow-hidden border border-gray-800">
                <img
                  src={`/assets/room${result.room_number}.jpeg`}
                  alt={`Recámara ${result.room_number}`}
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-300">Recámara asignada</div>
                <div className="text-lg font-bold">Recámara {result.room_number}</div>
                <p className="text-sm text-gray-400 mt-2">Aquí puedes ver una foto representativa de la recámara asignada. Si crees que hay un error, contáctanos para revisar la asignación.</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 mb-3">
            <User className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="text-sm text-gray-300">Registro encontrado:</div>
              <div className="font-semibold">{result.name ?? 'Sin nombre'}</div>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            <div>Email: <span className="font-mono text-gray-200">{result.email}</span></div>
            <div>Teléfono: <span className="font-mono text-gray-200">{result.phone ?? '—'}</span></div>
            <div>Room number: <span className="font-mono text-gray-200">{result.room_number ?? 'No asignado'}</span></div>
          </div>

          {/* Si existe el registro pero no tiene habitación asignada */}
          {!(typeof result.room_number === 'number' && Number.isInteger(result.room_number)) && (
            <div className="mt-4 bg-black/30 border border-gray-700 p-4 rounded">
              <p className="text-sm text-gray-300">Aún no tienes habitación asignada. Si quieres, contáctanos y te asignamos una.</p>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded text-sm"
              >
                Solicitar asignación por WhatsApp
              </a>
            </div>
          )}

          {members && members.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-400" />
                <div className="text-sm font-semibold">Compañerxs de la misma recámara ({members.length})</div>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                {members.map((m) => (
                  <li key={m.id} className="bg-black/10 border border-gray-800 p-3 rounded">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium">{m.name ?? 'Sin nombre'}</div>
                        {/* Correo y teléfono ocultos en la lista de compañeros por privacidad */}
                      </div>
                      <div className="text-xs text-gray-400">{m.room_number ?? ''}</div>
                    </div>

                    {/* Guests list grouped under the document's email */}
                    {m.guestsList && Array.isArray(m.guestsList) && m.guestsList.length > 0 && (
                      <div className="mt-3 pl-3 border-l border-gray-700">
                        <div className="text-xs text-gray-300 mb-1">Invitados asociados:</div>
                        <ul className="list-disc list-inside text-sm text-gray-300">
                          {m.guestsList.map((g: any, idx: number) => (
                            <li key={idx} className="py-0.5">{g.name ?? 'Invitado'}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {members && members.length === 0 && (
            <p className="mt-4 text-sm text-yellow-300">No se encontraron otros invitados para esa recámara.</p>
          )}
        </div>
      )}
    </div>
  );
}
