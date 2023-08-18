import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsRegionsEdit.module.scss';
import { classNames } from 'Modules/UiKit';

interface OsRegionsEditProps {
  className?: string;
  selectedField: any;
}

export const OsRegionsEdit = memo((props: OsRegionsEditProps) => {
  const { className, selectedField } = props;
  const { t } = useTranslation();

  return <div className={classNames(cls.osRegionsEdit, {}, [className])}></div>;
});
