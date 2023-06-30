import { Loader } from 'Modules/UiKit';
import { LoginFormAsync } from 'features/AuthByUser/ui/LoginForm/LoginForm.async';
import { Suspense } from 'react';
import cls from './LoginPage.module.scss';

export default function LoginPage() {
  return (
    // <Page>
    <div className={cls.formSize}>
      <Suspense fallback={<Loader />}>{<LoginFormAsync />}</Suspense>{' '}
    </div>
    // </Page>
  );
}
