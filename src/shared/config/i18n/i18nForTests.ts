import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: '1',
  fallbackLng: '1',

  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  resources: { 1: { translations: {} } },
});

export default i18n;
