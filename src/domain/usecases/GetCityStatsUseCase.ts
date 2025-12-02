import { FirebaseService } from '../../data/services/FirebaseService';

export interface CityStats {
  city: string;
  count: number;
  percentage: number;
}

export class GetCityStatsUseCase {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  /**
   * Normaliza el nombre de una ciudad para agruparla correctamente
   * - Convierte a minúsculas
   * - Elimina acentos
   * - Elimina espacios extras
   * - Normaliza caracteres especiales
   */
  private normalizeCity(city: string): string {
    if (!city) return 'No especificado';
    
    return city
      .toLowerCase()
      .normalize('NFD') // Descompone caracteres con acentos
      .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos (acentos)
      .replace(/\s+/g, ' ') // Normaliza espacios múltiples a uno solo
      .trim();
  }

  /**
   * Obtiene el nombre de ciudad en formato de presentación
   * (Primera letra de cada palabra en mayúscula)
   */
  private formatCityName(city: string): string {
    if (!city || city === 'no especificado') return 'No especificado';
    
    return city
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Obtiene estadísticas agrupadas por ciudad de origen
   */
  async execute(): Promise<CityStats[]> {
    try {
      const allRSVPs = await this.firebaseService.getAllRSVPs();
      
      // Mapa para agrupar ciudades normalizadas
      const cityMap = new Map<string, { displayName: string; count: number }>();
      
      allRSVPs.forEach(rsvp => {
        const normalizedCity = this.normalizeCity(rsvp.city || '');
        
        if (cityMap.has(normalizedCity)) {
          const existing = cityMap.get(normalizedCity)!;
          cityMap.set(normalizedCity, {
            displayName: existing.displayName,
            count: existing.count + (rsvp.guests || 1),
          });
        } else {
          cityMap.set(normalizedCity, {
            displayName: this.formatCityName(rsvp.city || ''),
            count: rsvp.guests || 1,
          });
        }
      });
      
      // Calcular total de invitados
      const totalGuests = Array.from(cityMap.values()).reduce((sum, city) => sum + city.count, 0);
      
      // Convertir a array y calcular porcentajes
      const stats: CityStats[] = Array.from(cityMap.entries()).map(([_, data]) => ({
        city: data.displayName,
        count: data.count,
        percentage: totalGuests > 0 ? (data.count / totalGuests) * 100 : 0,
      }));
      
      // Ordenar por cantidad (descendente)
      stats.sort((a, b) => b.count - a.count);
      
      return stats;
    } catch (error) {
      console.error('Error al obtener estadísticas de ciudades:', error);
      return [];
    }
  }
}
