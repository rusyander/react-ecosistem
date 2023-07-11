import { memo, useMemo, useState } from 'react';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { useSelector } from 'react-redux';
import { Button, classNames, useHover } from 'Modules/UiKit';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const sidebarItemsList = useSelector(getSidebarItems);
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.path} />
      )),
    [collapsed, sidebarItemsList]
  );

  const [isHover, bindHover] = useHover();

  const onHover = () => {
    // if (collapsed) {
    //   setCollapsed(false);
    // }
  };
  // if (collapsed) {
  //   if (isHover) {
  //     setCollapsed(false);
  //   }
  // }
  return (
    <menu
      {...bindHover}
      onMouseMove={onHover}
      data-testid="sidebar"
      // className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
      //   className,
      // ])}
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        theme="backgroundInverted"
        size="size_l"
        square
      >
        {collapsed ? '>' : '<'}
      </Button>
      {!collapsed && (
        <div>
          <div className={cls.items}>{itemsList}</div>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LanguageSwitcher short={collapsed} className={cls.lang} />
          </div>
        </div>
      )}
    </menu>
  );
});
