export const getCurrentDate = () => {
  return new Date().toLocaleString();
};

export const convertEventDate = (eventDate) => {
  return eventDate.toDate().toLocaleString();
};
