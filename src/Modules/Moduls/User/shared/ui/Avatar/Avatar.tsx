import { CSSProperties, memo, useMemo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = memo(
  ({ className, src, size, alt = 'Avatar' }: AvatarProps) => {
    const styles = useMemo<CSSProperties>(() => {
      return {
        width: size || 100,
        height: size || 100,
      };
    }, [size]);
    const mods: Mods = {};
    return (
      <img
        style={styles}
        src={src}
        alt={alt}
        className={classNames(cls.Avatar, mods, [className])}
      />
    );
  }
);
