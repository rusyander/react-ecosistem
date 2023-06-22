import React, { memo, type FC } from 'react';

import cls from './PageError.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from 'Modules/UiKit';

interface PageErrorProps {
  className?: string;
}

export const PageError = memo(({ className }: PageErrorProps) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    location.reload();
  };
  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <p>{t('Произошла ошибка')}</p>
      <button onClick={reloadPage}>{t('Обновить страницу')}</button>
    </div>
  );
});
