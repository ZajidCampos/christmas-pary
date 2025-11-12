export default function TequilaTour() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900/70 border border-cyan-500/30 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🚌</span>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">
                  Tour a Tequila, Jalisco
                </h2>
                <p className="text-zinc-400 font-mono text-sm mt-1">
                  Domingo 21 de Diciembre
                </p>
              </div>
            </div>

            <div className="space-y-4 text-zinc-300">
              <p className="text-lg leading-relaxed">
                Después de la posada, continuamos la aventura con una salida al pueblo mágico de{' '}
                <span className="text-cyan-400 font-semibold">Tequila, Jalisco</span>.
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                  <div className="text-sm font-mono text-cyan-400 mb-2">📍 DESTINO</div>
                  <div className="font-semibold">Tequila, Jalisco</div>
                  <div className="text-sm text-zinc-400">Pueblo Mágico</div>
                </div>

                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                  <div className="text-sm font-mono text-cyan-400 mb-2">📅 FECHA</div>
                  <div className="font-semibold">Domingo 21 de Diciembre</div>
                  <div className="text-sm text-zinc-400">Salida temprano</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/20 rounded-xl p-5">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span>✨</span> Lo que incluye:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>Transporte redondo desde Zapopan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>Tour por destilerías de tequila</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>Recorrido por el pueblo mágico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>Tiempo libre para comer y explorar</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-start gap-3 bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 mt-4">
                <span className="text-xl">ℹ️</span>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Esta actividad es <span className="text-cyan-400 font-semibold">opcional</span>.
                  Menciona en el formulario de RSVP si te interesa participar en el tour.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
