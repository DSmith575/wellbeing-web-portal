import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import { routerPaths } from '../../router/routeLabels';
import useLoading from '../hooks/useLoading';
import Spinner from '../spinner/Spinner';

const Logout = ({ styles, children }) => {
  const { logout } = useUserAuth();
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setLoading('logout', true);
      await logout();
      navigate(routerPaths.home);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading('logout', false);
    }
  };

  return (
    <NavLink to="/" onClick={handleClick} className={styles}>
      {loading('logout') ? <Spinner /> : children}
    </NavLink>
  );
};

export default Logout;
