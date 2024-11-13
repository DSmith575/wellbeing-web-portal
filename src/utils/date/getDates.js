/**
 * @name getDates
 * @description Date utilities
 * @param {string} currentDate - Current date
 * @param {string} eventDate - Event date
 * @returns {string} - Date utilities
 */

export const getCurrentDate = () => {
  return new Date();
};

export const convertEventDateToLocale = (eventDate) => {
  return eventDate.toDate().toLocaleString("en-NZ");
};
