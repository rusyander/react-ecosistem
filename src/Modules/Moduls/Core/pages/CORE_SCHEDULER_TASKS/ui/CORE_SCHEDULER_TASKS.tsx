import { CoreSchedulerTasksWidgets } from 'Modules/Moduls/Core/widgets/CoreSchedulerTasksWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function CORE_SCHEDULER_TASKS() {
  const { t } = useTranslation('');

  return (
    <Page>
      <CoreSchedulerTasksWidgets />
    </Page>
  );
}
