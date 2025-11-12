import { Event } from '../../domain/entities/Event';
import { Location } from '../../domain/entities/Location';
import { Schedule } from '../../domain/entities/Schedule';
import { AttendeeInfo } from '../../domain/entities/AttendeeInfo';

export class EventRepository {
  getEventData(): Event {
    return {
      id: '1',
      title: 'TECHNO POSADA 2025',
      subtitle: 'Navidad Electrónica en Zapopan',
      date: new Date('2025-12-19T22:00:00'),
      description: 'La posada más electrónica del año. Una noche donde la tradición mexicana se encuentra con los beats más potentes del techno. ¡ENTRADA GRATUITA! Cupo máximo: 30 personas.',
      theme: 'techno-christmas',
      capacity: 30,
      availableTickets: 25,
    };
  }

  getLocation(): Location {
    return {
      id: '1',
      name: 'Venue Zapopan',
      address: 'Av. Patria 1201, Col. Lomas del Valle',
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
          time: '22:00',
          title: 'Warm Up Session',
          description: 'Recepción y bienvenida con beats progresivos',
        },
        {
          id: '2',
          time: '23:00',
          title: 'DJ Local Set',
          description: 'Apertura con lo mejor del techno local',
          artist: 'DJ Sonido del Valle',
        },
        {
          id: '3',
          time: '00:30',
          title: 'Posada Break',
          description: 'Piñata techno y ponche navideño',
        },
        {
          id: '4',
          time: '01:00',
          title: 'Main Act',
          description: 'El headliner de la noche con hard techno',
          artist: 'TBA',
        },
        {
          id: '5',
          time: '03:00',
          title: 'Closing Set',
          description: 'Cierre épico hasta el amanecer',
        },
      ],
    };
  }

  getAttendeeInfo(): AttendeeInfo {
    return {
      confirmed: 8,
      capacity: 30,
      accommodationAvailable: 5,
    };
  }
}

