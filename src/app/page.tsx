"use client";

import Image from "next/image";
import homeBg from "@/assets/images/home.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import DragonCursor from "@/components/DragonCursor";
import ServicePages from "@/components/ServicePages";
import MobileServices from "@/components/MobileServices";
import Link from "next/link";

export default function Home() {
    const isMobile = window.innerWidth < 768;
    return (
        <div className="relative w-screen h-screen overflow-hidden">

            {/* Background */}
            <Image
                src={homeBg}
                alt="Background"
                fill
                priority
                className=""
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            <DragonCursor/>

            {/* Conteúdo */}
            <div className="relative z-10 flex flex-col h-full text-white">

                {/* HEADER */}
                <header className="pt-10 text-center ">
                    <h1 className="
                          text-5xl
                          font-black
                          tracking-widest
                          bg-gradient-to-b
                          from-gray-200
                          via-white
                          to-gray-400
                          bg-clip-text
                          text-transparent
                          drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
                          font-[var(--font-orbitron)]
                        ">
                        Miqueias Rocha
                    </h1>

                    {/* Linha divisória neon */}
                    <div className="relative mx-auto mt-3 mb-2 h-[2px] w-80 bg-red-700 overflow-hidden">
                        <span className="absolute top-0 left-[-40%] h-full w-1/3 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-energy" />
                    </div>

                    <h2 className="text-lg text-gray-300 tracking-wide">
                        Developer FullStack
                    </h2>
                </header>

                {/* BODY */}
                <main className="flex-1 flex items-center justify-center">
                    {isMobile?(
                        <MobileServices/>
                    ):(
                        <ServicePages/>
                    )}
                </main>

                {/* FOOTER */}
                <footer className="absolute bottom-0 left-0 w-full pb-6">

                    {/* Linha superior do footer */}
                    <div className="relative mx-auto mt-3 mb-2 h-[3px] w-[150vh] bg-red-700 overflow-hidden">
                        <span className="absolute top-0 left-[-40%] h-full w-1/3 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-energy" />
                    </div>

                    <div className="flex justify-center items-center gap-12 text-red-500 text-3xl">
                        <Link href="https://github.com/MiqueiasRocha94">
                            <FaGithub className="hover:scale-110 transition duration-300" />
                        </Link>
                        <Link href="mailto:">
                            <MdEmail className="hover:scale-110 transition duration-300" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/miqueias-m-rocha/">
                            <FaLinkedin className="hover:scale-110 transition duration-300" />
                        </Link>
                    </div>

                </footer>

            </div>
        </div>
    );
}