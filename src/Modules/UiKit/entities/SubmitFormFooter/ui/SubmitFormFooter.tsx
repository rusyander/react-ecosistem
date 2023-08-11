import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SubmitFormFooter.module.scss';
import { Button, HStack, Texts, classNames } from 'Modules/UiKit';

interface SubmitFormFooterProps {
  className?: string;
  onClose: () => void;
  onSubmit: () => any;
}

export const SubmitFormFooter = memo((props: SubmitFormFooterProps) => {
  const { className, onClose, onSubmit } = props;
  const { t } = useTranslation();

  return (
    <HStack justify="start" gap="8" className={cls.submitFooter}>
      <Button onClick={onSubmit} theme="background" size="size_s">
        <Texts text={t('Сохранить')} />
      </Button>
      <Button onClick={onClose} theme="background" size="size_s">
        <Texts text={t('Отмена')} />
      </Button>
    </HStack>
  );
});
