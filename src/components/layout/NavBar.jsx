import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { routes } from '../../router/routeList';
import { NavLink, useLocation } from 'react-router-dom';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

const NavBar = () => {
  const location = useLocation();

  const navigationMenuTriggerStyle = (additionalClasses) => {
    return `px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${additionalClasses}`;
  };

  return (
    <section className="bg-white  flex justify-end">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4 p-4">
          <NavigationMenuItem>
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={navigationMenuTriggerStyle(
                  location.pathname === route.path ? 'bg-slate-300 text-gray-800' : 'text-gray-600 hover:bg-slate-100',
                )}>
                {route.label}
              </NavLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  );
};

export default NavBar;
