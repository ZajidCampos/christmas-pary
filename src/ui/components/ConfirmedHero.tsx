"use client";

import React, { useEffect, useState } from 'react';
import AnimatedBackground3D from './AnimatedBackground3D';
import { FirebaseService } from '../../data/services/FirebaseService';

interface LocationData {
  id?: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  mapUrl?: string;
}

interface ConfirmedHeroProps {
  location: LocationData;
}

export default function ConfirmedHero({ location }: ConfirmedHeroProps) {
  const [confirmed, setConfirmed] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const firebase = new FirebaseService();
        const stats = await firebase.getRSVPStats();
        // Usar totalGuests (incluye invitados adicionales) tal como en RSVPSection
        setConfirmed(stats.totalGuests ?? 0);
      } catch (err) {
        console.error('Error obteniendo estadísticas de RSVP:', err);
        // En caso de error mostrar 0 para no quedar en estado indefinido
        setConfirmed(0);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Fondo 3D con Three.js (mismo que en Hero) */}
      <AnimatedBackground3D />

      <div className="relative z-10 container mx-auto px-4 text-center py-20">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10"></div>

        <div className="mb-6 md:mb-8 inline-block">
          <div className="text-cyan-400 text-xs md:text-sm font-mono tracking-widest mb-4 animate-pulse-glow bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="inline-block animate-blink">▸</span> ¡REGISTRO CONFIRMADO!
          </div>
        </div>

        <h1 className="text-[2.50rem] sm:text-[2.90rem] md:text-[4.9rem] lg:text-[6rem] font-black mb-4 md:mb-6 tracking-tighter px-4 relative leading-none">
          <span className="bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_30px_rgba(6,182,212,0.5)] block leading-none">
            Gracias por ser parte de esta TECHNO POSADA
          </span>
        </h1>

        <p className="text-base md:text-xl lg:text-2xl text-purple-300 font-light mb-6 md:mb-8 tracking-wide px-4 animate-fade-in-up bg-black/40 py-3 rounded-lg backdrop-blur-sm max-w-2xl mx-auto leading-relaxed">
          Tu lugar está reservado. Será un fin de semana estupendo: música, buena compañía y muchas sorpresas.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <a
            href="#gallery"
            className="w-full sm:w-auto group relative px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-cyan-200 to-purple-200 text-black font-bold text-base md:text-lg rounded-xl overflow-hidden transition-all active:scale-95 shadow-lg animate-pulse-glow-button"
          >
            <span className="relative z-10">Conoce las instalaciones</span>
          </a>

          <a
              href="#location"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-cyan-400 text-cyan-400 font-bold text-base md:text-lg rounded-xl active:bg-cyan-400/20 transition-all animate-border-pulse"
            >
              Ver ubicación
            </a>
        </div>

        <div className="mt-12 md:mt-16 space-y-3 px-4">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-zinc-900/70 border border-cyan-500/30 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-mono text-xs md:text-sm">
              {loading ? 'Cargando...' : `${confirmed} participantes confirmados`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
