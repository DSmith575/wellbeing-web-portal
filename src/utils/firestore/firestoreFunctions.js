import { collection, query, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

export const getEventList = async ({ collectionName, callback }) => {
  try {
    const eventRef = collection(firestore, collectionName);
    const eventQuery = query(eventRef);

    return onSnapshot(eventQuery, callback);
  } catch (error) {
    return error;
  }
};
