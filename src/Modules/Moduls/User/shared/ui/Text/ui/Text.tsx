import { FC, memo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: 'primary' | 'error';
  align?: 'left' | 'center' | 'right';
  size?: 'sizeM' | 'sizeL';
}

export const Text: FC<TextProps> = memo(
  ({
    className,
    title,
    text,
    theme = 'primary',
    align = 'left',
    size = 'sizeM',
  }: TextProps) => {
    const mods: Mods = {
      [cls[theme]]: true,
      [cls[align]]: true,
      [cls[size]]: true,
    };
    return (
      <div className={classNames(cls.Text, mods, [className])}>
        {title && <p className={cls.title}>{title}</p>}
        {text && <p className={cls.text}>{text}</p>}
      </div>
    );
  }
);
