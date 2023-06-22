import React, { type FC } from 'react';

import cls from './ErrorPage.module.scss';
import { useTranslation } from 'react-i18next';
import { Page, classNames } from 'Modules/UiKit';

interface ErrorPageProps {
  className?: string;
}

export const ErrorPage: FC<ErrorPageProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <Page>
      {' '}
      <div className={classNames(cls.ErrorPage, {}, [className])}>
        {t('Страница не найдена')}
      </div>
    </Page>
  );
};
