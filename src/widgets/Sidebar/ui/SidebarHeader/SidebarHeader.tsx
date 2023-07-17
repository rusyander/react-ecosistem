import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SidebarHeader.module.scss';
import { HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { AppVersionModal } from 'entities/AppVersionModal';
import { Icon } from '@iconify/react';

interface SidebarHeaderProps {
  className?: string;
  applicationVersion?: string;
}

export const SidebarHeader = memo((props: SidebarHeaderProps) => {
  const { className, applicationVersion } = props;
  const { t } = useTranslation();

  const [appVersionModal, setAppVersionModal] = useState(false);
  const openAppVersionModal = useCallback(() => {
    setAppVersionModal(true);
  }, []);
  const closeAppVersionModal = useCallback(() => {
    setAppVersionModal(false);
  }, []);

  return (
    <div className={classNames(cls.sidebarHeader, {}, [className])}>
      <HStack max justify="between" align="center" className={cls.menuHeight}>
        <div />
        <Texts size="sizeM" title={t('Меню')} className={cls.menu} />
        <Icon
          onClick={openAppVersionModal}
          icon="fe:warning"
          className={cls.icons}
        />
      </HStack>
      <Modal lazy isOpen={appVersionModal} onClose={closeAppVersionModal}>
        <AppVersionModal appVerion={applicationVersion || ''} />
      </Modal>
    </div>
  );
});
