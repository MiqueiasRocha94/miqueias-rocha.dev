"use client";

import { usePathname } from "next/navigation";

export default function ScrollToTopButton() {
    const pathname = usePathname();

    if (pathname !== "/sobremin") return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-[9999] rounded-full border border-red-500/60 bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-300 shadow-[0_0_12px_rgba(255,0,0,0.35)] backdrop-blur-md transition hover:text-red-200 hover:shadow-[0_0_18px_rgba(255,0,0,0.45)]"
        >
            Inicio
        </button>
    );
}
