import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RolesCancel.module.scss';
import { Button, HStack, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';

interface RolesCancelProps {
  className?: string;
  closeModalFunction?: () => void;
}

export const RolesCancel = memo((props: RolesCancelProps) => {
  const { className, closeModalFunction } = props;
  const { t } = useTranslation('core');

  return (
    <div className={classNames(cls.rolesCancel, {}, [className])}>
      <Button
        onClick={closeModalFunction}
        theme="background"
        className={cls.addButtons}
      >
        <HStack gap="16">
          <Icon width={20} icon="ic:outline-cancel" />
          <Texts text={t('Отмена')} />
        </HStack>
      </Button>
    </div>
  );
});
