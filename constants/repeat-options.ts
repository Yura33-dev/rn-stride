import type { Locale } from 'date-fns';
import { de, enUS, ru } from 'date-fns/locale';

export const dateFnsLocales: Record<string, Locale> = {
  ru,
  en: enUS,
  de,
};
