'use client';



import {GitStaticsModel, stats} from "@/models/GitStaticsModel";

export default function Stats() {
    return (
        <section className="space-y-8 slide-up-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100">
                Estatísticas de Código & Contribuições
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                {stats.map((stat: GitStaticsModel, idx: number) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="stats-card bg-gray-700 p-8 rounded-2xl shadow-lg border border-gray-600">
                            <div className="flex items-center space-x-4 mb-4">
                                <Icon className="w-12 h-12 text-gray-200" />
                                <h3 className="text-lg font-bold">{stat.title}</h3>
                            </div>
                            <ul className="space-y-2 text-gray-300">
                                {stat.items.map((item, i) => (
                                    <li key={i} className="flex justify-between items-center">
                                        <span className="font-medium">{item.label}:</span>
                                        <span className="text-indigo-400 font-semibold">{item.value}</span>
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

