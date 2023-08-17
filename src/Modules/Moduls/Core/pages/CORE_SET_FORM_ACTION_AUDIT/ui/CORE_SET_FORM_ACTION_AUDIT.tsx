import { CoreSetFormActionAuditWidgets } from 'Modules/Moduls/Core/widgets/CoreSetFormActionAuditWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function CORE_SET_FORM_ACTION_AUDIT() {
  const { t } = useTranslation('');

  return (
    <Page>
      <div>
        <CoreSetFormActionAuditWidgets />
      </div>
    </Page>
  );
}
