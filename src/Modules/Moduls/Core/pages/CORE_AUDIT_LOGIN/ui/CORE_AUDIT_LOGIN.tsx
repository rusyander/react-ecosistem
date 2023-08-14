import { CoreAuditLoginWidgets } from 'Modules/Moduls/Core/widgets/CoreAuditLoginWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function CORE_AUDIT_LOGIN() {
  const { t } = useTranslation('');

  return (
    <Page>
      <div>
        <CoreAuditLoginWidgets />
      </div>
    </Page>
  );
}
