import { CoreSchedulerAdminWidgets } from 'Modules/Moduls/Core/widgets/CoreSchedulerAdminWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function CORE_SCHEDULER_ADMIN() {
  const { t } = useTranslation('');

  return (
    <Page>
      <div>
        <CoreSchedulerAdminWidgets />
      </div>
    </Page>
  );
}
