import QrCode from "../qrCode/QrCode";
import Button from "../../buttons/Button";
import Spinner from "../spinner/Spinner";
import { dateComparison } from "../../utils/date/dateComparison";
import {
  convertEventDateToLocale,
  getCurrentDate,
} from "../../utils/date/getDates";

const EventItem = ({ event, onDelete, isLoading }) => {
  const today = getCurrentDate();
  const eventDate = convertEventDateToLocale(event.eventDate);

  return (
    <li
      className={`border w- rounded-lg shadow-md p-4 ${dateComparison(today, event.eventDate.toDate()) ? "bg-blue-100" : "bg-slate-100"}`}>
      <section className="flex flex-row justify-between items-start">
        <h2 className="font-bold text-xl">{event.eventName}</h2>
        <Button
          styles={`bg-red-500 hover:bg-red-400 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} mt-1`}
          onClick={() => onDelete(event.id)}>
          {isLoading ? <Spinner /> : <span>Delete</span>}
        </Button>
      </section>

      {!event.groupLimit ? (
        <p className="text-gray-700 mb-0.5 font-bold">No Group Limit</p>
      ) : (
        <p className="text-gray-700 mb-0.5">
          <span className="font-bold">Group Limit:</span> {event.groupLimit}
        </p>
      )}

      {event.signedUp.length > 0 && (
        <p className="text-gray-700 mb-2">
          <span className="font-bold">Number of Sign-ups: </span>{" "}
          {event.signedUp.length} / {event.groupLimit || "No Limit"}
        </p>
      )}

      {event.eventDate && (
        <p className="text-gray-700 mb-0.5">
          <span className="font-bold">Event Date: </span>
          {eventDate}
        </p>
      )}

      {event.eventCategory && (
        <p className="text-gray-700 mb-0.5">
          <span className="font-bold">Category: </span>
          {event.eventCategory}
        </p>
      )}

      {event.eventRecurrence && (
        <p className="text-gray-700 mb-0.5">
          <span className="font-bold">Recurrence: </span>
          {event.eventRecurrence}
        </p>
      )}

      {dateComparison(today, event.eventDate.toDate()) && (
        <p className="text-red-500 font-bold">Event has ended</p>
      )}

      <div className="flex flex-col items-center justify-center mt-4">
        <QrCode qrCodeValue={event} />
      </div>
    </li>
  );
};

export default EventItem;
