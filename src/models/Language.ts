import { Images } from '@/models/images';
import {StaticImageData} from "next/image";

export type Language = {
    description: string;
    flag: StaticImageData;
    label: string;
}

export const languages = {
    'pt-BR': {description:'pt-BR', flag: Images.FLAG_BR, label: 'Português (Brasil)' },
    'en-US': {description:'en-US', flag: Images.FLAG_US, label: 'English (United States)' },
    'es-ES': {description:'es-ES', flag: Images.FLAG_ES, label: 'Español (España)' },
} as const;

export const supportedLocales = (Object.keys(languages) as (keyof typeof languages)[]);

export const defaultLanguage = languages['pt-BR'];