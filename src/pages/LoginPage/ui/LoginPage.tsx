import { Loader, Page } from 'Modules/UiKit';
import { LoginFormAsync } from 'features/AuthByUserName/ui/LoginForm/LoginForm.async';
import { Suspense, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './LoginPage.module.scss';

export default function LoginPage() {
  const { t } = useTranslation('main');
  const [isAuthModal, setIsAuthModal] = useState(false);
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, [setIsAuthModal]);

  return (
    // <Page>
    <div className={cls.formSize}>
      <Suspense fallback={<Loader />}>
        {<LoginFormAsync onSuccess={onCloseModal} />}
      </Suspense>{' '}
    </div>
    // </Page>
  );
}
