import { Location as LocationType } from '../../domain/entities/Location';

interface LocationProps {
  location: LocationType;
  reveal?: boolean; // cuando true mostramos el mapa y el enlace; si false se mantiene la versión "privada"
}

export default function Location({ location, reveal = false }: LocationProps) {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      </div>

  <div className="container mx-auto px-4 relative z-10 mb-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              UBICACIÓN
            </span>
          </h2>
          <p className="text-gray-400 text-lg font-mono">
            ▸ ENCUENTRA EL VENUE
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Location details */}
          <div className="space-y-6">
            <div className="p-8 bg-black/50 border-2 border-cyan-500/30 hover:border-cyan-500 transition-all">
              <h3 className="text-3xl font-bold text-cyan-400 mb-6">
                {location.name}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <div className="text-gray-400 text-sm font-mono mb-1">
                      DIRECCIÓN
                    </div>
                    <div className="text-white font-medium">
                      {location.address}
                    </div>
                    <div className="text-gray-300">
                      {location.city}, {location.state}
                    </div>
                  </div>
                </div>

                <div className="border-t border-cyan-500/20 pt-4 mt-4">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🚗</div>
                    <div>
                      <div className="text-gray-400 text-sm font-mono mb-1">
                        ACCESO
                      </div>
                      <ul className="text-gray-300 space-y-1 text-sm">
                        <li>• Estacionamiento disponible</li>
                        <li>• Uber/DiDi friendly</li>
                        {reveal ? (
                          <li>• No hay transporte público cercano</li>
                        ) : (
                          <li>• Transporte público cercano</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-cyan-500/20 pt-4 mt-4">
                  {reveal ? (
                    <a
                      href={location.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${location.name} ${location.address} ${location.city} ${location.state}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:scale-105 transition-transform rounded-lg"
                    >
                      <span>ABRIR EN GOOGLE MAPS</span>
                      <span>→</span>
                    </a>
                  ) : (
                    <a
                      href="#rsvp"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:scale-105 transition-transform rounded-lg"
                    >
                      <span>CONFIRMA ASISTENCIA PARA RECIBIR LA UBICACIÓN</span>
                      <span>→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Additional info */}
            <div className="p-6 bg-purple-950/30 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-purple-400 font-mono text-sm">
                  INFORMACIÓN IMPORTANTE
                </span>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Evento para mayores de 18 años</li>
                <li>• Traer tus propias bebidas</li>
                <li>• Dress code: Navideño</li>
                <li>• Ambiente seguro, respetuoso y 4:20</li>
              </ul>
            </div>
          </div>

          {/* Map: si reveal === true mostramos el mapa embebido y el botón a Google Maps; si no, mantenemos el placeholder privado */}
          {reveal ? (
            <div className="relative h-[500px] bg-black/50 border-2 border-cyan-500/30 overflow-hidden rounded-lg">
              <iframe
                title={`Mapa - ${location.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${location.address} ${location.city} ${location.state}`
                )}&z=17&output=embed`}
                className="w-full h-full block"
                loading="lazy"
              />

              {/* CTA para abrir en Google Maps */}
              <div className="absolute bottom-4 left-4">
                <a
                  href={location.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${location.name} ${location.address} ${location.city} ${location.state}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform"
                >
                  <span>Abrir en Google Maps</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="relative h-[500px] bg-black/50 border-2 border-cyan-500/30 overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {/* Punto rojo parpadeante */}
                    <div className="w-12 h-12 mx-auto mb-4">
                      <div className="w-6 h-6 bg-red-500 rounded-full mx-auto animate-pulse shadow-[0_0_18px_rgba(239,68,68,0.6)]"></div>
                    </div>
                    <div className="text-cyan-400 font-mono text-sm mb-2">UBICACIÓN OCULTA</div>
                    <div className="text-white font-bold text-lg">Confirma asistencia para recibirla</div>
                  </div>
                </div>

              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:opacity-50 transition-opacity"></div>

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
