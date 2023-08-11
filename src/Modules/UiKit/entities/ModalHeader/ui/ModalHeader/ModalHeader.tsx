import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ModalHeader.module.scss';
import { HStack, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';

interface ModalHeaderProps {
  className?: string;
  title: string;
  onClose: () => void;
  width?: number;
}

export const ModalHeader = memo((props: ModalHeaderProps) => {
  const { className, onClose, title, width = 600 } = props;
  const { t } = useTranslation();

  return (
    <HStack
      style={{ minWidth: `${width}px` }}
      max
      align="center"
      justify="between"
      className={classNames(cls.modalHeader, {}, [className])}
    >
      <Texts title={title} />
      <Icon
        onClick={onClose}
        width={25}
        className={cls.closeIcon}
        icon="ep:close-bold"
      />
    </HStack>
  );
});
