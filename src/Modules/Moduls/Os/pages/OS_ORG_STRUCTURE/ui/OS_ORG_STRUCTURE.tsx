import { OsOrgStructureWidgets } from 'Modules/Moduls/Os/widgets/OsOrgStructureWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function OS_ORG_STRUCTURE() {
  const { t } = useTranslation('');

  return (
    <Page>
      <OsOrgStructureWidgets />
    </Page>
  );
}
