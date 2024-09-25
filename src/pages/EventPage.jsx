import EventList from '../components/events/EventList';
import { useUserAuth } from '../context/FirestoreAuthContext';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '../router/routeLabels';

const EventPage = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate(routerPaths.home);
  }
  return <EventList />;
};

export default EventPage;
