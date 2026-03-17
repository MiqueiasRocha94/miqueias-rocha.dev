"use client";

import { useDevice } from "@/contexts/DeviceContext";

export default function DeviceShell({ children }: { children: React.ReactNode }) {
    const { isMobile } = useDevice();

    if (!isMobile) return <>{children}</>;

    return <div className="mx-auto w-full max-w-[640px]">{children}</div>;
}
