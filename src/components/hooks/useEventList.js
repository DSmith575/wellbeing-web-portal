import { useState, useEffect } from "react";
import { getEventList } from "../../utils/firestore/firestoreFunctions";

const useEventList = () => {
  const [event, setEvent] = useState([]);

  const fetchEvents = async () => {
    try {
      return getEventList({
        collectionName: "events",
        callback: (snapshot) => {
          const updatedGameList = snapshot.docs
            .map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
            .sort((a, b) => b.eventDate - a.eventDate);
          setEvent(updatedGameList);
        },
      });
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return event;
};

export default useEventList;
