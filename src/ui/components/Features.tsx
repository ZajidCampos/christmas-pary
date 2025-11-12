interface FeaturesProps {}

export default function Features({}: FeaturesProps) {
  const features = [
    {
      icon: '�',
      title: '100% GRATIS',
      description: 'Entrada totalmente gratuita. Solo confirma tu asistencia y disfruta',
      color: 'cyan',
    },
    {
      icon: '�',
      title: 'TECHNO DURO',
      description: 'Los mejores DJs locales e internacionales con sets de techno puro',
      color: 'purple',
    },
    {
      icon: '🎄',
      title: 'POSADA MEXICANA',
      description: 'Piñata, ponche navideño y tradiciones con un twist electrónico',
      color: 'pink',
    },
    {
      icon: '�',
      title: 'HOSPEDAJE',
      description: '¿Vienes de fuera? Puedes quedarte en casa del host',
      color: 'cyan',
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              LA EXPERIENCIA
            </span>
          </h2>
          <p className="text-gray-400 text-lg font-mono">
            ▸ UNA NOCHE INOLVIDABLE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-black/50 border-2 border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 hover:scale-105"
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-500/0 to-${feature.color}-500/0 group-hover:from-${feature.color}-500/10 group-hover:to-transparent transition-all duration-300`}></div>

              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-3 text-${feature.color}-400`}>
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className={`absolute top-0 left-0 w-2 h-2 bg-${feature.color}-500`}></div>
              <div className={`absolute bottom-0 right-0 w-2 h-2 bg-${feature.color}-500`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
