import { FC, memo } from 'react';
import cls from './Texts.module.scss';
import { Mods, classNames } from '../../../lib/classNames/classNames';

interface TextsProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: 'primary' | 'error';
  align?: 'left' | 'center' | 'right';
  size?: 'sizeM' | 'sizeL';
}

export const Texts: FC<TextsProps> = memo(
  ({
    className,
    title,
    text,
    theme = 'primary',
    align = 'left',
    size = 'sizeM',
  }: TextsProps) => {
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
