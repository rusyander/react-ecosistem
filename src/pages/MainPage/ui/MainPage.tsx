import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';

export default function MainPage() {
  const { t } = useTranslation('main');

  return (
    <Page>
      <div>{t('Главная cтраница')}</div>
    </Page>
  );
}
