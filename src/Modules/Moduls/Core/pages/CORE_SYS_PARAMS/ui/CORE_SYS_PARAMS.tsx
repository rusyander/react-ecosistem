import { CoreSysParamsWidgets } from 'Modules/Moduls/Core/widgets/CoreSysParamsWidgets';
import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function CORE_SYS_PARAMS() {
  const { t } = useTranslation('');

  return (
    <Page>
      <div>
        <CoreSysParamsWidgets />
      </div>
    </Page>
  );
}
