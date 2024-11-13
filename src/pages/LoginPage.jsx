/**
 * @name LoginPage
 * @description Login page
 * @returns {JSX.Element} - Rendered Login page component
 */

import LoginForm from "../components/forms/LoginForm";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/FirestoreAuthContext";
import { routerPaths } from "../router/routeLabels";
import { useEffect } from "react";

const LoginPage = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("test");
      navigate(routerPaths.eventPlanner);
    }
  }, [user, navigate]);

  return <LoginForm />;
};

export default LoginPage;
