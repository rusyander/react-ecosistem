import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './MessagesModal.module.scss';
import { Button, HStack, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';

interface MessagesModalProps {
  className?: string;
  onClose?: () => void;
  onCall?: () => any;
  title?: any;
  subTitle?: any;
}

export const MessagesModal = memo((props: MessagesModalProps) => {
  const { className, title, subTitle, onClose, onCall } = props;
  const { t } = useTranslation();

  const onCallHandler = useCallback(() => {
    console.log('onCallHandler');
    onCall?.();
  }, [onCall]);

  const closeHandler = () => {
    onClose?.();
  };

  return (
    <div className={classNames(cls.MessagesModal, {}, [className])}>
      <HStack justify="between" max>
        <Texts size="sizeM" className={cls.text} title={title} />
        <Button theme="clear" className={cls.buttonSize} onClick={onClose}>
          &#9932;
        </Button>
      </HStack>

      <div className={cls.divider} />
      <HStack justify="start" align="center" gap="8">
        <Icon icon="carbon:warning" className={cls.icons} />
        <Texts size="sizeL" text={subTitle} />
      </HStack>
      <div className={cls.divider} />
      <HStack justify="end" gap="16">
        <Button className={cls.save} onClick={onCallHandler} theme="background">
          {t('Да')}
        </Button>
        <Button theme="background" onClick={closeHandler}>
          {t('Нет')}
        </Button>
      </HStack>
    </div>
  );
});
