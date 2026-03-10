"use client"

import { useState } from "react";
import { PAGES, PUBLIC_PAGES } from "@/config/navegation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface Page {
    name: string;
    link: string;
}

export default function MobileServices() {

    const { isAuthenticated } = useAuth();
    const [open, setOpen] = useState(false);

    const pages: Page[] = isAuthenticated ? PAGES : PUBLIC_PAGES;

    return (
        <div className="flex flex-col items-center w-full">

            {/* Botão de abrir/fechar */}
            <button
                onClick={() => setOpen(!open)}
                className="mb-6 px-6 py-3 rounded-full
                border border-red-500
                bg-red-600/20
                text-red-400
                backdrop-blur-md
                shadow-[0_0_15px_rgba(255,0,0,0.6)]
                hover:bg-red-600/40
                transition"
            >
                {open ? "Close" : "Open"}
            </button>

            {/* Grid de serviços */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 gap-6 px-6 w-full max-w-sm"
                    >
                        {pages.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.link}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.08 }}
                                className="relative flex items-center justify-center h-24 rounded-full
                                bg-red-600/20 border border-red-500
                                backdrop-blur-md
                                shadow-[0_0_20px_rgba(255,0,0,0.6)]
                                hover:scale-105 active:scale-95
                                transition"
                            >
                                <span className="text-sm font-semibold tracking-wide text-center px-2">
                                    {item.name}
                                </span>

                                <div className="absolute inset-0 rounded-full border border-red-500 animate-pulse opacity-30" />
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}