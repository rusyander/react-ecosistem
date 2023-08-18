import { OsRegionsWidgets } from 'Modules/Moduls/Os/widgets/OsRegionsWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function OS_REGIONS() {
  const { t } = useTranslation('');

  return (
    <Page>
      <OsRegionsWidgets />
    </Page>
  );
}
