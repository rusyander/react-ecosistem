import { Fragment, memo } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Dropdown.module.scss';
import { DropdownDirection } from '../../types/ui';
import { Navigation } from '../Navigation/Navigation';
export interface DropdownItems {
  content: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItems[];
  trigger?: React.ReactNode;
  direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft,
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
};

export const Dropdown = memo((props: DropdownProps) => {
  const { className, trigger, items, direction = 'bottom right' } = props;

  const optionsClasses = [mapDirectionClass[direction]];
  return (
    <Menu as="div" className={classNames(cls.dropdown, {}, [className])}>
      <Menu.Button className={cls.button}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, optionsClasses)}>
        {items?.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              disabled={item.disabled}
              type="button"
              onClick={item.onClick}
              className={classNames(cls.item, { [cls.active]: active }, [])}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item
                as={Navigation}
                // @ts-ignore
                to={item.href}
                key={index}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );
          }
          return (
            <Menu.Item as={Fragment} key={index} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}

        {/* <Menu.Item as={Fragment}>
          {({ active }) => (
            <li className={classNames(cls.item, { [cls.active]: active }, [])}>
              Account settings
            </li>
          )}
        </Menu.Item> */}
      </Menu.Items>
    </Menu>
  );
});
