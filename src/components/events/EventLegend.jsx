/**
 * @name EventLegend
 * @description EventLegend component
 * @param {String} text - Event text
 * @returns {JSX.Element} - Rendered EventLegend component

 */

// No Longer in use

const EventLegend = ({ text }) => {
  return (
    <section
      className={
        "hidden md:right-20 border rounded-lg shadow-lg w-32 md:flex flex-row text-center justify-center items-center"
      }>
      <div className={"bg-red-200 w-4 h-4 rounded-md mr-2"} />
      <p>{text}</p>
    </section>
  );
};

export default EventLegend;
