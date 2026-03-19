"use client"

import { TypographyH2, TypographyP } from "@/components/ui/typography"
import { useLanguage } from "@/contexts/LanguageContext"
import { useInView } from "@/hooks/useInView"

export default function Education() {
    const { t } = useLanguage()
    const { ref, inView } = useInView({ threshold: 0.2, once: false })

    return (
        <section
            ref={ref}
            className={
                "space-y-6 " +
                (inView
                    ? "opacity-0 animate-[slideUpFade_0.8s_ease_forwards] [animation-delay:0.1s]"
                    : "opacity-0")
            }
        >
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
