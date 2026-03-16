"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import homeBg from "@/assets/images/home.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import DragonCursor from "@/components/DragonCursor";
import ServicePages from "@/components/ServicePages";
import MobileServices from "@/components/MobileServices";
import Link from "next/link";

const HIGHLIGHTS = [
    {
        title: "Fullstack com foco em produto",
        description: "Back-end solido em Java e front-end preciso com Next.js e UX pragmatica.",
    },
    {
        title: "Arquitetura limpa",
        description: "DDD, Clean Architecture e APIs com padroes claros e escalaveis.",
    },
    {
        title: "IA aplicada",
        description: "Agentes locais com LLM, integracao via API e fluxo conversacional real.",
    },
];

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);
    const [activeCard, setActiveCard] = useState(0);

    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 768);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    useEffect(() => {
        if (!isMobile) return;
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % HIGHLIGHTS.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [isMobile]);

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <Image src={homeBg} alt="Background" fill priority className="" />
            <div className="absolute inset-0 bg-black/50" />

            <DragonCursor />

            <Link
                href="/login"
                className="absolute right-6 top-6 z-20 rounded-full border border-red-500/50 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-red-300 shadow-[0_0_12px_rgba(255,0,0,0.25)] backdrop-blur-sm transition hover:text-red-200 hover:shadow-[0_0_18px_rgba(255,0,0,0.45)]"
            >
                Login
            </Link>

            <div className="relative z-10 flex flex-col h-full text-white">
                <header className="pt-10 text-center">
                    <h1
                        className="text-5xl font-black tracking-widest bg-gradient-to-b from-gray-200 via-white to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,0,0,0.7)] font-[var(--font-orbitron)]"
                    >
                        Miqueias Rocha
                    </h1>

                    <div className="relative mx-auto mt-3 mb-2 h-[2px] w-80 bg-red-700 overflow-hidden">
                        <span className="absolute top-0 left-[-40%] h-full w-1/3 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-energy" />
                    </div>

                    <h2 className="text-lg text-gray-300 tracking-wide">Developer FullStack</h2>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center gap-10">
                    <div className="grid w-full max-w-5xl grid-cols-1 gap-4 px-6 md:grid-cols-3">
                        {isMobile ? (
                            <div
                                key={HIGHLIGHTS[activeCard].title}
                                className="rounded-2xl border border-red-900/60 bg-gradient-to-br from-black/80 via-zinc-950/80 to-zinc-900/80 p-4 shadow-[0_0_20px_rgba(255,0,70,0.08)] animate-[fadeIn_.6s_ease]"
                            >
                                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
                                    {HIGHLIGHTS[activeCard].title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-300">
                                    {HIGHLIGHTS[activeCard].description}
                                </p>
                            </div>
                        ) : (
                            HIGHLIGHTS.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-red-900/60 bg-gradient-to-br from-black/80 via-zinc-950/80 to-zinc-900/80 p-4 shadow-[0_0_20px_rgba(255,0,70,0.08)]"
                                >
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-300">{item.description}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {isMobile ? <MobileServices /> : <ServicePages />}
                </main>

                <footer className="absolute bottom-0 left-0 w-full pb-6">
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
