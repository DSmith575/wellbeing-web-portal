/**
 * @name useEventList
 * @description Custom hook to fetch event list
 * @returns {Array} - Event list
 */

import { useState, useEffect } from "react";
import { getEventList } from "../utils/firestore/firestoreFunctions";

const useEventList = () => {
  const [event, setEvent] = useState([]);

  const fetchEvents = async () => {
    try {
      return getEventList({
        collectionName: "events",
        callback: (snapshot) => {
          const updatedEventList = snapshot.docs
            .map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
            .sort((a, b) => b.eventEndDate.seconds - a.eventEndDate.seconds);

          setEvent(updatedEventList);
        },
      });
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []); // Empty dependency array ensures this runs once on component mount

  return event;
};

export default useEventList;
