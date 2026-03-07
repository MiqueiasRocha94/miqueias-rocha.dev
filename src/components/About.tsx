"use client"

import { TypographyH2, TypographyP } from "@/components/ui/typography"
import { useLanguage } from "@/contexts/LanguageContext"

export default function About() {
    const { t } = useLanguage()

    return (
        <section className="space-y-6 slide-up-fade-in">
            <TypographyH2 className="text-gray-100">
                {t("about.title")}
            </TypographyH2>

            <div className="grid md:grid-cols-2 gap-8 text-gray-300 leading-relaxed">
                <TypographyP>{t("about.paragraph1")}</TypographyP>
                <TypographyP>{t("about.paragraph2")}</TypographyP>
            </div>
        </section>
    )
}