import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CORE_USERS_Filter.module.scss';
import { Input, VStack, classNames } from 'Modules/UiKit';

interface CORE_USERS_FilterProps {
  className?: string;
  data: any;
  onChange: any;
}

export const CORE_USERS_Filter = memo((props: CORE_USERS_FilterProps) => {
  const { className, data, onChange } = props;
  const { t } = useTranslation('core');

  return (
    <div className={classNames(cls.coreUsersFilter, {}, [className])}>
      {data?.map((item: any, index: any) => (
        <VStack key={index} className={cls.inputFilds}>
          <Input
            onChange={(value) => onChange(index, value)}
            value={item.value}
            isLabel
            label={t(item.colName)}
            className={cls.input}
            placeholder={t(item.colName)}
          />
        </VStack>
      ))}
    </div>
  );
});
