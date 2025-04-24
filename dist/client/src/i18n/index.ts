import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';
import { Language } from '../types';

export const supportedLanguages: { [key in Language]: string } = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
  am: 'ⵜⴰⵎⴰⵣⵉⵖⵜ'
};

export function initI18n() {
  i18next
    .use(initReactI18next)
    .init({
      resources: translations,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
}

export function changeLanguage(language: Language) {
  return i18next.changeLanguage(language);
}

export default i18next;
