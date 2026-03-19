"use client"

import { techs } from "@/data/technologies";
import { useInView } from "@/hooks/useInView";

export default function Technologies() {
    const { ref, inView } = useInView({ threshold: 0.2, once: false })

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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Tecnologias</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {techs.map((tech, idx) => {
                    const Icon = tech.icon;
                    return (
                        <div
                            key={idx}
                            className={
                                "flex flex-col items-center p-6 bg-gray-700 rounded-2xl shadow-lg border border-gray-600 " +
                                (inView
                                    ? "opacity-0 animate-[slideUpFade_0.6s_ease_forwards]"
                                    : "opacity-0")
                            }
                            style={{ animationDelay: `${0.5 + idx * 0.5}s` }}
                        >
                            <Icon className="h-10 w-10 mb-2" style={{ color: tech.color }} />
                            <span className="text-sm font-semibold text-gray-100">{tech.name}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
