"use client"

import {techs} from "@/model/Technologies";

export default function Technologies() {
    return (
        <section className="space-y-8 slide-up-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Tecnologias</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {techs.map((tech, idx) => {
                    const Icon = tech.icon;
                    return (
                        <div key={idx} className="tech-card flex flex-col items-center p-6 bg-gray-700 rounded-2xl shadow-lg border border-gray-600">
                            <Icon className="h-10 w-10 text-indigo-400 mb-2" />
                            <span className="text-sm font-semibold text-gray-100">{tech.name}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
