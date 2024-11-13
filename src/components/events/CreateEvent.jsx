/**
 * @name CreateEvent
 * @description CreateEvent component
 * @returns {JSX.Element} - Rendered CreateEvent component

 */

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { firestore } from "../../firebase/firebase";
import { eventCollection } from "../../utils/constants/constants";
import FormFieldWrapper from "../forms/FormFieldWrapper";
import QrCode from "../qrCode/QrCode";
import useLoading from "../../hooks/useLoading";
import Spinner from "../spinner/Spinner";
import useCreateEventForm from "../../hooks/useCreateEventForm";
import { createEventOptions } from "../../utils/forms/createEventOptions";
import { getEventBackgroundColor } from "../../utils/colors/eventColorPicker";

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
    const eventRef = collection(firestore, eventCollection);
    try {
      console.log(data.eventRecurrence);
      setQrCodeValue(null);
      setLoading("createEvent", true);
      const eventDoc = await addDoc(eventRef, {
        eventName: data.eventName,
        eventDate: data.eventDate,
        eventEndDate: data.eventEndDate,
        eventLocation: data.eventLocation,
        eventCategory: data.eventCategory,
        eventRecurrence: data.eventRecurrence,
        ...(data.groupLimit && { groupLimit: data.groupLimit }),
        signedUp: [],
        eventColor: getEventBackgroundColor(data.eventRecurrence),
      });

      if (!eventDoc.id) {
        console.error("Event ID not found");
        return;
      }

      setQrCodeValue({
        id: eventDoc.id,
        eventName: data.eventName,
        eventCategory: data.eventCategory,
      });

      console.log("Event created successfully");
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading("createEvent", false);
    }
  };

  return (
    <>
      <section className={" max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"}>
        <FormProvider {...formMethods}>
          <form
            className={"space-y-4 flex flex-col"}
            onSubmit={handleSubmit(onSubmit)}>
            {createEventOptions.map((option) => (
              <FormFieldWrapper
                key={option.name}
                control={control}
                name={option.name}
                label={option.label}
                type={option.type}
                placeholder={option.placeholder}
                options={option.options}
              />
            ))}

            <Button
              className={`mt-2 flex justify-center items-center bg-green-500 ${loading("createEvent") ? "cursor-not-allowed" : "cursor-pointer"}`}
              type="submit">
              {loading("createEvent") ? <Spinner /> : "Create Event"}
            </Button>
          </form>
        </FormProvider>
      </section>

      {qrCodeValue && (
        <section
          className={
            "max-w-md mx-auto flex flex-col justify-center items-center mt-4 border rounded-lg shadow-md p-4 bg-slate-100 transition-transform transform hover:scale-105"
          }>
          <QrCode qrCodeValue={qrCodeValue} size={256} />
        </section>
      )}
    </>
  );
};

export default CreateEvent;
