/**
 * @name AttendeesPage
 * @description Attendees page
 * @returns {JSX.Element} - Rendered Attendees page component
 */

import AttendanceList from "../components/attendance/AttendanceList";

const AttendeesPage = () => {
  return (
    <section className={"flex justify-center items-center"}>
      <AttendanceList />
    </section>
  );
};

export default AttendeesPage;
