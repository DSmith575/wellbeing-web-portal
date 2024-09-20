import CreateEvent from '../components/qrCode/CreateEvent';
import { useUserAuth } from '../context/FirestoreAuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { logout } = useUserAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };
  return (
    <>
      <section className={'flex justify-end items-center mr-4'}>
        <Button onClick={handleClick}>Logout</Button>
      </section>
      <CreateEvent />
    </>
  );
};

export default DashboardPage;
