"use client"

import Header from "@/components/Header";
import About from "@/components/About";
import Education from "@/components/Education";
import Technologies from "@/components/Technologies";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";
import { useDevice } from "@/contexts/DeviceContext";


export default function portfolio() {
    const { isMobile } = useDevice();
    return (
        <>
            {/* Conteúdo da página */}
            <div
                className={`min-h-screen flex items-center justify-center bg-background text-foreground ${
                    isMobile ? "p-3 text-sm" : "p-4 sm:p-6 lg:p-8"
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
        </>
    );
}
