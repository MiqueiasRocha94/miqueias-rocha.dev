import { UserConfig } from 'next-i18next';

const nextI18NextConfig: UserConfig = {
    i18n: {
        defaultLocale: 'pt',
        locales: ['pt', 'en', 'es'],
    },
};

export default nextI18NextConfig;