import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';
import { CoreUsersWidgets } from '../../../widgets/CoreUsersWidgets';

export default function CORE_USERS() {
  const { t } = useTranslation('core');
  return (
    <Page>
      <CoreUsersWidgets />
    </Page>
  );
}
