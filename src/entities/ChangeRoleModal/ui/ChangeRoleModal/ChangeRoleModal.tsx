import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ChangeRoleModal.module.scss';
import {
  BreadCrumbsActions,
  Button,
  HStack,
  Texts,
  classNames,
} from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { UserActions } from 'entities/User';
import { useNavigate } from 'react-router-dom';
import { InitDataTypes, UserRoles } from 'shared/types/ititType';

interface ChangeRoleModalProps {
  className?: string;
  onClose?: () => void;
  selectedRole?: UserRoles;
  changeRole?: (item: number) => any;
}

export const ChangeRoleModal = memo((props: ChangeRoleModalProps) => {
  const { className, onClose, selectedRole, changeRole } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeRoleHandler = useCallback(() => {
    changeRole?.(selectedRole?.code || 0).then((res: InitDataTypes) => {
      // @ts-ignore
      const tsIgnoreInitData = res?.data?.result;
      dispatch(UserActions.setGlobalData(res.data));
      dispatch(BreadCrumbsActions.clearPathListItem());
      if (tsIgnoreInitData === '1') {
        onClose?.();
        navigate('/');
      }
    });
  }, [changeRole, dispatch, navigate, onClose, selectedRole?.code]);

  return (
    <div className={classNames(cls.changeRoleModal, {}, [className])}>
      <HStack justify="between" max>
        <Texts size="sizeM" className={cls.text} title={t('Внимание')} />
        <Button theme="clear" className={cls.buttonSize} onClick={onClose}>
          &#9932;
        </Button>
      </HStack>

      <div className={cls.divider} />
      <HStack justify="center" align="center" gap="8">
        <Icon icon="carbon:warning" className={cls.icons} />
        <Texts size="sizeL" text={t('Вы действительно хотите сменить роль?')} />
      </HStack>
      <div className={cls.divider} />
      <HStack justify="end" gap="16">
        <Button
          className={cls.save}
          onClick={changeRoleHandler}
          theme="background"
        >
          {t('Да')}
        </Button>
        <Button theme="background" onClick={onClose}>
          {t('Нет')}
        </Button>
      </HStack>
    </div>
  );
});
