import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { checkFormEnterM } from '../api/CORE_USERS_API';
import { useEffect } from 'react';

export default function CORE_USERS() {
  const { t } = useTranslation('');
  const locations = useLocation();

  const [checkFormEnter] = checkFormEnterM();
  const [getGridDataM] = checkFormEnterM();

  useEffect(() => {
    checkFormEnter({ formCode: locations.pathname.replaceAll('/', '') }).then(
      (res: any) => {
        console.log('res-----------', res);
      }
    );
  }, []);

  return (
    <Page>
      <div>CORE_USERS</div>
    </Page>
  );
}
