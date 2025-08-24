"use client"

export default function Education() {
    const degrees = [
        {
            title: 'Pós-Graduação em Engenharia de Software',
            university: 'Universidade XYZ, 2022 - 2023',
            description: 'Especialização em metodologias ágeis, arquitetura de software e padrões de design para sistemas de alta escalabilidade.'
        },
        {
            title: 'Bacharel em Ciência da Computação',
            university: 'Universidade ABC, 2018 - 2022',
            description: 'Foco em algoritmos, estrutura de dados, redes e desenvolvimento de sistemas.'
        }
    ];

    return (
        <section className="space-y-6 slide-up-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Formação Acadêmica</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
                {degrees.map((deg, index) => (
                    <div key={index}>
                        <h3 className="font-bold text-lg text-indigo-400">{deg.title}</h3>
                        <p className="text-sm">{deg.university}</p>
                        <p className="mt-1">{deg.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
