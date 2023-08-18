import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsRegionsDelete.module.scss';
import { classNames } from 'Modules/UiKit';

interface OsRegionsDeleteProps {
  className?: string;
  selectedField: any;
}

export const OsRegionsDelete = memo((props: OsRegionsDeleteProps) => {
  const { className, selectedField } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.osRegionsDelete, {}, [className])}></div>
  );
});
