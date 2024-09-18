import { useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import QRCode from 'react-qr-code';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [groupLimit, setGroupLimit] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');

  const createEvent = async () => {
    try {
      const docRef = doc(firestore, 'events');
      await addDoc(docRef, {
        eventName,
        eventDate,
        eventLocation,
        groupLimit: Number(groupLimit),
        signedUp: [],
      });

      await setDoc(docRef, payload);
      setQrCodeValue(eventName);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
};

export default CreateEvent;
