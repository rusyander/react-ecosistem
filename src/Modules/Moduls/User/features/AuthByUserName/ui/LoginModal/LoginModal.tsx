import React, { FC, Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginModal.module.scss';
import { Modal } from 'shared/ui/Modal';
// import { LoginForm } from '../LoginForm/LoginForm';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { Loader } from 'shared/ui/Loader/Loader';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({
  className,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={classNames(cls.LoginMadal, {}, [className])}
      lazy
    >
      <Suspense fallback={<Loader />}>
        {isOpen && <LoginFormAsync onSuccess={onClose} />}
      </Suspense>
    </Modal>
  );
};
