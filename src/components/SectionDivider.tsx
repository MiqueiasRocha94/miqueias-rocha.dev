"use client"

import { useInView } from "@/hooks/useInView";

type SectionDividerProps = {
    delay?: number;
};

export default function SectionDivider({ delay = 0 }: SectionDividerProps) {
    const { ref, inView } = useInView<HTMLHRElement>({ threshold: 0.2, once: false });

    return (
        <hr
            ref={ref}
            className={`border-border ${
                inView
                    ? "opacity-0 animate-[slideUpFade_0.8s_ease_forwards]"
                    : "opacity-0"
            }`}
            style={{ animationDelay: `${delay}s` }}
        />
    );
}
