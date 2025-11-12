import { Event } from '../../domain/entities/Event';
import { Location } from '../../domain/entities/Location';
import { Schedule } from '../../domain/entities/Schedule';
import { AttendeeInfo } from '../../domain/entities/AttendeeInfo';

export class EventRepository {
  getEventData(): Event {
    return {
      id: '1',
      title: 'TECHNO POSADA 2025',
      subtitle: 'Una fiesta para mis amigxs más increíbles 🫶',
      date: new Date('2025-12-19T22:00:00'),
      description: 'Si tienes este link es porque fuiste de las personas más increíbles que conocí o seguí manteniendo en mi vida este año. Hagamos una noche épica, con techno, risas y la mejor vibra. ¡Te quiero ahí!',
      theme: 'techno-christmas',
      capacity: 30,
      availableTickets: 30, // Valor inicial, se actualiza dinámicamente desde Firebase
    };
  }

  getLocation(): Location {
    return {
      id: '1',
      name: 'UBICACIÓN PRIVADA EN ZAPOPAN',
      address: 'Te envia la ubicación exacta al confirmar asistencia',
      city: 'Zapopan',
      state: 'Jalisco',
      coordinates: {
        lat: 20.7369,
        lng: -103.4281,
      },
      mapUrl: 'https://maps.google.com/?q=20.7369,-103.4281',
    };
  }

  getSchedule(): Schedule {
    return {
      items: [
        {
          id: '1',
          time: '20:00',
          title: 'Apertura & Warm Up',
          description: 'Recepción, bienvenida y beats progresivos para empezar la noche',
        },
        {
          id: '2',
          time: '21:00',
          title: 'Cena Navideña',
          description: 'Momento para compartir alimentos y convivir. Trae algo para compartir si gustas',
        },
        {
          id: '3',
          time: '22:30',
          title: 'Minimal & Deep House Set',
          description: 'Sonidos profundos y grooves hipnóticos que preparan el ambiente',
          artist: 'DJ Set 1',
        },
        {
          id: '4',
          time: '23:30',
          title: 'Piñata Techno',
          description: 'Tradición mexicana con twist electrónico. ¡Sorpresas para todos!',
        },
        {
          id: '5',
          time: '00:30',
          title: 'Concurso de Porros',
          description: '🌿 Competencia del mejor forjador. Premios para el más creativo, artístico y funcional. Que gane el mejor rolling!',
        },
        {
          id: '6',
          time: '01:00',
          title: 'Peak Time Techno',
          description: 'El momento más intenso de la noche. Hard techno y kicks potentes',
          artist: 'DJ Set 2',
        },
        {
          id: '7',
          time: '02:30',
          title: 'Progressive House',
          description: 'Melodías envolventes y builds épicos para mantener la energía',
          artist: 'DJ Set 3',
        },
        {
          id: '8',
          time: '03:30',
          title: 'Closing Techno',
          description: 'Cierre contundente hasta las 4:00 AM. La última pista antes del amanecer',
          artist: 'DJ Set 4',
        },
      ],
    };
  }

  getAttendeeInfo(): AttendeeInfo {
    return {
      confirmed: 8,
      capacity: 30,
      accommodationAvailable: 8,
    };
  }
}

