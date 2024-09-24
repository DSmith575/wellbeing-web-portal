import LoginForm from '../components/forms/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/FirestoreAuthContext';

const LoginPage = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/dashboard');
  }

  return <LoginForm />;
};

export default LoginPage;
