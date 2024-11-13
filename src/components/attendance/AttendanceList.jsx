/**
 * @name AttendanceList
 * @description AttendanceList component
 * @returns {JSX.Element} - Rendered AttendanceList component
 */

import useGetAttendeesList from "../../hooks/useGetAttendeesList";
import Button from "../buttons/Button";
import { GoInfinity } from "react-icons/go";
import { dateComparison } from "../../utils/date/dateComparison";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "../ui/table";
import {
  attendanceTableHeaders,
  tableHeaders,
} from "../../utils/constants/constants";
import {
  convertEventDateToLocale,
  getCurrentDate,
} from "../../utils/date/getDates";

const AttendanceList = () => {
  const { attendedUsers, loading } = useGetAttendeesList();
  const today = getCurrentDate();

  const [showAttendees, setShowAttendees] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleViewAttendees = (event) => {
    setSelectedEvent(event);
    setShowAttendees(true);
  };

  return (
    <>
      <section className="mx-8 my-8 w-full">
        <section className="rounded-lg shadow-lg w-full">
          <Table>
            {attendedUsers && (
              <TableHeader>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {attendedUsers && (
                <>
                  {attendedUsers.map((event) => (
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
                            {event.signedUp.length} /{" "}
                            <GoInfinity size={18} className="ml-1" />
                          </section>
                        </TableCell>
                      ) : (
                        <TableCell>
                          {event.signedUp.length} / {event.groupLimit}
                        </TableCell>
                      )}

                      <TableCell>{event.eventRecurrence}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleViewAttendees(event)}
                          styles="bg-green-500 hover:bg-green-400">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </section>
        {showAttendees && selectedEvent && (
          <section className="mx-12 my-8">
            <section className="rounded-lg shadow-lg w-full">
              <section className={"flex items-center justify"}>
                <h2 className={"font-bold text-xl mr-8 ml-4"}>
                  Attendees for:{" "}
                  <span className={"font-thin"}>{selectedEvent.eventName}</span>
                </h2>
                <Button
                  styles={"bg-green-500 hover:bg-green-400 mt-5"}
                  onClick={() => setShowAttendees(false)}>
                  Close
                </Button>
              </section>
              <Table>
                <TableHeader>
                  <TableRow>
                    {attendanceTableHeaders.map((header) => (
                      <TableHead key={header}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedEvent.attendees.map(
                    (attendee) => (
                      console.log(attendee),
                      (
                        <TableRow key={attendee.id}>
                          <TableCell>{attendee.firstName}</TableCell>
                          <TableCell>{attendee.lastName}</TableCell>
                        </TableRow>
                      )
                    ),
                  )}
                </TableBody>
              </Table>
            </section>
          </section>
        )}
      </section>
    </>
  );
};

export default AttendanceList;
