const EventLegend = ({ text }) => {
  return (
    <section
      className={
        "absolute top-2 right-20 border rounded-lg shadow-lg w-32  flex flex-row text-center justify-center items-center"
      }>
      <div className={"bg-red-200 w-4 h-4 rounded-md mr-2"} />
      <p>{text}</p>
    </section>
  );
};

export default EventLegend;
