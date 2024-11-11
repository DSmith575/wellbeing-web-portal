import useEventList from "../hooks/useEventList";
import { deleteEvent } from "../../utils/firestore/firestoreFunctions";
import useLoading from "../hooks/useLoading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableHeaders } from "../../utils/constants/constants";
import {
  convertEventDateToLocale,
  getCurrentDate,
} from "../../utils/date/getDates";
import { dateComparison } from "../../utils/date/dateComparison";
import Button from "../../buttons/Button";
import QrCode from "../qrCode/QrCode";
import Spinner from "../spinner/Spinner";
import EventLegend from "./EventLegend";

const EventList = () => {
  const { loading, setLoading } = useLoading();
  const event = useEventList();
  const today = getCurrentDate();

  const handleDeleteEvent = async (eventId) => {
    try {
      setLoading(`deleteEvent-${eventId}`, true);
      await new Promise((resolve) => setTimeout(resolve, 4000));
      await deleteEvent(eventId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(`deleteEvent-${eventId}`, false);
    }
  };
  return (
    <section className={"mx-8 my-8 w-full relative"}>
      <section className={"rounded-lg shadow-lg w-full"}>
        <Table>
          {event && (
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {event && (
              <>
                {event.map((event) => (
                  <TableRow
                    key={event.id}
                    className={`${dateComparison(today, event.eventDate.toDate()) && "bg-gradient-to-tr from-red-200 to-white"}`}>
                    <TableCell className={`font-medium`}>
                      {event.eventCategory}
                    </TableCell>
                    <TableCell>{event.eventName}</TableCell>
                    <TableCell>
                      {convertEventDateToLocale(event.eventDate)}
                    </TableCell>
                    <TableCell>{event.eventLocation}</TableCell>
                    <TableCell>{event.signedUp.length}</TableCell>

                    {!event.groupLimit ? (
                      <TableCell>No Group Limit</TableCell>
                    ) : (
                      <TableCell>{event.groupLimit}</TableCell>
                    )}

                    <TableCell>{event.eventRecurrence}</TableCell>
                    <TableCell className={"flex justify-end"}>
                      <Button
                        styles={`bg-red-500 hover:bg-red-400 mr-2 ${loading(`deleteEvent-${event.id}`) && "cursor-not-allowed disabled:opacity-50"}`}
                        onClick={() => handleDeleteEvent(event.id)}>
                        {loading(`deleteEvent-${event.id}`) ? (
                          <Spinner />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                      <QrCode qrCodeValue={event} hideQr={true} />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </section>
      <EventLegend text={"Event ended"} />
    </section>
  );
};

export default EventList;
