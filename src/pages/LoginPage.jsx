import LoginForm from "../components/forms/LoginForm";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/FirestoreAuthContext";
import { routerPaths } from "../router/routeLabels";

const LoginPage = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  if (user) {
    navigate(routerPaths.eventPlanner);
  }

  return <LoginForm />;
};

export default LoginPage;
