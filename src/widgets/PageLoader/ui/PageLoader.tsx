import React, { memo, type FC } from 'react';
import cls from './PageLoader.module.scss';
import { classNames, Loader } from 'Modules/UiKit';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = memo(({ className }: PageLoaderProps) => {
  return (
    <div className={classNames(cls.PageLoader, {}, [className])}>
      <Loader />
    </div>
  );
});
