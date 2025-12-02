import React from 'react'
import ConfirmedGallery from '../../ui/components/ConfirmedGalleryClientWrapper'
import Location from '../../src/ui/components/Location'
import ConfirmedHero from '../../src/ui/components/ConfirmedHero'
import Footer from '../../src/ui/components/Footer'

export const metadata = {
  title: 'Detalles Confirmados - Fiesta',
  description: 'Información y detalles sobre la fiesta: ubicación, amenidades y recomendaciones.'
}

const images = [
  { src: '/assets/room1.jpeg', title: 'Recámara 1', description: '🛏️ Queen + Matrimonial · 📺 TV · 🪞 Tocador · 👗 Clóset · ❄️ A/C · 🚿 Regadera con agua caliente' },
  { src: '/assets/room2.jpeg', title: 'Recámara 2', description: '🛏️ Matrimonial · 👗 Clóset amplio · ❄️ A/C · 🚿 Regadera con agua caliente' },
  { src: '/assets/room4.jpeg', title: 'Recámara 3', description: '🛏️ Queen + Matrimonial · 📺 TV · 🪞 Tocador · 👗 Clóset · ❄️ A/C · 🚿 Regadera con agua caliente' },
  { src: '/assets/room5.jpeg', title: 'Recámara 4', description: '🍽️ Cocina pequeña · 🧊 Refrigerador privado · 🌀 Ventilador · 🛏️ 1 Matrimonial · ❄️ A/C · 🚿 Regadera con agua caliente' },
  { src: '/assets/room6.jpeg', title: 'Recámara 5', description: '🛏️ Queen + Matrimonial · 📺 TV · 🪞 Tocador · 👗 Clóset · ❄️ A/C · 🚿 Regadera con agua caliente' },
  { src: '/assets/room7.jpeg', title: 'Recámara 6', description: '🛏️ Queen + Matrimonial · 📺 TV · 🪞 Tocador · 👗 Clóset · ❄️ A/C · 🚿 Regadera con agua caliente' },
  { src: '/assets/room8.jpeg', title: 'Recámara 7', description: '🛏️ Queen + Matrimonial · 📺 TV · 🪞 Tocador · 👗 Clóset · ❄️ A/C · 🚿 Regadera con agua caliente' },
  { src: '/assets/room9.jpeg', title: 'Recámara 8', description: '🛏️ 2 Camas Matrimoniales · ❄️ A/C · 🚿 Regadera con agua caliente' },
  { src: '/assets/room10.jpeg', title: 'Recámara 9', description: '🛏️ 1 Cama Matrimonial · ❄️ A/C · 🚿 Regadera con agua caliente' },
  { src: '/assets/public_bedrom.jpeg', title: 'Baño público', description: '🚻 Baño público · 🚿 Regadera · 🧼 Lavamanos · Agua caliente disponible' },
  { srcs: ['/assets/pool.jpeg','/assets/pool2.jpeg'], title: 'Alberca y zona de descanso', description: '🏊‍♂️ Alberca (agua caliente) · Zonas de descanso · Varias tomas en la galería' },
  { srcs: ['/assets/games.jpeg','/assets/games2.jpeg'], title: 'Sala de juegos', description: '🎮 Futbolito · 🏓 Ping-pong · Áreas de convivencia — varias fotos en la misma tarjeta' },
  { src: '/assets/asador.jpeg', title: 'Asador', description: '🔥 Asador disponible para preparar alimentos compartidos' },
  { src: '/assets/amenidad.jpeg', title: 'Tocador', description: '🏠 Baños y tocador en zonas públicas' },

]

export default function DetallesConfirmadosPage() {
  const locationData = {
    id: 'terraza-merin',
    name: 'Terraza Merin',
    address: 'CALLE ROCA #278',
    city: 'Lomas del Pedral, Zapopan',
    state: 'Jalisco',
    // Coordenadas aproximadas de Zapopan (si necesitas exactas puedo ajustarlas más tarde)
    coordinates: { lat: 20.72, lng: -103.39 },
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      'Terraza Merin CALLE ROCA #278 Lomas del Pedral Zapopan Jalisco'
    )}`,
  };
  return (
    <main className="min-h-screen bg-zinc-950 text-white relative">
      {/* Hero de agradecimiento — enfocado a instalaciones y ubicación */}
      <ConfirmedHero location={locationData} />
      {/* animated subtle gradient background */}
      <div
        className="animate-gradient absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(90deg, var(--color-cyber-cyan), var(--color-neon-purple), var(--color-hot-pink))',
          opacity: 0.06,
          zIndex: 0
        }}
      />

      <section className="relative z-10 max-w-6xl mx-auto py-12 px-6 md:px-8">
    


  {/* Widget de ubicación (compartido) — mostrar ubicación revelada aquí */}
  <div id="location">
    <Location location={locationData} reveal />
  </div>
    <div className="mb-8">
          <div className="rounded-lg overflow-hidden border border-gray-800">
            <img src="/assets/fachada.jpeg" alt="Fachada - Terraza Merin" className="w-full object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          <div className="bg-neutral-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3">Sí puedes traer</h2>
            <p className="text-gray-300 mb-4">Estas son las cosas que nos ayudan a que la convivencia sea más cómoda y variada. Trae lo que quieras compartir, pero evita envases frágiles sin protección.</p>

            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="font-semibold">Alimentos (listos para consumir)</div>
                  <div className="text-sm text-gray-400">Puedes traer comida ya preparada para compartir. No traigas equipo ni ingredientes para cocinar: el lugar ya cuenta con todo lo necesario, incluidos trastes y utensilios.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="font-semibold">Snacks y botanas</div>
                  <div className="text-sm text-gray-400">Papas, dips, frutos secos u otros bocadillos fáciles de compartir.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="font-semibold">Bebidas y suministros para tragos</div>
                  <div className="text-sm text-gray-400">Alcohol, mixers, hielos y utensilios (trae vasos si prefieres no usar desechables).</div>
                </div>
              </li>

              
            </ul>
          </div>

          <div className="bg-neutral-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3">No traer</h2>
            <p className="text-gray-300 mb-4">Por seguridad y comodidad del espacio, evita traer lo siguiente:</p>

            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-400 mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="font-semibold">Armas</div>
                  <div className="text-sm text-gray-400">No están permitidas de ningún tipo por seguridad de todos los asistentes.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-400 mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="font-semibold">Cobijas, carpas o colchonetas</div>
                  <div className="text-sm text-gray-400">No es necesario traer; ya hay camas y espacio para alojar a los invitados.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-400 mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="font-semibold">Objetos grandes o peligrosos</div>
                  <div className="text-sm text-gray-400">Cualquier cosa que pueda dañar instalaciones o representar riesgo para las personas.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-400 mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="font-semibold">Utensilios y equipo para cocinar</div>
                  <div className="text-sm text-gray-400">No traigas ollas, sartenes ni equipos grandes para cocinar: el lugar ya cuenta con todo lo necesario.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-400 mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="font-semibold">Decoración</div>
                  <div className="text-sm text-gray-400">No se permite traer decoración (luces, guirnaldas, estructuras) para evitar daños o conflictos con el espacio.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 mb-6 p-4 bg-neutral-900 border border-gray-800 rounded-lg text-gray-300">
          <p className="font-semibold">Notas adicionales</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Si vas a bañarte trae jabón y artículos de higiene personal.</li>
            <li>Lleva traje de baño si quieres usar la alberca.</li>
            <li>Si vas a traer algo para compartir, por favor avisa para evitar duplicados</li>
          </ul>
        </div>
  <div className="bg-neutral-900 border-l-4 border-yellow-400 p-4 rounded mb-8">
          <h3 className="font-semibold text-lg">Nota importante sobre el horario</h3>
          <p className="text-gray-200">La fiesta, de manera sorpresiva, se extiende hasta las 11:00 AM del día siguiente, dando muchas más horas de convivencia.</p>
          <div className="text-gray-300 mt-2">
            <p>A partir de cierta hora ya no habrá DJ/techno en vivo, pero sí seguirá habiendo música: la playlist será la protagonista para cerrar y mantener el ambiente.</p>
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="https://open.spotify.com/playlist/5ytBSQCwTgcZjJXH6HpFct?si=180f2503f9c84966"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md text-sm"
              >
                Agregar canciones a la playlist
              </a>

            </div>
          </div>
        </div>

  <section id="gallery" className="mb-10">
          <ConfirmedGallery images={images} />
        </section>

      </section>
  <Footer variant="detalles" />
    </main>
  )
}
