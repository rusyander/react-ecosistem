import { DropdownMenuProps } from "../DropdownMenu/DropdownMenu";
import MenuItems from "../MenuItems/MenuItems";

interface DropdownProps {
  submenus: DropdownMenuProps[];
  dropdown: boolean;
  depthLevel: number;
}

const Dropdown = ({ submenus, dropdown, depthLevel }: DropdownProps) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus?.map((submenu, index) => (
        <MenuItems menuItems={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

export default Dropdown;
