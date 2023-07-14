import { FC, memo } from 'react';
import cls from './Texts.module.scss';
import { Mods, classNames } from '../../../lib/classNames/classNames';
type TextSize = 'sizeS' | 'sizeM' | 'sizeL';
interface TextsProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: 'primary' | 'error';
  align?: 'left' | 'center' | 'right';
  size?: TextSize;
  'data-testid'?: string;
}

type HeadersTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeadersTagType> = {
  sizeS: 'h3',
  sizeM: 'h2',
  sizeL: 'h1',
};

export const Texts: FC<TextsProps> = memo(
  ({
    className,
    title,
    text,
    theme = 'primary',
    align = 'left',
    size = 'sizeM',
    'data-testid': dataTestId = 'Text',
  }: TextsProps) => {
    const HeaderTag = mapSizeToHeaderTag[size];
    const mods: Mods = {
      [cls[theme]]: true,
      [cls[align]]: true,
      [cls[size]]: true,
    };
    return (
      <div className={classNames(cls.Text, mods, [])}>
        {/* {title && <p className={cls.title}>{title}</p>}
        {text && <p className={cls.text}>{text}</p>} */}
        {title && (
          <HeaderTag
            data-testid={`${dataTestId}.Header`}
            className={classNames(cls.title, mods, [className])}
          >
            {title}
          </HeaderTag>
        )}
        {text && (
          <p
            data-testid={`${dataTestId}.Paragraph`}
            className={classNames(cls.text, mods, [className])}
          >
            {text}
          </p>
        )}
      </div>
    );
  }
);
