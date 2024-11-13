/**
 * @name useGetAttendeesList
 * @description Custom hook to get attendees list
 * @returns {Object} - Attendees list and loading state

 */

import { useState, useEffect } from "react";
import { getAllAttendeesFromEvents } from "../utils/firestore/firestoreFunctions";
import useLoading from "./useLoading";

const useGetAttendeesList = () => {
  const { loading, setLoading } = useLoading();
  const [attendedUsers, setAttendedUsers] = useState([]);

  const getAttendeeList = async () => {
    try {
      setLoading("attendeesList", true);
      const userList = await getAllAttendeesFromEvents();
      setAttendedUsers(userList);
    } catch (error) {
      console.error("Error getting attendees list: ", error);
    } finally {
      setLoading("attendeesList", false);
    }
  };

  useEffect(() => {
    getAttendeeList();
  }, []);

  return { attendedUsers, loading };
};

export default useGetAttendeesList;
