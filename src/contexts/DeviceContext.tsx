"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type DeviceInfo = {
    isMobile: boolean;
    source: "ua" | "width";
    width: number;
};

const DeviceContext = createContext<DeviceInfo>({
    isMobile: false,
    source: "width",
    width: 0,
});

function isMobileByUserAgent(): boolean | null {
    if (typeof navigator === "undefined") return null;

    const navAny = navigator as Navigator & {
        userAgentData?: { mobile?: boolean };
        maxTouchPoints?: number;
        msMaxTouchPoints?: number;
    };

    if (navAny.userAgentData && typeof navAny.userAgentData.mobile === "boolean") {
        return navAny.userAgentData.mobile;
    }

    const ua = navigator.userAgent || "";

    if (/Android/i.test(ua)) return true;
    if (/iPhone|iPod/i.test(ua)) return true;
    if (/iPad/i.test(ua)) return true;

    // iPadOS 13+ may report as Mac; detect touch capability
    const isMacLike = /Macintosh/i.test(ua);
    const touchPoints = navAny.maxTouchPoints || navAny.msMaxTouchPoints || 0;
    if (isMacLike && touchPoints > 1) return true;

    return null;
}

export function DeviceProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<DeviceInfo>({
        isMobile: false,
        source: "width",
        width: 0,
    });

    useEffect(() => {
        const update = () => {
            const width = window.innerWidth;
            const uaMobile = isMobileByUserAgent();
            const widthMobile = width < 768;

            if (uaMobile === true) {
                setState({ isMobile: true, source: "ua", width });
                return;
            }

            if (uaMobile === false) {
                setState({ isMobile: widthMobile, source: "width", width });
                return;
            }

            setState({ isMobile: widthMobile, source: "width", width });
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const value = useMemo(() => state, [state]);

    return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}

export function useDevice() {
    return useContext(DeviceContext);
}
