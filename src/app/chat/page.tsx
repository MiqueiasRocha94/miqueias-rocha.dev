"use client";

import Chat from "@/components/Chat";
import { useDevice } from "@/contexts/DeviceContext";


export default function ChatIA() {
    const { isMobile } = useDevice();
    return (
        <div className={`flex bg-zinc-950 text-white ${isMobile ? "min-h-screen" : "h-screen"}`}>
                <Chat isAdmin={false} />
        </div>
    );
}
