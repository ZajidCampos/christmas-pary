import { Event } from '../../domain/entities/Event';

interface HeroProps {
  event: Event;
}

export default function Hero({ event }: HeroProps) {
  const formattedDate = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(event.date);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_50%)]"></div>
        <div className="grid-overlay absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center py-20">
        <div className="mb-6 md:mb-8 inline-block">
          <div className="text-cyan-400 text-xs md:text-sm font-mono tracking-widest mb-4">
            ▸ VIERNES 19 DE DICIEMBRE • 22:00 HRS
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 tracking-tighter px-4">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {event.title}
          </span>
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl text-purple-300 font-light mb-6 md:mb-8 tracking-wide px-4">
          {event.subtitle}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm md:text-base">
            <span className="text-pink-500">●</span>
            <span>{formattedDate}</span>
          </div>
          <div className="hidden md:block text-purple-500">|</div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm md:text-base">
            <span className="text-pink-500">●</span>
            <span>Zapopan, JAL</span>
          </div>
        </div>

        <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
          {event.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
          <a
            href="#rsvp"
            className="w-full sm:w-auto group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-base md:text-lg rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          >
            <span className="relative z-10">CONFIRMAR ASISTENCIA</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>

          <a
            href="#schedule"
            className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-cyan-400 text-cyan-400 font-bold text-base md:text-lg rounded-xl hover:bg-cyan-400/10 transition-all"
          >
            VER HORARIOS
          </a>
        </div>

        <div className="mt-12 md:mt-16 space-y-3 px-4">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-zinc-900/70 border border-cyan-500/30 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-mono text-xs md:text-sm">
              {event.availableTickets} lugares disponibles de {event.capacity}
            </span>
          </div>
          <div className="text-center">
            <span className="text-xl md:text-2xl font-black text-pink-400">
              🎉 ENTRADA GRATUITA 🎉
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
