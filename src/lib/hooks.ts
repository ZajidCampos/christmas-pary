/**
 * Utility hooks para trabajar con Firebase
 */

import { useState, useEffect } from 'react';
import { FirebaseService } from '../data/services/FirebaseService';

const firebaseService = new FirebaseService();

/**
 * Hook para obtener estadísticas de RSVPs en tiempo real
 */
export function useRSVPStats() {
  const [stats, setStats] = useState({
    total: 0,
    needingAccommodation: 0,
    interestedInTour: 0,
    totalGuests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await firebaseService.getRSVPStats();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error al cargar estadísticas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { stats, loading, error, refetch };
}

/**
 * Hook para obtener todos los RSVPs
 */
export function useRSVPs() {
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await firebaseService.getAllRSVPs();
      setRsvps(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error al cargar RSVPs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { rsvps, loading, error, refetch };
}

/**
 * Hook para obtener RSVPs que necesitan hospedaje
 */
export function useAccommodationRequests() {
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await firebaseService.getRSVPsNeedingAccommodation();
      setRsvps(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error al cargar solicitudes de hospedaje:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { rsvps, loading, error, refetch };
}

/**
 * Hook para obtener RSVPs interesados en el tour
 */
export function useTequilaTourInterest() {
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await firebaseService.getRSVPsInterestedInTour();
      setRsvps(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error al cargar interesados en tour:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { rsvps, loading, error, refetch };
}
