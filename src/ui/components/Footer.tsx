'use client';

import { MouseEvent } from 'react';
import { MessageCircle, Music, Headphones, Smartphone } from 'lucide-react';

type FooterProps = {
  variant?: 'home' | 'detalles';
};

export default function Footer({ variant = 'home' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Define navigation links depending on page variant
  const navLinks =
    variant === 'detalles'
      ? [
          { label: 'Galería', href: '#gallery' },
          { label: 'Ubicación', href: '#location' },
        ]
      : [
          { label: 'Horarios', href: '#schedule' },
          { label: 'Confirmar Asistencia', href: '#rsvp' },
          { label: 'Ubicación', href: '#location' },
        ];

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update the hash without jumping
        history.replaceState(null, '', href);
      }
    }
  };

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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e as any, link.href)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">CONECTA</h4>
            <div className="space-y-3 mb-4">
              <a
                href="https://wa.me/523339126481"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors text-sm group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>WhatsApp: +52 33 3912 6481</span>
              </a>
              <a
                href="https://open.spotify.com/playlist/5ytBSQCwTgcZjJXH6HpFct?si=180f2503f9c84966"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors text-sm group"
              >
                <Music className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Playlist Oficial</span>
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="https://open.spotify.com/playlist/5ytBSQCwTgcZjJXH6HpFct?si=180f2503f9c84966"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black/50 border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 flex items-center justify-center transition-all hover:scale-110 group"
                title="Spotify Playlist"
              >
                <Headphones className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <a
                href="https://wa.me/523339126481"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black/50 border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 flex items-center justify-center transition-all hover:scale-110 group"
                title="WhatsApp"
              >
                <Smartphone className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-mono">
              © {currentYear} Zajid Campos | Host y amigo
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
