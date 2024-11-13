/**
 * @name EventList
 * @description EventList component
 * @returns {JSX.Element} - Rendered EventList component

 */

import useEventList from "../../hooks/useEventList";
import { deleteEvent } from "../../utils/firestore/firestoreFunctions";
import useLoading from "../../hooks/useLoading";
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
import Button from "../buttons/Button";
import QrCode from "../qrCode/QrCode";
import Spinner from "../spinner/Spinner";
import { useState } from "react";

import { IoTrashBin } from "react-icons/io5";
import { GoInfinity } from "react-icons/go";
import SwitchToggle from "../switch/SwitchToggle";

const EventList = () => {
  const { loading, setLoading } = useLoading();
  const event = useEventList();
  const today = getCurrentDate();

  const [showUpcoming, setShowUpcoming] = useState(true);

  const handleDeleteEvent = async (eventId) => {
    try {
      setLoading(`deleteEvent-${eventId}`, true);
      await deleteEvent(eventId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(`deleteEvent-${eventId}`, false);
    }
  };

  // Filter events based on the toggle switch
  const filteredEvents = event.filter((event) =>
    showUpcoming
      ? event.eventEndDate.seconds >= Math.floor(new Date().getTime() / 1000)
      : event.eventEndDate.seconds < Math.floor(new Date().getTime() / 1000),
  );

  return (
    <section className="mx-8 my-8 w-full relative">
      <SwitchToggle
        checked={showUpcoming}
        onCheckedChange={setShowUpcoming}
        checkedText={"Upcoming Events"}
        uncheckedText={"Past Events"}
      />

      <section className="rounded-lg shadow-lg w-full">
        <Table>
          {filteredEvents && (
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {filteredEvents && (
              <>
                {filteredEvents.map((event) => (
                  <TableRow
                    key={event.id}
                    className={`${
                      dateComparison(today, event.eventEndDate.toDate()) &&
                      "bg-gradient-to-tr from-red-200 to-white"
                    }`}>
                    <TableCell className="font-medium">
                      {event.eventCategory}
                    </TableCell>
                    <TableCell>{event.eventName}</TableCell>
                    <TableCell>
                      {convertEventDateToLocale(event.eventDate)}
                    </TableCell>
                    <TableCell>
                      {convertEventDateToLocale(event.eventEndDate)}
                    </TableCell>
                    <TableCell>{event.eventLocation}</TableCell>

                    {!event.groupLimit ? (
                      <TableCell>
                        <section className="flex items-center">
                          {event.signedUp.length} /
                          <GoInfinity size={18} className="ml-1" />
                        </section>
                      </TableCell>
                    ) : (
                      <TableCell>
                        {event.signedUp.length} / {event.groupLimit}
                      </TableCell>
                    )}

                    <TableCell>{event.eventRecurrence}</TableCell>
                    <TableCell className="flex justify-end">
                      <Button
                        styles={`bg-red-500 hover:bg-red-400 mr-2 ${
                          loading(`deleteEvent-${event.id}`) &&
                          "cursor-not-allowed disabled:opacity-50"
                        }`}
                        onClick={() => handleDeleteEvent(event.id)}>
                        {loading(`deleteEvent-${event.id}`) ? (
                          <Spinner />
                        ) : (
                          <IoTrashBin size={20} className="text-white" />
                        )}
                      </Button>
                      <QrCode qrCodeValue={event} hideQr={true} showQrIcon={true} />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </section>
    </section>
  );
};

export default EventList;
