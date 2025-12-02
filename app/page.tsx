'use client';

import { EventController } from '@/src/controllers/EventController';
import Hero from '@/src/ui/components/Hero';
import Features from '@/src/ui/components/Features';
import Schedule from '@/src/ui/components/Schedule';
import TequilaTour from '@/src/ui/components/TequilaTour';
import Location from '@/src/ui/components/Location';
import RSVPSection from '@/src/ui/components/RSVPSection';
import Footer from '@/src/ui/components/Footer';

export default function Home() {
  const controller = new EventController();
  const event = controller.getEventInfo();
  const location = controller.getLocationInfo();
  const schedule = controller.getScheduleInfo();
  const attendeeInfo = controller.getAttendeeInfo();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Hero event={event} />
      <Features />
      <Schedule schedule={schedule} />
      <TequilaTour />
      <Location location={location} />
  <RSVPSection attendeeInfo={attendeeInfo} />
  <Footer variant="home" />
    </div>
  );
}
