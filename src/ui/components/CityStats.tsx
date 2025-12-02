'use client';

import { useState, useEffect } from 'react';
import { GetCityStatsUseCase, CityStats } from '../../domain/usecases/GetCityStatsUseCase';

export default function CityStatsComponent() {
  const [stats, setStats] = useState<CityStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const useCase = new GetCityStatsUseCase();
      const cityStats = await useCase.execute();
      setStats(cityStats);
    } catch (error) {
      console.error('Error al cargar estadísticas de ciudades:', error);
    } finally {
      setLoading(false);
    }
  };

  if (stats.length === 0 && !loading) {
    return null;
  }

  // Mostrar top 5 ciudades o todas si está expandido
  const displayStats = isExpanded ? stats : stats.slice(0, 5);
  const hasMore = stats.length > 5;

  return (
    <div className="w-full">
      {/* Toggle Button - Discreto pero visible */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="w-full px-6 py-3 bg-zinc-900/30 hover:bg-zinc-900/50 border border-cyan-500/20 hover:border-cyan-500/40 rounded-lg transition-all duration-300 group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-cyan-500/50 rounded-full group-hover:bg-cyan-500 transition-colors"></div>
            <span className="text-cyan-400/70 group-hover:text-cyan-400 font-mono text-sm transition-colors">
              {isVisible ? '▼' : '▶'} Ver ciudades de origen de los asistentes
            </span>
          </div>
          {!loading && stats.length > 0 && (
            <span className="text-cyan-400/50 group-hover:text-cyan-400 font-mono text-xs transition-colors">
              {stats.length} {stats.length === 1 ? 'ciudad' : 'ciudades'}
            </span>
          )}
        </div>
      </button>

      {/* Stats Panel - Se expande cuando se hace clic */}
      {isVisible && (
        <div className="mt-4 p-6 bg-black/50 border-2 border-cyan-500/30 rounded-xl backdrop-blur-sm animate-fadeIn">
          {loading ? (
            <div className="flex items-center justify-center gap-3 py-8">
              <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-cyan-400 font-mono text-sm">Cargando estadísticas...</span>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                <h3 className="text-cyan-400 font-mono text-lg font-bold">
                  📍 CIUDADES DE ORIGEN
                </h3>
              </div>

              {/* Stats Grid */}
              <div className="space-y-3">
                {displayStats.map((stat, index) => (
                  <div
                    key={stat.city}
                    className="group relative overflow-hidden rounded-lg bg-zinc-900/50 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    {/* Background bar */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent transition-all duration-500"
                      style={{ width: `${stat.percentage}%` }}
                    ></div>

                    {/* Content */}
                    <div className="relative px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                          <span className="text-cyan-400 font-bold text-sm font-mono">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm md:text-base">
                            {stat.city}
                          </p>
                          <p className="text-gray-400 text-xs font-mono">
                            {stat.percentage.toFixed(1)}% del total
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-cyan-400 font-black text-xl">
                            {stat.count}
                          </p>
                          <p className="text-gray-500 text-xs font-mono">
                            {stat.count === 1 ? 'Asistente' : 'Asistentes'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expand/Collapse button */}
              {hasMore && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-4 w-full px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-all duration-300 text-cyan-400 font-mono text-sm"
                >
                  {isExpanded ? (
                    <span>▲ Mostrar menos</span>
                  ) : (
                    <span>▼ Ver todas las ciudades ({stats.length})</span>
                  )}
                </button>
              )}

              {/* Summary */}
              <div className="mt-6 pt-4 border-t border-cyan-500/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-mono">Total de ciudades</span>
                  <span className="text-cyan-400 font-bold font-mono">{stats.length}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
