import { OsPopulatedLocalitiesWidgets } from 'Modules/Moduls/Os/widgets/OsPopulatedLocalitiesWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function OS_POPULATED_LOCALITIES() {
  const { t } = useTranslation('');

  return (
    <Page>
      <OsPopulatedLocalitiesWidgets />
    </Page>
  );
}
