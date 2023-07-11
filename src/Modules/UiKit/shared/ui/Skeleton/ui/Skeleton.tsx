import { CSSProperties, memo } from 'react';
import cls from './Skeleton.module.scss';
import { classNames } from '../../..';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
  const { className, height, width, border } = props;

  const style: CSSProperties = {
    height,
    width,
    borderRadius: border,
  };
  return (
    <div
      style={style}
      className={classNames(cls.skeleton, {}, [className])}
    ></div>
  );
});
