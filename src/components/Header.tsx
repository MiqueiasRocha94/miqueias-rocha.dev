"use client"

export default function Header() {
    return (
        <header className="text-center slide-up-fade-in">
            <div className="mb-6">
                <img
                    src="https://placehold.co/150x150/1f2937/d1d5db?text=Sua+Foto"
                    alt="Foto de Perfil"
                    className="mx-auto rounded-full w-28 h-28 sm:w-36 sm:h-36 object-cover ring-4 ring-indigo-500 shadow-xl mb-4"
                />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-indigo-400 mb-2 leading-tight">
                Tech Lead | Java Full Stack Developer
            </h1>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                Sou Desenvolvedor Java e Líder Técnico com experiência Full Stack, focado
                em criar soluções robustas e eficientes. Atualmente, atuo na BrTec como
                desenvolvedor, onde fui efetivado e aprimoro minhas habilidades com as
                mais recentes tecnologias de desenvolvimento.
            </p>
        </header>
    );
}