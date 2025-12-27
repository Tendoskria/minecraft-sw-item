import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import type { EventDto } from "../models/Event";
import PageLayout from "../layouts/PageLayout";

function EventPage() {
  const [events, setEvents] = useState<EventDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/events")
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <PageLayout
      title="Evenements"
      breadcrumbItems={[{ label: "ACCUEIL", path: "/" }]}
      loading={loading}
      isEmpty={events.length === 0}
      emptyMessage="No events found"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {events.map(event => (
          <EventCard
            key={event.id}
            symbol={event.symbol}
            title={event.event_name}
            years={event.years}
          />
        ))}
      </div>
    </PageLayout>
  );
}

export default EventPage;
