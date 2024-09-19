import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

export const getEventList = async ({ collectionName, callback }) => {
  try {
    const gameRef = collection(firestore, collectionName);
    const gamesQuery = query(gameRef);
    console.log(gamesQuery);

    return onSnapshot(gamesQuery, callback);
  } catch (error) {
    return error;
  }
};
