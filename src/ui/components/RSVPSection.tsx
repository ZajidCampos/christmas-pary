'use client';

import { useState, useEffect } from 'react';
import RSVPForm from './RSVPForm';
import { AttendeeInfo } from '../../domain/entities/AttendeeInfo';
import { FirebaseService } from '../../data/services/FirebaseService';

interface RSVPSectionProps {
  attendeeInfo: AttendeeInfo;
}

export default function RSVPSection({ attendeeInfo }: RSVPSectionProps) {
  const [stats, setStats] = useState({
    confirmed: attendeeInfo.confirmed,
    accommodationAvailable: attendeeInfo.accommodationAvailable,
    totalGuests: attendeeInfo.confirmed,
  });
  const [loading, setLoading] = useState(true);

  const firebaseService = new FirebaseService();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const firebaseStats = await firebaseService.getRSVPStats();
      
      // Calcular espacios de hospedaje disponibles
      const accommodationAvailable = Math.max(0, 10 - firebaseStats.needingAccommodation);
      
      setStats({
        confirmed: firebaseStats.totalGuests, // Total de personas (no RSVPs)
        accommodationAvailable,
        totalGuests: firebaseStats.totalGuests,
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const availableSpots = attendeeInfo.capacity - stats.totalGuests;
  const percentageFilled = (stats.totalGuests / attendeeInfo.capacity) * 100;

  return (
    <section id="rsvp" className="py-24 bg-gradient-to-b from-black via-cyan-950/10 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[200px] animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-[200px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CONFIRMA TU ASISTENCIA
            </span>
          </h2>
          <p className="text-gray-400 text-lg font-mono mb-6">
            ▸ ENTRADA TOTALMENTE GRATUITA
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="px-6 py-4 bg-black/50 border-2 border-cyan-500/30 rounded-xl">
              <div className="text-3xl font-black text-cyan-400 mb-1">
                {loading ? '...' : stats.confirmed}
              </div>
              <div className="text-gray-400 text-sm font-mono">
                CONFIRMADOS
              </div>
            </div>

            <div className="px-6 py-4 bg-black/50 border-2 border-purple-500/30 rounded-xl">
              <div className="text-3xl font-black text-purple-400 mb-1">
                {loading ? '...' : availableSpots}
              </div>
              <div className="text-gray-400 text-sm font-mono">
                LUGARES DISPONIBLES
              </div>
            </div>

            <div className="px-6 py-4 bg-black/50 border-2 border-pink-500/30 rounded-xl">
              <div className="text-3xl font-black text-pink-400 mb-1">
                {loading ? '...' : stats.accommodationAvailable}
              </div>
              <div className="text-gray-400 text-sm font-mono">
                ESPACIOS DE HOSPEDAJE
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="h-3 bg-black/50 border border-cyan-500/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-1000"
                style={{ width: `${percentageFilled}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm font-mono mt-2">
              {percentageFilled.toFixed(0)}% de invitados confirmados
            </p>
          </div>
        </div>

        {/* Form */}
        <RSVPForm 
          accommodationAvailable={stats.accommodationAvailable} 
          onSubmitSuccess={loadStats}
        />

        {/* Additional info */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="p-6 bg-black/50 border border-cyan-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 font-mono text-sm">
                INFORMACIÓN IMPORTANTE
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300 text-sm">
              <div>
                <div className="p-5 md:p-6 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                    <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-wider">Sobre el Evento</h4>
                  </div>
                  
                  <ul className="space-y-0">
                    <li className="flex items-start gap-3 py-3">
                      <span className="text-lg mt-0.5">🎉</span>
                      <span className="text-sm md:text-base text-gray-200">Entrada totalmente gratuita</span>
                    </li>
                    <div className="h-px bg-zinc-700/30"></div>
                    <li className="flex items-start gap-3 py-3">
                      <span className="text-lg mt-0.5">🎄</span>
                      <span className="text-sm md:text-base text-gray-200">Incluye ponche y posada tradicional</span>
                    </li>
                    <div className="h-px bg-zinc-700/30"></div>
                    <li className="flex items-start gap-3 py-3">
                      <span className="text-lg mt-0.5">🎵</span>
                      <span className="text-sm md:text-base text-gray-200">Música techno toda la noche</span>
                    </li>
                    <div className="h-px bg-zinc-700/30"></div>
                    <li className="flex items-start gap-3 py-3">
                      <span className="text-lg mt-0.5">🎁</span>
                      <span className="text-sm md:text-base text-gray-200">Piñata y regalos sorpresa</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="p-5 md:p-6 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                    <h4 className="text-purple-400 font-bold text-sm uppercase tracking-wider">Hospedaje</h4>
                  </div>
                  
                  <ul className="space-y-0">
                    <li className="flex items-start gap-3 py-3">
                      <span className="text-lg mt-0.5">🏠</span>
                      <span className="text-sm md:text-base text-gray-200">Espacio limitado en casa del host</span>
                    </li>
                    <div className="h-px bg-zinc-700/30"></div>
                    <li className="flex items-start gap-3 py-3">
                      <span className="text-lg mt-0.5">🛏️</span>
                      <span className="text-sm md:text-base text-gray-200">Trae tu sleeping bag o colchoneta</span>
                    </li>
                    <div className="h-px bg-zinc-700/30"></div>
                    <li className="flex items-start gap-3 py-3">
                      <span className="text-lg mt-0.5">🚿</span>
                      <span className="text-sm md:text-base text-gray-200">Baño y regadera disponibles</span>
                    </li>
                    <div className="h-px bg-zinc-700/30"></div>
                    <li className="flex items-start gap-3 py-3">
                      <span className="text-lg mt-0.5">☕</span>
                      <span className="text-sm md:text-base text-gray-200">Desayuno incluido al día siguiente</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
