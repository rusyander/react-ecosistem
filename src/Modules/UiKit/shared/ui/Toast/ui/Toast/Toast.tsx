import { memo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Toast.module.scss';
import { classNames } from 'Modules/UiKit';
import { Toast as ToastPrimeReact } from 'primereact/toast';

interface ToastProps {
  className?: string;
  isAdd?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
}

export const Toast = memo((props: ToastProps) => {
  const { className, isAdd = false, isDelete = false, isEdit = false } = props;
  const { t } = useTranslation();

  const toast: any = useRef(null);

  useEffect(() => {
    if (isAdd) {
      showSuccessAdd();
    }
    if (isDelete) {
      showSuccessDelete();
    }
    if (isEdit) {
      showSuccessEdit();
    }
  }, [isAdd, isEdit, isDelete]);

  const showSuccessAdd = () => {
    toast.current.show({
      severity: 'success',
      summary: t('Новый элемент создан'),
      // detail: 'Message Content',
      life: 3000,
    });
  };

  const showSuccessDelete = () => {
    toast.current.show({
      severity: 'success',
      summary: t('Элемент удален'),
      // detail: 'Message Content',
      life: 3000,
    });
  };

  const showSuccessEdit = () => {
    toast.current.show({
      severity: 'success',
      summary: t('Элемент отредактирован'),
      // detail: 'Message Content',
      life: 3000,
    });
  };

  return (
    <div className={classNames(cls.toast, {}, [className])}>
      <ToastPrimeReact ref={toast} />
    </div>
  );
});
