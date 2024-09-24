import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUserAuth } from '../context/FirestoreAuthContext';
import { filterRoutes } from './filterRoutes';
import { routes } from './routeList';
import Logout from '../components/forms/Logout';

const MappedRoutes = () => {
  const { user } = useUserAuth();
  const location = useLocation();
  const filteredRoutes = useMemo(() => filterRoutes(routes, user), [routes, user]);

  const navigationMenuTriggerStyle = (additionalClasses) => {
    return `px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${additionalClasses}`;
  };

  return (
    <>
      {filteredRoutes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={navigationMenuTriggerStyle(
            location.pathname === route.path
              ? 'bg-slate-300 text-gray-800'
              : 'text-gray-600 hover:bg-slate-100',
          )}>
          {route.label}
        </NavLink>
      ))}
      {user && (
        <Logout
          styles={navigationMenuTriggerStyle('text-red-600 hover:bg-red-100')}
          children={'Logout'}
        />
      )}
    </>
  );
};

export default MappedRoutes;
