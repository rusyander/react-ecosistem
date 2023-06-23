import { useState, useEffect, useRef } from 'react';
import Dropdown from '../Dropdown/Dropdown';

import { Navigation } from '../../../Navigation/Navigation';
import { DropdownMenuProps } from '../DropdownMenu/DropdownMenu';

interface MenuItemsProps {
  menuItems: DropdownMenuProps | any;
  depthLevel: number;
}

const MenuItems = ({ menuItems, depthLevel }: MenuItemsProps) => {
  const [dropdown, setDropdown] = useState(false);

  const ref: any = useRef<React.LegacyRef<HTMLLIElement>>(null);

  useEffect(() => {
    const handler = (event: any) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 300 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 300 && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className="menu-items "
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {menuItems?.url && menuItems?.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {window.innerWidth < 300 && depthLevel === 0 ? (
              menuItems?.title
            ) : (
              <Navigation path={menuItems?.url || ''} name={menuItems?.title} />
            )}

            {depthLevel > 0 && window.innerWidth < 300 ? null : depthLevel >
                0 && window.innerWidth > 300 ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow" />
            )}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={menuItems.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !menuItems?.url && menuItems?.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {menuItems?.title}{' '}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={menuItems?.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Navigation path={menuItems?.url || ''} name={menuItems?.title} />
      )}
    </li>
  );
};

export default MenuItems;
