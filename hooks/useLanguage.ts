import { Language } from '@/types';
import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  return {
    currentLanguage: i18n.language as Language,
    changeLanguage,
  };
}
