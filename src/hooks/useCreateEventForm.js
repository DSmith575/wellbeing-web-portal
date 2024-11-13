/**
 * @name useCreateEventForm
 * @description Custom hook for creating an event form
 * @returns {Object} - Form methods
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema } from "../utils/schemas/zSchemas";

const useCreateEventForm = () => {
  const formMethods = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      eventName: "",
      groupLimit: "",
      eventDate: "",
      eventEndDate: "",
      eventLocation: "",
      eventType: "",
      eventCategory: "",
      eventRecurrence: "",
      eventColor: [],
    },
  });
  return formMethods;
};

export default useCreateEventForm;
