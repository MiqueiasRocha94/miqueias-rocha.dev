"use client";

import Chat from "@/components/Chat";
import { useDevice } from "@/contexts/DeviceContext";
import TopNav from "@/components/TopNav";


export default function ChatIA() {
    const { isMobile } = useDevice();
    return (
        <div className={`flex flex-col bg-zinc-950 text-white ${isMobile ? "min-h-screen" : "h-screen"}`}>
            <TopNav />
            <Chat isAdmin={false} />
        </div>
    );
}
