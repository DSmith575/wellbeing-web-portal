import QrCode from '../qrCode/QrCode';
import Button from '../../buttons/Button';
import Spinner from '../spinner/Spinner';
const EventItem = ({ event, onDelete, isLoading }) => {
  console.log(isLoading);
  return (
    <li className="border rounded-lg shadow-md p-4 bg-slate-100 transition-transform transform hover:scale-105">
      <h2 className="font-bold text-xl mb-2">{event.eventName}</h2>
      <p className="text-gray-700 mb-1">Event Type: {event.eventType}</p>

      {!event.groupLimit ? (
        <p className="text-gray-700 mb-1">No Group Limit</p>
      ) : (
        <p className="text-gray-700 mb-1">Group Limit: {event.groupLimit}</p>
      )}

      {event.signedUp.length > 0 && (
        <p className="text-gray-700 mb-2">
          Number of Sign-ups: {event.signedUp.length} /{' '}
          {event.groupLimit || 'No Limit'}
        </p>
      )}

      <div className="flex justify-center mt-4">
        <QrCode qrCodeValue={event.id} />
      </div>
      <Button
        styles={`bg-red-500 absolute top-0 right-0 hover:bg-red-400 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => onDelete(event.id)}>
        {isLoading ? <Spinner /> : 'Delete'}
      </Button>
    </li>
  );
};

export default EventItem;
