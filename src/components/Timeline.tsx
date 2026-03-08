"use client"

import { TypographyH2 } from "@/components/ui/typography"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Timeline() {
    const { t } = useLanguage()

    const timeline = [
        {
            role: t("timeline.brtec.role"),
            period: t("timeline.brtec.period"),
            description: t("timeline.brtec.description")
        },
        {
            role: t("timeline.itau.role"),
            period: t("timeline.itau.period"),
            description: t("timeline.itau.description")
        },
        {
            role: t("timeline.plansul.role"),
            period: t("timeline.plansul.period"),
            description: t("timeline.plansul.description")
        },
        {
            role: t("timeline.comercio.role"),
            period: t("timeline.comercio.period"),
            description: t("timeline.comercio.description")
        },
        {
            role: t("timeline.assprom.role"),
            period: t("timeline.assprom.period"),
            description: t("timeline.assprom.description")
        }
    ]

    return (
        <section className="space-y-8 slide-up-fade-in">
            <TypographyH2 className="text-gray-100">
                {t("timeline.title")}
            </TypographyH2>

            <div className="relative pl-6 sm:pl-10">
                <div className="absolute inset-y-0 left-0 w-1 bg-gray-700 rounded-full"></div>

                {timeline.map((item, idx) => (
                    <div
                        key={idx}
                        className="relative pl-4 sm:pl-8 py-4 border-l-4 border-indigo-500"
                    >
                        <div className="absolute left-0 w-4 h-4 rounded-full bg-indigo-500 transform -translate-x-1/2 -translate-y-1/2 top-4"></div>

                        <div className="bg-gray-700 p-6 rounded-2xl shadow-lg border border-gray-600">
                            <h3 className="text-lg sm:text-xl font-bold text-indigo-400">
                                {item.role}
                            </h3>

                            <p className="text-sm text-gray-400 mb-2">
                                {item.period}
                            </p>

                            <p className="text-gray-300">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}