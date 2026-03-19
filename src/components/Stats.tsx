"use client"

import { useEffect, useMemo, useState } from "react";
import { stats } from "@/data/git-stats";
import { GitStaticsModel } from "@/types/git-stats";
import { useInView } from "@/hooks/useInView";

type ParsedValue = {
    value: number;
    suffix: string;
};

function parseValue(raw: string): ParsedValue {
    const trimmed = raw.trim();
    const match = trimmed.match(/^(\d+)(.*)$/);
    if (!match) return { value: 0, suffix: "" };
    return { value: Number(match[1]), suffix: match[2] ?? "" };
}

export default function Stats() {
    const { ref, inView } = useInView({ threshold: 0.2, once: false })
    const targets = useMemo(
        () => stats.map((stat) => stat.items.map((item) => parseValue(item.value))),
        []
    )
    const [counts, setCounts] = useState<number[][]>(() =>
        targets.map((items) => items.map(() => 0))
    )

    useEffect(() => {
        if (!inView) {
            setCounts(targets.map((items) => items.map(() => 0)))
            return
        }

        const durationMs = 5000
        const start = performance.now()
        let rafId = 0

        const tick = (now: number) => {
            const progress = Math.min((now - start) / durationMs, 1)
            setCounts(
                targets.map((items) =>
                    items.map((item) => Math.floor(item.value * progress))
                )
            )

            if (progress < 1) {
                rafId = requestAnimationFrame(tick)
            }
        }

        rafId = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafId)
    }, [inView, targets])

    return (
        <section
            ref={ref}
            className={
                "space-y-8 " +
                (inView
                    ? "opacity-0 animate-[slideUpFade_0.8s_ease_forwards] [animation-delay:0.1s]"
                    : "opacity-0")
            }
        >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100">
                Estatísticas de Código & Contribuições
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                {stats.map((stat: GitStaticsModel, idx: number) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={idx}
                            className={
                                "bg-gray-700 p-8 rounded-2xl shadow-lg border border-gray-600 " +
                                (inView
                                    ? "opacity-0 animate-[slideUpFade_0.6s_ease_forwards]"
                                    : "opacity-0")
                            }
                            style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <Icon className="w-12 h-12 text-gray-200" />
                                <h3 className="text-lg font-bold">{stat.title}</h3>
                            </div>
                            <ul className="space-y-2 text-gray-300">
                                {stat.items.map((item, i) => (
                                    <li key={i} className="flex justify-between items-center">
                                        <span className="font-medium">{item.label}:</span>
                                        <span className="text-indigo-400 font-semibold">
                                            {(counts[idx]?.[i] ?? 0).toString()}
                                            {targets[idx]?.[i]?.suffix ?? ""}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
