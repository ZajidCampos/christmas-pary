import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  updateDoc,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { RSVPFormData } from '../../domain/entities/Ticket';

export class FirebaseService {
  private rsvpCollection = 'rsvps';

  /**
   * Guardar un nuevo RSVP en Firestore
   */
  async saveRSVP(data: RSVPFormData): Promise<string> {
    try {
      const rsvpData = {
        ...data,
        createdAt: Timestamp.now(),
        status: 'confirmed',
      };

      const docRef = await addDoc(collection(db, this.rsvpCollection), rsvpData);
      console.log('RSVP guardado con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error al guardar RSVP:', error);
      throw new Error('No se pudo guardar la confirmación. Por favor intenta de nuevo.');
    }
  }

  /**
   * Obtener todos los RSVPs confirmados
   */
  async getAllRSVPs(): Promise<any[]> {
    try {
      console.log('FirebaseService: Obteniendo todos los RSVPs...');
      
      // Timeout de 5 segundos para evitar que se quede colgado
      const timeoutPromise = new Promise<any[]>((_, reject) => {
        setTimeout(() => reject(new Error('Timeout al consultar Firebase')), 5000);
      });
      
      // Intentar primero con orderBy
      const queryPromise = (async () => {
        try {
          const q = query(
            collection(db, this.rsvpCollection),
            orderBy('createdAt', 'desc')
          );
          
          const querySnapshot = await getDocs(q);
          const rsvps: any[] = [];
          
          querySnapshot.forEach((doc) => {
            rsvps.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          
          console.log('FirebaseService: RSVPs encontrados (con orderBy):', rsvps.length);
          return rsvps;
        } catch (orderError: any) {
          // Si falla por falta de índice, intentar sin orderBy
          console.log('FirebaseService: orderBy falló, intentando sin orden:', orderError.message);
          const querySnapshot = await getDocs(collection(db, this.rsvpCollection));
          const rsvps: any[] = [];
          
          querySnapshot.forEach((doc) => {
            rsvps.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          
          console.log('FirebaseService: RSVPs encontrados (sin orderBy):', rsvps.length);
          return rsvps;
        }
      })();
      
      // Race entre la query y el timeout
      return await Promise.race([queryPromise, timeoutPromise]);
    } catch (error: any) {
      console.error('FirebaseService: Error al obtener RSVPs:', error.message);
      // Si la colección no existe o hay timeout, devolver array vacío
      console.log('FirebaseService: Devolviendo array vacío');
      return [];
    }
  }

  /**
   * Obtener RSVPs que necesitan hospedaje
   */
  async getRSVPsNeedingAccommodation(): Promise<any[]> {
    try {
      const q = query(
        collection(db, this.rsvpCollection),
        where('needsAccommodation', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      const rsvps: any[] = [];
      
      querySnapshot.forEach((doc) => {
        rsvps.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      
      return rsvps;
    } catch (error) {
      console.error('Error al obtener RSVPs con hospedaje:', error);
      throw error;
    }
  }

  /**
   * Obtener RSVPs interesados en el tour a Tequila
   */
  async getRSVPsInterestedInTour(): Promise<any[]> {
    try {
      const q = query(
        collection(db, this.rsvpCollection),
        where('interestedInTequilaTour', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      const rsvps: any[] = [];
      
      querySnapshot.forEach((doc) => {
        rsvps.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      
      return rsvps;
    } catch (error) {
      console.error('Error al obtener RSVPs interesados en tour:', error);
      throw error;
    }
  }

  /**
   * Obtener estadísticas de RSVPs
   */
  async getRSVPStats(): Promise<{
    total: number;
    needingAccommodation: number;
    interestedInTour: number;
    totalGuests: number;
  }> {
    try {
      console.log('FirebaseService: Obteniendo estadísticas...');
      const allRSVPs = await this.getAllRSVPs();
      
      let needingAccommodation = 0;
      let interestedInTour = 0;
      let totalGuests = 0;
      
      allRSVPs.forEach(rsvp => {
        // Contar al organizador
        if (rsvp.needsAccommodation) needingAccommodation++;
        if (rsvp.interestedInTequilaTour) interestedInTour++;
        totalGuests += rsvp.guests || 1;
        
        // Contar invitados adicionales en la lista
        if (rsvp.guestsList && Array.isArray(rsvp.guestsList)) {
          rsvp.guestsList.forEach((guest: any) => {
            if (guest.needsAccommodation) needingAccommodation++;
            if (guest.interestedInTequilaTour) interestedInTour++;
          });
        }
      });
      
      const stats = {
        total: allRSVPs.length,
        needingAccommodation,
        interestedInTour,
        totalGuests,
      };
      
      console.log('FirebaseService: Estadísticas calculadas:', stats);
      return stats;
    } catch (error) {
      console.error('FirebaseService: Error al obtener estadísticas:', error);
      // Si hay error, devolver valores en 0 (colección vacía o no existe)
      const emptyStats = {
        total: 0,
        needingAccommodation: 0,
        interestedInTour: 0,
        totalGuests: 0,
      };
      console.log('FirebaseService: Devolviendo estadísticas vacías');
      return emptyStats;
    }
  }

  /**
   * Verificar si un email ya está registrado
   */
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, this.rsvpCollection),
        where('email', '==', email.toLowerCase())
      );
      
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error al verificar email:', error);
      return false;
    }
  }
}
