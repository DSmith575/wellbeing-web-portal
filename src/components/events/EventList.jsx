import useEventList from '../hooks/useEventList';
import { deleteEvent } from '../../utils/firestore/firestoreFunctions';
import EventItem from './EventItem';
import useLoading from '../hooks/useLoading';

const EventList = () => {
  const { loading, setLoading } = useLoading();

  const handleDeleteEvent = async (eventId) => {
    try {
      setLoading(`deleteEvent-${eventId}`, true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await deleteEvent(eventId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(`deleteEvent-${eventId}`, false);
    }
  };
  const event = useEventList();
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      {event && (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
            {event.map((event) => (
              <EventItem
                key={event.id}
                event={event}
                onDelete={handleDeleteEvent}
                isLoading={loading(`deleteEvent-${event.id}`)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default EventList;