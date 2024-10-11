import { useUserAuth } from '@/context/FirestoreAuthContext';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '@/router/routeLabels';
import CreateEvent from '@/components/events/CreateEvent';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(routerPaths.home);
    }
  }, [user]);

  return (
    <>
      <CreateEvent />
    </>
  );
};

export default DashboardPage;
