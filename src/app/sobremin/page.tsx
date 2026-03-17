"use client"

import Header from "@/components/Header";
import About from "@/components/About";
import Education from "@/components/Education";
import Technologies from "@/components/Technologies";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";
import { useDevice } from "@/contexts/DeviceContext";
import { useEffect, useState } from "react";
import TopNav from "@/components/TopNav";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Portfolio() {
    const { isMobile } = useDevice();

    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showTopNav, setShowTopNav] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

            // aparece quando passar da metade da página
            setShowScrollTop(scrollTop > pageHeight / 2);

            // navbar só quando estiver perto do topo
            setShowTopNav(scrollTop < 100);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {showTopNav && <TopNav />}

            <div
                className={`min-h-screen flex items-center justify-center bg-background text-foreground ${
                    isMobile ? "p-3 text-sm pt-16" : "p-4 sm:p-6 lg:p-8 pt-16"
                }`}
            >
                <div
                    className={`bg-card backdrop-blur-md max-w-5xl w-full mx-auto rounded-[40px] shadow-2xl space-y-12 border border-border ${
                        isMobile ? "p-5" : "p-6 sm:p-10 lg:p-16"
                    }`}
                >
                    <Header />
                    <hr className="border-border slide-up-fade-in" />
                    <About />
                    <hr className="border-border slide-up-fade-in" />
                    <Education />
                    <hr className="border-border slide-up-fade-in" />
                    <Technologies />
                    <hr className="border-border slide-up-fade-in" />
                    <Stats />
                    <hr className="border-border slide-up-fade-in" />
                    <Timeline />
                </div>
            </div>

            {showScrollTop && <ScrollToTopButton />}
        </>
    );
}