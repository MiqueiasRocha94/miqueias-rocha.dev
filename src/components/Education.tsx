"use client"

import { TypographyH2, TypographyP } from "@/components/ui/typography"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Education() {
    const { t } = useLanguage()

    return (
        <section className="space-y-6 slide-up-fade-in">
            <TypographyH2 className="text-gray-100">
                {t("education.title")}
            </TypographyH2>

            <div className="space-y-4 text-gray-300 leading-relaxed">
                <h3 className="font-bold text-lg text-indigo-400">
                    {t("education.degrees.title")}
                </h3>
                <p className="text-sm">
                    {t("education.degrees.university")}
                </p>
                <TypographyP className="mt-1">
                    {t("education.degrees.description")}
                </TypographyP>
            </div>
        </section>
    )
}
