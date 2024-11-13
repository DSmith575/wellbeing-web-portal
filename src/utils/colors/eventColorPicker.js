/**
 * @name eventColorPicker
 * @description Event color picker
 * @param {string} eventRecurrence - Event recurrence
 * @returns {string} - Event background color
 */

import { eventRecurrenceColors } from "../constants/constants";

export const getEventBackgroundColor = (eventRecurrence) => {
  if (eventRecurrence === "One-off") {
    return eventRecurrenceColors.oneOff;
  } else if (eventRecurrence === "Recurring") {
    return eventRecurrenceColors.recurring;
  } else if (eventRecurrence === "Challenge") {
    return eventRecurrenceColors.challenge;
  }
};
