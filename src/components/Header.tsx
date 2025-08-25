"use client"

import Image from 'next/image'
import {Images} from "@/models/images";

export default function Header() {
    return (
        <header className="text-center slide-up-fade-in">
            <div className="mb-6">
                <Image src={Images.PROFILE_PHOTO}
                       alt="Logo"
                       width={150}
                       height={150}
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