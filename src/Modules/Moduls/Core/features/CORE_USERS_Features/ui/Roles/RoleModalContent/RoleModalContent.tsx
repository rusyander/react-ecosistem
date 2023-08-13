import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RoleModalContent.module.scss';
import { CheckFormEnterM, ModalHeader, classNames } from 'Modules/UiKit';
import { RoleGrid } from '../RoleGrid/RoleGrid';

interface RoleModalContentProps {
  className?: string;
  closeModalFunction: () => void;
}

export const RoleModalContent = memo((props: RoleModalContentProps) => {
  const { className, closeModalFunction } = props;
  const { t } = useTranslation('core');

  return (
    <div className={classNames(cls.roleModalContent, {}, [className])}>
      <CheckFormEnterM checkFormEnterName="CORE_USER_ROLES" />
      <ModalHeader
        title={t('Роли пользователя') || ''}
        onClose={closeModalFunction}
      />
      <RoleGrid closeModalFunction={closeModalFunction} />
    </div>
  );
});
