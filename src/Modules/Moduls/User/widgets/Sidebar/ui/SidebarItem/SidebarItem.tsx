import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import AppLink from 'shared/ui/AppLink/AppLink';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from 'widgets/Sidebar/model/types/sidebar';
interface SidebarItemProps {
  item?: SidebarItemType;
  collapsed?: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();

  const isAuth = useSelector(getUserAuthData);

  if (item?.authOnly && !isAuth) {
    return null;
  }
  return (
    <AppLink
      theme="secondary"
      to={item?.path || item!.path!.toString()}
      className={classNames(cls.item, { [cls.collapsed]: collapsed }, [''])}
    >
      {item?.Icon && <item.Icon className={cls.icon} />}
      <span className={cls.link}>{t(item!.text)}</span>
    </AppLink>
  );
});
