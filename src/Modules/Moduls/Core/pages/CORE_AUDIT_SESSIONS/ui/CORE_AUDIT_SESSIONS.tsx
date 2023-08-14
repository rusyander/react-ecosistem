import { CoreAuditSessionsWidgets } from 'Modules/Moduls/Core/widgets/CoreAuditSessionsWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function CORE_AUDIT_SESSIONS() {
  const { t } = useTranslation('');

  return (
    <Page>
      <div>
        <CoreAuditSessionsWidgets />
      </div>
    </Page>
  );
}
