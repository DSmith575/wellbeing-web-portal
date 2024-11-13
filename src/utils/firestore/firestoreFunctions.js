/**
 * @name firestoreFunctions
 * @description Firestore functions
 */

import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { eventCollection } from "../constants/constants";

export const getEventList = async ({ collectionName, callback }) => {
  try {
    const eventRef = collection(firestore, collectionName);
    const eventQuery = query(eventRef);

    return onSnapshot(eventQuery, callback);
  } catch (error) {
    return error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    await deleteDoc(doc(firestore, eventCollection, eventId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting document: ", error);
    return { success: false, error };
  }
};

export const getAllAttendeesFromEvents = async () => {
  try {
    // Get all documents from the 'events' collection
    const eventRef = collection(firestore, "events");
    const eventSnapshot = await getDocs(eventRef);
    // Get all events
    const eventList = eventSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    const fetchUsersData = async (userIds) => {
      const userPromises = userIds.map(async (userId) => {
        const userDocRef = doc(firestore, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          return { id: userDoc.id, ...userDoc.data() };
        } else {
          console.warn(`User with ID ${userId} not found`);
          return null;
        }
      });

      return Promise.all(userPromises);
    };

    const eventsWithAttendees = await Promise.all(
      eventList.map(async (event) => {
        const attendeesData = await fetchUsersData(event.signedUp);
        return { ...event, attendees: attendeesData.filter(Boolean) };
      }),
    );

    console.log(eventsWithAttendees);
    return eventsWithAttendees;
  } catch (error) {
    console.error("Error getting attendees from events: ", error);
    return [];
  }
};
