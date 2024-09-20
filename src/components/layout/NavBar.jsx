import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import MappedRoutes from '../../router/MappedRoutes';

const NavBar = () => {
  return (
    <section className="bg-white  flex justify-end">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4 p-4">
          <NavigationMenuItem>
            <MappedRoutes />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  );
};

export default NavBar;
