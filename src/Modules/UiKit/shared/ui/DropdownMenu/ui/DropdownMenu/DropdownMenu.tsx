import { memo } from 'react';
import './DropdownMenu.scss';

import MenuItems from '../MenuItems/MenuItems';

export interface MenuItem {
  title: string;
  url: string;
  submenu?: MenuItem[];
}

export interface DropdownMenuProps {
  menuItems: MenuItem[];
}

export const DropdownMenu = memo(
  ({ menuItems = [] }: DropdownMenuProps | any) => {
    return (
      <div className="DropdownMenuItems">
        <ul className="menus">
          {menuItems?.map((menu: MenuItem, index: number) => {
            const depthLevel = 0;
            return (
              <MenuItems menuItems={menu} key={index} depthLevel={depthLevel} />
            );
          })}
        </ul>
      </div>
    );
  }
);
