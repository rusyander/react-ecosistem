import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSysParamsWidgets.module.scss';
import { classNames } from 'Modules/UiKit';

export interface CoreSysParamsWidgetsProps {
  className?: string;
}

export const CoreSysParamsWidgets = memo((props: CoreSysParamsWidgetsProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.coreSysParamsWidgets, {}, [className])}>
      <div />
    </div>
  );
});
