import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './GridSkeleton.module.scss';
import { classNames } from 'Moduls/UiKit';

interface GridSkeletonProps {
  className?: string;
}

export const GridSkeleton = memo((props: GridSkeletonProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return <div className={classNames(cls.gridSkeleton, {}, [className])}></div>;
});
