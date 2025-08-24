"use client"

const timeline = [
    {
        role: 'Desenvolvedor Java Full Stack - BrTec',
        period: 'Jan 2023 - Presente',
        description: 'Atuação no desenvolvimento e manutenção de sistemas, utilizando Java Spring Boot no backend e Angular/Next.js no frontend.'
    },
    {
        role: 'Líder Comercial - Empresa XPTO',
        period: 'Mar 2019 - Dez 2022',
        description: 'Gestão de equipe de vendas, planejamento estratégico e negociação com clientes de grande porte.'
    },
    {
        role: 'Analista Administrativo - Empresa ABC',
        period: 'Ago 2015 - Fev 2019',
        description: 'Responsável por processos administrativos, organização de rotinas e suporte à gestão.'
    }
];

export default function Timeline() {
    return (
        <section className="space-y-8 slide-up-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Linha do Tempo da Carreira</h2>
            <div className="relative pl-6 sm:pl-10">
                <div className="absolute inset-y-0 left-0 w-1 bg-gray-700 rounded-full"></div>
                {timeline.map((item, idx) => (
                    <div key={idx} className="timeline-item relative pl-4 sm:pl-8 py-4 border-l-4 border-indigo-500">
                        <div className="absolute left-0 w-4 h-4 rounded-full bg-indigo-500 transform -translate-x-1/2 -translate-y-1/2 top-4"></div>
                        <div className="bg-gray-700 p-6 rounded-2xl shadow-lg border border-gray-600">
                            <h3 className="text-lg sm:text-xl font-bold text-indigo-400">{item.role}</h3>
                            <p className="text-sm text-gray-400 mb-2">{item.period}</p>
                            <p className="text-gray-300">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}