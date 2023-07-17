import { Fragment, ReactNode, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mods, classNames } from '../../lib/classNames/classNames';
import cls from './ListBox.module.scss';
import { Listbox as HListbox } from '@headlessui/react';
import { Button } from '../Button';
import { HStack, VStack } from '../Stack';
import { DropdownDirection } from '../../types/ui';
import { Texts } from '../Texts';
import { Icon } from '@iconify/react';

interface ListBoxItem {
  code: string | any;
  name: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  className?: string;
  items?: ListBoxItem[];
  value?: string | any;
  defaultValue?: string;
  // onChange?: <T extends string>(value: T) => void;
  onChange?: (value: any) => void;

  readonly?: boolean;
  label?: string;
  direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft,
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
};

export const ListBox = memo((props: ListBoxProps) => {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    label,
    direction = 'bottom right',
  } = props;
  const { t } = useTranslation();

  const optionsClasses = [mapDirectionClass[direction]];
  return (
    <VStack max gap="8">
      {label && (
        <span
          className={classNames(
            cls.label,
            {
              [cls.labelActive]: !readonly,
              [cls.labelDeact]: readonly,
            },
            []
          )}
        >{`${label}`}</span>
      )}
      <HListbox
        disabled={readonly}
        as="div"
        className={classNames(cls.ListBox, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <HListbox.Button as="div" className={cls.trigger}>
          <Button disabled={readonly} className={cls.button}>
            <Texts text={value?.name ?? defaultValue} />
            <Icon icon="ep:arrow-down" className={cls.icons} />
          </Button>
        </HListbox.Button>
        <HListbox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((option) => (
            <HListbox.Option
              key={option.code}
              value={option}
              disabled={option.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    cls.item,
                    { [cls.active]: selected, [cls.disabled]: option.disabled },
                    []
                  )}
                >
                  {/* {selected && <span className={cls.checkmark}>-----</span>} */}
                  {option.name}
                </li>
              )}
            </HListbox.Option>
          ))}
        </HListbox.Options>
      </HListbox>
    </VStack>
  );
});
