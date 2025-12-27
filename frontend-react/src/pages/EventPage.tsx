import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import type { EventDto } from "../models/Event";
import Breadcrumb from "../components/Breadcrumb";

function EventPage() {
  const [events, setEvents] = useState<EventDto[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/events")
      .then(res => res.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "ACCUEIL", path: "/" }
        ]}
      />
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Evenements</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-center items-center">
        {events.map(event => (
          <EventCard
            key={event.id}
            symbol={event.symbol}
            title={event.event_name}
            years={event.years}
          />
        ))}
      </div>
    </div>
  )
}

export default EventPage