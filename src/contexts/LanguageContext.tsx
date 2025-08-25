'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { defaultLanguage, Language, languages } from '@/models/Language';
import i18n from '@/i18n';

export type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, p: { returnObjects: boolean }) => string | string[];
};


export const LanguageContext = createContext<LanguageContextType>({
    language: defaultLanguage,
    setLanguage: () => {},
    t: (key: string) => key, // fallback simples
});
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(defaultLanguage);

    useEffect(() => {
        const storedLang = localStorage.getItem('i18nextLng');
        const langKey = storedLang?.replace(/"/g, '');
        const langObj = langKey && langKey in languages ? languages[langKey as keyof typeof languages] : defaultLanguage;

        setLanguageState(langObj);
        i18n.changeLanguage(langObj.description);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('i18nextLng', JSON.stringify(lang.description));
        i18n.changeLanguage(lang.description); // troca idioma
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: i18n.t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
