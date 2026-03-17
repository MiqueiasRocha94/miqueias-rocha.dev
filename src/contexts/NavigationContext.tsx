"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { PAGES, PUBLIC_PAGES } from "@/config/navegation";

export type NavItem = {
    name: string;
    link: string;
};

type NavigationState = {
    items: NavItem[];
    expanded: boolean;
    canToggle: boolean;
    toggle: () => void;
};

const NavigationContext = createContext<NavigationState>({
    items: [],
    expanded: true,
    canToggle: false,
    toggle: () => undefined,
});

function uniqueByLink(items: NavItem[]): NavItem[] {
    const seen = new Set<string>();
    return items.filter((item) => {
        if (seen.has(item.link)) return false;
        seen.add(item.link);
        return true;
    });
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const [expanded, setExpanded] = useState(false);

    const items = useMemo(() => {
        const base = isAuthenticated ? PAGES : PUBLIC_PAGES;
        const withHome: NavItem[] = [{ name: "Home", link: "/" }, ...base];
        return uniqueByLink(withHome);
    }, [isAuthenticated]);

    const toggle = () => setExpanded((prev) => !prev);

    return (
        <NavigationContext.Provider
            value={{
                items,
                expanded: isAuthenticated ? expanded : true,
                canToggle: isAuthenticated,
                toggle,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    return useContext(NavigationContext);
}
