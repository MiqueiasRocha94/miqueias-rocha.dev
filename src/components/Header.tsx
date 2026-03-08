"use client"

import Image from 'next/image'
import { Images } from "@/models/images"
import { TypographyH1, TypographyP } from "@/components/ui/typography"
import {useLanguage} from "@/contexts/LanguageContext";
import Translate from "@/components/Translate";

export default function Header() {
    const { t } = useLanguage();

    return (
        <header className="text-center slide-up-fade-in relative">

            <div className="mb-6 relative flex justify-center">

                <Image
                    src={Images.PROFILE_PHOTO}
                    alt="Logo"
                    width={200}
                    height={200}
                    className="rounded-full w-28 h-28 sm:w-36 sm:h-36 object-cover object-[50%_20%] ring-4 ring-primary shadow-xl"
                />

                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <Translate />
                </div>

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