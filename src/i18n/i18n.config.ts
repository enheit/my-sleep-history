import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './localization/en/translation.json';
import translationUk from './localization/uk/translation.json';

export enum SupportedLocale {
    English = 'en',
    Ukrainian = 'uk'
}

const resources = {
    [SupportedLocale.English]: {
        translation: translationEn
    },
    [SupportedLocale.Ukrainian]: {
        translation: translationUk
    }
}

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: SupportedLocale.Ukrainian,
    resources: resources,
    lng: localStorage.getItem("lang") ?? SupportedLocale.Ukrainian
  });

export default i18n;