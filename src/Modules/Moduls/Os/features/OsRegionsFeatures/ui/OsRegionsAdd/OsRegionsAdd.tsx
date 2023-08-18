import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsRegionsAdd.module.scss';
import { classNames } from 'Modules/UiKit';

interface OsRegionsAddProps {
  className?: string;
}

export const OsRegionsAdd = memo((props: OsRegionsAddProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return <div className={classNames(cls.osRegionsAdd, {}, [className])}></div>;
});
