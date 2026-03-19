"use client"

import Image from "next/image"
import { Images } from "@/constants/images"
import { TypographyH1, TypographyP } from "@/components/ui/typography"
import { useLanguage } from "@/contexts/LanguageContext"
import Translate from "@/components/Translate"
import { useInView } from "@/hooks/useInView"

export default function Header() {
    const { t } = useLanguage()
    const { ref, inView } = useInView({ threshold: 0.2, once: false })

    return (
        <header ref={ref} className="text-center relative">
            <div className="mb-6 relative flex justify-center">
                <Image
                    src={Images.PROFILE_PHOTO}
                    alt="Logo"
                    width={200}
                    height={200}
                    className={
                        "rounded-full w-28 h-28 sm:w-36 sm:h-36 object-cover object-[50%_20%] ring-4 ring-primary shadow-xl " +
                        (inView
                            ? "opacity-0 animate-[slideUpFade_0.8s_ease_forwards] [animation-delay:0.1s]"
                            : "opacity-0")
                    }
                />

                <div
                    className={
                        "absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_6px_red] " +
                        (inView
                            ? "opacity-0 animate-[slideUpFade_0.8s_ease_forwards] [animation-delay:0.2s]"
                            : "opacity-0")
                    }
                >
                    <Translate />
                </div>
            </div>

            <TypographyH1
                className={
                    "text-primary mb-2 leading-tight " +
                    (inView
                        ? "opacity-0 animate-[slideUpFade_0.8s_ease_forwards] [animation-delay:0.25s]"
                        : "opacity-0")
                }
            >
                {t("header.title")}
            </TypographyH1>

            <div
                className={
                    "h-0.5 w-44 mx-auto mt-3 bg-gradient-to-r from-transparent via-red-500 to-transparent origin-center " +
                    (inView
                        ? "opacity-0 animate-[scanLine_1s_ease_forwards] [animation-delay:0.4s]"
                        : "opacity-0")
                }
            />

            <TypographyP
                className={
                    "text-muted-foreground leading-relaxed max-w-3xl mx-auto " +
                    (inView
                        ? "opacity-0 animate-[slideUpFade_0.8s_ease_forwards] [animation-delay:0.5s]"
                        : "opacity-0")
                }
            >
                {t("header.description")}
            </TypographyP>
        </header>
    )
}
