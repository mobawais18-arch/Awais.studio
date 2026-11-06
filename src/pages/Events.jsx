import { usePageMeta } from "../hooks/usePageMeta";
import { Booking, EventGallery, EventsHero, HostedEvents, Occasions, ServiceList } from "../sections/EventSections";

export default function Events() {
  usePageMeta("Event Hosting & MC", "MC services, stage hosting, and event organization by Awais for corporate, school, college, and special occasions.");
  return (
    <>
      <EventsHero />
      <ServiceList />
      <Occasions />
      <EventGallery />
      <HostedEvents />
      <Booking />
    </>
  );
}
