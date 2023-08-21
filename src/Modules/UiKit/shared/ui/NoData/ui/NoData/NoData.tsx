import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './NoData.module.scss';
import { classNames } from 'Modules/UiKit';

interface NoDataProps {
  className?: string;
}

export const NoData = memo((props: NoDataProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.noData, {}, [className])}>
      <h1>Нет данных</h1>
    </div>
  );
});
