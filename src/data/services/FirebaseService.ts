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
      
      return rsvps;
    } catch (error) {
      console.error('Error al obtener RSVPs:', error);
      throw error;
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
      const allRSVPs = await this.getAllRSVPs();
      
      let needingAccommodation = 0;
      let interestedInTour = 0;
      let totalGuests = 0;
      
      allRSVPs.forEach(rsvp => {
        if (rsvp.needsAccommodation) needingAccommodation++;
        if (rsvp.interestedInTequilaTour) interestedInTour++;
        totalGuests += rsvp.guests || 1;
      });
      
      return {
        total: allRSVPs.length,
        needingAccommodation,
        interestedInTour,
        totalGuests,
      };
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
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
