import LoginForm from '../components/forms/LoginForm';
import CreateEvent from '../components/qrCode/CreateEvent';
import { useUserAuth } from '../context/FirestoreAuthContext';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  const { user, logout } = useUserAuth();

  const handleClick = () => {
    logout();
  };
  return (
    <>
      {user ? (
        <>
          <Button onClick={handleClick}>Logout</Button>
          <CreateEvent />
        </>
      ) : (
        <>
          <LoginForm />
        </>
      )}
    </>
  );
};

export default LoginPage;
