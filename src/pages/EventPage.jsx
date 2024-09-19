import useEventList from '../components/hooks/useEventList';
import useQrCode from '../components/hooks/useQrcode';

const EventPage = () => {
  const event = useEventList();
  console.log(event);

  return (
    <div>
      <h1>Events</h1>
      {event && (
        <ul className="flex gap-32">
          {event.map(
            (event) => (
              console.log(event),
              (
                <li key={event.id}>
                  <li className="font-bold">Event Name: {event.eventName}</li>
                  <li>Event Type:{event.eventType}</li>
                  <li>Group Limit: {event.groupLimit}</li>
                  <li>
                    Number of Signups: {event.signedUp.length} / {event.groupLimit}
                  </li>
                  <li>{useQrCode(event.id)}</li>
                </li>
              )
            ),
          )}
        </ul>
      )}
    </div>
  );
};

export default EventPage;
