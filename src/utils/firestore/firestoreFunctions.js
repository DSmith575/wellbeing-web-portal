import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { eventCollection } from '../constants/constants';

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
    console.error('Error deleting document: ', error);
    return { success: false, error };
  }
};
