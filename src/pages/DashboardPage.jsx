import { useUserAuth } from '@/context/FirestoreAuthContext';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '@/router/routeLabels';
import CreateEvent from '@/components/events/CreateEvent';

const DashboardPage = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate(routerPaths.home);
  }

  return (
    <>
      <CreateEvent />
    </>
  );
};

export default DashboardPage;
