import { Schedule as ScheduleType } from '../../domain/entities/Schedule';

interface ScheduleProps {
  schedule: ScheduleType;
}

export default function Schedule({ schedule }: ScheduleProps) {
  return (
    <section id="schedule" className="py-24 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              HORARIOS
            </span>
          </h2>
          <p className="text-gray-400 text-lg font-mono">
            ▸ TIMELINE DE LA NOCHE
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {schedule.items.map((item, index) => (
            <div
              key={item.id}
              className="relative mb-8 group"
            >
              {/* Timeline line */}
              {index < schedule.items.length - 1 && (
                <div className="absolute left-8 md:left-24 top-20 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-purple-500 opacity-30"></div>
              )}

              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Time */}
                <div className="flex-shrink-0 w-32">
                  <div className="relative">
                    <div className="text-4xl font-black text-cyan-400 font-mono group-hover:scale-110 transition-transform">
                      {item.time}
                    </div>
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full border-4 border-black group-hover:scale-150 transition-transform"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 bg-black/50 border-l-4 border-purple-500 group-hover:border-cyan-500 transition-all group-hover:bg-black/70">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  {item.artist && (
                    <div className="text-purple-400 font-mono text-sm mb-3">
                      ▸ {item.artist}
                    </div>
                  )}
                  <p className="text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Duration info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-black/50 border border-cyan-500/30">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-150"></div>
            </div>
            <span className="text-cyan-400 font-mono">
              5+ HORAS DE TECHNO ININTERRUMPIDO
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
