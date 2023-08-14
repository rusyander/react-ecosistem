import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Datepicker.module.scss';
import { classNames } from 'Moduls/UiKit';

interface DatepickerProps {
  className?: string;
}

export const Datepicker = memo((props: DatepickerProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return <div className={classNames(cls.datepicker, {}, [className])}></div>;
});
