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
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {menuItems?.url && menuItems?.items ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {window.innerWidth < 300 && depthLevel === 0 ? (
              menuItems?.label
            ) : (
              <Navigation
                path={menuItems?.command || ''}
                name={menuItems?.label}
              />
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
            submenus={menuItems.items}
            dropdown={dropdown}
          />
        </>
      ) : !menuItems?.command && menuItems?.items ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
            className={depthLevel === 0 ? 'colorBtn' : ''}
          >
            {menuItems?.label}

            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={menuItems?.items}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Navigation path={menuItems?.command || ''} name={menuItems?.label} />
      )}
    </li>
  );
};

export default MenuItems;
