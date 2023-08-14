import { CoreSchedTasksWidgets } from 'Modules/Moduls/Core/widgets/CoreSchedTasksWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function _() {
  const { t } = useTranslation('');

  return (
    <Page>
      <div>
        <CoreSchedTasksWidgets />
      </div>
    </Page>
  );
}
