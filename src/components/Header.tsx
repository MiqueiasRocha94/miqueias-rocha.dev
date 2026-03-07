"use client"

import Image from 'next/image'
import { Images } from "@/models/images"
import { TypographyH1, TypographyP } from "@/components/ui/typography"
import {useLanguage} from "@/contexts/LanguageContext";
import Translate from "@/components/Translate";

export default function Header() {
    const { t } = useLanguage();

    return (
        <header className="text-center slide-up-fade-in">
            <div className="mb-6">
                <Image
                    src={Images.PROFILE_PHOTO}
                    alt="Logo"
                    width={150}
                    height={150}
                    className="mx-auto rounded-full w-28 h-28 sm:w-36 sm:h-36 object-cover ring-4 ring-primary shadow-xl mb-4"
                />

                <Translate />
            </div>

            <TypographyH1 className="text-primary mb-2 leading-tight">
                {t("header.title")}
            </TypographyH1>

            <TypographyP className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t("header.description")}
            </TypographyP>
        </header>
    );
}