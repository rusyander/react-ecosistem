import { ButtonHTMLAttributes, memo } from 'react';
import cls from './Button.module.scss';
import { Mods, classNames } from '../../../lib/classNames/classNames';

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
  size?: 'size_l' | 'size_m' | 'size_xl' | 'size_s';
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
