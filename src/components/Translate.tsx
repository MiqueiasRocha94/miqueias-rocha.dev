'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from "@/contexts/LanguageContext";
import { languages, supportedLocales } from '@/models/Language';

const Translate: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [showMenu, setShowMenu] = useState(false);
    const [showGoogleTranslate, setShowGoogleTranslate] = useState(false);

    useEffect(() => {
        const storedLang = localStorage.getItem('lang');
        if (storedLang === 'outros') {
            setShowGoogleTranslate(true);
        }

        const scriptId = "google-translate-script";

        (window as any).googleTranslateElementInit = function () {
            if (!(window as any).google?.translate) return;

            new (window as any).google.translate.TranslateElement(
                {
                    pageLanguage: "pt",
                    includedLanguages: 'fr,de,it,ja,zh-CN,ru',
                    layout: (window as any).google.translate.TranslateElement.InlineLayout.VERTICAL,
                },
                "google_translate_element"
            );
        };

        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        } else if ((window as any).googleTranslateElementInit) {
            (window as any).googleTranslateElementInit();
        }

    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const barGoogleTranslate = document.querySelector("iframe.skiptranslate") as HTMLIFrameElement;
            if(barGoogleTranslate){
                barGoogleTranslate.style.display = "none";
                if (e.clientY <= 10) {
                    barGoogleTranslate.style.display = "block";
                }
            }
        }

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleChangeLanguage = (lang: keyof typeof languages) => {
        if (lang === 'outros') {
            setShowGoogleTranslate(true);
        } else {
            setShowGoogleTranslate(false);
        }

        setLanguage(languages[lang]);
        localStorage.setItem('lang', lang); // agora gravando corretamente
        setShowMenu(false);
    };

    return (
        <>
            <div
                className="relative"
                onClick={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
            >
                <button className="focus:outline-none">
                    <Image
                        src={language.flag}
                        alt={language.label}
                        className="w-8 h-8 object-cover rounded-full shadow"
                    />
                </button>

                {showMenu && (
                    <ul className="absolute top-10 right-0 bg-white dark:bg-gray-800 rounded shadow-md z-50 p-2 flex flex-col gap-2 w-60">
                        {supportedLocales.map((lang) => (
                            <li key={lang}>
                                <button
                                    onClick={() => handleChangeLanguage(lang)}
                                    className="w-full flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                >
                                    <Image
                                        src={languages[lang].flag}
                                        alt={languages[lang].label}
                                        className="w-6 h-6 object-cover rounded-full"
                                    />
                                    <span className="text-sm">{languages[lang].label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {showGoogleTranslate && (
                <div className="mt-4 ml-3" id="google_translate_element" />
            )}
        </>
    );
};

export default Translate;

