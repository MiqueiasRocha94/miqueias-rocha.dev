import { Images } from '@/constants/images';

export const languages = {
    'pt-BR': { description: 'pt-BR', flag: Images.FLAG_BR, label: 'Português (Brasil)' },
    'en-US': { description: 'en-US', flag: Images.FLAG_US, label: 'English (United States)' },
    'es-ES': { description: 'es-ES', flag: Images.FLAG_ES, label: 'Español (España)' },
    outros: { description: 'outros', flag: Images.FLAG_ES, label: 'Google Translate' },
} as const;

export type SupportedLocale = keyof typeof languages;

export const supportedLocales = Object.keys(languages) as SupportedLocale[];

export const defaultLanguage = languages['pt-BR'];
