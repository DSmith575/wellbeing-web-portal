export const getCurrentDate = () => {
  return new Date();
};

export const convertEventDateToLocale = (eventDate) => {
  return eventDate.toDate().toLocaleString("en-NZ");
};
