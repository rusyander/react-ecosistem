import { memo } from 'react';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from 'Modules/UiKit';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const [t] = useTranslation();

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <h1>navbar</h1>
    </header>
  );
});
