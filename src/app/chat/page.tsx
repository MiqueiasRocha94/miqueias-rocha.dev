"use client";

import Chat from "@/components/Chat";


export default function ChatIA() {
    return (
        <div className="flex h-screen bg-zinc-950 text-white">
                <Chat isAdmin={false} />
        </div>
    );
}
