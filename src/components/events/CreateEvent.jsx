import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FormFieldWrapper from '../forms/FormFieldWrapper';
import QrCode from '../qrCode/QrCode';
import useLoading from '../hooks/useLoading';
import { ImSpinner3 } from 'react-icons/im';

const schema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  groupLimit: z
    .union([
      z.coerce.number().positive('Number must be greater than zero.'),
      z.literal(undefined),
      z.literal(null),
      z.literal(''),
    ])
    .optional(),
  eventType: z.string().optional(),
});

const CreateEvent = () => {
  const [qrCodeValue, setQrCodeValue] = useState(null);
  const { loading, setLoading } = useLoading();
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
      setLoading('createEvent', true);
      await new Promise((resolve) => setTimeout(resolve, 10000));
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

      setQrCodeValue(eventDoc.id);

      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading('createEvent', false);
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
              {loading('createEvent') ? (
                <ImSpinner3 className={'animate-spin h-6 w-6'} />
              ) : (
                'Create Event'
              )}
            </Button>
          </form>
        </FormProvider>
      </section>
      {qrCodeValue && (
        <section
          className={
            'max-w-md mx-auto flex flex-col justify-center items-center mt-4 border rounded-lg shadow-md p-4 bg-slate-100 transition-transform transform hover:scale-105'
          }>
          <QrCode qrCodeValue={qrCodeValue} size={256} />
        </section>
      )}
    </>
  );
};

export default CreateEvent;
