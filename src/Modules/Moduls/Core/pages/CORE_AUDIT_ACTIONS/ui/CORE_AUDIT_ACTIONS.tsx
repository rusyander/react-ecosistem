import { CoreAuditActionsWidgets } from 'Modules/Moduls/Core/widgets/CoreAuditActionsWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function CORE_AUDIT_ACTIONS() {
  const { t } = useTranslation('');

  return (
    <Page>
      <div>
        <CoreAuditActionsWidgets />
      </div>
    </Page>
  );
}
