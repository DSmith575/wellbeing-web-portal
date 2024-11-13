/**
 * @name eventCollection
 * @description Event collection
 */

export const eventCollection = "events";

export const eventCategories = [
  { label: "Taha Wairua (Spiritual)", value: "Taha Wairua (Spiritual)" },
  {
    label: "Taha Hinengaro (Mental and Emotional)",
    value: "Taha Hinengaro (Mental and Emotional)",
  },
  {
    label: "Taha Whānau (Family and Social)",
    value: "Taha Whānau (Family and Social)",
  },
  { label: "Taha Tinana (Physical)", value: "Taha Tinana (Physical)" },
  { label: "Whenua (Land, Roots)", value: "Whenua (Land, Roots)" },
];

export const eventRecurrence = [
  { label: "One-off", value: "One-off" },
  { label: "Recurring", value: "Recurring" },
  { label: "Challenge", value: "Challenge" },
];

export const eventRecurrenceColors = {
  recurring: ["#00B5D8", "#a5f3fc"],
  oneOff: ["#bef264", "#fef9c3"],
  challenge: ["#c4b5fd", "#f9a8d4"],
};

export const tableHeaders = [
  "Category",
  "Event Name",
  "Start Time",
  "End Time",
  "Event Location",
  "Signups",
  "Recurrence",
];

export const attendanceTableHeaders = ["First Name", "Last Name"];
