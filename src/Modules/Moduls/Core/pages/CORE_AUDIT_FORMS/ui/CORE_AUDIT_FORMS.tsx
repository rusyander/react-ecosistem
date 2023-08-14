import { CoreAuditFormsWidgets } from 'Modules/Moduls/Core/widgets/CoreAuditFormsWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function CORE_AUDIT_FORMS() {
  const { t } = useTranslation('');

  return (
    <Page>
      <div>
        <CoreAuditFormsWidgets />
      </div>
    </Page>
  );
}
