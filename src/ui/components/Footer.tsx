export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-cyan-500/30 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black text-cyan-400 mb-4">
              TECHNO POSADA
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              La fusión perfecta entre tradición mexicana y cultura techno.
              Una experiencia única en Zapopan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">NAVEGACIÓN</h4>
            <ul className="space-y-2">
              <li>
                <a href="#schedule" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Horarios
                </a>
              </li>
              <li>
                <a href="#rsvp" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Confirmar Asistencia
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Políticas de Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">CONECTA</h4>
            <div className="space-y-3 mb-4">
              <a
                href="#"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                <span className="text-lg">📧</span>
                <span>info@technoposada.mx</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                <span className="text-lg">📱</span>
                <span>+52 33 1234 5678</span>
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-black/50 border border-cyan-500/30 hover:border-cyan-500 flex items-center justify-center transition-all hover:scale-110"
              >
                <span className="text-lg">📘</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-black/50 border border-cyan-500/30 hover:border-cyan-500 flex items-center justify-center transition-all hover:scale-110"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-black/50 border border-cyan-500/30 hover:border-cyan-500 flex items-center justify-center transition-all hover:scale-110"
              >
                <span className="text-lg">🐦</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-mono">
              © {currentYear} TECHNO POSADA. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-xs font-mono">
                Sistema en línea
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
