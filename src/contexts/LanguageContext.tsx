'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '@/i18n';
import Loading from "@/components/Loading";
import { defaultLanguage, languages } from "@/data/languages";
import { Language } from "@/types/language";

export type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, p?: { returnObjects: boolean }) => string | string[];
};

export const LanguageContext = createContext<LanguageContextType>({
    language: defaultLanguage,
    setLanguage: () => {},
    t: (key: string) => key, // fallback simples
});
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(defaultLanguage);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const storedLang = localStorage.getItem('i18nextLng');
        const langKey = storedLang?.replace(/"/g, '');
        const langObj = langKey && langKey in languages ? languages[langKey as keyof typeof languages] : defaultLanguage;

        setLanguageState(langObj);
        i18n.changeLanguage(langObj.description).then(() => {
            setReady(true); // só renderiza filhos quando i18n já está pronto
        });
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('i18nextLng', JSON.stringify(lang.description));
        i18n.changeLanguage(lang.description);
    };

    if (!ready) return (<Loading />);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: i18n.t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
