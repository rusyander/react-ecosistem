import { OsSubregionsWidgets } from 'Modules/Moduls/Os/widgets/OsSubregionsWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function OS_SUBREGIONS() {
  const { t } = useTranslation('');

  return (
    <Page>
      <OsSubregionsWidgets />
    </Page>
  );
}
