import { CoreRolesWidgets } from 'Modules/Moduls/Core/widgets/CoreRolesWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function CORE_ROLES() {
  const { t } = useTranslation('');

  return (
    <Page>
      <CoreRolesWidgets />
    </Page>
  );
}
