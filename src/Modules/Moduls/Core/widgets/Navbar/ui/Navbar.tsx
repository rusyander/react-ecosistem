import { memo } from 'react';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, DropdownMenu, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';

interface NavbarProps {
  className?: string;
}

const menuItems = [
  {
    title: 'Services',
    url: '#',
    submenu: [
      {
        title: 'user',
        url: '/user',
      },
      {
        title: 'web development',
        url: '/page1',
        submenu: [
          {
            title: 'Frontend',
            url: '/page3',
          },
          {
            title: 'Backend',
            submenu: [
              {
                title: 'NodeJS',
                url: '/page2',
              },
              {
                title: 'PHP',
                url: '/page1',
              },
            ],
          },
        ],
      },
      {
        title: 'SEO',
        url: '/page1',
      },
    ],
  },
  {
    title: 'About',
    url: '#',
    submenu: [
      {
        title: 'Who we are',
        url: '/page2',
      },
      {
        title: 'Our values',
        url: '/page3',
      },
    ],
  },
];

export const Navbar = memo(({ className }: NavbarProps) => {
  const [t] = useTranslation();

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.navigationLine}>
        <div>
          <p className={cls.bisnessSuite}>Bisness Suite</p>
          <p className={cls.baseSuite}>Базовый функционал</p>
          {/* <Texts
            size="sizeM"
            title="Bisness Suite"
            className={cls.bisnessSuite}
          />
          <Texts
            size="sizeM"
            title="Базовый функционал"
            className={cls.bisnessSuite}
          /> */}
        </div>
        <DropdownMenu menuItems={menuItems} />
      </div>
      <Button theme="clear" className={cls.navigationLogout}>
        <div>
          <p className={cls.bisnessSuite}>Системный администратор</p>
          <p className={cls.baseSuite}>Головная организация</p>
        </div>
        <Icon className={cls.logoutIcon} icon="tabler:logout" />
      </Button>
    </header>
  );
});
