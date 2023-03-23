import { getTime } from 'date-fns';
import Link from 'next/link';
import { getAllEvents } from '~/lib/events';
import { Divider } from '../ui/elements/Divider';
import { Card } from '../ui/layout/Card';
import { List } from '../ui/layout/List';
import { Section } from '../ui/layout/Section';
import { H4 } from '../ui/typography/H4';

export async function Appearances() {
  const allEvents = await getAllEvents();
  const today = new Date();
  const todayInMilliseconds = getTime(today);
  // Calculate the difference between each date and today's date
  const dateDistances = allEvents.map((appearance) => Math.abs(getTime(appearance.startDate) - todayInMilliseconds));
  // Sort the events by their date distance to today's date and get the 5 closest ones
  const events = allEvents
    .slice()
    .sort((a, b) => {
      const aDistance = dateDistances[allEvents.indexOf(a)];
      const bDistance = dateDistances[allEvents.indexOf(b)];

      if (aDistance === undefined || bDistance === undefined) {
        return 0;
      }

      return aDistance - bDistance;
    })
    .slice(0, 5);
  const upcoming = events
    .filter((event) => event.startDate > today)
    .sort((a, b) => getTime(b.startDate) - getTime(a.startDate));
  const past = events.filter((event) => event.startDate <= today);

  return (
    <Section>
      <H4 as="h2">Appearances</H4>
      <Card>
        <div className="grid gap-8">
          <Card.Body title="Upcoming">
            <List as="ol">
              {upcoming.map((event) => (
                <List.Item key={event.slug}>
                  <Card.Item
                    date={event.startDate}
                    description={`${event.location.city}, ${event.location.state ?? event.location.country}`}
                    link={`/events/${event.slug}`}
                    title={event.name}
                  />
                </List.Item>
              ))}
            </List>
          </Card.Body>
          <Divider />
          <Card.Body title="Past">
            <List as="ol">
              {past.map((event) => (
                <List.Item key={event.slug}>
                  <Card.Item
                    date={event.startDate}
                    description={`${event.location.city}, ${event.location.state ?? event.location.country}`}
                    link={`/events/${event.slug}`}
                    title={event.name}
                  />
                </List.Item>
              ))}
            </List>
          </Card.Body>
          <Link
            className="rounded-2xl border border-stone-200 p-4 text-center text-sm font-medium leading-none text-stone-400 transition hover:border-stone-300 hover:text-stone-600"
            href="/appearances"
          >
            All Appearances
          </Link>
        </div>
      </Card>
    </Section>
  );
}
