"use client"

export default function About() {
    return (
        <section className="space-y-6 slide-up-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Sobre Mim</h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-300 leading-relaxed">
                <p>
                    Tenho um domínio sólido em Java (Spring Boot, Hibernate), mas também possuo
                    experiência relevante com outras linguagens e frameworks como Python, Node.js
                    (Next.js) e PHP. Essa versatilidade me permite adaptar a diferentes desafios e
                    atuar tanto no front-end quanto no back-end.
                </p>
                <p>
                    Minha trajetória profissional é marcada por uma sólida experiência em gestão
                    e coordenação, adquirida em cargos de liderança nos setores comercial e
                    administrativo. Essas experiências me deram uma visão estratégica e habilidades
                    interpessoais que hoje aplico na minha carreira como desenvolvedor.
                </p>
            </div>
        </section>
    );
}