"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDevice } from "@/contexts/DeviceContext";
import { useNavigation } from "@/contexts/NavigationContext";
import { Menu } from "lucide-react";

const HIDDEN_NAMES = new Set(["Chat"]);

export default function TopNav() {
    const { isMobile } = useDevice();
    const { items, expanded, canToggle, toggle } = useNavigation();
    const pathname = usePathname();

    const visibleItems = items.filter(
        (item) => !HIDDEN_NAMES.has(item.name) && item.link !== pathname
    );

    return (
        <div className="sticky top-0 z-50 w-full border-b border-red-700 bg-black/60 backdrop-blur-md animate-nav">
            <div className={`mx-auto flex items-center justify-center gap-3 px-4 py-3 ${isMobile ? "text-xs" : "text-sm"}`}>
                {canToggle && (
                    <button
                        onClick={toggle}
                        className="rounded-full border border-red-500/50 px-3 py-1 text-red-300 transition hover:text-red-200"
                        aria-label="Menu"
                    >
                        <Menu className="h-4 w-4" />
                    </button>
                )}

                {(!canToggle || expanded) &&
                    visibleItems.map((item) => (
                        <Link
                            key={item.link}
                            href={item.link}
                            className="rounded-full border border-red-500/50 px-3 py-1 uppercase tracking-[0.2em] text-red-300 transition hover:text-red-200"
                        >
                            {item.name}
                        </Link>
                    ))}
            </div>
        </div>
    );
}
