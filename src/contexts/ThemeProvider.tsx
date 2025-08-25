'use client'

import {ThemeProvider as NextThemesProvider, useTheme} from 'next-themes'
import React, {useEffect, useState} from "react";
import {Moon, Sun} from "lucide-react";
import {OptionSwitch} from "@/components/OptionSwitch";

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeToggleButton = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isLight = theme === 'dark'

    return (
        <div className="group inline-flex items-center justify-center gap-2 rounded-md border px-3 py-1 hover:bg-muted transition-all duration-300 relativ">
            {isLight ? (
                <Moon className="w-4 h-4" />
            ) : (
                <Sun className="w-4 h-4 text-white group-hover:text-foreground transition-colors duration-300" />
            )}
            <div className="overflow-hidden transition-all duration-300 max-w-0 group-hover:max-w-[200px]">
                <OptionSwitch
                    label=""
                    checked={isLight}
                    onCheckedChange={(value) => setTheme(value ? 'dark' : 'light')}
                    tooltip={`Modo ${isLight ? "Claro" : "Escuro"}`}
                />
            </div>
        </div>
    )
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </NextThemesProvider>
    )
}