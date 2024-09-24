import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FormFieldWrapper from '../forms/FormFieldWrapper';
import QrCode from '../qrCode/QrCode';
import useLoading from '../hooks/useLoading';
import { firestore } from '../../firebase/firebase';
import Spinner from '../spinner/Spinner';
import useCreateEventForm from '../hooks/useCreateEventForm';

const CreateEvent = () => {
  const [qrCodeValue, setQrCodeValue] = useState(null);
  const { loading, setLoading } = useLoading();
  const formMethods = useCreateEventForm();

  const { handleSubmit, control, reset } = formMethods;

  const onSubmit = (data) => {
    createEvent(data);
    reset();
  };

  const createEvent = async (data) => {
    const eventRef = collection(firestore, 'events');
    try {
      setQrCodeValue(null);
      setLoading('createEvent', true);
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
              className={`mt-2 flex justify-center items-center bg-green-500 ${loading('createEvent') ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              type="submit">
              {loading('createEvent') ? <Spinner /> : 'Create Event'}
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
