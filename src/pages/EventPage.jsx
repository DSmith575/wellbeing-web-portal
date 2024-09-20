import useEventList from '../components/hooks/useEventList';
import useQrCode from '../components/hooks/useQrcode';

const EventPage = () => {
  const event = useEventList();
  console.log(event);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      {event && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {event.map((event) => (
            <li
              key={event.id}
              className="border rounded-lg shadow-md p-4 bg-white transition-transform transform hover:scale-105">
              <h2 className="font-bold text-xl mb-2">{event.eventName}</h2>
              <p className="text-gray-700 mb-1">Event Type: {event.eventType}</p>
              {event.groupLimit > 0 && (
                <p className="text-gray-700 mb-1">
                  Group Limit: {event.groupLimit}
                </p>
              )}
              {event.signedUp.length > 0 && (
                <p className="text-gray-700 mb-2">
                  Number of Signups: {event.signedUp.length} / {event.groupLimit}
                </p>
              )}
              <div className="flex justify-center mt-4">{useQrCode(event.id)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventPage;
