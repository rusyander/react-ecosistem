import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Edit.module.scss';
import { Button, HStack, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';

interface EditProps {
  className?: string;
}

export const Edit = memo((props: EditProps) => {
  const { className } = props;
  const { t } = useTranslation('core');

  return (
    <div className={classNames(cls.edit, {}, [className])}>
      <Button theme="background" className={cls.addButtons}>
        <HStack gap="16">
          <Icon width={20} icon="clarity:edit-line" />
          <Texts text={t('Редактировать')} />
        </HStack>
      </Button>
    </div>
  );
});
