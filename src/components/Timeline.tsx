"use client"

import { TypographyH2 } from "@/components/ui/typography"
import { useLanguage } from "@/contexts/LanguageContext"
import { useInView } from "@/hooks/useInView"
import { useEffect, useState } from "react"

export default function Timeline() {
    const { t } = useLanguage()
    const { ref, inView } = useInView({ threshold: 0.2, once: false })

    const [visibleItems, setVisibleItems] = useState(0)

    const timeline = [
        {
            role: t("timeline.brtec.role"),
            period: t("timeline.brtec.period"),
            description: t("timeline.brtec.description"),
        },
        {
            role: t("timeline.itau.role"),
            period: t("timeline.itau.period"),
            description: t("timeline.itau.description"),
        },
        {
            role: t("timeline.plansul.role"),
            period: t("timeline.plansul.period"),
            description: t("timeline.plansul.description"),
        },
        {
            role: t("timeline.comercio.role"),
            period: t("timeline.comercio.period"),
            description: t("timeline.comercio.description"),
        },
        {
            role: t("timeline.assprom.role"),
            period: t("timeline.assprom.period"),
            description: t("timeline.assprom.description"),
        },
    ]

    useEffect(() => {
        if (!inView) {
            setVisibleItems(0)
            return
        }

        let current = 0

        const interval = setInterval(() => {
            current++

            setVisibleItems(current)

            if (current >= timeline.length) {
                clearInterval(interval)
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [inView])


    const visibleTimeline = visibleItems > 0
        ? timeline.slice(-visibleItems)
        : []

    return (
        <section
            ref={ref}
            className={
                "space-y-8 " +
                (inView
                    ? "opacity-0 animate-[slideUpFade_0.8s_ease_forwards]"
                    : "opacity-0")
            }
        >
            <TypographyH2 className="text-gray-100">
                {t("timeline.title")}
            </TypographyH2>

            <div className="relative pl-6 sm:pl-10">
                <div className="absolute inset-y-0 left-0 w-1 bg-gray-700 rounded-full"></div>

                {visibleTimeline.map((item, idx) => {
                    const realIndex = timeline.length - visibleItems + idx
                    const isCurrent = realIndex === 0

                    return (
                        <div
                            key={realIndex}
                            className={
                                "relative pl-4 sm:pl-8 py-4 border-l-4 border-indigo-500 " +
                                "opacity-0 animate-[stackInRight_0.6s_ease_forwards]"
                            }
                            style={{
                                transform: `translateY(${realIndex * 6}px)`,
                                zIndex: timeline.length - realIndex,
                            }}
                        >
                            <div className="absolute left-0 w-4 h-4 rounded-full bg-indigo-500 transform -translate-x-1/2 -translate-y-1/2 top-4"></div>

                            <div
                                className={`
                                    bg-gray-700 p-6 rounded-2xl shadow-lg border transition-all duration-300
                                    ${isCurrent
                                    ? "border-indigo-400 scale-[1.03]"
                                    : "border-gray-600 opacity-80"}
                                `}
                            >
                                {isCurrent && (
                                    <span className="text-xs text-green-400 font-semibold">
                                        Atual
                                    </span>
                                )}

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
                    )
                })}
            </div>
        </section>
    )
}