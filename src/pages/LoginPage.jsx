import LoginForm from '../components/forms/LoginForm';
import { useUserAuth } from '../context/FirestoreAuthContext';
import { Button } from '@/components/ui/button';
import QRCode from 'react-qr-code';

const LoginPage = () => {
  const { user, logout } = useUserAuth();

  const handleClick = () => {
    logout();
  };
  return (
    <>
      {user ? (
        <Button onClick={handleClick}>Logout</Button>
      ) : (
        <>
          <section style={{ background: 'white', padding: '16px', display: 'flex', justifyContent: 'center' }}>
            <QRCode value={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'} size={512} />
          </section>
          <LoginForm />
        </>
      )}
    </>
  );
};

export default LoginPage;
