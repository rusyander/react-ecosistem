import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './IsError.module.scss';
import { classNames } from 'Modules/UiKit';

interface IsErrorProps {
  className?: string;
}

export const IsError = memo((props: IsErrorProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.isError, {}, [className])}>
      <h1>Произошла ошибка</h1>
    </div>
  );
});
