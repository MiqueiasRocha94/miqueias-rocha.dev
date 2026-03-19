"use client"

import { TypographyH2, TypographyP } from "@/components/ui/typography"
import { useLanguage } from "@/contexts/LanguageContext"
import { useInView } from "@/hooks/useInView"

export default function About() {
    const { t } = useLanguage()
    const { ref, inView } = useInView({ threshold: 0.2, once: false })

    return (
        <section ref={ref} className="space-y-6">
            <TypographyH2
                className={
                    "text-gray-100 " +
                    (inView
                        ? "opacity-0 animate-[slideUpFade_0.7s_ease_forwards] [animation-delay:0.1s]"
                        : "opacity-0")
                }
            >
                {t("about.title")}
            </TypographyH2>

            <div className="grid md:grid-cols-2 gap-8 text-gray-300 leading-relaxed">
                <TypographyP
                    className={
                        inView
                            ? "opacity-0 animate-[slideUpFade_0.7s_ease_forwards] [animation-delay:0.3s]"
                            : "opacity-0"
                    }
                >
                    {t("about.paragraph1")}
                </TypographyP>

                <TypographyP
                    className={
                        inView
                            ? "opacity-0 animate-[slideUpFade_0.7s_ease_forwards] [animation-delay:0.6s]"
                            : "opacity-0"
                    }
                >
                    {t("about.paragraph2")}
                </TypographyP>
            </div>
        </section>
    )
}
