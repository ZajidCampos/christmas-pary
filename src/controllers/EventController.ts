import { EventRepository } from '../data/repositories/EventRepository';
import { Event } from '../domain/entities/Event';
import { Location } from '../domain/entities/Location';
import { Schedule } from '../domain/entities/Schedule';
import { AttendeeInfo } from '../domain/entities/AttendeeInfo';

export class EventController {
  private repository: EventRepository;

  constructor() {
    this.repository = new EventRepository();
  }

  getEventInfo(): Event {
    return this.repository.getEventData();
  }

  getLocationInfo(): Location {
    return this.repository.getLocation();
  }

  getScheduleInfo(): Schedule {
    return this.repository.getSchedule();
  }

  getAttendeeInfo(): AttendeeInfo {
    return this.repository.getAttendeeInfo();
  }

  calculateAvailability(): number {
    const info = this.repository.getAttendeeInfo();
    return ((info.capacity - info.confirmed) / info.capacity) * 100;
  }

  getAccommodationAvailability(): number {
    return this.repository.getAttendeeInfo().accommodationAvailable;
  }
}
