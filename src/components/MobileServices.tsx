"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@/contexts/NavigationContext";

interface Page {
    name: string;
    link: string;
}

export default function MobileServices() {

    const { isAuthenticated } = useAuth();
    const { items } = useNavigation();
    const [open, setOpen] = useState(false);

    const pages: Page[] = isAuthenticated
        ? items.filter((item) => item.link !== "/")
        : [...items.filter((item) => item.link !== "/"), { name: "login", link: "/login" }];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.12 },
        },
        exit: {
            opacity: 0,
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 12, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: 8, scale: 0.96, transition: { duration: 0.24 } },
    };

    return (
        <div className="flex flex-col items-center mb-5 w-full">

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
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            transition: { height: { duration: 0.45, ease: "easeOut" } },
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: { height: { duration: 0.32, ease: "easeIn" } },
                        }}
                        className="w-full "
                    >
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="grid grid-cols-2 gap-6 px-6 w-full max-w-sm"
                        >
                        {pages.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.link}
                                variants={itemVariants}
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
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
