interface FeaturesProps {}

export default function Features({}: FeaturesProps) {
  const features = [
    {
      icon: '🎄',
      title: 'PONCHE Y PIÑATA',
      description: 'Tradición mexicana con ponche navideño caliente y piñata llena de sorpresas',
      color: 'cyan',
      gradient: 'from-cyan-500/10 to-cyan-500/5',
    },
    {
      icon: '🌿',
      title: 'CONCURSO DE PORROS',
      description: 'Competencia del mejor forjador de porros. Premios para el más creativo',
      color: 'purple',
      gradient: 'from-purple-500/10 to-purple-500/5',
    },
    {
      icon: '🎵',
      title: 'TECHNO CON DJ LOCAL',
      description: 'Sets de techno puro con los mejores DJs de la escena local',
      color: 'pink',
      gradient: 'from-pink-500/10 to-pink-500/5',
    },
    {
      icon: '🫧',
      title: 'ALBERCA DISPONIBLE',
      description: 'Si gustas traer tu traje de baño y toalla para disfrutar de la alberca',
      color: 'cyan',
      gradient: 'from-cyan-500/10 to-cyan-500/5',
    },
    {
      icon: '🏠',
      title: 'HABITACIONES PARA DESCANSAR',
      description: 'Habitaciones disponibles para todos los invitados. La fiesta dura 20 horas',
      color: 'purple',
      gradient: 'from-purple-500/10 to-purple-500/5',
    },
    {
      icon: '🚌',
      title: 'TOUR A TEQUILA',
      description: 'Domingo 21 de diciembre. Invitación exclusiva para asistentes de la posada',
      color: 'pink',
      gradient: 'from-pink-500/10 to-pink-500/5',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              LA EXPERIENCIA
            </span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg font-mono">
            ▸ UNA NOCHE INOLVIDABLE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-8 bg-zinc-900/50 backdrop-blur-sm border-2 border-zinc-800 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              <div className="relative z-10">
                <div className="text-5xl md:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className={`text-xl md:text-2xl font-bold mb-3 text-${feature.color}-400 group-hover:text-${feature.color}-300 transition-colors`}>
                  {feature.title}
                </h3>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-purple-500/20 rounded-bl-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
