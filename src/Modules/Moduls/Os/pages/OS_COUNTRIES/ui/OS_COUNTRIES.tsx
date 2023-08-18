import { OsCountriesWidgets } from 'Modules/Moduls/Os/widgets/OsCountriesWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function OS_COUNTRIES() {
  const { t } = useTranslation('');

  return (
    <Page>
      <OsCountriesWidgets />
    </Page>
  );
}
