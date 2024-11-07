import { eventCategories } from "../constants/constants";
import { eventRecurrence } from "../constants/constants";

export const createEventOptions = [
  {
    name: "eventName",
    label: "Event Name",
    placeholder: "Enter event name",
  },
  {
    name: "eventDate",
    label: "Event Date",
    type: "datetime-local",
    placeholder: "Enter event date",
  },
  {
    name: "eventLocation",
    label: "Event Location",
    placeholder: "Enter event location",
  },
  {
    name: "eventCategory",
    label: "Event Category",
    type: "select",
    options: eventCategories,
  },
  {
    name: "eventRecurrence",
    label: "Event Recurrence",
    type: "select",
    options: eventRecurrence,
  },
  {
    name: "groupLimit",
    label: "Group Size",
    type: "number",
    placeholder: "Enter group limit (Optional)",
  },
];
