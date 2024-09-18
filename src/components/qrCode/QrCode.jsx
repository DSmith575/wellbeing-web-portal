import React, { useState } from 'react';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import QRCode from 'react-qr-code';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [groupLimit, setGroupLimit] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');

  console.log(qrCodeValue);

  const createEvent = async () => {
    const db = getFirestore();
    const eventRef = collection(db, 'events');

    try {
      const eventDoc = await addDoc(eventRef, {
        eventName,
        eventDate,
        // eventLocation,
        groupLimit: Number(groupLimit),
        signedUp: [],
      });

      const generatedQrCode = eventDoc.id;
      await setDoc(doc(db, 'events', eventDoc.id), { qrCodeValue: generatedQrCode }, { merge: true });
      setQrCodeValue(
        JSON.stringify({
          eventId: eventDoc.id,
          eventName: eventName,
          qrCodeValue: generatedQrCode,
        }),
      );

      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create Event</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Event Name:</label>
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
        </div>
        <div>
          <label>Event Date:</label>
          <input type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
        </div>
        <div>
          <label>Group Limit:</label>
          <input type="number" value={groupLimit} onChange={(e) => setGroupLimit(e.target.value)} required />
        </div>
        <button type="button" onClick={createEvent}>
          Create Event
        </button>
      </form>
      {qrCodeValue && (
        <div>
          <h3>Scan this QR code:</h3>
          <QRCode value={qrCodeValue} size={256} />
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
