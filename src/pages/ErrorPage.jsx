/**
 * @name ErrorPage
 * @description Error page
 * @returns {JSX.Element} - Rendered Error page component
 */

import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";
import { routerPaths } from "../router/routeLabels";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <TbError404 className="text-9xl text-red-500" />
      <div>Page not found</div>
      <Link
        to={routerPaths.home}
        className="border rounded-lg bg-green-500 text-white py-2 px-4 hover:bg-green-600">
        Return
      </Link>
    </div>
  );
};

export default ErrorPage;
