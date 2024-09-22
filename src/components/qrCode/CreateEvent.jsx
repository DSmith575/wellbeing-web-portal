import { useState } from 'react';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FormFieldWrapper from '../forms/FormFieldWrapper';
import QRCode from 'react-qr-code';

const schema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  groupLimit: z.coerce
    .number()
    .positive('Number must be empty or greater than zero.')
    .optional(),
  eventType: z.string().optional(),
});

const CreateEvent = () => {
  const [qrCodeValue, setQrCodeValue] = useState(null);

  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      eventName: '',
      groupLimit: '',
      eventType: '',
    },
  });

  const { handleSubmit, control, reset } = formMethods;

  const onSubmit = (data) => {
    createEvent(data);
    reset();
  };

  const createEvent = async (data) => {
    const db = getFirestore();
    const eventRef = collection(db, 'events');
    try {
      const eventDoc = await addDoc(eventRef, {
        eventName: data.eventName,
        eventType: data.eventType,
        ...(data.groupLimit && { groupLimit: data.groupLimit }),
        signedUp: [],
      });

      if (!eventDoc.id) {
        console.error('Event ID not found');
        return;
      }

      const generatedQrCode = eventDoc.id;
      await setDoc(
        doc(db, 'events', eventDoc.id),
        { qrCodeValue: generatedQrCode },
        { merge: true },
      );

      if (!eventDoc.id) {
        console.error('Event ID not found');
        return;
      }

      setQrCodeValue(
        JSON.stringify({
          eventId: eventDoc.id,
          eventName: data.eventName,
          groupLimit: data.groupLimit,
        }),
      );

      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <>
      <section className={'max-w-md mx-auto p-6 bg-white shadow-md rounded-lg'}>
        <FormProvider {...formMethods}>
          <form
            className={'space-y-4 flex flex-col'}
            onSubmit={handleSubmit(onSubmit)}>
            <FormFieldWrapper
              control={control}
              name="eventName"
              label="Event Name"
              placeholder="Enter event name"
            />
            <FormFieldWrapper
              control={control}
              name="eventType"
              label="Event Type"
              placeholder="Enter event type"
            />
            <FormFieldWrapper
              control={control}
              name="groupLimit"
              label="Group Size"
              type="number"
              placeholder="Enter group limit (Optional)"
            />
            <Button
              className={'mt-2 flex justify-center items-center bg-green-500'}
              type="submit">
              Create Event
            </Button>
          </form>
        </FormProvider>
      </section>
      {qrCodeValue && (
        <section className={'flex flex-col justify-center items-center mt-4'}>
          <h3>Scan this QR code:</h3>
          <QRCode title={'test'} value={qrCodeValue} size={256} />
        </section>
      )}
    </>
  );
};

export default CreateEvent;
