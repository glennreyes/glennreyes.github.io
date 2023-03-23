import { getAllEvents } from '~/lib/events';
import { Feed } from '../ui/layout/Feed';

export async function AppearancesFeed() {
  const allEvents = await getAllEvents();
  const today = new Date();
  const upcoming = allEvents.filter((event) => event.startDate > today);
  const past = allEvents.filter((event) => event.startDate <= today);

  return (
    <>
      {upcoming.length && (
        <Feed title="Upcoming">
          {upcoming.map((event) => {
            const place = [event.location.city, event.location.state ?? event.location.country].join(', ');

            return (
              <Feed.Item
                date={event.startDate}
                description={place}
                key={event.slug}
                link={`/appearances/${event.slug}`}
                title={event.name}
              />
            );
          })}
        </Feed>
      )}
      {past.length && (
        <Feed title="Past">
          {past.map((event) => {
            const place = [event.location.city, event.location.state ?? event.location.country].join(', ');

            return (
              <Feed.Item
                date={event.startDate}
                description={place}
                key={event.slug}
                link={`/appearances/${event.slug}`}
                title={event.name}
              />
            );
          })}
        </Feed>
      )}
    </>
  );
}
