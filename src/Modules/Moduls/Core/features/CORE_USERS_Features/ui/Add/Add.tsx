import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Add.module.scss';
import { Button, HStack, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';

interface AddProps {
  className?: string;
}

export const Add = memo((props: AddProps) => {
  const { className } = props;
  const { t } = useTranslation('core');

  return (
    <div className={classNames(cls.add, {}, [className])}>
      <Button theme="background" className={cls.addButtons}>
        <HStack gap="16">
          <Icon width={20} icon="zondicons:add-outline" />
          <Texts text={t('Добавить')} />
        </HStack>
      </Button>
    </div>
  );
});
