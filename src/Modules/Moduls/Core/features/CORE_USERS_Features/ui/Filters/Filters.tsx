import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Filters.module.scss';
import { Button, Input, classNames } from 'Modules/UiKit';

interface FiltersProps {
  className?: string;
}

export const Filters = memo((props: FiltersProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.filters, {}, [className])}>
      <div className={cls.FilterModulFilds}>
        <Input
          value={''}
          onChange={() => {
            return null;
          }}
          isLabel={true}
          label="Организация"
        />

        <Input
          value={''}
          onChange={() => {
            return null;
          }}
          isLabel={true}
          label="ФИО"
        />

        <Input
          value={''}
          onChange={() => {
            return null;
          }}
          isLabel={true}
          label="Логин"
        />

        <Input
          value={''}
          onChange={() => {
            return null;
          }}
          isLabel={true}
          label="Активен?"
        />
      </div>
      <div className={cls.actionButtons}>
        <Button theme="background">Применить</Button>
        <Button theme="background">Очистить</Button>
      </div>
    </div>
  );
});
