import LoginForm from '../components/forms/LoginForm';
import { useUserAuth } from '../context/FirestoreAuthContext';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  const { user, logout } = useUserAuth();

  const handleClick = () => {
    logout();
  };
  return <>{user ? <Button onClick={handleClick}>Logout</Button> : <LoginForm />}</>;
};

export default LoginPage;
