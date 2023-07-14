import { memo } from 'react';
import cls from './AppVersionModal.module.scss';

import { useTranslation } from 'react-i18next';
import { Button, HStack, Texts, classNames } from 'Modules/UiKit';
interface AppVersionModalProps {
  className?: string;
  onClose?: () => void;
  appVerion: string;
}

export const AppVersionModal = memo((props: AppVersionModalProps) => {
  const { className, onClose, appVerion } = props;
  const { t } = useTranslation();
  return (
    <>
      <HStack justify="between" max>
        <Texts size="sizeM" className={cls.text} title={t('Информация')} />
        <Button theme="clear" className={cls.buttonSize} onClick={onClose}>
          &#9932;
        </Button>
      </HStack>

      <Texts
        size="sizeM"
        className={cls.textVersion}
        title={`${t('Версия приложения')} ${appVerion}`}
      />
    </>
  );
});
