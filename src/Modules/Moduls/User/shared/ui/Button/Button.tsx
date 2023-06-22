import React, { memo, type ButtonHTMLAttributes, type FC } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?:
  | 'clear'
  | 'clearInvert'
  | 'outline'
  | 'outline_red'
  | 'background'
  | 'backgroundInverted';
  square?: boolean;
  size?: 'size_l' | 'size_m' | 'size_xl';
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = 'outline',
    square,
    size = 'size_m',
    disabled,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled,
  };

  return (
    <button
      type="button"
      {...otherProps}
      disabled={disabled}
      className={classNames(cls.Button, mods, [className])}
    >
      {children}
    </button>
  );
});
